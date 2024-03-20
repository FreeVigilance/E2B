
import string

from typing import Any, List, Tuple
from pydantic import BaseModel

from app.src.shared import enums
from . import models

class CIOMS(BaseModel):
	_1: str # Initials
	_1a: str # Country
	_2: Tuple[str, str, str] # Date of birth
	_2a: str # Age
	_3: str # Sex
	_4: str # Reaction onset day
	_5: str # Reaction onset month
	_6: str # Reaction onset year
	_7_and_13: str # Describe reactions (+ case narrative)
	_8: bool # Patient died
	_9: bool # Involved or prolonged patient hospitalization
	_10: bool
	_11: bool # life threatening
	# no 12 yet
	_14: str # suspect drugs
	_15: str # daily doses
	_16: str # routes of administration
	_17: str # indicaitons of use
	_18: str # therapy dates
	_19: str # therapy duration
	_20: str
	_21: str
	_22: str
	_23: str
	_24a: str
	_24b: str
	_24c: str
	_24d: List[str]
	is_follow_up: bool # 25a
	date_of_this_report: str

def unk_if_none(x) -> str:
	if x is None or x == "":
		return "[UNK]"

	return x

def get_date(x: str | None) -> Tuple[str, str, str]:
	if x is None:
		x = ""

	if not str(x).isnumeric():
		return (x, x, x)

	year, month, day = None, None, None
	if len(x) >= 4:
		year = x[:4]

	if len(x) >= 6:
		month = x[4:6]

	if len(x) == 8:
		day = x[6:8]

	return (unk_if_none(year), unk_if_none(month), unk_if_none(day))


def convert_sex(x: enums.D_5_sex | Any) -> str:
	if x == enums.D_5_sex.MALE:
		return "Male"
	if x == enums.D_5_sex.FEMALE:
		return "Female"
	return str(x)


def convert_dosage(dosage: models.G_k_4_r_dosage_information) -> str:
	dosage_text = unk_if_none(getattr(dosage, "g_k_4_r_8_dosage_text", None))
	simple = (getattr(dosage, "g_k_4_r_1a_dose_num", "") + getattr(dosage, "g_k_4_r_1b_dose_unit", "")).strip()
	simple = f"({simple})" if simple != "" else ""
	return f"{dosage_text}{simple}"

def convert_dosages(dosages: List[models.G_k_4_r_dosage_information]) -> str:
	return "; ".join(map( convert_dosage, dosages ))


def convert_route_of_adm(dosage: models.G_k_4_r_dosage_information) -> str:
	return unk_if_none(getattr(dosage, "g_k_4_r_10_1_route_administration", None))

def convert_routes_of_adm(dosages: List[models.G_k_4_r_dosage_information]) -> str:
	return "; ".join(map( convert_route_of_adm, dosages ))

def convert_therapy_dates(dosage: models.G_k_4_r_dosage_information) -> str:
	return unk_if_none(getattr(dosage, "g_k_4_r_4_date_time_drug", None)) + \
			"->" + \
			unk_if_none(getattr(dosage, "g_k_4_r_5_date_time_last_administration", None))

def convert_therapies_dates(dosages: List[models.G_k_4_r_dosage_information]) -> str:
	return "; ".join(map( convert_therapy_dates, dosages ))

def convert_therapy_duration(dosage: models.G_k_4_r_dosage_information) -> str:
	return unk_if_none(getattr(dosage, "g_k_4_r_6a_duration_drug_administration_num", None)) + \
			unk_if_none(getattr(dosage, "g_k_4_r_6b_duration_drug_administration_unit", None))

def convert_therapies_duration(dosages: List[models.G_k_4_r_dosage_information]) -> str:
	return "; ".join(map( convert_therapy_duration, dosages ))


