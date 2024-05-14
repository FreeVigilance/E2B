import { createSlice } from '@reduxjs/toolkit';
import {
    AdditionalInfo,
    Dosage,
    Drug,
    DrugReactionMatrix,
    IndicationForUse,
    Relatedness,
    Substance,
} from './drugs';
import { nullFlavors } from '@src/components/nullFlavours';
import {
    changeData,
    getData,
    getJsonFromXml,
    parseDate,
    revertAll,
    saveData,
} from '../display/slice';
import { e2bCaseKeys } from '../common/changekeys';

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
            let itemData = {};
            itemData['id'] = item['id'];
            itemData['G_k_1_CharacterisationDrugRole'] =
                item['G_k_1_CharacterisationDrugRole'];
            itemData['G_k_2_1_1a_MPIDVersion'] = item['G_k_2_1_1a_MPIDVersion'];
            itemData['G_k_2_1_1b_MPID'] = item['G_k_2_1_1b_MPID'];
            itemData['G_k_2_1_2a_PhpidVersion'] =
                item['G_k_2_1_2a_PhPIDVersion'];
            itemData['G_k_2_1_2b_Phpid'] = item['G_k_2_1_2b_PhPID'];
            itemData['G_k_2_2_MedicinalProductNamePrimarySource'] =
                item['G_k_2_2_MedicinalProductNamePrimarySource'];
            itemData['G_k_2_4_IdentificationCountryDrugObtained'] =
                item['G_k_2_4_IdentificationCountryDrugObtained'];
            itemData['G_k_2_5_InvestigationalProductBlinded'] =
                item['G_k_2_5_InvestigationalProductBlinded'];

            let substancesData = [];
            Object.values(substances[index]).forEach((subItem, subIndex) => {
                substancesData.push({
                    id: subItem['id'],
                    G_k_2_3_r_1_SubstanceName:
                        subItem['G_k_2_3_r_1_SubstanceName'],
                    G_k_2_3_r_2a_SubstanceTermidVersion:
                        subItem['G_k_2_3_r_2a_SubstanceTermIDVersion'],
                    G_k_2_3_r_2b_SubstanceTermid:
                        subItem['G_k_2_3_r_2b_SubstanceTermID'],
                    G_k_2_3_r_3a_StrengthNum:
                        subItem['G_k_2_3_r_3a_StrengthNum'],
                    G_k_2_3_r_3b_StrengthUnit:
                        subItem['G_k_2_3_r_3b_StrengthUnit'],
                });
            });
            itemData['G_k_2_3_r_SubstanceIdStrength'] = substancesData;

            itemData['G_k_3_1_AuthorisationApplicationNumber'] =
                item['G_k_3_1_AuthorisationApplicationNumber'];
            itemData['G_k_3_2_CountryAuthorisationApplication'] =
                item['G_k_3_2_CountryAuthorisationApplication'];
            itemData['G_k_3_3_NameHolderApplicant'] =
                item['G_k_3_3_NameHolderApplicant'];

            let dosagesData = [];
            Object.values(dosages[index]).forEach((subItem, subIndex) => {
                dosagesData.push({
                    id: subItem['id'],
                    G_k_4_r_1a_DoseNum: subItem['G_k_4_r_1a_DoseNum'],
                    G_k_4_r_1b_DoseUnit: subItem['G_k_4_r_1b_DoseUnit'],
                    G_k_4_r_2_NumberUnitsInterval:
                        subItem['G_k_4_r_2_NumberUnitsInterval'],
                    G_k_4_r_3_DefinitionIntervalUnit:
                        subItem['G_k_4_r_3_DefinitionIntervalUnit'],
                    G_k_4_r_4_DateTimeDrug: getNullFlavor(
                        subItem,
                        'G_k_4_r_4_DateTimeDrug',
                        true,
                    ),
                    G_k_4_r_5_DateTimeLastAdministration: getNullFlavor(
                        subItem,
                        'G_k_4_r_5_DateTimeLastAdministration',
                        true,
                    ),
                    G_k_4_r_6a_DurationDrugAdministrationNum:
                        subItem['G_k_4_r_6a_DurationDrugAdministrationNum'],
                    G_k_4_r_6b_DurationDrugAdministrationUnit:
                        subItem['G_k_4_r_6b_DurationDrugAdministrationUnit'],
                    G_k_4_r_7_BatchLotNumber:
                        subItem['G_k_4_r_7_BatchLotNumber'],
                    G_k_4_r_8_DosageText: subItem['G_k_4_r_8_DosageText'],
                    G_k_4_r_9_1_PharmaceuticalDoseForm: getNullFlavor(
                        subItem,
                        'G_k_4_r_9_1_PharmaceuticalDoseForm',
                    ),
                    G_k_4_r_9_2a_PharmaceuticalDoseFormTermidVersion:
                        subItem[
                            'G_k_4_r_9_2a_PharmaceuticalDoseFormTermIDVersion'
                        ],
                    G_k_4_r_9_2b_PharmaceuticalDoseFormTermid:
                        subItem['G_k_4_r_9_2b_PharmaceuticalDoseFormTermID'],
                    G_k_4_r_10_1_RouteAdministration: getNullFlavor(
                        subItem,
                        'G_k_4_r_10_1_RouteAdministration',
                    ),
                    G_k_4_r_10_2a_RouteAdministrationTermidVersion:
                        subItem[
                            'G_k_4_r_10_2a_RouteAdministrationTermIDVersion'
                        ],
                    G_k_4_r_10_2b_RouteAdministrationTermid:
                        subItem['G_k_4_r_10_2b_RouteAdministrationTermID'],
                    G_k_4_r_11_1_ParentRouteAdministration: getNullFlavor(
                        subItem,
                        'G_k_4_r_11_1_ParentRouteAdministration',
                    ),
                    G_k_4_r_11_2a_ParentRouteAdministrationTermidVersion:
                        subItem[
                            'G_k_4_r_11_2a_ParentRouteAdministrationTermIDVersion'
                        ],
                    G_k_4_r_11_2b_ParentRouteAdministrationTermid:
                        subItem[
                            'G_k_4_r_11_2b_ParentRouteAdministrationTermID'
                        ],
                });
            });
            itemData['G_k_4_r_DosageInformation'] = dosagesData;

            itemData['G_k_5a_CumulativeDoseFirstReactionNum'] =
                item['G_k_5a_CumulativeDoseFirstReactionNum'];
            itemData['G_k_5b_CumulativeDoseFirstReactionUnit'] =
                item['G_k_5b_CumulativeDoseFirstReactionUnit'];
            itemData['G_k_6a_GestationPeriodExposureNum'] =
                item['G_k_6a_GestationPeriodExposureNum'];
            itemData['G_k_6b_GestationPeriodExposureUnit'] =
                item['G_k_6b_GestationPeriodExposureUnit'];

            let indicationsData = [];
            Object.values(indications[index]).forEach((subItem, subIndex) => {
                indicationsData.push({
                    id: subItem['id'],
                    G_k_7_r_1_IndicationPrimarySource: getNullFlavor(
                        subItem,
                        'G_k_7_r_1_IndicationPrimarySource',
                    ),
                    G_k_7_r_2a_MeddraVersionIndication:
                        subItem['G_k_7_r_2a_MedDRAVersionIndication'],
                    G_k_7_r_2b_IndicationMeddraCode:
                        subItem['G_k_7_r_2b_IndicationMedDRACode'],
                });
            });
            itemData['G_k_7_r_IndicationUseCase'] = indicationsData;

            itemData['G_k_8_ActionTakenDrug'] = item['G_k_8_ActionTakenDrug'];

            const findReactionByName = (name) => {
                let res;
                Object.values(getState().reactions.reactionsData).forEach((item, index) => {
                    if (item['E_i_1_1a_ReactionPrimarySourceNativeLanguage'].value === name) {
                        console.log(item['id']);
                        if (item['id'] !== null) {
                            res = item['id'];
                        } else {
                            res = item['uuid'];
                        }
                    }
                });
                return res;
            }

            let drugReactionMatrixData = [];
            Object.values(drugReactionMatrix[index]).forEach(
                (subItem, subIndex) => {
                    let data = {
                        id: subItem['id'],
                        G_k_9_i_1_ReactionAssessed: findReactionByName(subItem['G_k_9_i_1_ReactionAssessed']),
                        G_k_9_i_3_1a_IntervalDrugAdministrationReactionNum:
                            subItem[
                                'G_k_9_i_3_1a_IntervalDrugAdministrationReactionNum'
                            ],
                        G_k_9_i_3_1b_IntervalDrugAdministrationReactionUnit:
                            subItem[
                                'G_k_9_i_3_1b_IntervalDrugAdministrationReactionUnit'
                            ],
                        G_k_9_i_3_2a_IntervalLastDoseDrugReactionNum:
                            subItem[
                                'G_k_9_i_3_2a_IntervalLastDoseDrugReactionNum'
                            ],
                        G_k_9_i_3_2b_IntervalLastDoseDrugReactionUnit:
                            subItem[
                                'G_k_9_i_3_2b_IntervalLastDoseDrugReactionUnit'
                            ],
                        G_k_9_i_4_ReactionRecurReadministration:
                            subItem['G_k_9_i_4_ReactionRecurReadministration'],
                    };
                    let relatednessData = [];
                    Object.values(relatedness[index][subIndex]).forEach(
                        (subSubItem, subSubIndex) => {
                            relatednessData.push({
                                id: subSubItem['id'],
                                G_k_9_i_2_r_1_SourceAssessment:
                                    subSubItem[
                                        'G_k_9_i_2_r_1_SourceAssessment'
                                    ],
                                G_k_9_i_2_r_2_MethodAssessment:
                                    subSubItem[
                                        'G_k_9_i_2_r_2_MethodAssessment'
                                    ],
                                G_k_9_i_2_r_3_ResultAssessment:
                                    subSubItem[
                                        'G_k_9_i_2_r_3_ResultAssessment'
                                    ],
                            });
                        },
                    );
                    data['G_k_9_i_2_r_AssessmentRelatednessDrugReaction'] =
                        relatednessData;
                    drugReactionMatrixData.push(data);
                },
            );
            itemData['G_k_9_i_DrugReactionMatrix'] = drugReactionMatrixData;

            let addInfoData = [];
            Object.values(additionalInfo[index]).forEach(
                (subItem, subIndex) => {
                    addInfoData.push({
                        G_k_10_r_AdditionalInformationDrug:
                            subItem['G_k_10_r_AdditionalInformationDrug'],
                        id: subItem['id'],
                    });
                },
            );
            itemData['G_k_10_r_AdditionalInformationDrug'] = addInfoData;

            itemData['G_k_11_AdditionalInformationDrug'] =
                item['G_k_11_AdditionalInformationDrug'];

            data.push(itemData);
        });
        return data;
    };
};

