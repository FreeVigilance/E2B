import { createSlice } from '@reduxjs/toolkit'
import {AdditionalInfo, Dosage, Drug, DrugReactionMatrix, IndicationForUse, Relatedness, Substance} from './drugs';
import { nullFlavors } from '@src/components/nullFlavours';

export const drugsSelector = (state) => state.drugs;

export const getDrug = () => {
    return (dispatch, getState) => {
		let drugs = getState().drugs.drugs;
		let substances = getState().drugs.substances;
		let dosages = getState().drugs.dosages;
		let indications = getState().drugs.indications;
		let drugReactionMatrix = getState().drugs.drugReactionMatrix;
		let relatedness = getState().drugs.relatedness;
		let additionalInfo = getState().drugs.additionalInfo;

		let data = [];
		Object.values(drugs).forEach((item, index) => {
			let itemData = {}
			itemData['id'] = null;
			itemData['G_k_1_CharacterisationDrugRole'] = item['G_k_1_CharacterisationDrugRole'];
			itemData['G_k_2_DrugIdentification'] = {
				'G_k_2_1_MPIDPhPID': {
					'G_k_2_1_1a_MPIDVersion': item['G_k_2_1_1a_MPIDVersion'],
					'G_k_2_1_1b_MPID': item['G_k_2_1_1b_MPID'],
					'G_k_2_1_2a_PhPIDVersion': item['G_k_2_1_2a_PhPIDVersion'],
					'G_k_2_1_2b_PhPID': item['G_k_2_1_2b_PhPID'],
				},
				'G_k_2_2_MedicinalProductNamePrimarySource': item['G_k_2_2_MedicinalProductNamePrimarySource'],
				'G_k_2_4_IdentificationCountryDrugObtained': item['G_k_2_4_IdentificationCountryDrugObtained'],
				'G_k_2_5_InvestigationalProductBlinded': item['G_k_2_5_InvestigationalProductBlinded'],
			}
			let substancesData = [];
			Object.values(substances[index]).forEach((subItem, subIndex) => {
				substancesData.push({
					'G_k_2_3_r_1_SubstanceName': subItem['G_k_2_3_r_1_SubstanceName'],
					'G_k_2_3_r_2a_SubstanceTermIDVersion': subItem['G_k_2_3_r_2a_SubstanceTermIDVersion'],
					'G_k_2_3_r_2b_SubstanceTermID': subItem['G_k_2_3_r_2b_SubstanceTermID'],
					'G_k_2_3_r_3a_StrengthNum': subItem['G_k_2_3_r_3a_StrengthNum'],
					'G_k_2_3_r_3b_StrengthUnit': subItem['G_k_2_3_r_3b_StrengthUnit'],
				})
				
			});
			itemData['G_k_2_DrugIdentification']['G_k_2_3_r_SubstanceIdStrength'] = substancesData;

			itemData['G_k_3_HolderAuthorisationApplicationNumberDrug'] = {
				'G_k_3_1_AuthorisationApplicationNumber': item['G_k_3_1_AuthorisationApplicationNumber'],
				'G_k_3_2_CountryAuthorisationApplication': item['G_k_3_2_CountryAuthorisationApplication'],
				'G_k_3_3_NameHolderApplicant': item['G_k_3_3_NameHolderApplicant'],
			}

			let dosagesData = [];
			Object.values(dosages[index]).forEach((subItem, subIndex) => {
				dosagesData.push({
						'G_k_4_r_1a_DoseNum': subItem['G_k_4_r_1a_DoseNum'],
						'G_k_4_r_1b_DoseUnit': subItem['G_k_4_r_1b_DoseUnit'],
						'G_k_4_r_2_NumberUnitsInterval': subItem['G_k_4_r_2_NumberUnitsInterval'],
						'G_k_4_r_3_DefinitionIntervalUnit': subItem['G_k_4_r_3_DefinitionIntervalUnit'],
						'G_k_4_r_4_DateTimeDrug': getNullFlavor(subItem, 'G_k_4_r_4_DateTimeDrug'),
						'G_k_4_r_5_DateTimeLastAdministration': getNullFlavor(subItem, 'G_k_4_r_5_DateTimeLastAdministration'),
						'G_k_4_r_6_DurationDrugAdministration': {
							'G_k_4_r_6a_DurationDrugAdministrationNum': subItem['G_k_4_r_6a_DurationDrugAdministrationNum'],
							'G_k_4_r_6b_DurationDrugAdministrationUnit': subItem['G_k_4_r_6b_DurationDrugAdministrationUnit'],
						},
						'G_k_4_r_7_BatchLotNumber': subItem['G_k_4_r_7_BatchLotNumber'],
						'G_k_4_r_8_DosageText': subItem['G_k_4_r_8_DosageText'],
						'G_k_4_r_9_PharmaceuticalDoseForm': {
							'G_k_4_r_9_1_PharmaceuticalDoseForm': getNullFlavor(subItem, 'G_k_4_r_9_1_PharmaceuticalDoseForm'),
							'G_k_4_r_9_2a_PharmaceuticalDoseFormTermIDVersion': subItem['G_k_4_r_9_2a_PharmaceuticalDoseFormTermIDVersion'],
							'G_k_4_r_9_2b_PharmaceuticalDoseFormTermID': subItem['G_k_4_r_9_2b_PharmaceuticalDoseFormTermID'],
						},
						'G_k_4_r_10_RouteAdministration': {
							'G_k_4_r_10_1_RouteAdministration': getNullFlavor(subItem, 'G_k_4_r_10_1_RouteAdministration'),
							'G_k_4_r_10_2a_RouteAdministrationTermIDVersion': subItem['G_k_4_r_10_2a_RouteAdministrationTermIDVersion'],
							'G_k_4_r_10_2b_RouteAdministrationTermID': subItem['G_k_4_r_10_2b_RouteAdministrationTermID'],
						},
						'G_k_4_r_11_ParentRouteAdministration': {
							'G_k_4_r_11_1_ParentRouteAdministration': getNullFlavor(subItem, 'G_k_4_r_11_1_ParentRouteAdministration'),
							'G_k_4_r_11_2a_ParentRouteAdministrationTermIDVersion': subItem['G_k_4_r_11_2a_ParentRouteAdministrationTermIDVersion'],
							'G_k_4_r_11_2b_ParentRouteAdministrationTermID': subItem['G_k_4_r_11_2b_ParentRouteAdministrationTermID'],
						}
				})
				
			});
			itemData['G_k_4_r_DosageInformation'] = dosagesData;

			itemData['G_k_5_CumulativeDoseFirstReaction'] = {
				'G_k_5a_CumulativeDoseFirstReactionNum': item['G_k_5a_CumulativeDoseFirstReactionNum'],
				'G_k_5b_CumulativeDoseFirstReactionUnit': item['G_k_5b_CumulativeDoseFirstReactionUnit'],
			}
			itemData['G_k_6_GestationPeriodExposure'] = {
				'G_k_6a_GestationPeriodExposureNum': item['G_k_6a_GestationPeriodExposureNum'],
				'G_k_6b_GestationPeriodExposureUnit': item['G_k_6b_GestationPeriodExposureUnit'],
			}

			let indicationsData = [];
			Object.values(indications[index]).forEach((subItem, subIndex) => {
				indicationsData.push({
					'G_k_7_r_1_IndicationPrimarySource': getNullFlavor(subItem, 'G_k_7_r_1_IndicationPrimarySource'),
					'G_k_7_r_2_IndicationMedDRACode': {
						'G_k_7_r_2a_MedDRAVersionIndication': subItem['G_k_7_r_2a_MedDRAVersionIndication'],
						'G_k_7_r_2b_IndicationMedDRACode': subItem['G_k_7_r_2b_IndicationMedDRACode'],
					}
				})
				
			});
			itemData['G_k_7_r_IndicationUseCase'] = indicationsData;


			itemData['G_k_8_ActionTakenDrug'] = item['G_k_8_ActionTakenDrug'];

			let drugReactionMatrixData = [];
			Object.values(drugReactionMatrix[index]).forEach((subItem, subIndex) => {
				let data = {
					'G_k_9_i_3_IntervalDrugAdministrationReaction': {
						'G_k_9_i_3_1a_IntervalDrugAdministrationReactionNum': subIndex['G_k_9_i_3_1a_IntervalDrugAdministrationReactionNum'],
						'G_k_9_i_3_1b_IntervalDrugAdministrationReactionUnit': subIndex['G_k_9_i_3_1b_IntervalDrugAdministrationReactionUnit'],
					},
					'G_k_9_i_3_2a_IntervalLastDoseDrugReactionNum': subIndex['G_k_9_i_3_2a_IntervalLastDoseDrugReactionNum'],
					'G_k_9_i_3_2b_IntervalLastDoseDrugReactionUnit': subIndex['G_k_9_i_3_2b_IntervalLastDoseDrugReactionUnit'],
					'G_k_9_i_4_ReactionRecurReadministration': subIndex['G_k_9_i_4_ReactionRecurReadministration'],
				};
				let relatednessData = []
				Object.values(relatedness[index][subIndex]).forEach((subSubItem, subSubIndex) => {
					relatednessData.push({
						'G_k_9_i_2_r_AssessmentRelatednessDrugReaction': {
							'G_k_9_i_2_r_1_SourceAssessment': subSubItem['G_k_9_i_2_r_1_SourceAssessment'],
							'G_k_9_i_2_r_2_MethodAssessment': subSubItem['G_k_9_i_2_r_2_MethodAssessment'],
							'G_k_9_i_2_r_3_ResultAssessment': subSubItem['G_k_9_i_2_r_3_ResultAssessment'],
						}
					});
				});
				data['G_k_9_i_2_AssessmentRelatednessDrugReaction'] = relatednessData;
				drugReactionMatrixData.push(data);
			});
			itemData['G_k_9_i_DrugReactionMatrix'] = drugReactionMatrixData;

			let addInfoData = [];
			Object.values(additionalInfo[index]).forEach((subItem, subIndex) => {
				addInfoData.push(subItem['G_k_10_r_AdditionalInformationDrug'])
				
			});
			itemData['G_k_10_r_AdditionalInformationDrug'] = addInfoData;

			itemData['G_k_11_AdditionalInformationDrug'] = item['G_k_11_AdditionalInformationDrug'];
			
			data.push(itemData);
		});
		let jsonResult = {
			"id": null,
			"G_k_DrugInformation": data
		}
		return jsonResult;
	}
}

