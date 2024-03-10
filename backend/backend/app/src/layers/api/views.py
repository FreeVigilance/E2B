from django.views import View
from django.http import HttpResponse

from app.src.layers.api.models import ApiModel, ICSR
from app.src.shared.protocols import SupportsServiceMethods

class ICSRView(View):
    domain_service: SupportsServiceMethods[ApiModel] = None

    def get(self, request, pk: int):
        model = self.domain_service.read(ICSR, pk)
        return HttpResponse(model.model_dump_json(), content_type='application/json')

    def post(self, request):
        json = request.body
        model = ICSR.model_validate_json(json)
        # TODO: check id empty
        pk = self.domain_service.create(model)
        return HttpResponse(pk)

    def put(self, request, pk: int):
        json = request.body
        model = ICSR.model_validate_json(json)
        model.id = pk
        self.domain_service.update(model)
        return HttpResponse(True)

    def delete(self, request, pk: int):
        self.domain_service.delete(ICSR, pk)
        return HttpResponse(True)