export const parseDrug = (data) => {
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
            drugsData['id'] = item['id'];
            drugsData['G_k_1_CharacterisationDrugRole'] =
                item['G_k_1_CharacterisationDrugRole'];
            drugsData['G_k_2_1_1a_MPIDVersion'] =
                item['G_k_2_1_1a_MPIDVersion'];
            drugsData['G_k_2_1_1b_MPID'] = item['G_k_2_1_1b_MPID'];
            drugsData['G_k_2_1_2a_PhPIDVersion'] =
                item['G_k_2_1_2a_PhPIDVersion'];
            drugsData['G_k_2_1_2b_PhPID'] = item['G_k_2_1_2b_PhPID'];
            drugsData['G_k_2_2_MedicinalProductNamePrimarySource'] =
                item['G_k_2_2_MedicinalProductNamePrimarySource'];
            drugsData['G_k_2_4_IdentificationCountryDrugObtained'] =
                item['G_k_2_4_IdentificationCountryDrugObtained'];
            drugsData['G_k_2_5_InvestigationalProductBlinded'] =
                item['G_k_2_5_InvestigationalProductBlinded'];

            drugsData['G_k_3_1_AuthorisationApplicationNumber'] =
                item['G_k_3_1_AuthorisationApplicationNumber'];
            drugsData['G_k_3_2_CountryAuthorisationApplication'] =
                item['G_k_3_2_CountryAuthorisationApplication'];
            drugsData['G_k_3_3_NameHolderApplicant'] =
                item['G_k_3_3_NameHolderApplicant'];
            drugsData['G_k_5a_CumulativeDoseFirstReactionNum'] =
                item['G_k_5a_CumulativeDoseFirstReactionNum'];
            drugsData['G_k_5b_CumulativeDoseFirstReactionUnit'] =
                item['G_k_5b_CumulativeDoseFirstReactionUnit'];
            drugsData['G_k_6a_GestationPeriodExposureNum'] =
                item['G_k_6a_GestationPeriodExposureNum'];
            drugsData['G_k_6b_GestationPeriodExposureUnit'] =
                item['G_k_6b_GestationPeriodExposureUnit'];
            drugsData['G_k_8_ActionTakenDrug'] = item['G_k_8_ActionTakenDrug'];
            drugsData['G_k_11_AdditionalInformationDrug'] =
                item['G_k_11_AdditionalInformationDrug'];
            drugs.push(drugsData);

            substances[index] = item['G_k_2_3_r_SubstanceIdStrength'];

            dosages[index] = item['G_k_4_r_DosageInformation'];

            indications[index] = item['G_k_7_r_IndicationUseCase'];

            drugReactionMatrix[index] = item['G_k_9_i_DrugReactionMatrix'];
            relatedness[index] = {};
            Object.values(item['G_k_9_i_DrugReactionMatrix']).forEach(
                (item, subIndex) => {
                    relatedness[index][subIndex] =
                        item['G_k_9_i_2_r_AssessmentRelatednessDrugReaction'];
                },
            );

            additionalInfo[index] = item['G_k_10_r_AdditionalInformationDrug'];
        });
    }

    return [
        drugs,
        substances,
        dosages,
        indications,
        drugReactionMatrix,
        relatedness,
        additionalInfo,
    ];
};

