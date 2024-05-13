import json
import typing as t
from http import HTTPStatus

from django import http

from django.shortcuts import render
from django.views import View

from app.src.layers.api.models import ApiModel, meddra, code_set
from app.src.layers.base.services import BusinessServiceProtocol, CIOMSServiceProtocol, MedDRAServiceProtocol, \
    CodeSetServiceProtocol
from extensions import utils


class BaseView(View):
    domain_service: BusinessServiceProtocol[ApiModel] = ...
    model_class: type[ApiModel] = ...

    def get_model_from_request(self, request: http.HttpRequest) -> ApiModel:
        data = json.loads(request.body)
        model = self.model_class.model_dict_construct(data)
        return model.model_safe_validate(data)

    def get_status_code(self, is_ok: bool) -> HTTPStatus:
        return HTTPStatus.OK if is_ok else HTTPStatus.BAD_REQUEST

    def respond_with_model_as_json(self, model: ApiModel, status: int) -> http.HttpResponse:
        # Dump data and ignore warnings about wrong data format and etc.
        data = utils.exec_without_warnings(lambda: model.model_dump_json(by_alias=True))
        return self.respond_with_json(data, status)

    def respond_with_object_as_json(self, obj: t.Any, status: int) -> http.HttpResponse:
        return self.respond_with_json(json.dumps(obj), status)

    def respond_with_json(self, json_str: str, status: int) -> http.HttpResponse:
        return http.HttpResponse(json_str, status=status, content_type='application/json')


class ModelClassView(BaseView):
    def get(self, request: http.HttpRequest) -> http.HttpResponse:
        result_list = self.domain_service.list(self.model_class)
        return self.respond_with_object_as_json(result_list, HTTPStatus.OK)

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

    def put(self, request: http.HttpRequest, pk: int) -> http.HttpResponse:
        # TODO: check pk = model.id
        model = self.get_model_from_request(request)
        if model.is_valid:
            model, is_ok = self.domain_service.update(model, pk)
        else:
            is_ok = False
        status = self.get_status_code(is_ok)
        return self.respond_with_model_as_json(model, status)

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


class ModelCIOMSView(View):
    cioms_service: CIOMSServiceProtocol = ...

    def get(self, request: http.HttpRequest, pk: int) -> http.HttpResponse:
        return render(request, 'cioms.html', self.cioms_service.convert_icsr_to_cioms(pk).__dict__)


class MedDRAReleaseView(View):
    meddra_service: MedDRAServiceProtocol = ...

    def get(self, request: http.HttpRequest) -> http.HttpResponse:
        response = self.meddra_service.list()
        return http.HttpResponse(response.model_dump_json(), status=HTTPStatus.OK, content_type='application/json')


class MedDRASearchView(View):
    meddra_service: MedDRAServiceProtocol = ...

    def post(self, request: http.HttpRequest, pk: int) -> http.HttpResponse:
        search_request = meddra.SearchRequest.parse_raw(request.body)
        response = self.meddra_service.search(search_request, pk)
        return http.HttpResponse(response.model_dump_json(), status=HTTPStatus.OK, content_type='application/json')


class CodeSetSearchView(View):
    code_set_service: CodeSetServiceProtocol = ...

    def get(self, request: http.HttpRequest, codeset: str) -> http.HttpResponse:
        response = self.code_set_service.search(codeset, request.GET.get('q', ''),
                                                request.GET.get('lang', 'ENG'),
                                                request.GET.get('property', None))
        return http.HttpResponse(response.model_dump_json(), status=HTTPStatus.OK, content_type='application/json')
