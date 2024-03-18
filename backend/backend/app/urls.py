from django import http
from django.urls import path

from app.src.layers.api import views
from app.src.layers.domain.services import DomainService
from app.src.layers.storage import models as storage_models
from app.src.layers.storage.services import StorageService
from app.src.model_converters.api_to_domain import ApiToDomainModelConverter
from app.src.model_converters.domain_to_storage import DomainToStorageModelConverter
from app.src.service_adapters import ServiceAdapter


# Dependency injection
storage_service = StorageService()
domain_to_storage_model_converter = DomainToStorageModelConverter()
storage_service_adapter = ServiceAdapter(storage_service, domain_to_storage_model_converter)
domain_service = DomainService(storage_service_adapter)
api_to_domain_model_converter = ApiToDomainModelConverter()
domain_service_adapter = ServiceAdapter(domain_service, api_to_domain_model_converter)

view_shared_args = dict(
    domain_service=domain_service_adapter,
    model_class=storage_models.ICSR,
)

urlpatterns = [
    path('test', lambda *args, **kwargs: http.HttpResponse('This is a test')),
    path('icsr', views.ModelClassView.as_view(**view_shared_args)),
    path('icsr/<int:pk>', views.ModelInstanceView.as_view(**view_shared_args)),
]
