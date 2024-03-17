import typing as t

from app.src.layers.api import models as api_models
from app.src.layers.api.models import ApiModel, Value
from app.src.layers.domain import models as domain_models
from app.src.layers.domain.models import DomainModel
from app.src.model_converters.base import ModelConverter
from app.src.shared.enums import NullFlavor


API_TO_DOMAIN_MODEL_CLASS_MAP = {
    api_models.ICSR: domain_models.ICSR,
    api_models.C_1_identification_case_safety_report: domain_models.C_1_identification_case_safety_report,
    api_models.C_1_6_1_r_documents_held_sender: domain_models.C_1_6_1_r_documents_held_sender,
    api_models.C_1_9_1_r_source_case_id: domain_models.C_1_9_1_r_source_case_id,
    api_models.C_1_10_r_identification_number_report_linked: domain_models.C_1_10_r_identification_number_report_linked,
    api_models.C_2_r_primary_source_information: domain_models.C_2_r_primary_source_information,
    api_models.C_3_information_sender_case_safety_report: domain_models.C_3_information_sender_case_safety_report,
    api_models.C_4_r_literature_reference: domain_models.C_4_r_literature_reference,
    api_models.C_5_study_identification: domain_models.C_5_study_identification,
    api_models.C_5_1_r_study_registration: domain_models.C_5_1_r_study_registration,
    api_models.D_patient_characteristics: domain_models.D_patient_characteristics,
    api_models.D_7_1_r_structured_information_medical_history: domain_models.D_7_1_r_structured_information_medical_history,
    api_models.D_8_r_past_drug_history: domain_models.D_8_r_past_drug_history,
    api_models.D_9_2_r_cause_death: domain_models.D_9_2_r_cause_death,
    api_models.D_9_4_r_autopsy_determined_cause_death: domain_models.D_9_4_r_autopsy_determined_cause_death,
    api_models.D_10_7_1_r_structured_information_parent_meddra_code: domain_models.D_10_7_1_r_structured_information_parent_meddra_code,
    api_models.D_10_8_r_past_drug_history_parent: domain_models.D_10_8_r_past_drug_history_parent,
}


class ApiToDomainModelConverter(ModelConverter[ApiModel, DomainModel]):
    def _convert_to_lower_model_dict(self, higher_model: ApiModel, **kwargs) -> dict[str, t.Any]:
        target_model_dict = dict()

        iterator = self._get_pydantic_model_attr_conversion_iterator(
            higher_model,
            target_model_dict,
            ApiModel,
            self._convert_to_lower_model_dict,
        )

        for key, value, is_default_conditions_met in iterator:
            if is_default_conditions_met:
                continue

            if isinstance(value, Value):
                null_flavor = getattr(value, 'null_flavor', None)
                pure_value = getattr(value, 'value', None)
                target_model_dict[key] = null_flavor if null_flavor else pure_value

        return target_model_dict

    def _convert_to_higher_model_dict(self, lower_model: DomainModel, **kwargs) -> dict[str, t.Any]:
        target_model_dict = dict()

        iterator = self._get_pydantic_model_attr_conversion_iterator(
            lower_model,
            target_model_dict,
            DomainModel,
            self._convert_to_higher_model_dict,
        )

        for key, value, is_default_conditions_met in iterator:
            if is_default_conditions_met:
                continue

            if key == 'id':
                 result_value = value

            else:
                pure_value = None
                null_flavor = None
                if isinstance(value, NullFlavor):
                    null_flavor = value
                else:
                    pure_value = value
                result_value = {
                    'value': pure_value,
                    'null_flavor': null_flavor
                }

            target_model_dict[key] = result_value

        return target_model_dict
