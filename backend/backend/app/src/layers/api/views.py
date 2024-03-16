import json
import typing as t

from django.views import View
from django.http import HttpResponse, HttpRequest

from app.src.layers.api.models import ApiModel, ICSR
from app.src.shared.protocols import SupportsServiceMethods


class BaseView(View):
    domain_service: SupportsServiceMethods[ApiModel] = ...
    model_class: type[ApiModel] = ...

    def respond_with_model_json(self, model: ApiModel) -> HttpResponse:
        return self.respond_with_json(model.model_dump_json())

    def respond_with_object_json(self, obj: t.Any) -> HttpResponse:
        return self.respond_with_json(json.dumps(obj))

    def respond_with_json(self, json_str: str) -> HttpResponse:
        return HttpResponse(json_str, content_type='application/json')


class ModelClassView(BaseView):
    def get(self, request: HttpRequest) -> HttpResponse:
        result_list = self.domain_service.list(ICSR)
        return self.respond_with_object_json(result_list)

    def post(self, request: HttpRequest) -> HttpResponse:
        model = ICSR.model_validate_json(request.body)
        # TODO: check id empty
        model = self.domain_service.create(model)
        return self.respond_with_model_json(model)


class ModelInstanceView(BaseView):
    def get(self, request: HttpRequest, pk: int) -> HttpResponse:
        model = self.domain_service.read(ICSR, pk)
        return self.respond_with_model_json(model)

    def put(self, request: HttpRequest, pk: int) -> HttpResponse:
        model = ICSR.model_validate_json(request.body)
        model = self.domain_service.update(model, pk)
        return self.respond_with_model_json(model)

    def delete(self, request: HttpRequest, pk: int) -> HttpResponse:
        self.domain_service.delete(ICSR, pk)
        return self.respond_with_object_json(True)
