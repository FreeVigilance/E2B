import { createSlice } from '@reduxjs/toolkit'
import { AutopsyData, CauseOfDeath, DrugHistory, MedHistory, ParentChildData, ParentData, ParentDrugHistory, ParentHistoryData, PatientInfo } from './patient';
import { nullFlavors } from '@src/components/nullFlavours';
import { getData } from '../display/slice';

export const patientSelector = (state) => state.patient;


export const getPatient = () => {
    return (dispatch, getState) => {
		let patientData = getState().patient.patientData;
		let medicalHistory = getState().patient.medicalHistory;
		let drugHistory = getState().patient.drugHistory;
		let autopsy = getState().patient.autopsy;
		let causeOfDeath = getState().patient.causeOfDeath;
		let parentChildData = getState().patient.parentChildData;
		let parentHistoryData = getState().patient.parentHistoryData;
		let parentData = getState().patient.parentData;
		let parentDrugHistory = getState().patient.parentDrugHistory;
				
		let jsonResult = {
			"id": null,
			"D_PatientCharacteristics": {
				'D_1_Patient': getNullFlavor(patientData, 'D_1_Patient'),
				'D_1_1_MedicalRecordNumberSource': {
					'D_1_1_1_MedicalRecordNumberSourceGP': (patientData['D_1_1_1_MedicalRecordNumberSourceGP']['value'] === null
						? {'value': null, 'nullFlavor': 'MSK'}
						: patientData['D_1_1_1_MedicalRecordNumberSourceGP']),
					'D_1_1_2_MedicalRecordNumberSourceSpecialist': patientData['D_1_1_2_MedicalRecordNumberSourceSpecialist']['value'] === null
						? {'value': null, 'nullFlavor': 'MSK'}
						: patientData['D_1_1_2_MedicalRecordNumberSourceSpecialist'],
					'D_1_1_3_MedicalRecordNumberSourceHospital': patientData['D_1_1_3_MedicalRecordNumberSourceHospital']['value'] === null
						? {'value': null, 'nullFlavor': 'MSK'}
						: patientData['D_1_1_3_MedicalRecordNumberSourceHospital'],
					'D_1_1_4_MedicalRecordNumberSourceInvestigation': patientData['D_1_1_4_MedicalRecordNumberSourceInvestigation']['value'] === null
						? {'value': null, 'nullFlavor': 'MSK'}
						: patientData['D_1_1_4_MedicalRecordNumberSourceInvestigation'],
				},
				'D_2_AgeInformation': {
					'D_2_1_DateBirth': patientData['D_2_1_DateBirth']['value'] === null
					? {'value': null, 'nullFlavor': 'MSK'}
					: patientData['D_2_1_DateBirth'],
					'D_2_2_AgeOnsetReaction': {
						'D_2_2a_AgeOnsetReactionNum': patientData['D_2_2a_AgeOnsetReactionNum'],
						'D_2_2b_AgeOnsetReactionUnit': patientData['D_2_2b_AgeOnsetReactionUnit'],
						'D_2_2_1_GestationPeriodReactionFoetus': {
							'D_2_2_1a_GestationPeriodReactionFoetusNum': patientData['D_2_2_1a_GestationPeriodReactionFoetusNum'],
							'D_2_2_1b_GestationPeriodReactionFoetusUnit': patientData['D_2_2_1b_GestationPeriodReactionFoetusUnit'],
						}
					},
					'D_2_3_PatientAgeGroup': patientData['D_2_3_PatientAgeGroup']
				},
				'D_3_BodyWeight': patientData['D_3_BodyWeight'],
				'D_4_Height': patientData['D_4_Height'],
				'D_5_Sex': getNullFlavor(patientData, 'D_5_Sex'),
				'D_6_LastMenstrualPeriodDate': patientData['D_6_LastMenstrualPeriodDate']['value'] === null
					? {'value': null, 'nullFlavor': 'MSK'}
					: patientData['D_6_LastMenstrualPeriodDate'],
				'D_7_MedicalHistory': {
					'D_7_2_TextMedicalHistory': getNullFlavor(patientData, 'D_7_2_TextMedicalHistory'),
					'D_7_3_ConcomitantTherapies': patientData['D_7_3_ConcomitantTherapies'],
				},
				'D_9_CaseDeath': {
					'D_9_1_DateDeath': getNullFlavor(patientData, 'D_9_1_DateDeath'),
					'D_9_3_Autopsy': getNullFlavor(patientData, 'D_9_3_Autopsy')
				}
			}
		}

		let medHistoryData = [];
		Object.values(medicalHistory).forEach((item, index) => {
			medHistoryData.push({
				'D_7_1_r_1a_MedDRAVersionMedicalHistory': item['D_7_1_r_1a_MedDRAVersionMedicalHistory'],
				'D_7_1_r_1b_MedicalHistoryMedDRACode': item['D_7_1_r_1b_MedicalHistoryMedDRACode'],
				'D_7_1_r_2_StartDate': getNullFlavor(item, 'D_7_1_r_2_StartDate'),
				'D_7_1_r_3_Continuing': getNullFlavor(item, 'D_7_1_r_3_Continuing'),
				'D_7_1_r_4_EndDate': getNullFlavor(item, 'D_7_1_r_4_EndDate'),
				'D_7_1_r_5_Comments': item['D_7_1_r_5_Comments'],
				'D_7_1_r_6_FamilyHistory': item['D_7_1_r_6_FamilyHistory']
			});
		});
		jsonResult["D_PatientCharacteristics"]['D_7_MedicalHistory']['D_7_1_r_StructuredInformationMedicalHistory'] = medHistoryData;


		let drugHistoryData = [];
		Object.values(drugHistory).forEach((item, index) => {
			let itemData = {}
			itemData['D_8_r_1_NameDrug'] = getNullFlavor(item, 'D_8_r_1_NameDrug');
			itemData['D_8_r_2_MPID'] = {
				'D_8_r_2a_MPIDVersion': item['D_8_r_2a_MPIDVersion'],
				'D_8_r_2b_MPID': item['D_8_r_2b_MPID']
			}
			itemData['D_8_r_3_PhPID'] = {
				'D_8_r_3a_PhPIDVersion': item['D_8_r_3a_PhPIDVersion'],
				'D_8_r_3b_PhPID': item['D_8_r_3b_PhPID']
			}
			itemData['D_8_r_4_StartDate'] = getNullFlavor(item, 'D_8_r_4_StartDate');
			itemData['D_8_r_5_EndDate'] = getNullFlavor(item, 'D_8_r_5_EndDate');
			itemData['D_8_r_6_IndicationMedDRACode'] = {
				'D_8_r_6a_MedDRAVersionIndication': item['D_8_r_6a_MedDRAVersionIndication'],
				'D_8_r_6b_IndicationMedDRACode': item['D_8_r_6b_IndicationMedDRACode']
			}
			itemData['D_8_r_7_ReactionMedDRACode'] = {
				'D_8_r_7a_MedDRAVersionReaction': item['D_8_r_7a_MedDRAVersionReaction'],
				'D_8_r_7b_ReactionMedDRACode': item['D_8_r_7b_ReactionMedDRACode']
			}
			drugHistoryData.push(itemData);
		});
		jsonResult['D_PatientCharacteristics']["D_8_r_PastDrugHistory"] = drugHistoryData;


		let causeOfDeathData = [];
		Object.values(causeOfDeath).forEach((item, index) => {
			causeOfDeathData.push({
				'D_9_2_r_1a_MedDRAVersionCauseDeath': item['D_9_2_r_1a_MedDRAVersionCauseDeath'],
				'D_9_2_r_1b_CauseDeathMedDRACode': item['D_9_2_r_1b_CauseDeathMedDRACode'],
				'D_9_2_r_2_CauseDeath': item['D_9_2_r_2_CauseDeath'],
			});
		});
		let autopsyData = [];
		Object.values(autopsy).forEach((item, index) => {
			autopsyData.push({
				'D_9_4_r_1a_MedDRAVersionAutopsyDeterminedCauseDeath': item['D_9_4_r_1a_MedDRAVersionAutopsyDeterminedCauseDeath'],
				'D_9_4_r_1b_AutopsyDeterminedCauseDeathMedDRACode': item['D_9_4_r_1b_AutopsyDeterminedCauseDeathMedDRACode'],
				'D_9_4_r_2_AutopsyDeterminedCauseDeath': item['D_9_4_r_2_AutopsyDeterminedCauseDeath'],
			});
		});
		jsonResult['D_PatientCharacteristics']["D_9_CaseDeath"]['D_9_2_r_CauseDeath'] = causeOfDeathData;
		jsonResult['D_PatientCharacteristics']["D_9_CaseDeath"]['D_9_4_r_AutopsyDeterminedCauseDeath'] = autopsyData;

		jsonResult['D_PatientCharacteristics']['D_10_InformationConcerningParent'] = {
			'D_10_1_ParentIdentification': getNullFlavor(parentChildData, 'D_10_1_ParentIdentification'),
			'D_10_2_ParentAgeInformation': {
				'D_10_2_1_DateBirthParent': getNullFlavor(parentChildData, 'D_10_2_1_DateBirthParent'),
				'D_10_2_2_AgeParent': {
					'D_10_2_2a_AgeParentNum': parentChildData['D_10_2_2a_AgeParentNum'],
					'D_10_2_2b_AgeParentUnit': parentChildData['D_10_2_2b_AgeParentUnit'],
				}
			},
			'D_10_3_LastMenstrualPeriodDateParent': getNullFlavor(parentChildData, 'D_10_3_LastMenstrualPeriodDateParent'),
			'D_10_4_BodyWeightParent': parentChildData['D_10_4_BodyWeightParent'],
			'D_10_5_HeightParent': parentChildData['D_10_5_HeightParent'],
			'D_10_6_SexParent': getNullFlavor(parentChildData, 'D_10_6_SexParent'),
		}

		let parentDataRes = [];
		Object.values(parentData).forEach((item, index) => {
			let itemData = {
				'D_10_7_1_r_1a_MedDRAVersionMedicalHistory': item['D_10_7_1_r_1a_MedDRAVersionMedicalHistory'],
				'D_10_7_1_r_1b_MedicalHistoryMedDRACode': item['D_10_7_1_r_1b_MedicalHistoryMedDRACode'],
				'D_10_7_1_r_2_StartDate': getNullFlavor(item, 'D_10_7_1_r_2_StartDate'),
				'D_10_7_1_r_3_Continuing': getNullFlavor(item, 'D_10_7_1_r_3_Continuing'),
				'D_10_7_1_r_4_EndDate': getNullFlavor(item, 'D_10_7_1_r_4_EndDate'),
				'D_10_7_1_r_5_Comments': item['D_10_7_1_r_5_Comments'],
			}
			
			parentDataRes.push(itemData);
		});

		jsonResult['D_PatientCharacteristics']['D_10_InformationConcerningParent']['D_10_7_MedicalHistoryParent'] = {
			'D_10_7_1_r_StructuredInformationParentMedDRACode': parentDataRes,
			'D_10_7_2_TextMedicalHistoryParent': parentHistoryData['D_10_7_2_TextMedicalHistoryParent']
		}

		let parentDrugHistoryData = [];
		Object.values(parentDrugHistory).forEach((item, index) => {
			let itemData = {
				'D_10_8_r_1_NameDrug': item['D_10_8_r_1_NameDrug'],
				'D_10_8_r_2_MPID': {
					'D_10_8_r_2a_MPIDVersion': item['D_10_8_r_2a_MPIDVersion'],
					'D_10_8_r_2b_MPID': item['D_10_8_r_2b_MPID'],
				},
				'D_10_8_r_3_PhPID': {
					'D_10_8_r_3a_PhPIDVersion': item['D_10_8_r_3a_PhPIDVersion'],
					'D_10_8_r_3b_PhPID': item['D_10_8_r_3b_PhPID'],
				},
				'D_10_8_r_4_StartDate': getNullFlavor(item, 'D_10_8_r_4_StartDate'),
				'D_10_8_r_5_EndDate': getNullFlavor(item, 'D_10_8_r_5_EndDate'),
				'D_10_8_r_6_IndicationMedDRACode': {
					'D_10_8_r_6a_MedDRAVersionIndication': item['D_10_8_r_6a_MedDRAVersionIndication'],
					'D_10_8_r_6b_IndicationMedDRACode': item['D_10_8_r_6b_IndicationMedDRACode'],
				},
				'D_10_8_r_7_ReactionsMedDRACode': {
					'D_10_8_r_7a_MedDRAVersionReaction': item['D_10_8_r_7a_MedDRAVersionReaction'],
					'D_10_8_r_7b_ReactionsMedDRACode': item['D_10_8_r_7b_ReactionsMedDRACode'],
				},
			}
			parentDrugHistoryData.push(itemData);
		});

		jsonResult["D_PatientCharacteristics"]['D_10_InformationConcerningParent']['D_10_8_r_PastDrugHistoryParent'] = parentDrugHistoryData;

		return jsonResult;
	}
}


