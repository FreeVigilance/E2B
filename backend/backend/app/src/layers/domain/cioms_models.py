
import string

from typing import Any, List, Tuple
from pydantic import BaseModel

from app.src.shared import enums
from . import models

class CIOMS(BaseModel):
	p1: str # Initials
	p1a: str # Country
	p2: Tuple[str, str, str] # Date of birth
	p2a: str # Age
	p3: str # Sex
	p4: str # Reaction onset day
	p5: str # Reaction onset month
	p6: str # Reaction onset year
	p7_and_p13: str # Describe reactions (+ case narrative)
	p8: bool # Patient died
	p9: bool # Involved or prolonged patient hospitalization
	p10: bool
	p11: bool # life threatening
	# no 12 yet
	p14: str # suspect drugs
	p15: str # daily doses
	p16: str # routes of administration
	p17: str # indicaitons of use
	p18: str # therapy dates
	p19: str # therapy duration
	p20: str
	p21: str
	p22: str
	p23: str
	p24a: str
	p24b: str
	p24c: str
	p24d: List[str]
	is_follow_up: bool # 25a
	date_of_this_report: str


def _getattr(obj, key, default=None):
	x = getattr(obj, key, default)
	if x is None:
		return default

	return x

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
	dosage_text = unk_if_none(_getattr(dosage, "g_k_4_r_8_dosage_text", None))
	simple = (str(unk_if_none(_getattr(dosage, "g_k_4_r_1a_dose_num", ""))) + unk_if_none(_getattr(dosage, "g_k_4_r_1b_dose_unit", ""))).strip()
	simple = f"({simple})" if simple != "" else ""
	return f"{dosage_text}{simple}"

def convert_dosages(dosages: List[models.G_k_4_r_dosage_information]) -> str:
	return "; ".join(map( convert_dosage, dosages ))


def convert_route_of_adm(dosage: models.G_k_4_r_dosage_information) -> str:
	return unk_if_none(_getattr(dosage, "g_k_4_r_10_1_route_administration", None))

def convert_routes_of_adm(dosages: List[models.G_k_4_r_dosage_information]) -> str:
	return "; ".join(map( convert_route_of_adm, dosages ))

def convert_therapy_dates(dosage: models.G_k_4_r_dosage_information) -> str:
	return unk_if_none(_getattr(dosage, "g_k_4_r_4_date_time_drug", None)) + \
			"->" + \
			unk_if_none(_getattr(dosage, "g_k_4_r_5_date_time_last_administration", None))

def convert_therapies_dates(dosages: List[models.G_k_4_r_dosage_information]) -> str:
	return "; ".join(map( convert_therapy_dates, dosages ))

def convert_therapy_duration(dosage: models.G_k_4_r_dosage_information) -> str:
	return str(unk_if_none(_getattr(dosage, "g_k_4_r_6a_duration_drug_administration_num", None))) + \
			unk_if_none(_getattr(dosage, "g_k_4_r_6b_duration_drug_administration_unit", None))

def convert_therapies_duration(dosages: List[models.G_k_4_r_dosage_information]) -> str:
	return "; ".join(map( convert_therapy_duration, dosages ))

def convert_usecases(use_cases: List[models.G_k_7_r_indication_use_case]) -> str:
	return "; ".join([ unk_if_none(_getattr(x, "g_k_7_r_1_indication_primary_source", None)) for x in use_cases ])


def convert_reaction_to_narrative(reaction: models.E_i_reaction_event) -> str:
	reaction_text = unk_if_none(_getattr(reaction, "e_i_1_1a_reaction_primary_source_native_language", ""))
	outcome = _getattr(reaction, "e_i_7_outcome_reaction_last_observation", "")
	translation = _getattr(reaction, "e_i_1_2_reaction_primary_source_translation", "")

	return f"Reaction:\n{reaction_text}" \
			+ (f" (translation {translation})" if translation != "" else "")\
			+ (f"\noutcome of the reaction: {outcome}" if outcome != "" else "") + "\n"

def convert_reactions_to_narrative(reactions: List[models.E_i_reaction_event]) -> str:
	if len(reactions) == 0:
		return "No reacions"
	if len(reactions) == 1:
		return convert_reaction_to_narrative(reactions[0])

	res = ""
	for i, reaction in enumerate(reactions):
		res += f"#{i+1}" + convert_reaction_to_narrative(reaction)

	return res

def convert_drug_aciton_to_narrative(drug: models.G_k_drug_information) -> str:
	print(f"{drug=}")

	drug_name = _getattr(drug, "g_k_2_2_medicinal_product_name_primary_source", None)
	action = _getattr(drug, "g_k_8_action_taken_drug", None)

	if action is None:
		return ""

	return f"{unk_if_none(drug_name)} - {unk_if_none(action)}"


