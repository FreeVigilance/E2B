import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { e2bCaseKeys } from '../common/changekeys';
import { changeData, getData, getJsonFromXml, revertAll, saveData } from '../display/slice';
import { NarrativeCaseSummary } from './narrative';
import { api } from '@src/api';

export const narrativeSelector = (state) => state.narrative;

export const getLanguageCodes = createAsyncThunk(
    'narrative/getLanguageCodes',
    (options) => {
        return api.getLanguageCodes(options.data);
    },
);

export const getNarrative = () => {
    return (dispatch, getState) => {
        let narrativeCaseSummary = getState().narrative.narrativeCaseSummary;
        let diagnosis = getState().narrative.diagnosis;
        let summaryComments = getState().narrative.summaryComments;

        let jsonResult = {
            'id': narrativeCaseSummary['id'],
            'H_1_CaseNarrative': narrativeCaseSummary['H_1_CaseNarrative'],
            'H_2_ReporterComments': narrativeCaseSummary['H_2_ReporterComments'],
            'H_4_SenderComments': narrativeCaseSummary['H_4_SenderComments'],
            'H_3_r_SenderDiagnosisMeddraCode': diagnosis,
            'H_5_r_CaseSummaryReporterCommentsNativeLanguage': summaryComments,
        };
        return jsonResult;
    };
};

const initialState = {
    narrativeCaseSummary: new NarrativeCaseSummary(),
    diagnosis: [],
    summaryComments: [],
    languageCodes: [],
};

const narrativeSlice = createSlice({
    name: 'narrative',
    initialState: initialState,
    reducers: {
        setNarrativeCaseSummary: (state, action) => {
            state.narrativeCaseSummary = action.payload;
        },
        setDiagnosis: (state, action) => {
            state.diagnosis = action.payload;
        },
        setSummaryComments: (state, action) => {
            state.summaryComments = action.payload;
        },
        setLanguageCodes: (state, action) => {
            state.languageCodes = action.payload;
        },

    }, extraReducers: (builder) => {
        builder.addCase(revertAll, () => initialState);

        builder.addCase(getData.fulfilled, (state, action) => {
            const data = e2bCaseKeys(action.payload.h_narrative_case_summary);
            if (data) {
                console.log('narrative', data);
                let narrativeCaseSummary = new NarrativeCaseSummary();
                if (data['id'])
                    narrativeCaseSummary['id'] = data['id'];
                if (data['H_1_CaseNarrative'])
                    narrativeCaseSummary['H_1_CaseNarrative'] = data['H_1_CaseNarrative'];
                if (data['H_2_ReporterComments'])
                    narrativeCaseSummary['H_2_ReporterComments'] = data['H_2_ReporterComments'];
                if (data['H_4_SenderComments'])
                    narrativeCaseSummary['H_4_SenderComments'] = data['H_4_SenderComments'];

                state.narrativeCaseSummary = narrativeCaseSummary;
                if (data['H_3_r_SenderDiagnosisMeddraCode'])
                    state.diagnosis = data['H_3_r_SenderDiagnosisMedDRACode'];
                if (data['H_5_r_CaseSummaryReporterCommentsNativeLanguage'])
                    state.summaryComments = data['H_5_r_CaseSummaryReporterCommentsNativeLanguage'];
            }
        });

        builder.addCase(saveData.fulfilled, (state, action) => {
            const data = e2bCaseKeys(action.payload.h_narrative_case_summary);
            if (data) {
                console.log('narrative', data);
                let narrativeCaseSummary = new NarrativeCaseSummary();
                if (data['id'])
                    narrativeCaseSummary['id'] = data['id'];
                if (data['H_1_CaseNarrative'])
                    narrativeCaseSummary['H_1_CaseNarrative'] = data['H_1_CaseNarrative'];
                if (data['H_2_ReporterComments'])
                    narrativeCaseSummary['H_2_ReporterComments'] = data['H_2_ReporterComments'];
                if (data['H_4_SenderComments'])
                    narrativeCaseSummary['H_4_SenderComments'] = data['H_4_SenderComments'];

                state.narrativeCaseSummary = narrativeCaseSummary;
                if (data['H_3_r_SenderDiagnosisMeddraCode'])
                    state.diagnosis = data['H_3_r_SenderDiagnosisMedDRACode'];
                if (data['H_5_r_CaseSummaryReporterCommentsNativeLanguage'])
                    state.summaryComments = data['H_5_r_CaseSummaryReporterCommentsNativeLanguage'];
            }
        });

        builder.addCase(changeData.fulfilled, (state, action) => {
            const data = e2bCaseKeys(action.payload.h_narrative_case_summary);
            if (data) {
                console.log('narrative', data);
                let narrativeCaseSummary = new NarrativeCaseSummary();
                if (data['id'])
                    narrativeCaseSummary['id'] = data['id'];
                if (data['H_1_CaseNarrative'])
                    narrativeCaseSummary['H_1_CaseNarrative'] = data['H_1_CaseNarrative'];
                if (data['H_2_ReporterComments'])
                    narrativeCaseSummary['H_2_ReporterComments'] = data['H_2_ReporterComments'];
                if (data['H_4_SenderComments'])
                    narrativeCaseSummary['H_4_SenderComments'] = data['H_4_SenderComments'];

                state.narrativeCaseSummary = narrativeCaseSummary;
                if (data['H_3_r_SenderDiagnosisMeddraCode'])
                    state.diagnosis = data['H_3_r_SenderDiagnosisMedDRACode'];
                if (data['H_5_r_CaseSummaryReporterCommentsNativeLanguage'])
                    state.summaryComments = data['H_5_r_CaseSummaryReporterCommentsNativeLanguage'];
            }
        });

        builder.addCase(getJsonFromXml.fulfilled, (state, action) => {
            const data = e2bCaseKeys(action.payload.h_narrative_case_summary);
            if (data) {
                console.log('narrative', data);
                let narrativeCaseSummary = new NarrativeCaseSummary();
                if (data['id'])
                    narrativeCaseSummary['id'] = data['id'];
                if (data['H_1_CaseNarrative'])
                    narrativeCaseSummary['H_1_CaseNarrative'] = data['H_1_CaseNarrative'];
                if (data['H_2_ReporterComments'])
                    narrativeCaseSummary['H_2_ReporterComments'] = data['H_2_ReporterComments'];
                if (data['H_4_SenderComments'])
                    narrativeCaseSummary['H_4_SenderComments'] = data['H_4_SenderComments'];

                state.narrativeCaseSummary = narrativeCaseSummary;
                if (data['H_3_r_SenderDiagnosisMeddraCode'])
                    state.diagnosis = data['H_3_r_SenderDiagnosisMedDRACode'];
                if (data['H_5_r_CaseSummaryReporterCommentsNativeLanguage'])
                    state.summaryComments = data['H_5_r_CaseSummaryReporterCommentsNativeLanguage'];
            }
        });

        builder.addCase(getLanguageCodes.fulfilled, (state, action) => {
            state.languageCodes = action.payload;
        });
    },
});

export default narrativeSlice.reducer;
export const {
    setNarrativeCaseSummary,
    setDiagnosis,
    setSummaryComments,
    setCountryCodes,
} = narrativeSlice.actions;
