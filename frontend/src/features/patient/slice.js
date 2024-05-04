import { createSlice } from '@reduxjs/toolkit';
import {
    AutopsyData,
    CauseOfDeath,
    DrugHistory,
    MedHistory,
    ParentChildData,
    ParentData,
    ParentDrugHistory,
    ParentHistoryData,
    PatientInfo,
} from './patient';
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
            D_PatientCharacteristics: {
                id: patientData['id'],
                D_1_Patient: getNullFlavor(patientData, 'D_1_Patient'),
                D_1_1_1_MedicalRecordNumberSourceGP:
                    patientData['D_1_1_1_MedicalRecordNumberSourceGP'][
                        'value'
                    ] === null
                        ? { value: null, nullFlavor: 'MSK' }
                        : {
                              value: patientData[
                                  'D_1_1_1_MedicalRecordNumberSourceGP'
                              ]['value'],
                              nullFlavor: null,
                          },
                D_1_1_2_MedicalRecordNumberSourceSpecialist:
                    patientData['D_1_1_2_MedicalRecordNumberSourceSpecialist'][
                        'value'
                    ] === null
                        ? { value: null, nullFlavor: 'MSK' }
                        : {
                              value: patientData[
                                  'D_1_1_2_MedicalRecordNumberSourceSpecialist'
                              ]['value'],
                              nullFlavor: null,
                          },
                D_1_1_3_MedicalRecordNumberSourceHospital:
                    patientData['D_1_1_3_MedicalRecordNumberSourceHospital'][
                        'value'
                    ] === null
                        ? { value: null, nullFlavor: 'MSK' }
                        : {
                              value: patientData[
                                  'D_1_1_3_MedicalRecordNumberSourceHospital'
                              ]['value'],
                              nullFlavor: null,
                          },
                D_1_1_4_MedicalRecordNumberSourceInvestigation:
                    patientData[
                        'D_1_1_4_MedicalRecordNumberSourceInvestigation'
                    ]['value'] === null
                        ? { value: null, nullFlavor: 'MSK' }
                        : {
                              value: patientData[
                                  'D_1_1_4_MedicalRecordNumberSourceInvestigation'
                              ]['value'],
                              nullFlavor: null,
                          },
                D_2_1_DateBirth:
                    patientData['D_2_1_DateBirth']['value'] === null
                        ? { value: null, nullFlavor: 'MSK' }
                        : {
                              value: parseDate(
                                  patientData['D_2_1_DateBirth']['value'],
                              ),
                              nullFlavor: null,
                          },
                D_2_2a_AgeOnsetReactionNum:
                    patientData['D_2_2a_AgeOnsetReactionNum'],
                D_2_2b_AgeOnsetReactionUnit:
                    patientData['D_2_2b_AgeOnsetReactionUnit'],
                D_2_2_1a_GestationPeriodReactionFoetusNum:
                    patientData['D_2_2_1a_GestationPeriodReactionFoetusNum'],
                D_2_2_1b_GestationPeriodReactionFoetusUnit:
                    patientData['D_2_2_1b_GestationPeriodReactionFoetusUnit'],
                D_2_3_PatientAgeGroup: patientData['D_2_3_PatientAgeGroup'],
                D_3_BodyWeight: patientData['D_3_BodyWeight'],
                D_4_Height: patientData['D_4_Height'],
                D_5_Sex: getNullFlavor(patientData, 'D_5_Sex'),
                D_6_LastMenstrualPeriodDate:
                    patientData['D_6_LastMenstrualPeriodDate']['value'] === null
                        ? { value: null, nullFlavor: 'MSK' }
                        : {
                              value: parseDate(
                                  patientData['D_6_LastMenstrualPeriodDate'][
                                      'value'
                                  ],
                              ),
                              nullFlavor: null,
                          },
                D_7_2_TextMedicalHistory: getNullFlavor(
                    patientData,
                    'D_7_2_TextMedicalHistory',
                ),
                D_7_3_ConcomitantTherapies:
                    patientData['D_7_3_ConcomitantTherapies'],
                D_9_1_DateDeath: getNullFlavor(
                    patientData,
                    'D_9_1_DateDeath',
                    true,
                ),
                D_9_3_Autopsy: getNullFlavor(patientData, 'D_9_3_Autopsy'),
                D_10_1_ParentIdentification: getNullFlavor(
                    parentChildData,
                    'D_10_1_ParentIdentification',
                ),
                D_10_2_1_DateBirthParent: getNullFlavor(
                    parentChildData,
                    'D_10_2_1_DateBirthParent',
                    true,
                ),
                D_10_2_2a_AgeParentNum:
                    parentChildData['D_10_2_2a_AgeParentNum'],
                D_10_2_2b_AgeParentUnit:
                    parentChildData['D_10_2_2b_AgeParentUnit'],
                D_10_3_LastMenstrualPeriodDateParent: getNullFlavor(
                    parentChildData,
                    'D_10_3_LastMenstrualPeriodDateParent',
                    true,
                ),
                D_10_4_BodyWeightParent:
                    parentChildData['D_10_4_BodyWeightParent'],
                D_10_5_HeightParent: parentChildData['D_10_5_HeightParent'],
                D_10_6_SexParent: getNullFlavor(
                    parentChildData,
                    'D_10_6_SexParent',
                ),
            },
        };

        let medHistoryData = [];
        Object.values(medicalHistory).forEach((item, index) => {
            medHistoryData.push({
                id: item['id'],
                D_7_1_r_1a_MedDRAVersionMedicalHistory:
                    item['D_7_1_r_1a_MedDRAVersionMedicalHistory'],
                D_7_1_r_1b_MedicalHistoryMedDRACode:
                    item['D_7_1_r_1b_MedicalHistoryMedDRACode'],
                D_7_1_r_2_StartDate: getNullFlavor(
                    item,
                    'D_7_1_r_2_StartDate',
                    true,
                ),
                D_7_1_r_3_Continuing: getNullFlavor(
                    item,
                    'D_7_1_r_3_Continuing',
                ),
                D_7_1_r_4_EndDate: getNullFlavor(
                    item,
                    'D_7_1_r_4_EndDate',
                    true,
                ),
                D_7_1_r_5_Comments: item['D_7_1_r_5_Comments'],
                D_7_1_r_6_FamilyHistory: item['D_7_1_r_6_FamilyHistory'],
            });
        });
        jsonResult['D_PatientCharacteristics'][
            'D_7_1_r_StructuredInformationMedicalHistory'
        ] = medHistoryData;

        let drugHistoryData = [];
        Object.values(drugHistory).forEach((item, index) => {
            let itemData = {};
            itemData['id'] = item['id'];
            itemData['D_8_r_1_NameDrug'] = getNullFlavor(
                item,
                'D_8_r_1_NameDrug',
            );
            (itemData['D_8_r_2a_MPIDVersion'] = item['D_8_r_2a_MPIDVersion']),
                (itemData['D_8_r_2b_MPID'] = item['D_8_r_2b_MPID']);
            (itemData['D_8_r_3a_PhPIDVersion'] = item['D_8_r_3a_PhPIDVersion']),
                (itemData['D_8_r_3b_PhPID'] = item['D_8_r_3b_PhPID']);
            itemData['D_8_r_4_StartDate'] = getNullFlavor(
                item,
                'D_8_r_4_StartDate',
                true,
            );
            itemData['D_8_r_5_EndDate'] = getNullFlavor(
                item,
                'D_8_r_5_EndDate',
                true,
            );
            (itemData['D_8_r_6a_MedDRAVersionIndication'] =
                item['D_8_r_6a_MedDRAVersionIndication']),
                (itemData['D_8_r_6b_IndicationMedDRACode'] =
                    item['D_8_r_6b_IndicationMedDRACode']);
            (itemData['D_8_r_7a_MedDRAVersionReaction'] =
                item['D_8_r_7a_MedDRAVersionReaction']),
                (itemData['D_8_r_7b_ReactionMedDRACode'] =
                    item['D_8_r_7b_ReactionMedDRACode']);
            drugHistoryData.push(itemData);
        });
        jsonResult['D_PatientCharacteristics']['D_8_r_PastDrugHistory'] =
            drugHistoryData;

        let causeOfDeathData = [];
        Object.values(causeOfDeath).forEach((item, index) => {
            causeOfDeathData.push({
                id: item['id'],
                D_9_2_r_1a_MedDRAVersionCauseDeath:
                    item['D_9_2_r_1a_MedDRAVersionCauseDeath'],
                D_9_2_r_1b_CauseDeathMedDRACode:
                    item['D_9_2_r_1b_CauseDeathMedDRACode'],
                D_9_2_r_2_CauseDeath: item['D_9_2_r_2_CauseDeath'],
            });
        });
        let autopsyData = [];
        Object.values(autopsy).forEach((item, index) => {
            autopsyData.push({
                id: item['id'],
                D_9_4_r_1a_MedDRAVersionAutopsyDeterminedCauseDeath:
                    item['D_9_4_r_1a_MedDRAVersionAutopsyDeterminedCauseDeath'],
                D_9_4_r_1b_AutopsyDeterminedCauseDeathMedDRACode:
                    item['D_9_4_r_1b_AutopsyDeterminedCauseDeathMedDRACode'],
                D_9_4_r_2_AutopsyDeterminedCauseDeath:
                    item['D_9_4_r_2_AutopsyDeterminedCauseDeath'],
            });
        });
        jsonResult['D_PatientCharacteristics']['D_9_2_r_CauseDeath'] =
            causeOfDeathData;
        jsonResult['D_PatientCharacteristics'][
            'D_9_4_r_AutopsyDeterminedCauseDeath'
        ] = autopsyData;

        let parentDataRes = [];
        Object.values(parentData).forEach((item, index) => {
            let itemData = {
                id: item['id'],
                D_10_7_1_r_1a_MeddraVersionMedicalHistory:
                    item['D_10_7_1_r_1a_MedDRAVersionMedicalHistory'],
                D_10_7_1_r_1b_MedicalHistoryMeddraCode:
                    item['D_10_7_1_r_1b_MedicalHistoryMedDRACode'],
                D_10_7_1_r_2_StartDate: getNullFlavor(
                    item,
                    'D_10_7_1_r_2_StartDate',
                    true,
                ),
                D_10_7_1_r_3_Continuing: getNullFlavor(
                    item,
                    'D_10_7_1_r_3_Continuing',
                ),
                D_10_7_1_r_4_EndDate: getNullFlavor(
                    item,
                    'D_10_7_1_r_4_EndDate',
                    true,
                ),
                D_10_7_1_r_5_Comments: item['D_10_7_1_r_5_Comments'],
            };

            parentDataRes.push(itemData);
        });

        jsonResult['D_PatientCharacteristics'][
            'D_10_7_1_r_StructuredInformationParentMeddraCode'
        ] = parentDataRes;
        jsonResult['D_PatientCharacteristics'][
            'D_10_7_2_TextMedicalHistoryParent'
        ] = parentHistoryData['D_10_7_2_TextMedicalHistoryParent'];

        let parentDrugHistoryData = [];
        Object.values(parentDrugHistory).forEach((item, index) => {
            let itemData = {
                id: item['id'],
                D_10_8_r_1_NameDrug: item['D_10_8_r_1_NameDrug'],
                D_10_8_r_2a_MPIDVersion: item['D_10_8_r_2a_MPIDVersion'],
                D_10_8_r_2b_MPID: item['D_10_8_r_2b_MPID'],
                D_10_8_r_3a_PhPIDVersion: item['D_10_8_r_3a_PhPIDVersion'],
                D_10_8_r_3b_PhPID: item['D_10_8_r_3b_PhPID'],
                D_10_8_r_4_StartDate: getNullFlavor(
                    item,
                    'D_10_8_r_4_StartDate',
                    true,
                ),
                D_10_8_r_5_EndDate: getNullFlavor(
                    item,
                    'D_10_8_r_5_EndDate',
                    true,
                ),
                D_10_8_r_6a_MedDRAVersionIndication:
                    item['D_10_8_r_6a_MedDRAVersionIndication'],
                D_10_8_r_6b_IndicationMedDRACode:
                    item['D_10_8_r_6b_IndicationMedDRACode'],
                D_10_8_r_7a_MedDRAVersionReaction:
                    item['D_10_8_r_7a_MedDRAVersionReaction'],
                D_10_8_r_7b_ReactionsMedDRACode:
                    item['D_10_8_r_7b_ReactionsMedDRACode'],
            };
            parentDrugHistoryData.push(itemData);
        });

        jsonResult['D_PatientCharacteristics'][
            'D_10_8_r_PastDrugHistoryParent'
        ] = parentDrugHistoryData;

        return jsonResult;
    };
};

