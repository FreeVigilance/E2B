from django import http
from django.urls import path

from app.src.connectors.api_domain.service_adapters import DomainServiceAdapter
from app.src.connectors.domain_storage.service_adapters import StorageServiceAdapter
from app.src.layers.api import models as api_models
from app.src.layers.api import views
from app.src.layers.domain.services import DomainService, CIOMSService, MedDRAService, CodeSetService
from app.src.layers.storage.services import StorageService


# Dependency injection
storage_service = StorageService()
storage_service_adapter = StorageServiceAdapter(storage_service)
domain_service = DomainService(storage_service_adapter)
domain_service_adapter = DomainServiceAdapter(domain_service)
cioms_service = CIOMSService(storage_service_adapter)
meddra_service = MedDRAService(storage_service_adapter)
code_set_service = CodeSetService(storage_service_adapter)

view_shared_args = dict(
    domain_service=domain_service_adapter,
    model_class=api_models.ICSR,
)

urlpatterns = [
    path('test', lambda *args, **kwargs: http.HttpResponse('This is a test')),

    path('icsr', views.ModelClassView.as_view(**view_shared_args)),
    path('icsr/<int:pk>', views.ModelInstanceView.as_view(**view_shared_args)),
    path('icsr/validate', views.ModelBusinessValidationView.as_view(**view_shared_args)),

    path('icsr/to-xml', views.ModelToXmlView.as_view(**view_shared_args)),
    path('icsr/from-xml', views.ModelFromXmlView.as_view(**view_shared_args)),

    path('cioms/<int:pk>', views.ModelCIOMSView.as_view(cioms_service=cioms_service)),

    path('meddra/release/<int:pk>/search', views.MedDRASearchView.as_view(meddra_service=meddra_service)),
    path('meddra/release', views.MedDRAReleaseView.as_view(meddra_service=meddra_service)),

    path('codeset/<str:codeset>/search', views.CodeSetSearchView.as_view(code_set_service=code_set_service)),
]
