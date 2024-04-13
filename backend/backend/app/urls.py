from django import http
from django.urls import path

from app.src.layers.api import models as api_models
from app.src.layers.api import views
from app.src.layers.domain.services import DomainService
from app.src.layers.storage.services import StorageService
from app.src.model_converters import api_to_domain as admc
from app.src.model_converters import domain_to_storage as dsmc
from app.src.service_adapters import ServiceAdapter


# Dependency injection
storage_service = StorageService()
storage_service_adapter = ServiceAdapter(
    storage_service, 
    lower_to_upper_model_converter=dsmc.StorageToDomainModelConverter(),
    upper_to_lower_model_converter=dsmc.DomainToStorageModelConverter()
)
domain_service = DomainService(storage_service_adapter)
domain_service_adapter = ServiceAdapter(
    domain_service,
    lower_to_upper_model_converter=admc.DomainToApiModelConverter(),
    upper_to_lower_model_converter=admc.ApiToDomainModelConverter()
)

view_shared_args = dict(
    domain_service=domain_service_adapter,
    model_class=api_models.ICSR,
)

urlpatterns = [
    path('test', lambda *args, **kwargs: http.HttpResponse('This is a test')),

    path('icsr', views.ModelClassView.as_view(**view_shared_args)),
    path('icsr/<int:pk>', views.ModelInstanceView.as_view(**view_shared_args)),
]