export const parseResults = (jsonData) => {
		return (dispatch, getState) => {
			let data = jsonData['G_k_DrugInformation'];
			
			let drugs = [];
			let substances = {};
			let dosages = {};
			let indications = {};
			let drugReactionMatrix = {};
			let relatedness = {};
			let additionalInfo = {};

			Object.values(data).forEach((item, index) => {
				let drugsData = new Drug();
				drugsData['G_k_1_CharacterisationDrugRole'] = item['G_k_1_CharacterisationDrugRole'];
				drugsData['G_k_2_1_1a_MPIDVersion'] = item['G_k_2_DrugIdentification']['G_k_2_1_MPIDPhPID']['G_k_2_1_1a_MPIDVersion'];
				drugsData['G_k_2_1_1b_MPID'] = item['G_k_2_DrugIdentification']['G_k_2_1_MPIDPhPID']['G_k_2_1_1b_MPID'];
				drugsData['G_k_2_1_2a_PhPIDVersion'] = item['G_k_2_DrugIdentification']['G_k_2_1_MPIDPhPID']['G_k_2_1_2a_PhPIDVersion'];
				drugsData['G_k_2_1_2b_PhPID'] = item['G_k_2_DrugIdentification']['G_k_2_1_MPIDPhPID']['G_k_2_1_2b_PhPID'];
				drugsData['G_k_2_2_MedicinalProductNamePrimarySource'] = item['G_k_2_DrugIdentification']['G_k_2_2_MedicinalProductNamePrimarySource'];
				drugsData['G_k_2_4_IdentificationCountryDrugObtained'] = item['G_k_2_DrugIdentification']['G_k_2_4_IdentificationCountryDrugObtained'];
				drugsData['G_k_2_5_InvestigationalProductBlinded'] = item['G_k_2_DrugIdentification']['G_k_2_5_InvestigationalProductBlinded'];
				drugsData['G_k_3_1_AuthorisationApplicationNumber'] = item['G_k_3_HolderAuthorisationApplicationNumberDrug']['G_k_3_1_AuthorisationApplicationNumber'];
				drugsData['G_k_3_2_CountryAuthorisationApplication'] = item['G_k_3_HolderAuthorisationApplicationNumberDrug']['G_k_3_2_CountryAuthorisationApplication'];
				drugsData['G_k_3_3_NameHolderApplicant'] = item['G_k_3_HolderAuthorisationApplicationNumberDrug']['G_k_3_3_NameHolderApplicant'];
				drugsData['G_k_5a_CumulativeDoseFirstReactionNum'] = item['G_k_5_CumulativeDoseFirstReaction']['G_k_5a_CumulativeDoseFirstReactionNum'];
				drugsData['G_k_5b_CumulativeDoseFirstReactionUnit'] = item['G_k_5_CumulativeDoseFirstReaction']['G_k_5b_CumulativeDoseFirstReactionUnit'];
				drugsData['G_k_6a_GestationPeriodExposureNum'] = item['G_k_6_GestationPeriodExposure']['G_k_6a_GestationPeriodExposureNum'];
				drugsData['G_k_6b_GestationPeriodExposureUnit'] = item['G_k_6_GestationPeriodExposure']['G_k_6b_GestationPeriodExposureUnit'];
				drugsData['G_k_8_ActionTakenDrug'] = item['G_k_8_ActionTakenDrug'];
				drugsData['G_k_11_AdditionalInformationDrug'] = item['G_k_11_AdditionalInformationDrug'];
				drugs.push(drugsData);

				let substancesArray = [];
				Object.values(item['G_k_2_DrugIdentification']['G_k_2_3_r_SubstanceIdStrength']).forEach((subItem, subIndex) => {
					let substancesData = new Substance();
					substancesData['G_k_2_3_r_1_SubstanceName'] = subItem['G_k_2_3_r_1_SubstanceName'];
					substancesData['G_k_2_3_r_2a_SubstanceTermIDVersion'] = subItem['G_k_2_3_r_2a_SubstanceTermIDVersion'];
					substancesData['G_k_2_3_r_2b_SubstanceTermID'] = subItem['G_k_2_3_r_2b_SubstanceTermID'];
					substancesData['G_k_2_3_r_3a_StrengthNum'] = subItem['G_k_2_3_r_3a_StrengthNum'];
					substancesData['G_k_2_3_r_3b_StrengthUnit'] = subItem['G_k_2_3_r_3b_StrengthUnit'];

					substancesArray.push(substancesData);
				});
				substances[index] = substancesArray;

				let dosagesArray = [];
				Object.values(item['G_k_4_r_DosageInformation']).forEach((subItem, subIndex) => {
					let dosagesData = new Dosage();
					dosagesData['G_k_4_r_1a_DoseNum'] = subItem['G_k_4_r_1a_DoseNum'];
					dosagesData['G_k_4_r_1b_DoseUnit'] = subItem['G_k_4_r_1b_DoseUnit'];
					dosagesData['G_k_4_r_2_NumberUnitsInterval'] = subItem['G_k_4_r_2_NumberUnitsInterval'];
					dosagesData['G_k_4_r_3_DefinitionIntervalUnit'] = subItem['G_k_4_r_3_DefinitionIntervalUnit'];
					dosagesData['G_k_4_r_4_DateTimeDrug'] = subItem['G_k_4_r_4_DateTimeDrug'];
					dosagesData['G_k_4_r_5_DateTimeLastAdministration'] = subItem['G_k_4_r_5_DateTimeLastAdministration'];
					dosagesData['G_k_4_r_6a_DurationDrugAdministrationNum'] = subItem['G_k_4_r_6_DurationDrugAdministration']['G_k_4_r_6a_DurationDrugAdministrationNum'];
					dosagesData['G_k_4_r_6b_DurationDrugAdministrationUnit'] = subItem['G_k_4_r_6_DurationDrugAdministration']['G_k_4_r_6b_DurationDrugAdministrationUnit'];
					dosagesData['G_k_4_r_7_BatchLotNumber'] = subItem['G_k_4_r_7_BatchLotNumber'];
					dosagesData['G_k_4_r_8_DosageText'] = subItem['G_k_4_r_8_DosageText'];
					dosagesData['G_k_4_r_9_1_PharmaceuticalDoseForm'] = subItem['G_k_4_r_9_PharmaceuticalDoseForm']['G_k_4_r_9_1_PharmaceuticalDoseForm'];
					dosagesData['G_k_4_r_9_2a_PharmaceuticalDoseFormTermIDVersion'] = subItem['G_k_4_r_9_PharmaceuticalDoseForm']['G_k_4_r_9_2a_PharmaceuticalDoseFormTermIDVersion'];
					dosagesData['G_k_4_r_9_2b_PharmaceuticalDoseFormTermID'] = subItem['G_k_4_r_9_PharmaceuticalDoseForm']['G_k_4_r_9_2b_PharmaceuticalDoseFormTermID'];

					dosagesData['G_k_4_r_10_1_RouteAdministration'] = subItem['G_k_4_r_10_RouteAdministration']['G_k_4_r_10_1_RouteAdministration'];
					dosagesData['G_k_4_r_10_2a_RouteAdministrationTermIDVersion'] = subItem['G_k_4_r_10_RouteAdministration']['G_k_4_r_10_2a_RouteAdministrationTermIDVersion'];
					dosagesData['G_k_4_r_10_2b_RouteAdministrationTermID'] = subItem['G_k_4_r_10_RouteAdministration']['G_k_4_r_10_2b_RouteAdministrationTermID'];

					dosagesData['G_k_4_r_11_1_ParentRouteAdministration'] = subItem['G_k_4_r_11_ParentRouteAdministration']['G_k_4_r_11_1_ParentRouteAdministration'];
					dosagesData['G_k_4_r_11_2a_ParentRouteAdministrationTermIDVersion'] = subItem['G_k_4_r_11_ParentRouteAdministration']['G_k_4_r_11_2a_ParentRouteAdministrationTermIDVersion'];
					dosagesData['G_k_4_r_11_2b_ParentRouteAdministrationTermID'] = subItem['G_k_4_r_11_ParentRouteAdministration']['G_k_4_r_11_2b_ParentRouteAdministrationTermID'];


					dosagesArray.push(dosagesData);
				});
				dosages[index] = dosagesArray;

				let indicationsArray = [];
				Object.values(item['G_k_7_r_IndicationUseCase']).forEach((subItem, subIndex) => {
					let indicationsData = new IndicationForUse();
					indicationsData['G_k_7_r_1_IndicationPrimarySource'] = subItem['G_k_7_r_1_IndicationPrimarySource'];
					indicationsData['G_k_7_r_2a_MedDRAVersionIndication'] = subItem['G_k_7_r_2_IndicationMedDRACode']['G_k_7_r_2a_MedDRAVersionIndication'];
					indicationsData['G_k_7_r_2b_IndicationMedDRACode'] = subItem['G_k_7_r_2_IndicationMedDRACode']['G_k_7_r_2b_IndicationMedDRACode'];
					indicationsArray.push(indicationsData);
				});
				indications[index] = indicationsArray;


 				let drugReactionMatrixArray = [];
				let relatednessInMatrix = {};
				Object.values(item['G_k_9_i_DrugReactionMatrix']).forEach((subItem, subIndex) => {
					let reactionsMatrixData = new DrugReactionMatrix();
					reactionsMatrixData['G_k_9_i_3_1a_IntervalDrugAdministrationReactionNum'] = subItem['G_k_9_i_3_IntervalDrugAdministrationReaction']['G_k_9_i_3_1a_IntervalDrugAdministrationReactionNum'];
					reactionsMatrixData['G_k_9_i_3_1b_IntervalDrugAdministrationReactionUnit'] = subItem['G_k_9_i_3_IntervalDrugAdministrationReaction']['G_k_9_i_3_1b_IntervalDrugAdministrationReactionUnit'];
					reactionsMatrixData['G_k_9_i_3_2a_IntervalLastDoseDrugReactionNum'] = subItem['G_k_9_i_3_2a_IntervalLastDoseDrugReactionNum'];
					reactionsMatrixData['G_k_9_i_3_2b_IntervalLastDoseDrugReactionUnit'] = subItem['G_k_9_i_3_2b_IntervalLastDoseDrugReactionUnit'];
					reactionsMatrixData['G_k_9_i_4_ReactionRecurReadministration'] = subItem['G_k_9_i_4_ReactionRecurReadministration'];
					drugReactionMatrixArray.push(reactionsMatrixData);

					let relatednessArray = [];
					Object.values(subItem['G_k_9_i_2_AssessmentRelatednessDrugReaction']).forEach((subSubItem, subSubIndex) => {
						let relatednessData = new Relatedness();
						relatednessData['G_k_9_i_2_r_1_SourceAssessment'] = subItem['G_k_9_i_2_r_AssessmentRelatednessDrugReaction']['G_k_9_i_2_r_1_SourceAssessment'];
						relatednessData['G_k_9_i_2_r_2_MethodAssessment'] = subItem['G_k_9_i_2_r_AssessmentRelatednessDrugReaction']['G_k_9_i_2_r_2_MethodAssessment'];
						relatednessData['G_k_9_i_2_r_3_ResultAssessment'] = subItem['G_k_9_i_2_r_AssessmentRelatednessDrugReaction']['G_k_9_i_2_r_3_ResultAssessment'];
						relatednessArray.push(relatednessData);
					});
					relatednessInMatrix[subIndex] = relatednessArray;
				});
				drugReactionMatrix[index] = drugReactionMatrixArray
				relatedness[index] = relatednessInMatrix;

				let additionalInfoArray = [];
				Object.values(item['G_k_10_r_AdditionalInformationDrug']).forEach((subItem, subIndex) => {
					let additionalInfoData = new IndicationForUse();
					additionalInfoData['G_k_10_r_AdditionalInformationDrug'] = subItem;
					additionalInfoArray.push(additionalInfoData);
				});
				additionalInfo[index] = additionalInfoArray;
			});

			dispatch(setDrugs(drugs));
			dispatch(setSubstances(substances));
			dispatch(setDosages(dosages));
			dispatch(setIndications(indications));
			dispatch(setDrugReactionMatrix(drugReactionMatrix));
			dispatch(setRelatedness(relatedness));
			dispatch(setAdditionalInfo(additionalInfo));
		}
}


