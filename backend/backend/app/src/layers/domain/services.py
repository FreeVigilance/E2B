import typing as t

from django.db.models import Q

from app.src import enums
from app.src.layers.base.services import ServiceProtocol, BusinessServiceProtocol, CIOMSServiceProtocol, \
    MedDRAServiceProtocol, CodeSetServiceProtocol
from app.src.layers.domain.models import DomainModel, ICSR
from app.src.layers.domain.models import CIOMS
from app.src.layers.storage.models import soc_term, hlt_pref_term, hlgt_pref_term, pref_term, low_level_term, \
    meddra_release, CountryCode, LanguageCode, UCUMCode, RouteOfAdministrationCode, DosageFormCode


class DomainService(BusinessServiceProtocol[DomainModel]):
    def __init__(self, storage_service: ServiceProtocol[DomainModel]) -> None:
        self.storage_service = storage_service

    def list(self, model_class: type[DomainModel]) -> list[dict[str, t.Any]]:
        return self.storage_service.list(model_class)

    def read(self, model_class: type[DomainModel], pk: int) -> DomainModel:
        return self.storage_service.read(model_class, pk)

    def create(self, model: DomainModel) -> tuple[DomainModel, bool]:
        if not model.is_valid:
            return model, False
        return self.storage_service.create(model)

    def update(self, model: DomainModel, pk: int) -> tuple[DomainModel, bool]:
        if not model.is_valid:
            return model, False
        return self.storage_service.update(model, pk)

    def delete(self, model_class: type[DomainModel], pk: int) -> bool:
        return self.storage_service.delete(model_class, pk)

    def business_validate(
            self,
            model: DomainModel,
            initial_data: dict[str, t.Any] | None = None
    ) -> tuple[DomainModel, bool]:

        model = model.model_business_validate(initial_data)
        return model, model.is_valid


class CIOMSService(CIOMSServiceProtocol):
    def __init__(self, storage_service: ServiceProtocol[DomainModel]) -> None:
        self.storage_service = storage_service

    def convert_icsr_to_cioms(self, pk: int) -> dict:
        icsr = self.storage_service.read(ICSR, pk)
        return CIOMS.from_icsr(icsr).__dict__


class MedDRAService(MedDRAServiceProtocol[low_level_term]):
    LEVELS = list(enums.MedDRALevelEnum)
    MODELS = [soc_term, hlgt_pref_term, hlt_pref_term, pref_term, low_level_term]

    def __init__(self, storage_service=None) -> None:
        self.storage_service = storage_service

    def list(self) -> list:
        return meddra_release.objects.all()

    def search(self, search_level: str, search_state, search_input: str, meddra_release_id: int) -> list:
        states = [search_state.SOC, search_state.HLGT, search_state.HLT, search_state.PT, search_state.LLT]

        level_index = self.LEVELS.index(search_level)
        level_model = self.MODELS[level_index]

        queryset = level_model.objects.filter(meddra_release=meddra_release_id)

        filter_key = ""
        for i in range(level_index, -1, -1):
            if states[i]:
                queryset = queryset.filter(**{filter_key + "code": states[i]})
            if i > 0:
                parent_model = self.MODELS[i - 1]
                parent_field_name = parent_model._meta.object_name + ("" if parent_model is pref_term else "s")
                filter_key += parent_field_name + "__"

        if search_input:
            queryset = queryset.filter(Q(name__icontains=search_input) | Q(code__iexact=search_input))
        return queryset

    def read(self, code: str, meddra_release_id: int) -> low_level_term:
        return low_level_term.objects.get(meddra_release=meddra_release_id, code=code)


class CodeSetService(CodeSetServiceProtocol):
    def __init__(self, storage_service=None) -> None:
        self.storage_service = storage_service

    @staticmethod
    def _get_model(codeset: str):
        match codeset:
            case 'country':
                return CountryCode
            case 'language':
                return LanguageCode
            case 'ucum':
                return UCUMCode
            case 'roa':
                return RouteOfAdministrationCode
            case 'df':
                return DosageFormCode
            case _:
                raise ValueError(f"Unknown codeset: {codeset}")

    def search(self, codeset: str, query: str, language: str, property: str | None = None) -> list:
        model = self._get_model(codeset)

        if model is CountryCode or model is LanguageCode:
            queryset = model.objects.filter(language=language)
            queryset_exact = model.objects.none()
            queryset_start_with = model.objects.none()

            if query:
                queryset_exact = queryset.filter(Q(code__iexact=query))
                queryset_start_with = queryset.filter(Q(name__unaccent__istartswith=query) & ~Q(code__iexact=query))
                queryset = queryset.filter(Q(name__unaccent__icontains=query) &
                                           ~Q(name__unaccent__istartswith=query) & ~Q(code__iexact=query))

            return [obj for obj in queryset_exact] + [obj for obj in queryset_start_with] + [obj for obj in queryset]

        if model is UCUMCode:
            queryset = model.objects.filter(language=language)
            if property:
                queryset = queryset.filter(property=property)
            if query:
                queryset = queryset.filter(Q(code__icontains=query) | Q(name__icontains=query))

            return queryset

        if model is RouteOfAdministrationCode or model is DosageFormCode:
            queryset = model.objects.filter(language=language)
            if query:
                queryset = queryset.filter(Q(code__iexact=query) | Q(name__istartswith=query))

            return queryset

    def read(self, codeset: str, code: str, language: str):
        return self._get_model(codeset).objects.get(code=code, language=language)