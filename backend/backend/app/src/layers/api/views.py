import base64
import json
from http import HTTPStatus
import typing as t

from django import http
from django.contrib.auth.models import User
from django.shortcuts import render
from django.utils import timezone as djtz
from django.views import View

import xmltodict

from app.src.exceptions import UserError
from app.src.layers.api.models import ApiModel, meddra, code_set
from app.src.layers.api.models.logging import Log
from app.src.layers.base.services import (
    BusinessServiceProtocol, 
    CIOMSServiceProtocol, 
    CodeSetServiceProtocol,
    MedDRAServiceProtocol
)
from extensions import utils


def log(method: t.Callable[[http.HttpRequest], http.HttpResponse]) \
-> t.Callable[[http.HttpRequest], http.HttpResponse]:
    
    def wrapper(self: View, request: http.HttpRequest, *args, **kwargs) -> http.HttpResponse:
        log = Log.create_from_request(request)

        exc = None
        try:
            response = method(self, request, *args, **kwargs)
            log.status = response.status_code
        except Exception as e:
            exc = e
            log.status = 500

        log.response_time = djtz.now()
        log.save()

        if exc:
            raise exc
        return response
    
    return wrapper


class AuthView(View):
    def dispatch(self, request: http.HttpRequest, *args, **kwargs) -> http.HttpResponse:
        try:
            auth_header = request.META['HTTP_AUTHORIZATION']
            encoded_credentials = auth_header.split(' ')[1]  # Remove "Basic " to isolate credentials
            decoded_credentials = base64.b64decode(encoded_credentials).decode('utf-8').split(':')
            username = decoded_credentials[0]
            password = decoded_credentials[1]
        except:
            return http.HttpResponse('Invalid HTTP_AUTHORIZATION header', status=HTTPStatus.UNAUTHORIZED)
        
        try:
            user = User.objects.get(username=username)
            is_valid = user.check_password(password)
        except User.DoesNotExist:
            is_valid = False

        if not is_valid:
            return http.HttpResponse('Invalid username or password', status=HTTPStatus.UNAUTHORIZED)
        
        request.user = user
        return super().dispatch(request, *args, **kwargs)


class BaseView(AuthView):
    domain_service: BusinessServiceProtocol[ApiModel] = ...
    model_class: type[ApiModel] = ...

    def dispatch(self, request: http.HttpRequest, *args, **kwargs) -> http.HttpResponse:
        try:
            return super().dispatch(request, *args, **kwargs)
        except (TypeError, json.JSONDecodeError):
            return http.HttpResponse('Invalid json data', status=HTTPStatus.BAD_REQUEST)
        except UserError as e:
            return http.HttpResponse(str(e), status=HTTPStatus.BAD_REQUEST)

    def get_model_from_request(self, request: http.HttpRequest) -> ApiModel:
        data = json.loads(request.body)
        model = self.model_class.model_dict_construct(data)
        return model.model_safe_validate(data)

    def get_status_code(self, is_ok: bool) -> HTTPStatus:
        return HTTPStatus.OK if is_ok else HTTPStatus.BAD_REQUEST

    def respond_with_model_as_json(self, model: ApiModel, status: HTTPStatus) -> http.HttpResponse:
        # Dump data and ignore warnings about wrong data format and etc.
        data = utils.exec_without_warnings(lambda: model.model_dump_json(by_alias=True))
        return self.respond_with_json(data, status)

    def respond_with_object_as_json(self, obj: t.Any, status: HTTPStatus) -> http.HttpResponse:
        return self.respond_with_json(json.dumps(obj), status)

    def respond_with_json(self, json_str: str, status: HTTPStatus) -> http.HttpResponse:
        return http.HttpResponse(json_str, status=status, content_type='application/json')


class ModelClassView(BaseView):
    def get(self, request: http.HttpRequest) -> http.HttpResponse:
        result_list = self.domain_service.list(self.model_class)
        return self.respond_with_object_as_json(result_list, HTTPStatus.OK)

    @log
    def post(self, request: http.HttpRequest) -> http.HttpResponse:
        model = self.get_model_from_request(request)
        if model.is_valid:
            # TODO: check id empty
            model, is_ok = self.domain_service.create(model)
        else:
            is_ok = False
        status = self.get_status_code(is_ok)
        return self.respond_with_model_as_json(model, status)