def convert_drug_actions_to_narrative(drugs: List[models.G_k_drug_information]) -> str:
	if len(drugs) == 0:
		return ""
	
	if len(drugs) == 1:
		return convert_drug_aciton_to_narrative(drugs[0])

	res = ""
	for i, drug in enumerate(drugs):
		narrative = convert_drug_aciton_to_narrative(drug)
		if narrative == "":
			continue

		res += f"#{i+1}: {narrative}"

	return res


def convert_lab_test(lab_test: models.F_r_results_tests_procedures_investigation_patient) -> str:
	result_data = _getattr(lab_test, "f_r_3_4_result_unstructured_data", None)
	return unk_if_none(result_data)


def convert_lab_tests(lab_tests: List[models.F_r_results_tests_procedures_investigation_patient]) -> str:
	if len(lab_tests) == 0:
		return ""

	if len(lab_tests) == 1:
		return convert_lab_test(lab_tests[0])

	res = ""
	for i, lab_test in enumerate(lab_tests):
		narrative = convert_lab_test(lab_test)
		res += f"#{i+1}: {narrative}"

	return res



def convert_to_cioms(icsr: models.ICSR) -> CIOMS:
	# I REACTION INFORMATION

	#print(_getattr(icsr.d_patient_characteristics, "d_1_patient"))
	#print(icsr.d_patient_characteristics.d_1_patient)

	p1 = unk_if_none(_getattr(icsr.d_patient_characteristics, "d_1_patient", None))
	print(f"{icsr=}")

	p1a = unk_if_none(','.join([unk_if_none(x.e_i_9_identification_country_reaction) for x in icsr.e_i_reaction_event]))

	date_of_birth = _getattr(icsr.d_patient_characteristics, "d_2_1_date_birth", None)
	year, month, day = get_date(date_of_birth)
	p2 = (day, month, year)

	p2a_num = unk_if_none(_getattr(icsr.d_patient_characteristics, "d_2_2a_age_onset_reaction_num", None))
	p2a_unit = unk_if_none(_getattr(icsr.d_patient_characteristics, "d_2_2b_age_onset_reaction_unit", None))

	if 'year' in p2a_unit:
		p2a_unit = ""

	p2a = (str(p2a_num) + " " + p2a_unit).strip()
	if p2a == "[UNK] [UNK]":
		p2a = "[UNK]"

	p3 = convert_sex(unk_if_none(_getattr(icsr.d_patient_characteristics, "d_5_sex", None)))

	main_reaction = icsr.e_i_reaction_event[0] if len(icsr.e_i_reaction_event) > 0 else None # assume that the main reaction is the first one

	reaction_onset = get_date(_getattr(main_reaction, "e_i_4_date_start_reaction", None))
	p4 = reaction_onset[2]
	p5 = reaction_onset[1]
	p6 = reaction_onset[0]

	p8 = any( [event.e_i_3_2a_results_death == True for event in icsr.e_i_reaction_event ] )
	p9 = any( [event.e_i_3_2c_caused_prolonged_hospitalisation == True for event in icsr.e_i_reaction_event ] )
	p10 = any( [event.e_i_3_2d_disabling_incapacitating == True for event in icsr.e_i_reaction_event ] )
	p11 = any( [event.e_i_3_2b_life_threatening == True for event in icsr.e_i_reaction_event ] )

	#p7_andp13 = 

	# II SUSPECT DRUGS

	suspect_drugs = [ drug for drug in icsr.g_k_drug_information if drug.g_k_1_characterisation_drug_role == enums.G_k_1_characterisation_drug_role.SUSPECT ]

	p14 = ""
	p15 = ""
	p16 = ""
	p17 = ""
	p18 = ""
	p19 = ""
	if len(suspect_drugs) == 1:
		drug = suspect_drugs[0]
		p14 = unk_if_none(drug.g_k_2_2_medicinal_product_name_primary_source)
		p15 = convert_dosages(drug.g_k_4_r_dosage_information)
		p16 = convert_routes_of_adm(drug.g_k_4_r_dosage_information)
		p17 = convert_usecases(drug.g_k_7_r_indication_use_case)
		p18 = convert_therapies_dates(drug.g_k_4_r_dosage_information)
		p19 = convert_therapies_duration(drug.g_k_4_r_dosage_information)

	if len(suspect_drugs) > 1:
		for i, drug in enumerate(suspect_drugs):
			p14 += f"#{i+1}: " + unk_if_none(drug.g_k_2_2_medicinal_product_name_primary_source) + "\n" # TODO substances + strength
			p15 += f"#{i+1}: " + convert_dosages(drug.g_k_4_r_dosage_information) + " "
			p16 += f"#{i+1}: " + convert_routes_of_adm(drug.g_k_4_r_dosage_information) + " "
			p17 += f"#{i+1}: " + convert_usecases(drug.g_k_7_r_indication_use_case) + " "
			p18 += f"#{i+1}: " + convert_therapies_dates(drug.g_k_4_r_dosage_information) + " "
			p19 += f"#{i+1}: " + convert_therapies_duration(drug.g_k_4_r_dosage_information) + " "

	p14 = unk_if_none(p14).strip()
	p15 = unk_if_none(p15).strip()
	p16 = unk_if_none(p16).strip()
	p17 = unk_if_none(p17).strip()
	p18 = unk_if_none(p18).strip()
	p19 = unk_if_none(p19).strip()

	p20 = "NA" # ??

	# :D
	p21_yes_yes = any([ any([ mx.g_k_9_i_4_reaction_recur_readministration == enums.G_k_9_i_4_reaction_recur_readministration.YES_YES  for mx in drug.g_k_9_i_drug_reaction_matrix ]) for drug in suspect_drugs ])
	p21_yes_no = any([ any([ mx.g_k_9_i_4_reaction_recur_readministration == enums.G_k_9_i_4_reaction_recur_readministration.YES_NO  for mx in drug.g_k_9_i_drug_reaction_matrix ]) for drug in suspect_drugs ])
	p21_yes_unk = any([ any([ mx.g_k_9_i_4_reaction_recur_readministration == enums.G_k_9_i_4_reaction_recur_readministration.YES_UNK  for mx in drug.g_k_9_i_drug_reaction_matrix ]) for drug in suspect_drugs ])
	p21_no_na = any([ any([ mx.g_k_9_i_4_reaction_recur_readministration == enums.G_k_9_i_4_reaction_recur_readministration.NO_NA  for mx in drug.g_k_9_i_drug_reaction_matrix ]) for drug in suspect_drugs ])

	if sum([p21_yes_yes, p21_yes_no, p21_yes_unk, p21_no_na]) > 1:
		p21 = "NA"
	else:
		if p21_yes_yes:
			p21 = "YES"
		elif p21_yes_no:
			p21 = "NO"
		else:
			p21 = "NA"

	# COMCOMINANT DRUGS AND HISTORY

	other_drugs = [ drug for drug in icsr.g_k_drug_information if drug.g_k_1_characterisation_drug_role != enums.G_k_1_characterisation_drug_role.SUSPECT ]

	p22 = ""

	for i, drug in enumerate(other_drugs):
		drug_name = unk_if_none(drug.g_k_2_2_medicinal_product_name_primary_source)

		dates = convert_therapies_dates(drug.g_k_4_r_dosage_information)
		dosages = convert_dosages(drug.g_k_4_r_dosage_information)
		routes = convert_routes_of_adm(drug.g_k_4_r_dosage_information)

		p22 += f"#{i+1}: {drug_name} - (from/to {dates}) - [{dosages} {routes}]\n"

	p22 = p22.strip()

	p23 = unk_if_none(_getattr(icsr.d_patient_characteristics, "d_7_2_text_medical_history", None))

	# MANUFACTURER INFORMATION

	p24a = ";\n".join([ unk_if_none(_getattr(src_case_id, "c_1_9_1_r_1_source_case_id", None)) \
			for src_case_id in _getattr(icsr.c_1_identification_case_safety_report, "c_1_9_1_r_source_case_id", []) ])


	other_ids = _getattr(icsr.c_1_identification_case_safety_report, "c_1_9_1_r_source_case_id", [])
	if len(other_ids) > 0:
		p24b = unk_if_none( other_ids[0].c_1_9_1_r_2_case_id )
	else:
		p24b = " "
	p24c = unk_if_none(_getattr(icsr.c_1_identification_case_safety_report, "c_1_5_date_most_recent_information", None))

	# TODO
	p24d = []
	is_follow_up = False


	p7_and_p13 = ""
	p7_and_p13 += convert_reactions_to_narrative(icsr.e_i_reaction_event) + "\n"

	actions_narrative = convert_drug_actions_to_narrative(icsr.g_k_drug_information)
	if actions_narrative != "":
		p7_and_p13 += "Actions taken with drug(s):\n"
		p7_and_p13 += actions_narrative + "\n"

	case_narrative = _getattr(icsr.h_narrative_case_summary, "h_1_case_narrative", None)
	if case_narrative is not None:
		p7_and_p13 += "Case narrative:\n"
		p7_and_p13 += case_narrative + "\n"

	lab_tests = convert_lab_tests(icsr.f_r_results_tests_procedures_investigation_patient)
	if lab_tests != "":
		p7_and_p13 += "Lab data:\n"
		p7_and_p13 += lab_tests + "\n"

	cioms = CIOMS(
		p1=p1,
		p1a=p1a,
		p2=p2,
		p2a=p2a,
		p3=p3,
		p4=p4,
		p5=p5,
		p6=p6,
		p8=p8,
		p9=p9,
		p10=p10,
		p11=p11,
		p7_and_p13=p7_and_p13,
		p14=p14,
		p15=p15,
		p16=p16,
		p17=p17,
		p18=p18,
		p19=p19,
		p20=p20,
		p21=p21,
		p22=p22,
		p23=p23,
		p24a=p24a,
		p24b=p24b,
		p24c=p24c,
		p24d=p24d,
		is_follow_up=is_follow_up,
		date_of_this_report="20 May 2024"
	)
	
	print(cioms)
	return cioms








