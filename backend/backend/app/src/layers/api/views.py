import json
import typing as t

from django import http
from django.views import View

import xmltodict

from app.src.layers.api.models import ApiModel
from app.src.layers.domain.services import CIOMSService
from app.src.shared.protocols import SupportsServiceMethods
from app.src.pdf.cioms import fill_cioms2 as cioms


class BaseView(View):
    domain_service: SupportsServiceMethods[ApiModel] = ...
    model_class: type[ApiModel] = ...

    def get_model_from_request(self, request: http.HttpRequest) -> ApiModel:
        return self.model_class.model_validate_json(request.body)

    def respond_with_model_as_json(self, model: ApiModel) -> http.HttpResponse:
        return self.respond_with_json(model.model_dump_json())

    def respond_with_object_as_json(self, obj: t.Any) -> http.HttpResponse:
        return self.respond_with_json(json.dumps(obj))

    def respond_with_json(self, json_str: str) -> http.HttpResponse:
        return http.HttpResponse(json_str, content_type='application/json')


class ModelClassView(BaseView):
    def get(self, request: http.HttpRequest) -> http.HttpResponse:
        result_list = self.domain_service.list(self.model_class)
        return self.respond_with_object_as_json(result_list)

    def post(self, request: http.HttpRequest) -> http.HttpResponse:
        model = self.get_model_from_request(request)
        # TODO: check id empty
        model = self.domain_service.create(model)
        return self.respond_with_model_as_json(model)


class ModelInstanceView(BaseView):
    def get(self, request: http.HttpRequest, pk: int) -> http.HttpResponse:
        model = self.domain_service.read(self.model_class, pk)
        return self.respond_with_model_as_json(model)

    def put(self, request: http.HttpRequest, pk: int) -> http.HttpResponse:
        # TODO: check pk = model.id
        model = self.get_model_from_request(request)
        model = self.domain_service.update(model, pk)
        return self.respond_with_model_as_json(model)

    def delete(self, request: http.HttpRequest, pk: int) -> http.HttpResponse:
        self.domain_service.delete(self.model_class, pk)
        return self.respond_with_object_json(True)


class CIOMSView(View):
	cioms_service: CIOMSService = ...

	def get(self, request: http.HttpRequest, pk: int) -> http.FileResponse:
		model = self.cioms_service.read(pk)
		
		out_file = cioms.create_cioms_pdf(model)

		return http.FileResponse(open(out_file, "rb"))


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
        xml = request.body
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