const getNullFlavor = (item, field, isDate = false) => {
    return item[field]['nullFlavor'] !== null
        ? { value: null, nullFlavor: nullFlavors[item[field]['nullFlavor']] }
        : isDate
        ? { value: parseDate(item[field].value), nullFlavor: null }
        : item[field];
};

const initialState = {
    patientData: new PatientInfo(),
    medicalHistory: [],
    drugHistory: [],
    causeOfDeath: [],
    autopsy: [],
    parentChildData: new ParentChildData(),
    parentHistoryData: new ParentHistoryData(),
    parentData: [],
    parentDrugHistory: [],
};

const patientSlice = createSlice({
    name: 'patient',
    initialState: initialState,
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
        builder.addCase(revertAll, () => initialState);

        builder.addCase(getData.fulfilled, (state, action) => {
            const data = e2bCaseKeys(action.payload.d_patient_characteristics);
            console.log('patient', data);

            let patientData = new PatientInfo();
            patientData['id'] = data['id'];
            patientData['D_1_Patient'] = data['D_1_Patient'];
            patientData['D_1_1_1_MedicalRecordNumberSourceGP'] =
                data['D_1_1_1_MedicalRecordNumberSourceGp'];
            patientData['D_1_1_2_MedicalRecordNumberSourceSpecialist'] =
                data['D_1_1_2_MedicalRecordNumberSourceSpecialist'];
            patientData['D_1_1_3_MedicalRecordNumberSourceHospital'] =
                data['D_1_1_3_MedicalRecordNumberSourceHospital'];
            patientData['D_1_1_4_MedicalRecordNumberSourceInvestigation'] =
                data['D_1_1_4_MedicalRecordNumberSourceInvestigation'];
            patientData['D_2_1_DateBirth'] = data['D_2_1_DateBirth'];
            patientData['D_2_2a_AgeOnsetReactionNum'] =
                data['D_2_2a_AgeOnsetReactionNum'];
            patientData['D_2_2b_AgeOnsetReactionUnit'] =
                data['D_2_2b_AgeOnsetReactionUnit'];
            patientData['D_2_2_1a_GestationPeriodReactionFoetusNum'] =
                data['D_2_2_1a_GestationPeriodReactionFoetusNum'];
            patientData['D_2_2_1b_GestationPeriodReactionFoetusUnit'] =
                data['D_2_2_1b_GestationPeriodReactionFoetusUnit'];
            patientData['D_2_3_PatientAgeGroup'] =
                data['D_2_3_PatientAgeGroup'];
            patientData['D_3_BodyWeight'] = data['D_3_BodyWeight'];
            patientData['D_4_Height'] = data['D_4_Height'];
            patientData['D_5_Sex'] = data['D_5_Sex'];
            patientData['D_6_LastMenstrualPeriodDate'] =
                data['D_6_LastMenstrualPeriodDate'];
            patientData['D_7_2_TextMedicalHistory'] =
                data['D_7_2_TextMedicalHistory'];
            patientData['D_7_3_ConcomitantTherapies'] =
                data['D_7_3_ConcomitantTherapies'];
            patientData['D_9_1_DateDeath'] = data['D_9_1_DateDeath'];
            patientData['D_9_3_Autopsy'] = data['D_9_3_Autopsy'];
            state.patientData = patientData;

            state.medicalHistory =
                data['D_7_1_r_StructuredInformationMedicalHistory'];
            state.drugHistory = data['D_8_r_PastDrugHistory'];
            state.causeOfDeath = data['D_9_2_r_CauseDeath'];
            state.autopsy = data['D_9_4_r_AutopsyDeterminedCauseDeath'];

            let parentChildData = new ParentChildData();
            parentChildData['D_10_1_ParentIdentification'] =
                data['D_10_1_ParentIdentification'];
            parentChildData['D_10_2_1_DateBirthParent'] =
                data['D_10_2_1_DateBirthParent'];
            parentChildData['D_10_2_2a_AgeParentNum'] =
                data['D_10_2_2a_AgeParentNum'];
            parentChildData['D_10_2_2b_AgeParentUnit'] =
                data['D_10_2_2b_AgeParentUnit'];
            parentChildData['D_10_3_LastMenstrualPeriodDateParent'] =
                data['D_10_3_LastMenstrualPeriodDateParent'];
            parentChildData['D_10_4_BodyWeightParent'] =
                data['D_10_4_BodyWeightParent'];
            parentChildData['D_10_5_HeightParent'] =
                data['D_10_5_HeightParent'];
            parentChildData['D_10_6_SexParent'] = data['D_10_6_SexParent'];
            state.parentChildData = parentChildData;

            let parentHistoryData = new ParentHistoryData();
            parentHistoryData['D_10_7_2_TextMedicalHistoryParent'] =
                data['D_10_7_2_TextMedicalHistoryParent'];
            state.parentHistoryData = parentHistoryData;

            state.parentData =
                data['D_10_7_1_r_StructuredInformationParentMedDRACode'];

            state.parentDrugHistory = data['D_10_8_r_PastDrugHistoryParent'];
        });

        builder.addCase(saveData.fulfilled, (state, action) => {
            const data = e2bCaseKeys(action.payload.d_patient_characteristics);
            console.log('patient', data);

            let patientData = new PatientInfo();
            patientData['id'] = data['id'];
            patientData['D_1_Patient'] = data['D_1_Patient'];
            patientData['D_1_1_1_MedicalRecordNumberSourceGP'] =
                data['D_1_1_1_MedicalRecordNumberSourceGp'];
            patientData['D_1_1_2_MedicalRecordNumberSourceSpecialist'] =
                data['D_1_1_2_MedicalRecordNumberSourceSpecialist'];
            patientData['D_1_1_3_MedicalRecordNumberSourceHospital'] =
                data['D_1_1_3_MedicalRecordNumberSourceHospital'];
            patientData['D_1_1_4_MedicalRecordNumberSourceInvestigation'] =
                data['D_1_1_4_MedicalRecordNumberSourceInvestigation'];
            patientData['D_2_1_DateBirth'] = data['D_2_1_DateBirth'];
            patientData['D_2_2a_AgeOnsetReactionNum'] =
                data['D_2_2a_AgeOnsetReactionNum'];
            patientData['D_2_2b_AgeOnsetReactionUnit'] =
                data['D_2_2b_AgeOnsetReactionUnit'];
            patientData['D_2_2_1a_GestationPeriodReactionFoetusNum'] =
                data['D_2_2_1a_GestationPeriodReactionFoetusNum'];
            patientData['D_2_2_1b_GestationPeriodReactionFoetusUnit'] =
                data['D_2_2_1b_GestationPeriodReactionFoetusUnit'];
            patientData['D_2_3_PatientAgeGroup'] =
                data['D_2_3_PatientAgeGroup'];
            patientData['D_3_BodyWeight'] = data['D_3_BodyWeight'];
            patientData['D_4_Height'] = data['D_4_Height'];
            patientData['D_5_Sex'] = data['D_5_Sex'];
            patientData['D_6_LastMenstrualPeriodDate'] =
                data['D_6_LastMenstrualPeriodDate'];
            patientData['D_7_2_TextMedicalHistory'] =
                data['D_7_2_TextMedicalHistory'];
            patientData['D_7_3_ConcomitantTherapies'] =
                data['D_7_3_ConcomitantTherapies'];
            patientData['D_9_1_DateDeath'] = data['D_9_1_DateDeath'];
            patientData['D_9_3_Autopsy'] = data['D_9_3_Autopsy'];
            state.patientData = patientData;

            state.medicalHistory =
                data['D_7_1_r_StructuredInformationMedicalHistory'];
            state.drugHistory = data['D_8_r_PastDrugHistory'];
            state.causeOfDeath = data['D_9_2_r_CauseDeath'];
            state.autopsy = data['D_9_4_r_AutopsyDeterminedCauseDeath'];

            let parentChildData = new ParentChildData();
            parentChildData['D_10_1_ParentIdentification'] =
                data['D_10_1_ParentIdentification'];
            parentChildData['D_10_2_1_DateBirthParent'] =
                data['D_10_2_1_DateBirthParent'];
            parentChildData['D_10_2_2a_AgeParentNum'] =
                data['D_10_2_2a_AgeParentNum'];
            parentChildData['D_10_2_2b_AgeParentUnit'] =
                data['D_10_2_2b_AgeParentUnit'];
            parentChildData['D_10_3_LastMenstrualPeriodDateParent'] =
                data['D_10_3_LastMenstrualPeriodDateParent'];
            parentChildData['D_10_4_BodyWeightParent'] =
                data['D_10_4_BodyWeightParent'];
            parentChildData['D_10_5_HeightParent'] =
                data['D_10_5_HeightParent'];
            parentChildData['D_10_6_SexParent'] = data['D_10_6_SexParent'];
            state.parentChildData = parentChildData;

            let parentHistoryData = new ParentHistoryData();
            parentHistoryData['D_10_7_2_TextMedicalHistoryParent'] =
                data['D_10_7_2_TextMedicalHistoryParent'];
            state.parentHistoryData = parentHistoryData;

            state.parentData =
                data['D_10_7_1_r_StructuredInformationParentMedDRACode'];

            state.parentDrugHistory = data['D_10_8_r_PastDrugHistoryParent'];
        });

        builder.addCase(changeData.fulfilled, (state, action) => {
            const data = e2bCaseKeys(action.payload.d_patient_characteristics);
            console.log('patient', data);

            let patientData = new PatientInfo();
            patientData['id'] = data['id'];
            patientData['D_1_Patient'] = data['D_1_Patient'];
            patientData['D_1_1_1_MedicalRecordNumberSourceGP'] =
                data['D_1_1_1_MedicalRecordNumberSourceGp'];
            patientData['D_1_1_2_MedicalRecordNumberSourceSpecialist'] =
                data['D_1_1_2_MedicalRecordNumberSourceSpecialist'];
            patientData['D_1_1_3_MedicalRecordNumberSourceHospital'] =
                data['D_1_1_3_MedicalRecordNumberSourceHospital'];
            patientData['D_1_1_4_MedicalRecordNumberSourceInvestigation'] =
                data['D_1_1_4_MedicalRecordNumberSourceInvestigation'];
            patientData['D_2_1_DateBirth'] = data['D_2_1_DateBirth'];
            patientData['D_2_2a_AgeOnsetReactionNum'] =
                data['D_2_2a_AgeOnsetReactionNum'];
            patientData['D_2_2b_AgeOnsetReactionUnit'] =
                data['D_2_2b_AgeOnsetReactionUnit'];
            patientData['D_2_2_1a_GestationPeriodReactionFoetusNum'] =
                data['D_2_2_1a_GestationPeriodReactionFoetusNum'];
            patientData['D_2_2_1b_GestationPeriodReactionFoetusUnit'] =
                data['D_2_2_1b_GestationPeriodReactionFoetusUnit'];
            patientData['D_2_3_PatientAgeGroup'] =
                data['D_2_3_PatientAgeGroup'];
            patientData['D_3_BodyWeight'] = data['D_3_BodyWeight'];
            patientData['D_4_Height'] = data['D_4_Height'];
            patientData['D_5_Sex'] = data['D_5_Sex'];
            patientData['D_6_LastMenstrualPeriodDate'] =
                data['D_6_LastMenstrualPeriodDate'];
            patientData['D_7_2_TextMedicalHistory'] =
                data['D_7_2_TextMedicalHistory'];
            patientData['D_7_3_ConcomitantTherapies'] =
                data['D_7_3_ConcomitantTherapies'];
            patientData['D_9_1_DateDeath'] = data['D_9_1_DateDeath'];
            patientData['D_9_3_Autopsy'] = data['D_9_3_Autopsy'];
            state.patientData = patientData;

            state.medicalHistory =
                data['D_7_1_r_StructuredInformationMedicalHistory'];
            state.drugHistory = data['D_8_r_PastDrugHistory'];
            state.causeOfDeath = data['D_9_2_r_CauseDeath'];
            state.autopsy = data['D_9_4_r_AutopsyDeterminedCauseDeath'];

            let parentChildData = new ParentChildData();
            parentChildData['D_10_1_ParentIdentification'] =
                data['D_10_1_ParentIdentification'];
            parentChildData['D_10_2_1_DateBirthParent'] =
                data['D_10_2_1_DateBirthParent'];
            parentChildData['D_10_2_2a_AgeParentNum'] =
                data['D_10_2_2a_AgeParentNum'];
            parentChildData['D_10_2_2b_AgeParentUnit'] =
                data['D_10_2_2b_AgeParentUnit'];
            parentChildData['D_10_3_LastMenstrualPeriodDateParent'] =
                data['D_10_3_LastMenstrualPeriodDateParent'];
            parentChildData['D_10_4_BodyWeightParent'] =
                data['D_10_4_BodyWeightParent'];
            parentChildData['D_10_5_HeightParent'] =
                data['D_10_5_HeightParent'];
            parentChildData['D_10_6_SexParent'] = data['D_10_6_SexParent'];
            state.parentChildData = parentChildData;

            let parentHistoryData = new ParentHistoryData();
            parentHistoryData['D_10_7_2_TextMedicalHistoryParent'] =
                data['D_10_7_2_TextMedicalHistoryParent'];
            state.parentHistoryData = parentHistoryData;

            state.parentData =
                data['D_10_7_1_r_StructuredInformationParentMedDRACode'];

            state.parentDrugHistory = data['D_10_8_r_PastDrugHistoryParent'];
        });

        builder.addCase(getJsonFromXml.fulfilled, (state, action) => {
            const data = e2bCaseKeys(action.payload.d_patient_characteristics);
            console.log('patient', data);

            let patientData = new PatientInfo();
            patientData['id'] = data['id'];
            patientData['D_1_Patient'] = data['D_1_Patient'];
            patientData['D_1_1_1_MedicalRecordNumberSourceGP'] =
                data['D_1_1_1_MedicalRecordNumberSourceGp'];
            patientData['D_1_1_2_MedicalRecordNumberSourceSpecialist'] =
                data['D_1_1_2_MedicalRecordNumberSourceSpecialist'];
            patientData['D_1_1_3_MedicalRecordNumberSourceHospital'] =
                data['D_1_1_3_MedicalRecordNumberSourceHospital'];
            patientData['D_1_1_4_MedicalRecordNumberSourceInvestigation'] =
                data['D_1_1_4_MedicalRecordNumberSourceInvestigation'];
            patientData['D_2_1_DateBirth'] = data['D_2_1_DateBirth'];
            patientData['D_2_2a_AgeOnsetReactionNum'] =
                data['D_2_2a_AgeOnsetReactionNum'];
            patientData['D_2_2b_AgeOnsetReactionUnit'] =
                data['D_2_2b_AgeOnsetReactionUnit'];
            patientData['D_2_2_1a_GestationPeriodReactionFoetusNum'] =
                data['D_2_2_1a_GestationPeriodReactionFoetusNum'];
            patientData['D_2_2_1b_GestationPeriodReactionFoetusUnit'] =
                data['D_2_2_1b_GestationPeriodReactionFoetusUnit'];
            patientData['D_2_3_PatientAgeGroup'] =
                data['D_2_3_PatientAgeGroup'];
            patientData['D_3_BodyWeight'] = data['D_3_BodyWeight'];
            patientData['D_4_Height'] = data['D_4_Height'];
            patientData['D_5_Sex'] = data['D_5_Sex'];
            patientData['D_6_LastMenstrualPeriodDate'] =
                data['D_6_LastMenstrualPeriodDate'];
            patientData['D_7_2_TextMedicalHistory'] =
                data['D_7_2_TextMedicalHistory'];
            patientData['D_7_3_ConcomitantTherapies'] =
                data['D_7_3_ConcomitantTherapies'];
            patientData['D_9_1_DateDeath'] = data['D_9_1_DateDeath'];
            patientData['D_9_3_Autopsy'] = data['D_9_3_Autopsy'];
            state.patientData = patientData;

            state.medicalHistory =
                data['D_7_1_r_StructuredInformationMedicalHistory'];
            state.drugHistory = data['D_8_r_PastDrugHistory'];
            state.causeOfDeath = data['D_9_2_r_CauseDeath'];
            state.autopsy = data['D_9_4_r_AutopsyDeterminedCauseDeath'];

            let parentChildData = new ParentChildData();
            parentChildData['D_10_1_ParentIdentification'] =
                data['D_10_1_ParentIdentification'];
            parentChildData['D_10_2_1_DateBirthParent'] =
                data['D_10_2_1_DateBirthParent'];
            parentChildData['D_10_2_2a_AgeParentNum'] =
                data['D_10_2_2a_AgeParentNum'];
            parentChildData['D_10_2_2b_AgeParentUnit'] =
                data['D_10_2_2b_AgeParentUnit'];
            parentChildData['D_10_3_LastMenstrualPeriodDateParent'] =
                data['D_10_3_LastMenstrualPeriodDateParent'];
            parentChildData['D_10_4_BodyWeightParent'] =
                data['D_10_4_BodyWeightParent'];
            parentChildData['D_10_5_HeightParent'] =
                data['D_10_5_HeightParent'];
            parentChildData['D_10_6_SexParent'] = data['D_10_6_SexParent'];
            state.parentChildData = parentChildData;

            let parentHistoryData = new ParentHistoryData();
            parentHistoryData['D_10_7_2_TextMedicalHistoryParent'] =
                data['D_10_7_2_TextMedicalHistoryParent'];
            state.parentHistoryData = parentHistoryData;

            state.parentData =
                data['D_10_7_1_r_StructuredInformationParentMedDRACode'];

            state.parentDrugHistory = data['D_10_8_r_PastDrugHistoryParent'];
        });
    },
});

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
    setAutopsy,
} = patientSlice.actions;