def convert_to_cioms(icsr: models.ICSR) -> CIOMS:
	# I REACTION INFORMATION

	_1 = unk_if_none(getattr(icsr.d_patient_characteristics, "d_1_patient", None))

	_1a = unk_if_none(','.join([unk_if_none(x.e_i_9_identification_country_reaction) for x in icsr.e_i_reaction_event]))

	date_of_birth = getattr(icsr.d_patient_characteristics, "d_2_1_date_birth", None)
	year, month, day = get_date(date_of_birth)
	_2 = (day, month, year)

	_2a_num = unk_if_none(getattr(icsr.d_patient_characteristics, "d_2_2a_age_onset_reaction_num", None))
	_2a_unit = unk_if_none(getattr(icsr.d_patient_characteristics, "d_2_2b_age_onset_reaction_unit", None))

	_2a = (_2a_unit + " " + _2a_unit).strip()

	_3 = convert_sex(unk_if_none(getattr(icsr.d_patient_characteristics, "d_5_sex", None)))

	main_reaction = icsr.e_i_reaction_event[0] if len(icsr.e_i_reaction_event) > 0 else None # assume that the main reaction is the first one

	reaction_onset = get_date(getattr(main_reaction, "e_i_4_date_start_reaction", None))
	_4 = reaction_onset[2]
	_5 = reaction_onset[1]
	_6 = reaction_onset[0]

	_8 = any( [event.e_i_3_2a_results_death for event in icsr.e_i_reaction_event ] )
	_9 = any( [event.e_i_3_2c_caused_prolonged_hospitalisation for event in icsr.e_i_reaction_event ] )
	_10 = any( [event.e_i_3_2d_disabling_incapacitating for event in icsr.e_i_reaction_event ] )
	_11 = any( [event.e_i_3_2b_life_threatening for event in icsr.e_i_reaction_event ] )

	#_7_and_13 = 

	# II SUSPECT DRUGS

	suspect_drugs = [ drug for drug in icsr.g_k_drug_information if drug.g_k_1_characterisation_drug_role == enums.G_k_1_characterisation_drug_role.SUSPECT ]

	_14 = ""
	_15 = ""
	_16 = ""
	_17 = ""
	_18 = ""
	_19 = ""
	if len(suspect_drugs) == 1:
		drug = suspect_drugs[0]
		_14 = unk_if_none(drug.g_k_2_2_medicinal_product_name_primary_source)
		_15 = convert_dosages(drug.g_k_4_r_dosage_information)
		_16 = convert_routes_of_adm(drug.g_k_4_r_dosage_information)
		_17 = unk_if_none(drug.g_k_7_r_indication_use_case)
		_18 = convert_therapies_dates(drug.g_k_4_r_dosage_information)
		_19 = convert_therapies_duration(drug.g_k_4_r_dosage_information)

	if len(suspect_drugs) > 1:
		for i, drug in enumerate(suspect_drugs):
			_14 += f"#{i+1}: " + unk_if_none(drug.g_k_2_2_medicinal_product_name_primary_source) + "\n" # TODO substances + strength
			_15 += f"#{i+1}: " + convert_dosages(drug.g_k_4_r_dosage_information) + " "
			_16 += f"#{i+1}: " + convert_routes_of_adm(drug.g_k_4_r_dosage_information) + " "
			_17 += f"#{i+1}: " + unk_if_none(drug.g_k_7_r_indication_use_case) + " "
			_18 += f"#{i+1}: " + convert_therapies_dates(drug.g_k_4_r_dosage_information) + " "
			_19 += f"#{i+1}: " + convert_therapies_duration(drug.g_k_4_r_dosage_information) + " "

	_14 = unk_if_none(_14).strip()
	_15 = unk_if_none(_15).strip()
	_16 = unk_if_none(_16).strip()
	_17 = unk_if_none(_17).strip()
	_18 = unk_if_none(_18).strip()
	_19 = unk_if_none(_19).strip()

	_20 = "NA" # ??

	# :D
	_21_yes_yes = any([ any([ mx.g_k_9_i_4_reaction_recur_readministration == enums.G_k_9_i_4_reaction_recur_readministration.YES_YES  for mx in drug.g_k_9_i_drug_reaction_matrix ]) for drug in suspect_drugs ])
	_21_yes_no = any([ any([ mx.g_k_9_i_4_reaction_recur_readministration == enums.G_k_9_i_4_reaction_recur_readministration.YES_NO  for mx in drug.g_k_9_i_drug_reaction_matrix ]) for drug in suspect_drugs ])
	_21_yes_unk = any([ any([ mx.g_k_9_i_4_reaction_recur_readministration == enums.G_k_9_i_4_reaction_recur_readministration.YES_UNK  for mx in drug.g_k_9_i_drug_reaction_matrix ]) for drug in suspect_drugs ])
	_21_no_na = any([ any([ mx.g_k_9_i_4_reaction_recur_readministration == enums.G_k_9_i_4_reaction_recur_readministration.NO_NA  for mx in drug.g_k_9_i_drug_reaction_matrix ]) for drug in suspect_drugs ])

	if sum([_21_yes_yes, _21_yes_no, _21_yes_unk, _21_no_na]) > 1:
		_21 = "NA"
	else:
		if _21_yes_yes:
			_21 = "YES"
		elif _21_yes_no:
			_21 = "NO"
		else:
			_21 = "NA"

	# COMCOMINANT DRUGS AND HISTORY

	other_drugs = [ drug for drug in icsr.g_k_drug_information if drug.g_k_1_characterisation_drug_role != enums.G_k_1_characterisation_drug_role.SUSPECT ]

	_22 = ""

	for i, drug in enumerate(other_drugs):
		drug_name = unk_if_none(drug.g_k_2_2_medicinal_product_name_primary_source)

		dates = convert_therapies_dates(drug.g_k_4_r_dosage_information)
		dosages = convert_dosages(drug.g_k_4_r_dosage_information)
		routes = convert_routes_of_adm(drug.g_k_4_r_dosage_information)

		_22 += f"#{i+1}: {drug_name} - (from/to {dates}) - [{dosages} {routes}]\n"

	_22 = _22.strip()

	_23 = unk_if_none(getattr(icsr.d_patient_characteristics, "d_7_2_text_medical_history", None))

	# MANUFACTURER INFORMATION

	_24a = ";\n".join([ unk_if_none(getattr(src_case_id, "c_1_9_1_r_1_source_case_id", None)) \
			for src_case_id in getattr(icsr.c_1_identification_case_safety_report, "c_1_9_1_r_source_case_id", []) ])
	_24b = unk_if_none(getattr(icsr.c_1_identification_case_safety_report, "c_1_9_1_other_case_ids_previous_transmissions", None))
	_24c = unk_if_none(getattr(icsr.c_1_identification_case_safety_report, "c_1_5_date_most_recent_information", None))

	# TODO
	_24d = []
	is_follow_up = False
	_7_and_13 = "test"

	return CIOMS(
		_1=_1,
		_1a=_1a,
		_2=_2,
		_2a=_2a,
		_3=_3,
		_4=_4,
		_5=_5,
		_6=_6,
		_8=_8,
		_9=_9,
		_10=_10,
		_11=_11,
		_7_and_13=_7_and_13,
		_14=_14,
		_15=_15,
		_16=_16,
		_17=_17,
		_18=_18,
		_19=_19,
		_20=_20,
		_21=_21,
		_22=_22,
		_23=_23,
		_24a=_24a,
		_24b=_24b,
		_24c=_24c,
		_24d=_24d,
		is_follow_up=is_follow_up,
		date_of_this_report="20 May 2024"
	)








