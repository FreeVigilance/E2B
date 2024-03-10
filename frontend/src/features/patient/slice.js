import { createSlice } from '@reduxjs/toolkit'
import { AutopsyData, CauseOfDeath, DrugHistory, MedHistory, ParentChildData, ParentData, ParentDrugHistory, ParentHistoryData, PatientInfo } from './patient';
import { nullFlavors } from '@src/components/nullFlavours';

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
    return (dispatch, getState) => {
		let data = jsonData['D_PatientCharacteristics'];

		let patientData = new PatientInfo();
		patientData['D_1_Patient'] = data['D_1_Patient'];
		patientData['D_1_1_1_MedicalRecordNumberSourceGP'] = data['D_1_1_MedicalRecordNumberSource']['D_1_1_1_MedicalRecordNumberSourceGP'];
		patientData['D_1_1_2_MedicalRecordNumberSourceSpecialist'] = data['D_1_1_MedicalRecordNumberSource']['D_1_1_2_MedicalRecordNumberSourceSpecialist'];
		patientData['D_1_1_3_MedicalRecordNumberSourceHospital'] = data['D_1_1_MedicalRecordNumberSource']['D_1_1_3_MedicalRecordNumberSourceHospital'];
		patientData['D_1_1_4_MedicalRecordNumberSourceInvestigation'] = data['D_1_Patient'] = data['D_1_1_MedicalRecordNumberSource']['D_1_1_4_MedicalRecordNumberSourceInvestigation'];
		patientData['D_2_1_DateBirth'] = data['D_2_AgeInformation']['D_2_1_DateBirth'];
		patientData['D_2_2a_AgeOnsetReactionNum'] = data['D_2_AgeInformation']['D_2_2_AgeOnsetReaction']['D_2_2a_AgeOnsetReactionNum'];
		patientData['D_2_2b_AgeOnsetReactionUnit'] = data['D_2_AgeInformation']['D_2_2_AgeOnsetReaction']['D_2_2b_AgeOnsetReactionUnit'];
		patientData['D_2_2_1a_GestationPeriodReactionFoetusNum'] = data['D_2_AgeInformation']['D_2_2_AgeOnsetReaction']['D_2_2_1_GestationPeriodReactionFoetus']['D_2_2_1a_GestationPeriodReactionFoetusNum'];
		patientData['D_2_2_1b_GestationPeriodReactionFoetusUnit'] = data['D_2_AgeInformation']['D_2_2_AgeOnsetReaction']['D_2_2_1_GestationPeriodReactionFoetus']['D_2_2_1b_GestationPeriodReactionFoetusUnit'];
		patientData['D_2_3_PatientAgeGroup'] = data['D_2_AgeInformation']['D_2_3_PatientAgeGroup'];
		patientData['D_3_BodyWeight'] = data['D_3_BodyWeight'];
		patientData['D_4_Height'] = data['D_4_Height'];
		patientData['D_5_Sex'] = data['D_5_Sex'];
		patientData['D_6_LastMenstrualPeriodDate'] = data['D_6_LastMenstrualPeriodDate'];
		patientData['D_4_Height'] = data['D_4_Height'];
		patientData['D_7_2_TextMedicalHistory'] = data['D_7_MedicalHistory']['D_7_2_TextMedicalHistory'];
		patientData['D_7_3_ConcomitantTherapies'] = data['D_7_MedicalHistory']['D_7_3_ConcomitantTherapies'];
		patientData['D_9_1_DateDeath'] = data['D_9_CaseDeath']['D_9_1_DateDeath'];
		patientData['D_9_3_Autopsy'] = data['D_9_CaseDeath']['D_9_3_Autopsy'];
		dispatch(setPatientData(patientData));

		let medicalHistory = [];
		Object.values(data['D_7_MedicalHistory']['D_7_1_r_StructuredInformationMedicalHistory']).forEach((item, index) => {
			let itemData = new MedHistory();
			itemData['D_7_1_r_1a_MedDRAVersionMedicalHistory'] = item['D_7_1_r_1a_MedDRAVersionMedicalHistory'];
			itemData['D_7_1_r_1b_MedicalHistoryMedDRACode'] = item['D_7_1_r_1b_MedicalHistoryMedDRACode'];
			itemData['D_7_1_r_2_StartDate'] = item['D_7_1_r_2_StartDate'];
			itemData['D_7_1_r_3_Continuing'] = item['D_7_1_r_3_Continuing'];
			itemData['D_7_1_r_4_EndDate'] = item['D_7_1_r_4_EndDate'];
			itemData['D_7_1_r_5_Comments'] = item['D_7_1_r_5_Comments'];
			itemData['D_7_1_r_6_FamilyHistory'] = item['D_7_1_r_6_FamilyHistory'];
			medicalHistory.push(itemData);
		});
		dispatch(setMedicalHistory(medicalHistory));

		let drugHistory = [];
		Object.values(data['D_8_r_PastDrugHistory']).forEach((item, index) => {
			let itemData = new DrugHistory();
			itemData['D_8_r_1_NameDrug'] = item['D_8_r_1_NameDrug'];
			itemData['D_8_r_2a_MPIDVersion'] = item['D_8_r_2_MPID']['D_8_r_2a_MPIDVersion'];
			itemData['D_8_r_2b_MPID'] = item['D_8_r_2_MPID']['D_8_r_2b_MPID'];
			itemData['D_8_r_3a_PhPIDVersion'] = item['D_8_r_3_PhPID']['D_8_r_3a_PhPIDVersion'];
			itemData['D_8_r_3a_PhPIDVersion'] = item['D_8_r_3_PhPID']['D_8_r_3a_PhPIDVersion'];
			itemData['D_8_r_4_StartDate'] = item['D_8_r_4_StartDate'];
			itemData['D_8_r_5_EndDate'] = item['D_8_r_5_EndDate'];
			itemData['D_8_r_6a_MedDRAVersionIndication'] = item['D_8_r_6_IndicationMedDRACode']['D_8_r_6a_MedDRAVersionIndication'];
			itemData['D_8_r_6b_IndicationMedDRACode'] = item['D_8_r_6_IndicationMedDRACode']['D_8_r_6b_IndicationMedDRACode'];
			itemData['D_8_r_7a_MedDRAVersionReaction'] = item['D_8_r_7_ReactionMedDRACode']['D_8_r_7a_MedDRAVersionReaction'];
			itemData['D_8_r_7b_ReactionMedDRACode'] = item['D_8_r_7_ReactionMedDRACode']['D_8_r_7b_ReactionMedDRACode'];
			drugHistory.push(itemData);
		});
		dispatch(setDrugHistory(drugHistory));

		let causeOfDeath =[];
		Object.values(data['D_9_CaseDeath']['D_9_2_r_CauseDeath']).forEach((item, index) => {
			let itemData = new CauseOfDeath();
			itemData['D_9_2_r_1a_MedDRAVersionCauseDeath'] = item['D_9_2_r_1a_MedDRAVersionCauseDeath'];
			itemData['D_9_2_r_1b_CauseDeathMedDRACode'] = item['D_9_2_r_1b_CauseDeathMedDRACode'];
			itemData['D_9_2_r_2_CauseDeath'] = item['D_9_2_r_2_CauseDeath'];
			causeOfDeath.push(itemData);
		});
		dispatch(setCauseOfDeath(causeOfDeath));

		let autopsy = [];
		Object.values(data['D_9_CaseDeath']['D_9_4_r_AutopsyDeterminedCauseDeath']).forEach((item, index) => {
			let itemData = new AutopsyData();
			itemData['D_9_4_r_1a_MedDRAVersionAutopsyDeterminedCauseDeath'] = item['D_9_4_r_1a_MedDRAVersionAutopsyDeterminedCauseDeath'];
			itemData['D_9_4_r_1b_AutopsyDeterminedCauseDeathMedDRACode'] = item['D_9_4_r_1b_AutopsyDeterminedCauseDeathMedDRACode'];
			itemData['D_9_4_r_2_AutopsyDeterminedCauseDeath'] = item['D_9_4_r_2_AutopsyDeterminedCauseDeath'];
			autopsy.push(itemData);
		});
		dispatch(setAutopsy(autopsy));

		let parentChildData = new ParentChildData();
		let parentChildJson = data['D_10_InformationConcerningParent'];
		parentChildData['D_10_1_ParentIdentification'] = parentChildJson['D_10_1_ParentIdentification'];
		parentChildData['D_10_2_1_DateBirthParent'] = parentChildJson['D_10_2_ParentAgeInformation']['D_10_2_1_DateBirthParent'];
		parentChildData['D_10_2_2a_AgeParentNum'] = parentChildJson['D_10_2_ParentAgeInformation']['D_10_2_2_AgeParent']['D_10_2_2a_AgeParentNum'];
		parentChildData['D_10_2_2b_AgeParentUnit'] = parentChildJson['D_10_2_ParentAgeInformation']['D_10_2_2_AgeParent']['D_10_2_2b_AgeParentUnit'];
		parentChildData['D_10_3_LastMenstrualPeriodDateParent'] = parentChildJson['D_10_3_LastMenstrualPeriodDateParent'];
		parentChildData['D_10_4_BodyWeightParent'] = parentChildJson['D_10_4_BodyWeightParent'];
		parentChildData['D_10_5_HeightParent'] = parentChildJson['D_10_5_HeightParent'];
		parentChildData['D_10_6_SexParent'] = parentChildJson['D_10_6_SexParent'];
		dispatch(setParentChildData(parentChildData));

		let parentData = [];
		Object.values(parentChildJson['D_10_7_MedicalHistoryParent']['D_10_7_1_r_StructuredInformationParentMedDRACode']).forEach((item, index) => {
			let itemData = new ParentData();
			itemData['D_10_7_1_r_1a_MedDRAVersionMedicalHistory'] = item['D_10_7_1_r_1a_MedDRAVersionMedicalHistory'];
			itemData['D_10_7_1_r_1b_MedicalHistoryMedDRACode'] = item['D_10_7_1_r_1b_MedicalHistoryMedDRACode'];
			itemData['D_10_7_1_r_2_StartDate'] = item['D_10_7_1_r_2_StartDate'];
			itemData['D_10_7_1_r_3_Continuing'] = item['D_10_7_1_r_3_Continuing'];
			itemData['D_10_7_1_r_4_EndDate'] = item['D_10_7_1_r_4_EndDate'];
			itemData['D_10_7_1_r_5_Comments'] = item['D_10_7_1_r_5_Comments'];
			parentData.push(itemData);
		});
		dispatch(setParentData(parentData));

		let parentHistoryData = new ParentHistoryData();
		parentHistoryData['D_10_7_2_TextMedicalHistoryParent'] = parentChildJson['D_10_7_MedicalHistoryParent']['D_10_7_2_TextMedicalHistoryParent'];
		dispatch(setParentHistoryData(parentHistoryData));

		let parentDrugHistory = [];
		Object.values(parentChildJson['D_10_8_r_PastDrugHistoryParent']).forEach((item, index) => {
			let itemData = new ParentDrugHistory();
			itemData['D_10_8_r_1_NameDrug'] = item['D_10_8_r_1_NameDrug'];
			itemData['D_10_8_r_2a_MPIDVersion'] = item['D_10_8_r_2_MPID']['D_10_8_r_2a_MPIDVersion'];
			itemData['D_10_8_r_2b_MPID'] = item['D_10_8_r_2_MPID']['D_10_8_r_2b_MPID'];
			itemData['D_10_8_r_3a_PhPIDVersion'] = item['D_10_8_r_2_MPID']['D_10_8_r_3a_PhPIDVersion'];
			itemData['D_10_8_r_3b_PhPID'] = item['D_10_8_r_2_MPID']['D_10_8_r_3b_PhPID'];
			itemData['D_10_8_r_4_StartDate'] = item['D_10_8_r_4_StartDate'];
			itemData['D_10_8_r_5_EndDate'] = item['D_10_8_r_5_EndDate'];
			itemData['D_10_8_r_6a_MedDRAVersionIndication'] = item['D_10_8_r_6_IndicationMedDRACode']['D_10_8_r_6a_MedDRAVersionIndication'];
			itemData['D_10_8_r_6b_IndicationMedDRACode'] = item['D_10_8_r_6_IndicationMedDRACode']['D_10_8_r_6b_IndicationMedDRACode'];
			itemData['D_10_8_r_7a_MedDRAVersionReaction'] = item['D_10_8_r_7_ReactionsMedDRACode']['D_10_8_r_7a_MedDRAVersionReaction'];
			itemData['D_10_8_r_7b_ReactionsMedDRACode'] = item['D_10_8_r_7_ReactionsMedDRACode']['D_10_8_r_7b_ReactionsMedDRACode'];
			parentDrugHistory.push(itemData);
		});
		dispatch(setParentDrugHistory(parentDrugHistory));
	}
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
		parentData: [new ParentData()],
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
	}
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
