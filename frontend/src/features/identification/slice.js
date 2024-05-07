import { createSlice } from '@reduxjs/toolkit';
import { e2bCaseKeys, pascalSnakeCaseKeys } from '../common/changekeys';
import {
    changeData,
    getData,
    getJsonFromXml,
    parseDate,
    revertAll,
    saveData,
} from '../display/slice';
import {
    DocumentsHeldBySender,
    Identification,
    IdentificationNumber,
    OtherIdentifiers,
} from './identification';

export const identificationSelector = (state) => state.identification;

export const getIdentification = () => {
    return (dispatch, getState) => {
        let identificationData = getState().identification.identification;

        let jsonResult = {
            C_1_IdentificationCaseSafetyReport: {
                id: identificationData['id'],
                C_1_1_SenderSafetyReportUniqueId:
                    identificationData['C_1_1_SenderSafetyReportUniqueId'],
                C_1_2_DateCreation: {
                    value: parseDate(
                        identificationData['C_1_2_DateCreation'].value,
                    ),
                },
                C_1_3_TypeReport: identificationData['C_1_3_TypeReport'],
                C_1_4_DateReportFirstReceivedSource: {
                    value: parseDate(
                        identificationData[
                            'C_1_4_DateReportFirstReceivedSource'
                        ].value,
                    ),
                },
                C_1_5_DateMostRecentInformation: {
                    value: parseDate(
                        identificationData['C_1_5_DateMostRecentInformation']
                            .value,
                    ),
                },
                C_1_6_AdditionalAvailableDocumentsHeldSender:
                    identificationData[
                        'C_1_6_AdditionalAvailableDocumentsHeldSender'
                    ],
                C_1_6_1_AdditionalDocumentsAvailable:
                    identificationData['C_1_6_1_AdditionalDocumentsAvailable'],
                C_1_7_FulfilLocalCriteriaExpeditedReport:
                    identificationData[
                        'C_1_7_FulfilLocalCriteriaExpeditedReport'
                    ]['value'] === null
                        ? { value: null, nullFlavor: 'NI' }
                        : {
                              value: identificationData[
                                  'C_1_7_FulfilLocalCriteriaExpeditedReport'
                              ]['value'],
                              nullFlavor: null,
                          },
                C_1_8_WorldwideUniqueCaseIdentification:
                    identificationData[
                        'C_1_8_WorldwideUniqueCaseIdentification'
                    ],
                C_1_8_1_WorldwideUniqueCaseIdentificationNumber:
                    identificationData[
                        'C_1_8_1_WorldwideUniqueCaseIdentificationNumber'
                    ],
                C_1_8_2_FirstSender: identificationData['C_1_8_2_FirstSender'],
                C_1_9_OtherCaseIds: identificationData['C_1_9_OtherCaseIds'],
                C_1_9_1_OtherCaseIdsPreviousTransmissions:
                    identificationData[
                        'C_1_9_1_OtherCaseIdsPreviousTransmissions'
                    ]['value'] === false ||
                    identificationData[
                        'C_1_9_1_OtherCaseIdsPreviousTransmissions'
                    ]['value'] === null
                        ? { value: null, nullFlavor: 'NI' }
                        : {
                              value: identificationData[
                                  'C_1_9_1_OtherCaseIdsPreviousTransmissions'
                              ]['value'],
                              nullFlavor: null,
                          },
                C_1_11_ReportNullificationAmendment:
                    identificationData['C_1_11_ReportNullificationAmendment'],
                C_1_11_1_ReportNullificationAmendment:
                    identificationData['C_1_11_1_ReportNullificationAmendment'],
                C_1_11_2_ReasonNullificationAmendment:
                    identificationData['C_1_11_2_ReasonNullificationAmendment'],
            },
        };

        jsonResult['C_1_IdentificationCaseSafetyReport'][
            'C_1_6_1_r_DocumentsHeldSender'
        ] = getState().identification.documentsHeldBySender;
        jsonResult['C_1_IdentificationCaseSafetyReport'][
            'C_1_9_1_r_SourceCaseId'
        ] = getState().identification.otherIdentifiers;
        jsonResult['C_1_IdentificationCaseSafetyReport'][
            'C_1_10_r_IdentificationNumberReportLinked'
        ] = getState().identification.identificationNumber;

        return jsonResult;
    };
};

const initialState = {
    identification: new Identification(),
    documentsHeldBySender: [],
    otherIdentifiers: [],
    identificationNumber: [],
};

const identificationSlice = createSlice({
    name: 'identification',
    initialState: initialState,
    reducers: {
        setIdentification: (state, action) => {
            state.identification = action.payload;
        },
        setDocumentsHeldBySender: (state, action) => {
            state.documentsHeldBySender = action.payload;
        },
        setOtherIdentifiers: (state, action) => {
            state.otherIdentifiers = action.payload;
        },
        setIdentificationNumber: (state, action) => {
            state.identificationNumber = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(revertAll, () => initialState);

        builder.addCase(getData.fulfilled, (state, action) => {
            const data = e2bCaseKeys(
                action.payload.c_1_identification_case_safety_report,
            );
            console.log('why', data);
            state.identification = data;

            state.documentsHeldBySender = data.C_1_6_1_r_DocumentsHeldSender;

            state.otherIdentifiers = data.C_1_9_1_r_SourceCaseId;
            state.identificationNumber =
                data.C_1_10_r_IdentificationNumberReportLinked;
            console.log('aaa', state.identification);
        });

        builder.addCase(saveData.fulfilled, (state, action) => {
            const data = e2bCaseKeys(
                action.payload.c_1_identification_case_safety_report,
            );
            console.log('why', data);
            state.identification = data;

            state.documentsHeldBySender = data.C_1_6_1_r_DocumentsHeldSender;

            state.otherIdentifiers = data.C_1_9_1_r_SourceCaseId;
            state.identificationNumber =
                data.C_1_10_r_IdentificationNumberReportLinked;
            console.log('aaa', state.identification);
        });

        builder.addCase(changeData.fulfilled, (state, action) => {
            const data = e2bCaseKeys(
                action.payload.c_1_identification_case_safety_report,
            );
            console.log('why', data);
            state.identification = data;

            state.documentsHeldBySender = data.C_1_6_1_r_DocumentsHeldSender;

            state.otherIdentifiers = data.C_1_9_1_r_SourceCaseId;
            state.identificationNumber =
                data.C_1_10_r_IdentificationNumberReportLinked;
            console.log('aaa', state.identification);
        });

        builder.addCase(getJsonFromXml.fulfilled, (state, action) => {
            const data = e2bCaseKeys(
                action.payload.c_1_identification_case_safety_report,
            );
            console.log('why', data);
            state.identification = data;

            state.documentsHeldBySender = data.C_1_6_1_r_DocumentsHeldSender;

            state.otherIdentifiers = data.C_1_9_1_r_SourceCaseId;
            state.identificationNumber =
                data.C_1_10_r_IdentificationNumberReportLinked;
            console.log('aaa', state.identification);
        });
    },
});

export default identificationSlice.reducer;
export const {
    setIdentification,
    setDocumentsHeldBySender,
    setOtherIdentifiers,
    setIdentificationNumber,
} = identificationSlice.actions;