class ModelInstanceView(BaseView):
    def get(self, request: http.HttpRequest, pk: int) -> http.HttpResponse:
        model = self.domain_service.read(self.model_class, pk)
        return self.respond_with_model_as_json(model, HTTPStatus.OK)

    @log
    def put(self, request: http.HttpRequest, pk: int) -> http.HttpResponse:
        # TODO: check pk = model.id
        model = self.get_model_from_request(request)
        if model.is_valid:
            model, is_ok = self.domain_service.update(model, pk)
        else:
            is_ok = False
        status = self.get_status_code(is_ok)
        return self.respond_with_model_as_json(model, status)

    @log
    def delete(self, request: http.HttpRequest, pk: int) -> http.HttpResponse:
        is_ok = self.domain_service.delete(self.model_class, pk)
        status = self.get_status_code(is_ok)
        return http.HttpResponse(status=status)


class ModelBusinessValidationView(BaseView):
    def post(self, request: http.HttpRequest) -> http.HttpResponse:
        model = self.get_model_from_request(request)
        if model.is_valid:
            model, is_ok = self.domain_service.business_validate(model)
        else:
            is_ok = False
        status = self.get_status_code(is_ok)
        return self.respond_with_model_as_json(model, status)


class ModelToXmlView(BaseView):
    def post(self, request: http.HttpRequest) -> http.HttpResponse:
        model = self.get_model_from_request(request)
        model_dict = model.model_dump()
        self.extend_lists(model_dict)
        model_dict = {self.model_class.__name__: model_dict}
        result = xmltodict.unparse(model_dict)
        return http.HttpResponse(result, content_type='application/xml')

    # Is needed to fix issue with single item list in xmltodict lib
    @classmethod
    def extend_lists(cls, model_dict: dict[str, t.Any]) -> None:
        for value in model_dict.values():
            if isinstance(value, dict):
                cls.extend_lists(value)
            if isinstance(value, list) and len(value) == 1:
                value.append(dict())


class ModelFromXmlView(BaseView):
    def post(self, request: http.HttpRequest) -> http.HttpResponse:
        xml = json.loads(request.body)['value']
        model_dict = xmltodict.parse(xml)
        model_dict = model_dict[self.model_class.__name__]
        self.reduce_lists(model_dict)
        model = self.model_class(**model_dict)
        return self.respond_with_model_as_json(model, HTTPStatus.OK)

    # Is needed to fix issue with single item list in xmltodict lib
    @classmethod
    def reduce_lists(cls, model_dict: dict[str, t.Any]) -> None:
        for value in model_dict.values():
            if isinstance(value, dict):
                cls.reduce_lists(value)
            if isinstance(value, list) and len(value) == 2 and value[1] is None:
                value.pop(1)


class ModelCIOMSView(View):
    cioms_service: CIOMSServiceProtocol = ...

    def get(self, request: http.HttpRequest, pk: int) -> http.HttpResponse:
        return render(request, 'cioms.html', self.cioms_service.convert_icsr_to_cioms(pk))


class MedDRAReleaseView(View):
    meddra_service: MedDRAServiceProtocol = ...

    def get(self, request: http.HttpRequest) -> http.HttpResponse:
        objects = self.meddra_service.list()
        response = meddra.ReleaseResponse(
            root=[meddra.Release(id=obj.id, version=obj.version, language=obj.language) for obj in objects]
        )
        return http.HttpResponse(response.model_dump_json(), status=HTTPStatus.OK, content_type='application/json')


class MedDRASearchView(View):
    meddra_service: MedDRAServiceProtocol = ...

    def post(self, request: http.HttpRequest, pk: int) -> http.HttpResponse:
        search_request = meddra.SearchRequest.parse_raw(request.body)
        objects = self.meddra_service.search(search_request.search.level,
                                             search_request.state,
                                             search_request.search.input,
                                             pk)
        response = meddra.SearchResponse(terms=[meddra.Term(code=obj.code, name=obj.name) for obj in objects],
                                         level=search_request.search.level)
        return http.HttpResponse(response.model_dump_json(), status=HTTPStatus.OK, content_type='application/json')


class CodeSetSearchView(View):
    code_set_service: CodeSetServiceProtocol = ...

    def get(self, request: http.HttpRequest, codeset: str) -> http.HttpResponse:
        objects = self.code_set_service.search(codeset,
                                               request.GET.get('q', ''),
                                               request.GET.get('lang', 'ENG'),
                                               request.GET.get('property', None))
        response = code_set.SearchResponse([code_set.Term(code=obj.code, name=obj.name) for obj in objects])
        return http.HttpResponse(response.model_dump_json(), status=HTTPStatus.OK, content_type='application/json')


class CodeSetView(View):
    code_set_service: CodeSetServiceProtocol = ...

    def post(self, request: http.HttpRequest, codeset: str) -> http.HttpResponse:
        file = request.FILES.get('file')
        if not file:
            return http.HttpResponse(status=HTTPStatus.BAD_REQUEST, content="File not uploaded")

        self.code_set_service.create(codeset, file, request.POST.get('lang', 'ENG'))
        return http.HttpResponse(status=HTTPStatus.CREATED)