const getNullFlavor = (item, field, isDate = false) => {
    return item[field]['nullFlavor'] !== null
        ? { value: null, nullFlavor: nullFlavors[item[field]['nullFlavor']] }
        : isDate
        ? { value: parseDate(item[field].value), nullFlavor: null }
        : item[field];
};

const initialState = {
    drugs: [],
    substances: {},
    dosages: {},
    indications: {},
    drugReactionMatrix: {},
    relatedness: {},
    additionalInfo: {},
};

const drugsSlice = createSlice({
    name: 'drugs',
    initialState: initialState,
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
        builder.addCase(revertAll, () => initialState);

        builder.addCase(getData.fulfilled, (state, action) => {
            if (action.payload.g_k_drug_information) {
                const data = e2bCaseKeys(action.payload.g_k_drug_information);
                console.log('drugs', data);
                let res = parseDrug(data);
                state.drugs = res[0];
                state.substances = res[1];
                state.dosages = res[2];
                state.indications = res[3];
                state.drugReactionMatrix = res[4];
                state.relatedness = res[5];
                state.additionalInfo = res[6];
            }
        });

        builder.addCase(saveData.fulfilled, (state, action) => {
            if (action.payload.g_k_drug_information) {
                const data = e2bCaseKeys(action.payload.g_k_drug_information);
                console.log('drugs', data);
                let res = parseDrug(data);
                state.drugs = res[0];
                state.substances = res[1];
                state.dosages = res[2];
                state.indications = res[3];
                state.drugReactionMatrix = res[4];
                state.relatedness = res[5];
                state.additionalInfo = res[6];
            }
        });

        builder.addCase(changeData.fulfilled, (state, action) => {
            if (action.payload.g_k_drug_information) {
                const data = e2bCaseKeys(action.payload.g_k_drug_information);
                console.log('drugs', data);
                let res = parseDrug(data);
                state.drugs = res[0];
                state.substances = res[1];
                state.dosages = res[2];
                state.indications = res[3];
                state.drugReactionMatrix = res[4];
                state.relatedness = res[5];
                state.additionalInfo = res[6];
            }
        });

        builder.addCase(getJsonFromXml.fulfilled, (state, action) => {
            if (action.payload.g_k_drug_information) {
                const data = e2bCaseKeys(action.payload.g_k_drug_information);
                console.log('drugs', data);
                let res = parseDrug(data);
                state.drugs = res[0];
                state.substances = res[1];
                state.dosages = res[2];
                state.indications = res[3];
                state.drugReactionMatrix = res[4];
                state.relatedness = res[5];
                state.additionalInfo = res[6];
            }
        });
    },
});

export default drugsSlice.reducer;
export const {
    setDrugs,
    setSubstances,
    setDosages,
    setIndications,
    setDrugReactionMatrix,
    setRelatedness,
    setAdditionalInfo,
} = drugsSlice.actions;
