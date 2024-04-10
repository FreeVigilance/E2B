import enum
import json
import typing as t

from django import http
from django.views import View

import xmltodict

from app.src.layers.api.models import ApiModel
from app.src.shared.services import SupportsServiceMethods
from extensions import utils


class StatusCode(enum.IntEnum):
    OK = 200
    BAD_REQUEST = 400


class BaseView(View):
    domain_service: SupportsServiceMethods[ApiModel] = ...
    model_class: type[ApiModel] = ...

    def get_model_from_request(self, request: http.HttpRequest) -> ApiModel:
        data = json.loads(request.body)
        model = self.model_class.model_parse(data)
        return model.model_safe_validate(data)
    
    def respond_with_model_as_json_after_write(self, model: ApiModel) -> http.HttpResponse:
        code = StatusCode.OK if model.is_valid else StatusCode.BAD_REQUEST
        return self.respond_with_model_as_json(model, code)

    def respond_with_model_as_json(self, model: ApiModel, status_code: int) -> http.HttpResponse:
        # Dump data and ignore warnings about wrong data format and etc.
        data = utils.exec_without_warnings(lambda: model.model_dump_json(by_alias=True))
        return self.respond_with_json(data, status_code)

    def respond_with_object_as_json(self, obj: t.Any, status_code: int) -> http.HttpResponse:
        return self.respond_with_json(json.dumps(obj), status_code)

    def respond_with_json(self, json_str: str, status_code: int) -> http.HttpResponse:
        return http.HttpResponse(json_str, status=status_code, content_type='application/json')


class ModelClassView(BaseView):
    def get(self, request: http.HttpRequest) -> http.HttpResponse:
        result_list = self.domain_service.list(self.model_class)
        return self.respond_with_object_as_json(result_list, StatusCode.OK)

    def post(self, request: http.HttpRequest) -> http.HttpResponse:
        model = self.get_model_from_request(request)
        if model.is_valid:
            # TODO: check id empty
            model = self.domain_service.create(model)
        return self.respond_with_model_as_json_after_write(model)


class ModelInstanceView(BaseView):
    def get(self, request: http.HttpRequest, pk: int) -> http.HttpResponse:
        model = self.domain_service.read(self.model_class, pk)
        return self.respond_with_model_as_json(model, StatusCode.OK)

    def put(self, request: http.HttpRequest, pk: int) -> http.HttpResponse:
        # TODO: check pk = model.id
        model = self.get_model_from_request(request)
        if model.is_valid:
            model = self.domain_service.update(model, pk)
        return self.respond_with_model_as_json_after_write(model)

    def delete(self, request: http.HttpRequest, pk: int) -> http.HttpResponse:
        self.domain_service.delete(self.model_class, pk)
        return http.HttpResponse(status=StatusCode.OK)


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
        return self.respond_with_model_as_json(model)

    # Is needed to fix issue with single item list in xmltodict lib
    @classmethod
    def reduce_lists(cls, model_dict: dict[str, t.Any]) -> None:
        for value in model_dict.values():
            if isinstance(value, dict):
                cls.reduce_lists(value)
            if isinstance(value, list) and len(value) == 2 and value[1] is None:
                value.pop(1)