export const parsePatient = (jsonData) => {
	let data = jsonData['d_patient_characteristics'];

	let patientData = new PatientInfo();
	let medicalHistory = [];
	let drugHistory = [];
	let causeOfDeath =[];
	let autopsy = [];
	let parentChildData = new ParentChildData();
	let parentData = [];
	let parentHistoryData = new ParentHistoryData();
	let parentDrugHistory = [];

	if (data) {
		patientData['D_1_Patient'] = data['d_1_patient'];
		patientData['D_1_1_1_MedicalRecordNumberSourceGP'] = data['d_1_1_medical_record_number_source']['d_1_1_1_medical_record_number_source_gp'];
		patientData['D_1_1_2_MedicalRecordNumberSourceSpecialist'] = data['d_1_1_medical_record_number_source']['d_1_1_2_medical_record_number_source_specialist'];
		patientData['D_1_1_3_MedicalRecordNumberSourceHospital'] = data['d_1_1_medical_record_number_source']['d_1_1_3_medical_record_number_source_hospital'];
		patientData['D_1_1_4_MedicalRecordNumberSourceInvestigation'] = data['d_1_1_medical_record_number_source']['d_1_1_4_medical_record_number_source_investigation'];
		patientData['D_2_1_DateBirth'] = data['d_2_age_information']['d_2_1_date_birth'];
		patientData['D_2_2a_AgeOnsetReactionNum'] = data['d_2_age_information']['d_2_2_age_onset_reaction']['d_2_2a_age_onset_reaction_num'];
		patientData['D_2_2b_AgeOnsetReactionUnit'] = data['d_2_age_information']['d_2_2_age_onset_reaction']['d_2_2b_age_onset_reaction_unit'];
		patientData['D_2_2_1a_GestationPeriodReactionFoetusNum'] = data['d_2_age_information']['d_2_2_age_onset_reaction']['d_2_2_1_gestation_period_reaction_foetus']['d_2_2_1a_gestation_period_reaction_foetus_num'];
		patientData['D_2_2_1b_GestationPeriodReactionFoetusUnit'] = data['d_2_age_information']['d_2_2_age_onset_reaction']['d_2_2_1_gestation_period_reaction_foetus']['d_2_2_1b_gestation_period_reaction_foetus_unit'];
		patientData['D_2_3_PatientAgeGroup'] = data['d_2_age_information']['d_2_3_patient_age_group'];
		patientData['D_3_BodyWeight'] = data['d_3_body_weight'];
		patientData['D_4_Height'] = data['d_4_height'];
		patientData['D_5_Sex'] = data['d_5_sex'];
		patientData['D_6_LastMenstrualPeriodDate'] = data['d_6_last_menstrual_period_date'];
		patientData['D_7_2_TextMedicalHistory'] = data['d_7_medical_history']['d_7_2_text_medical_history'];
		patientData['D_7_3_ConcomitantTherapies'] = data['d_7_medical_history']['d_7_3_concomitant_therapies'];
		patientData['D_9_1_DateDeath'] = data['d_9_case_death']['d_9_1_date_death'];
		patientData['D_9_3_Autopsy'] = data['d_9_case_death']['d_9_3_autopsy'];
		
		if (data['d_7_medical_history']['d_7_1_r_structured_information_medical_history']) {
			Object.values(data['d_7_medical_history']['d_7_1_r_structured_information_medical_history']).forEach((item, index) => {
				let itemData = new MedHistory();
				itemData['D_7_1_r_1a_MedDRAVersionMedicalHistory'] = item['d_7_1_r_1a_meddra_version_medical_history'];
				itemData['D_7_1_r_1b_MedicalHistoryMedDRACode'] = item['d_7_1_r_1b_medical_history_meddra_code'];
				itemData['D_7_1_r_2_StartDate'] = item['d_7_1_r_2_start_date'];
				itemData['D_7_1_r_3_Continuing'] = item['d_7_1_r_3_continuing'];
				itemData['D_7_1_r_4_EndDate'] = item['d_7_1_r_4_end_date'];
				itemData['D_7_1_r_5_Comments'] = item['d_7_1_r_5_comments'];
				itemData['D_7_1_r_6_FamilyHistory'] = item['d_7_1_r_6_family_history'];
				medicalHistory.push(itemData);
			});
		}

		if (data['d_8_r_past_drug_history']) {
			Object.values(data['d_8_r_past_drug_history']).forEach((item, index) => {
				let itemData = new DrugHistory();
				itemData['D_8_r_1_NameDrug'] = item['d_8_r_1_name_drug'];
				itemData['D_8_r_2a_MPIDVersion'] = item['d_8_r_2_mpid']['d_8_r_2a_mpid_version'];
				itemData['D_8_r_2b_MPID'] = item['d_8_r_2_mpid']['d_8_r_2b_mpid'];
				itemData['D_8_r_3a_PhPIDVersion'] = item['d_8_r_3_phpid']['d_8_r_3a_phpid_version'];
				itemData['D_8_r_3a_PhPIDVersion'] = item['d_8_r_3_phpid']['d_8_r_3b_phpid'];
				itemData['D_8_r_4_StartDate'] = item['d_8_r_4_start_date'];
				itemData['D_8_r_5_EndDate'] = item['d_8_r_5_end_date'];
				itemData['D_8_r_6a_MedDRAVersionIndication'] = item['d_8_r_6_indication_meddra_code']['d_8_r_6a_meddra_version_indication'];
				itemData['D_8_r_6b_IndicationMedDRACode'] = item['d_8_r_6_indication_meddra_code']['d_8_r_6b_indication_meddra_code'];
				itemData['D_8_r_7a_MedDRAVersionReaction'] = item['d_8_r_7_reaction_meddra_code']['d_8_r_7a_meddra_version_reaction'];
				itemData['D_8_r_7b_ReactionMedDRACode'] = item['d_8_r_7_reaction_meddra_code']['d_8_r_7b_reaction_meddra_code'];
				drugHistory.push(itemData);
			});
		}

		if (data['d_9_case_death']['d_9_2_r_cause_death']) {
			Object.values(data['d_9_case_death']['d_9_2_r_cause_death']).forEach((item, index) => {
				let itemData = new CauseOfDeath();
				itemData['D_9_2_r_1a_MedDRAVersionCauseDeath'] = item['d_9_2_r_1a_meddra_version_cause_death'];
				itemData['D_9_2_r_1b_CauseDeathMedDRACode'] = item['d_9_2_r_1b_cause_death_meddra_code'];
				itemData['D_9_2_r_2_CauseDeath'] = item['d_9_2_r_2_cause_death'];
				causeOfDeath.push(itemData);
			});
		}

		if (data['d_9_3_autopsy']['d_9_4_r_autopsy_determined_cause_death']) {
			Object.values(data['d_9_3_autopsy']['d_9_4_r_autopsy_determined_cause_death']).forEach((item, index) => {
				let itemData = new AutopsyData();
				itemData['D_9_4_r_1a_MedDRAVersionAutopsyDeterminedCauseDeath'] = item['d_9_4_r_1a_meddra_version_autopsy_determined_cause_death'];
				itemData['D_9_4_r_1b_AutopsyDeterminedCauseDeathMedDRACode'] = item['d_9_4_r_1b_autopsy_determined_cause_death_meddra_code'];
				itemData['D_9_4_r_2_AutopsyDeterminedCauseDeath'] = item['d_9_4_r_2_autopsy_determined_cause_death'];
				autopsy.push(itemData);
			});
		}

		if (data['d_10_information_concerning_parent']) {
			let parentChildJson = data['d_10_information_concerning_parent'];
			parentChildData['D_10_1_ParentIdentification'] = parentChildJson['d_10_1_parent_identification'];
			parentChildData['D_10_2_1_DateBirthParent'] = parentChildJson['d_10_2_parent_age_information']['d_10_2_1_date_birth_parent'];
			parentChildData['D_10_2_2a_AgeParentNum'] = parentChildJson['d_10_2_parent_age_information']['d_10_2_2_age_parent']['d_10_2_2a_age_parent_num'];
			parentChildData['D_10_2_2b_AgeParentUnit'] = parentChildJson['d_10_2_parent_age_information']['d_10_2_2_age_parent']['d_10_2_2b_age_parent_unit'];
			parentChildData['D_10_3_LastMenstrualPeriodDateParent'] = parentChildJson['d_10_3_last_menstrual_period_date_parent'];
			parentChildData['D_10_4_BodyWeightParent'] = parentChildJson['d_10_4_body_weight_parent'];
			parentChildData['D_10_5_HeightParent'] = parentChildJson['d_10_5_height_parent'];
			parentChildData['D_10_6_SexParent'] = parentChildJson['d_10_6_sex_parent'];
		
			if (parentChildJson['d_10_7_medical_history_parent']['d_10_7_1_r_structured_information_parent_meddra_code']) {
				Object.values(parentChildJson['d_10_7_medical_history_parent']['d_10_7_1_r_structured_information_parent_meddra_code']).forEach((item, index) => {
					let itemData = new ParentData();
					itemData['D_10_7_1_r_1a_MedDRAVersionMedicalHistory'] = item['d_10_7_1_r_1a_meddra_version_medical_history'];
					itemData['D_10_7_1_r_1b_MedicalHistoryMedDRACode'] = item['d_10_7_1_r_1b_medical_history_meddra_code'];
					itemData['D_10_7_1_r_2_StartDate'] = item['d_10_7_1_r_2_start_date'];
					itemData['D_10_7_1_r_3_Continuing'] = item['d_10_7_1_r_3_continuing'];
					itemData['D_10_7_1_r_4_EndDate'] = item['d_10_7_1_r_4_end_date'];
					itemData['D_10_7_1_r_5_Comments'] = item['d_10_7_1_r_5_comments'];
					parentData.push(itemData);
				});
			}
		}

		parentHistoryData['D_10_7_2_TextMedicalHistoryParent'] = parentChildJson['d_10_7_medical_history_parent']['d_10_7_2_text_medical_history_parent'];

		if (parentChildJson['d_10_8_r_past_drug_history_parent']) {
			Object.values(parentChildJson['d_10_8_r_past_drug_history_parent']).forEach((item, index) => {
				let itemData = new ParentDrugHistory();
				itemData['D_10_8_r_1_NameDrug'] = item['d_10_8_r_1_name_drug'];
				itemData['D_10_8_r_2a_MPIDVersion'] = item['d_10_8_r_2_mpid']['d_10_8_r_2a_mpid_version'];
				itemData['D_10_8_r_2b_MPID'] = item['d_10_8_r_2_mpid']['d_10_8_r_2b_mpid'];
				itemData['D_10_8_r_3a_PhPIDVersion'] = item['d_10_8_r_3_phpid']['d_10_8_r_3a_phpid_version'];
				itemData['D_10_8_r_3b_PhPID'] = item['d_10_8_r_3_phpid']['d_10_8_r_3b_phpid'];
				itemData['D_10_8_r_4_StartDate'] = item['d_10_8_r_4_start_date'];
				itemData['D_10_8_r_5_EndDate'] = item['d_10_8_r_5_end_date'];
				itemData['D_10_8_r_6a_MedDRAVersionIndication'] = item['d_10_8_r_6_indication_meddra_code']['d_10_8_r_6a_meddra_version_indication'];
				itemData['D_10_8_r_6b_IndicationMedDRACode'] = item['d_10_8_r_6_indication_meddra_code']['d_10_8_r_6b_indication_meddra_code'];
				itemData['D_10_8_r_7a_MedDRAVersionReaction'] = item['d_10_8_r_7_reactions_meddra_code']['d_10_8_r_7a_meddra_version_reaction'];
				itemData['D_10_8_r_7b_ReactionsMedDRACode'] = item['d_10_8_r_7_reactions_meddra_code']['d_10_8_r_7b_reactions_meddra_code'];
				parentDrugHistory.push(itemData);
			});
		}
	}

	return [patientData, medicalHistory, drugHistory, causeOfDeath, autopsy, parentChildData, parentData, parentHistoryData, parentDrugHistory];

}

