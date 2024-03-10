from typing import Optional, Literal

from pydantic import BaseModel

from app.src.shared import enums
from app.src.shared.enums import NullFlavor


class DomainModel(BaseModel):
    id: int | None = None


class ICSR(DomainModel):
    c_1_identification_case_safety_report: Optional['C_1_identification_case_safety_report'] = None


class C_1_identification_case_safety_report(DomainModel):
    c_1_1_sender_safety_report_unique_id: str | None = None
    c_1_2_date_creation: str | None = None
    c_1_3_type_report: enums.C_1_3_type_of_report | None = None
    c_1_4_date_report_first_received_source: str | None = None
    c_1_5_date_most_recent_information: str | None = None
    c_1_6_1_additional_documents_available: bool | None = None
    c_1_6_1_r_documents_held_sender: list['C_1_6_1_r_documents_held_sender'] | None = []
    c_1_7_fulfil_local_criteria_expedited_report: bool | Literal[NullFlavor.NI] | None = None
    c_1_8_1_worldwide_unique_case_identification_number: str | None = None
    c_1_8_2_first_sender: enums.C_1_8_2_first_sender_of_this_case | None = None
    c_1_9_1_other_case_ids_previous_transmissions: Literal[True] | Literal[NullFlavor.NI] | None = None
    c_1_9_1_r_source_case_id: list['C_1_9_1_r_source_case_id'] | None = []
    c_1_10_r_identification_number_report_linked: list['C_1_10_r_identification_number_report_linked'] | None = []
    c_1_11_1_report_nullification_amendment: enums.C_1_11_1_report_nullification_or_amendment | None = None
    c_1_11_2_reason_nullification_amendment: str | None = None


class C_1_6_1_r_documents_held_sender(DomainModel):
    c_1_6_1_r_1_documents_held_sender: str | None = None


class C_1_9_1_r_source_case_id(DomainModel):
    c_1_9_1_r_1_source_case_id: str | None = None
    c_1_9_1_r_2_case_id: str | None = None


class C_1_10_r_identification_number_report_linked(DomainModel):
    c_1_10_r_identification_number_report_linked: str | None = None
