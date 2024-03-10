import { createSlice } from '@reduxjs/toolkit';
import { e2bCaseKeys, pascalSnakeCaseKeys } from '../common/changekeys';
import { getData } from '../display/slice';
import { DocumentsHeldBySender, Identification, IdentificationNumber, OtherIdentifiers } from './identification';

export const identificationSelector = (state) => state.identification;

const identificationSlice = createSlice({
    name: 'identification',
    initialState: {
        identification: new Identification(),
        documentsHeldBySender: [new DocumentsHeldBySender()],
        otherIdentifiers: [new OtherIdentifiers()],
        identificationNumber: [new IdentificationNumber()],
    },
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
        builder.addCase(getData.fulfilled, (state, action) => {
            const data = e2bCaseKeys(action.payload.c_1_identification_case_safety_report);
            console.log('why', data);
            state.identification = data;

            state.documentsHeldBySender = data.C_1_6_1_r_DocumentsHeldSender;

            state.otherIdentifiers = data.C_1_9_1_r_SourceCaseId;
            state.identificationNumber = data.C_1_10_r_IdentificationNumberReportLinked;
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