const getNullFlavor = (item, field) => {
	return item[field]['nullFlavor'] !== null
			? {'value': null, 'nullFlavor': nullFlavors[item[field]['nullFlavor']]}
			: item[field]
}

const patientSlice = createSlice({
	name: 'patient',
	initialState: {
		patientData: new PatientInfo(),
		medicalHistory: [],
		drugHistory: [],
		causeOfDeath:[],
		autopsy:[],
		parentChildData: new ParentChildData(),
		parentHistoryData: new ParentHistoryData(),
		parentData: [],
		parentDrugHistory: []
	},
	reducers: {
		setPatientData: (state, action) => {
			state.patientData = action.payload;
		},
		setMedicalHistory: (state, action) => {
			state.medicalHistory = action.payload;
		},
		setDrugHistory: (state, action) => {
			state.drugHistory = action.payload;
		},
		setCauseOfDeath: (state, action) => {
			state.causeOfDeath = action.payload;
		},
		setParentChildData: (state, action) => {
			state.parentChildData = action.payload;
		},
		setParentData: (state, action) => {
			state.parentData = action.payload;
		},
		setParentDrugHistory: (state, action) => {
			state.parentDrugHistory = action.payload;
		},
		setParentHistoryData: (state, action) => {
			state.parentHistoryData = action.payload;
		},
		setAutopsy: (state, action) => {
			state.autopsy = action.payload;
		},
	},
	extraReducers: (builder) => {
        builder.addCase(getData.fulfilled, (state, action) => {
            let res = parsePatient(action.payload);
			state.patientData = res[0];
			state.medicalHistory = res[1];
			state.drugHistory = res[2];
			state.causeOfDeath = res[3];
			state.autopsy = res[4];
			state.parentChildData = res[5];
			state.parentData = res[6];
			state.parentHistoryData = res[7];
			state.parentDrugHistory = res[8];
        });
    },
})

export default patientSlice.reducer;
export const {
    setPatientData,
	setMedicalHistory,
	setDrugHistory,
	setCauseOfDeath,
	setParentChildData,
	setParentData,
	setParentDrugHistory,
	setParentHistoryData,
	setAutopsy
} = patientSlice.actions;
