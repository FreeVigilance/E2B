import { createSlice } from '@reduxjs/toolkit'
import {AdditionalInfo, Dosage, Drug, DrugReactionMatrix, IndicationForUse, Relatedness, Substance} from './drugs';
import { nullFlavors } from '@src/components/nullFlavours';
import { getData } from '../display/slice';

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
		return data;
	}
}

export const parseDrug = (jsonData) => {
	let data = jsonData['g_k_drug_information'];
			
	let drugs = [];
	let substances = {};
	let dosages = {};
	let indications = {};
	let drugReactionMatrix = {};
	let relatedness = {};
	let additionalInfo = {};

	if (data) {
		Object.values(data).forEach((item, index) => {
			let drugsData = new Drug();
			drugsData['G_k_1_CharacterisationDrugRole'] = item['g_k_1_characterisation_drug_role'];
			drugsData['G_k_2_1_1a_MPIDVersion'] = item['g_k_2_drug_identification']['g_k_2_1_mpid_phpid']['g_k_2_1_1a_mpid_version'];
			drugsData['G_k_2_1_1b_MPID'] = item['g_k_2_drug_identification']['g_k_2_1_mpid_phpid']['g_k_2_1_1b_mpid'];
			drugsData['G_k_2_1_2a_PhPIDVersion'] = item['g_k_2_drug_identification']['g_k_2_1_2a_phpid_version'];
			drugsData['G_k_2_1_2b_PhPID'] = item['g_k_2_drug_identification']['g_k_2_1_2b_phpid'];
			drugsData['G_k_2_2_MedicinalProductNamePrimarySource'] = item['g_k_2_drug_identification']['g_k_2_2_medicinal_product_name_primary_source'];
			drugsData['G_k_2_4_IdentificationCountryDrugObtained'] = item['g_k_2_drug_identification']['g_k_2_4_identification_country_drug_obtained'];
			drugsData['G_k_2_5_InvestigationalProductBlinded'] = item['g_k_2_drug_identification']['g_k_2_5_investigational_product_blinded'];

			drugsData['G_k_3_1_AuthorisationApplicationNumber'] = item['g_k_3_holder_authorisation_application_number_drug']['g_k_3_1_authorisation_application_number'];
			drugsData['G_k_3_2_CountryAuthorisationApplication'] = item['g_k_3_holder_authorisation_application_number_drug']['g_k_3_2_country_authorisation_application'];
			drugsData['G_k_3_3_NameHolderApplicant'] = item['g_k_3_holder_authorisation_application_number_drug']['g_k_3_3_name_holder_applicant'];
			drugsData['G_k_5a_CumulativeDoseFirstReactionNum'] = item['g_k_5_cumulative_dose_first_reaction']['g_k_5a_cumulative_dose_first_reaction_num'];
			drugsData['G_k_5b_CumulativeDoseFirstReactionUnit'] = item['g_k_5_cumulative_dose_first_reaction']['g_k_5b_cumulative_dose_first_reaction_unit'];
			drugsData['G_k_6a_GestationPeriodExposureNum'] = item['g_k_6_gestation_period_exposure']['g_k_6a_gestation_period_exposure_num'];
			drugsData['G_k_6b_GestationPeriodExposureUnit'] = item['g_k_6_gestation_period_exposure']['g_k_6b_gestation_period_exposure_unit'];
			drugsData['G_k_8_ActionTakenDrug'] = item['g_k_8_action_taken_drug'];
			drugsData['G_k_11_AdditionalInformationDrug'] = item['g_k_11_additional_information_drug'];
			drugs.push(drugsData);

			let substancesArray = [];
			if (item['g_k_2_drug_identification']['g_k_2_3_r_substance_id_strength']) {
				Object.values(item['g_k_2_drug_identification']['g_k_2_3_r_substance_id_strength']).forEach((subItem, subIndex) => {
					let substancesData = new Substance();
					substancesData['G_k_2_3_r_1_SubstanceName'] = subItem['g_k_2_3_r_1_substance_name'];
					substancesData['G_k_2_3_r_2a_SubstanceTermIDVersion'] = subItem['g_k_2_3_r_2a_substance_termid_version'];
					substancesData['G_k_2_3_r_2b_SubstanceTermID'] = subItem['g_k_2_3_r_2b_substance_termid'];
					substancesData['G_k_2_3_r_3a_StrengthNum'] = subItem['g_k_2_3_r_3a_strength_num'];
					substancesData['G_k_2_3_r_3b_StrengthUnit'] = subItem['g_k_2_3_r_3b_strength_unit'];

					substancesArray.push(substancesData);
				});
			}
			substances[index] = substancesArray;

			let dosagesArray = [];
			if (item['g_k_4_r_dosage_information']) {
				Object.values(item['g_k_4_r_dosage_information']).forEach((subItem, subIndex) => {
					let dosagesData = new Dosage();
					dosagesData['G_k_4_r_1a_DoseNum'] = subItem['g_k_4_r_1a_dose_num'];
					dosagesData['G_k_4_r_1b_DoseUnit'] = subItem['g_k_4_r_1b_dose_unit'];
					dosagesData['G_k_4_r_2_NumberUnitsInterval'] = subItem['g_k_4_r_2_number_units_interval'];
					dosagesData['G_k_4_r_3_DefinitionIntervalUnit'] = subItem['g_k_4_r_3_definition_interval_unit'];
					dosagesData['G_k_4_r_4_DateTimeDrug'] = subItem['g_k_4_r_4_date_time_drug'];
					dosagesData['G_k_4_r_5_DateTimeLastAdministration'] = subItem['g_k_4_r_5_date_time_last_administration'];
					dosagesData['G_k_4_r_6a_DurationDrugAdministrationNum'] = subItem['g_k_4_r_6_duration_drug_administration']['g_k_4_r_6a_duration_drug_administration_num'];
					dosagesData['G_k_4_r_6b_DurationDrugAdministrationUnit'] = subItem['g_k_4_r_6_duration_drug_administration']['g_k_4_r_6b_duration_drug_administration_unit'];
					dosagesData['G_k_4_r_7_BatchLotNumber'] = subItem['g_k_4_r_7_batch_lot_number'];
					dosagesData['G_k_4_r_8_DosageText'] = subItem['g_k_4_r_8_dosage_text'];
					dosagesData['G_k_4_r_9_1_PharmaceuticalDoseForm'] = subItem['g_k_4_r_9_pharmaceutical_dose_form']['g_k_4_r_9_1_pharmaceutical_dose_form'];
					dosagesData['G_k_4_r_9_2a_PharmaceuticalDoseFormTermIDVersion'] = subItem['g_k_4_r_9_pharmaceutical_dose_form']['g_k_4_r_9_2a_pharmaceutical_dose_form_termid_version'];
					dosagesData['G_k_4_r_9_2b_PharmaceuticalDoseFormTermID'] = subItem['g_k_4_r_9_pharmaceutical_dose_form']['g_k_4_r_9_2b_pharmaceutical_dose_form_termid'];

					dosagesData['G_k_4_r_10_1_RouteAdministration'] = subItem['g_k_4_r_10_route_administration']['g_k_4_r_10_1_route_administration'];
					dosagesData['G_k_4_r_10_2a_RouteAdministrationTermIDVersion'] = subItem['g_k_4_r_10_route_administration']['g_k_4_r_10_2a_route_administration_termid_version'];
					dosagesData['G_k_4_r_10_2b_RouteAdministrationTermID'] = subItem['g_k_4_r_10_route_administration']['g_k_4_r_10_2b_route_administration_termid'];

					dosagesData['G_k_4_r_11_1_ParentRouteAdministration'] = subItem['g_k_4_r_11_parent_route_administration']['g_k_4_r_11_1_parent_route_administration'];
					dosagesData['G_k_4_r_11_2a_ParentRouteAdministrationTermIDVersion'] = subItem['g_k_4_r_11_parent_route_administration']['g_k_4_r_11_2a_parent_route_administration_termid_version'];
					dosagesData['G_k_4_r_11_2b_ParentRouteAdministrationTermID'] = subItem['g_k_4_r_11_parent_route_administration']['g_k_4_r_11_2b_parent_route_administration_termid'];

					dosagesArray.push(dosagesData);
				});
			}
			dosages[index] = dosagesArray;

			let indicationsArray = [];
			if (item['g_k_7_r_indication_use_case']) {
				Object.values(item['g_k_7_r_indication_use_case']).forEach((subItem, subIndex) => {
					let indicationsData = new IndicationForUse();
					indicationsData['G_k_7_r_1_IndicationPrimarySource'] = subItem['g_k_7_r_1_indication_primary_source'];
					indicationsData['G_k_7_r_2a_MedDRAVersionIndication'] = subItem['g_k_7_r_2_indication_meddra_code']['g_k_7_r_2a_meddra_version_indication'];
					indicationsData['G_k_7_r_2b_IndicationMedDRACode'] = subItem['g_k_7_r_2_indication_meddra_code']['g_k_7_r_2b_indication_meddra_code'];
					indicationsArray.push(indicationsData);
				});
			}
			indications[index] = indicationsArray;


			let drugReactionMatrixArray = [];
			let relatednessInMatrix = {};
			if (item['g_k_9_i_drug_reaction_matrix']) {
				Object.values(item['g_k_9_i_drug_reaction_matrix']).forEach((subItem, subIndex) => {
					let reactionsMatrixData = new DrugReactionMatrix();
					reactionsMatrixData['G_k_9_i_3_1a_IntervalDrugAdministrationReactionNum'] = subItem['g_k_9_i_3_interval_drug_administration_reaction']['g_k_9_i_3_1a_interval_drug_administration_reaction_num'];
					reactionsMatrixData['G_k_9_i_3_1b_IntervalDrugAdministrationReactionUnit'] = subItem['g_k_9_i_3_interval_drug_administration_reaction']['g_k_9_i_3_1b_interval_drug_administration_reaction_unit'];
					reactionsMatrixData['G_k_9_i_3_2a_IntervalLastDoseDrugReactionNum'] = subItem['g_k_9_i_3_interval_drug_administration_reaction']['g_k_9_i_3_2a_interval_last_dose_drug_reaction_num'];
					reactionsMatrixData['G_k_9_i_3_2b_IntervalLastDoseDrugReactionUnit'] = subItem['g_k_9_i_3_interval_drug_administration_reaction']['g_k_9_i_3_2b_interval_last_dose_drug_reaction_unit'];
					reactionsMatrixData['G_k_9_i_4_ReactionRecurReadministration'] = subItem['g_k_9_i_4_reaction_recur_readministration'];
					drugReactionMatrixArray.push(reactionsMatrixData);

					let relatednessArray = [];
					if (subItem['g_k_9_i_2_assessment_relatedness_drug_reaction']) {
						Object.values(subItem['g_k_9_i_2_assessment_relatedness_drug_reaction']).forEach((subSubItem, subSubIndex) => {
							let relatednessData = new Relatedness();
							relatednessData['G_k_9_i_2_r_1_SourceAssessment'] = subItem['g_k_9_i_2_r_assessment_relatedness_drug_reaction']['g_k_9_i_2_r_1_source_assessment'];
							relatednessData['G_k_9_i_2_r_2_MethodAssessment'] = subItem['g_k_9_i_2_r_assessment_relatedness_drug_reaction']['g_k_9_i_2_r_2_method_assessment'];
							relatednessData['G_k_9_i_2_r_3_ResultAssessment'] = subItem['g_k_9_i_2_r_assessment_relatedness_drug_reaction']['g_k_9_i_2_r_3_result_assessment'];
							relatednessArray.push(relatednessData);
						});
					}
					relatednessInMatrix[subIndex] = relatednessArray;
				});
			}
			drugReactionMatrix[index] = drugReactionMatrixArray
			relatedness[index] = relatednessInMatrix;

			let additionalInfoArray = [];
			if (item['g_k_10_r_additional_information_drug']) {
				Object.values(item['g_k_10_r_additional_information_drug']).forEach((subItem, subIndex) => {
					let additionalInfoData = new IndicationForUse();
					additionalInfoData['G_k_10_r_AdditionalInformationDrug'] = subItem;
					additionalInfoArray.push(additionalInfoData);
				});
			}
			additionalInfo[index] = additionalInfoArray;
		});
	}

	return [drugs, substances, dosages, indications, drugReactionMatrix, relatedness, additionalInfo];
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
	},
	extraReducers: (builder) => {
        builder.addCase(getData.fulfilled, (state, action) => {
            let res = parseDrug(action.payload);
			state.drugs = res[0];
			state.substances = res[1];
			state.dosages = res[2];
			state.indications = res[3];
			state.drugReactionMatrix = res[4];
			state.relatedness = res[5];
			state.additionalInfo = res[6];
        });
    },
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