const getNullFlavor = (item, field) => {
	return item[field]['nullFlavor'] !== null
			? {'value': null, 'nullFlavor': nullFlavors[item[field]['nullFlavor']]}
			: item[field]
}


const drugsSlice = createSlice({
	name: 'drugs',
	initialState: {
		drugs: [],
		substances:{},
		dosages: {},
		indications: {},
		drugReactionMatrix: {},
		relatedness: {},
		additionalInfo: {}
	},
	reducers: {
		setDrugs: (state, action) => {
			state.drugs = action.payload;
		},
		setSubstances: (state, action) => {
			state.substances = action.payload;
		},
		setDosages: (state, action) => {
			state.dosages = action.payload;
		},
		setIndications: (state, action) => {
			state.indications = action.payload;
		},
		setDrugReactionMatrix: (state, action) => {
			state.drugReactionMatrix = action.payload;
		},
		setRelatedness: (state, action) => {
			state.relatedness = action.payload;
		},
		setAdditionalInfo: (state, action) => {
			state.additionalInfo = action.payload;
		},	
	}
})

export default drugsSlice.reducer;
export const {
    setDrugs,
	setSubstances,
	setDosages,
	setIndications,
	setDrugReactionMatrix,
	setRelatedness,
	setAdditionalInfo
} = drugsSlice.actions;
