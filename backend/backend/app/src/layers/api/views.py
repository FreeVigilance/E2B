import json
import typing as t

from django import http
from django.views import View

from app.src.layers.api.models import ApiModel
from app.src.layers.domain.services import CIOMSService
from app.src.shared.protocols import SupportsServiceMethods


class BaseView(View):
    domain_service: SupportsServiceMethods[ApiModel] = ...
    model_class: type[ApiModel] = ...

    def respond_with_model_json(self, model: ApiModel) -> http.HttpResponse:
        return self.respond_with_json(model.model_dump_json())

    def respond_with_object_json(self, obj: t.Any) -> http.HttpResponse:
        return self.respond_with_json(json.dumps(obj))

    def respond_with_json(self, json_str: str) -> http.HttpResponse:
        return http.HttpResponse(json_str, content_type='application/json')


class ModelClassView(BaseView):
    def get(self, request: http.HttpRequest) -> http.HttpResponse:
        result_list = self.domain_service.list(self.model_class)
        return self.respond_with_object_json(result_list)

    def post(self, request: http.HttpRequest) -> http.HttpResponse:
        model = self.model_class.model_validate_json(request.body)
        # TODO: check id empty
        model = self.domain_service.create(model)
        return self.respond_with_model_json(model)


class ModelInstanceView(BaseView):
    def get(self, request: http.HttpRequest, pk: int) -> http.HttpResponse:
        model = self.domain_service.read(self.model_class, pk)
        return self.respond_with_model_json(model)

    def put(self, request: http.HttpRequest, pk: int) -> http.HttpResponse:
        # TODO: check pk = model.id
        model = self.model_class.model_validate_json(request.body)
        model = self.domain_service.update(model, pk)
        return self.respond_with_model_json(model)

    def delete(self, request: http.HttpRequest, pk: int) -> http.HttpResponse:
        self.domain_service.delete(self.model_class, pk)
        return self.respond_with_object_json(True)


class CIOMSView(View):
	cioms_service: CIOMSService

	def get(self, request: http.HttpRequest, pk: int) -> http.HttpResponse:
		model = self.cioms_service.read(pk)
		# run pdf generator
		return http.HttpResponse(model.model_dump_json(), content_type='application/json')

