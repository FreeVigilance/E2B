import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@src/api';
import { e2bCaseKeys } from '../common/changekeys';

export const displaySelector = (state) => state.display;

export const revertAll = createAction('REVERT_ALL');

export const getData = createAsyncThunk(
    'display/getData',
    (id) => {
        return api.getData(id);
    },
);

export const saveData = createAsyncThunk(
    'display/saveData',
    (data) => {
        return api.saveData(data);
    },
);

export const changeData = createAsyncThunk(
    'display/changeData',
    (data) => {
        return api.changeData(data);
    },
);


export const deleteReport = createAsyncThunk(
    'display/deleteReport',
    (id) => {
        console.log('delete', id);
        return api.deleteReport(id);
    },
);

export const getXmlFromJson = createAsyncThunk(
    'display/getXmlFromJson',
    (data) => {
        return api.getXmlFromJson(data);
    },
);

export const getJsonFromXml = createAsyncThunk(
    'display/getJsonFromXml',
    (data) => {
        console.log('xml', data);
        return api.getJsonFromXml(data);
    },
);


export const getTabsWithErrors = (errors) => {
    let errorTabs = {
        0: {value: false, message: null},
        1: {value: false, message: null},
        2: {value: false, message: null},
        3: {value: false, message: null},
        4: {value: false, message: null},
        5: {value: false, message: null},
        6: {value: false, message: null},
        7: {value: false, message: null},
        8: {value: false, message: null},
        9: {value: false, message: null},
        10: {value: false, message: null},
        11: {value: false, message: null},
        12: {value: false, message: null},
        13: {value: false, message: null},
    };

    if (errors['F_r_ResultsTestsProceduresInvestigationPatient']) {
        errorTabs[0].value = true;
        if (errors['F_r_ResultsTestsProceduresInvestigationPatient']['_Self']){
            errorTabs[0].message = errors['F_r_ResultsTestsProceduresInvestigationPatient']['_Self']
        }
    }
    if (errors['E_i_ReactionEvent']) {
        errorTabs[1].value = true;
        if (errors['E_i_ReactionEvent']['_Self']){
            errorTabs[1].message = errors['E_i_ReactionEvent']['_Self']
        }
    }
    if (errors['D_PatientCharacteristics'] && !errors['D_PatientCharacteristics']['D_9_2_r_CauseDeath'] && !['D_PatientCharacteristics']['D_9_4_r_AutopsyDeterminedCauseDeath'] &&
    !errors['D_PatientCharacteristics']['D_10_InformationConcerningParent'] && !errors['D_PatientCharacteristics']['D_10_8_r_PastDrugHistoryParent'] &&
    !errors['D_PatientCharacteristics']['D_10_7_2_TextMedicalHistoryParent'] && !errors['D_PatientCharacteristics']['D_10_7_1_r_StructuredInformationParentMedDRACode']) {
        errorTabs[2].value = true;
        if (errors['D_PatientCharacteristics']['_Self']){
            errorTabs[2].message = errors['D_PatientCharacteristics']['_Self']
        }
    }
    if (errors['D_PatientCharacteristics'] && (errors['D_PatientCharacteristics']['D_9_2_r_CauseDeath'] || ['D_PatientCharacteristics']['D_9_4_r_AutopsyDeterminedCauseDeath'])) {
        errorTabs[3].value = true;
        if (errors['D_PatientCharacteristics']['D_9_2_r_CauseDeath']['_Self']){
            errorTabs[3].message = errors['D_PatientCharacteristics']['D_9_2_r_CauseDeath']['_Self']
        }
        if (errors['D_PatientCharacteristics']['D_9_4_r_AutopsyDeterminedCauseDeath']['_Self']){
            errorTabs[3].message = errors['D_PatientCharacteristics']['D_9_4_r_AutopsyDeterminedCauseDeath']['_Self']
        }
    }
    if (errors['D_PatientCharacteristics'] && (errors['D_PatientCharacteristics']['D_10_InformationConcerningParent'] || errors['D_PatientCharacteristics']['D_10_8_r_PastDrugHistoryParent'] ||
    errors['D_PatientCharacteristics']['D_10_7_2_TextMedicalHistoryParent'] || errors['D_PatientCharacteristics']['D_10_7_1_r_StructuredInformationParentMedDRACode'])) {
        errorTabs[4].value = true;
        if (errors['D_PatientCharacteristics']['D_10_InformationConcerningParent']['_Self']){
            errorTabs[4].message = errors['D_PatientCharacteristics']['D_10_InformationConcerningParent']['_Self']
        }
        if (errors['D_PatientCharacteristics']['D_10_8_r_PastDrugHistoryParent']['_Self']){
            errorTabs[4].message = errors['D_PatientCharacteristics']['D_10_8_r_PastDrugHistoryParent']['_Self']
        }
        if (errors['D_PatientCharacteristics']['D_10_7_2_TextMedicalHistoryParent']['_Self']){
            errorTabs[4].message = errors['D_PatientCharacteristics']['D_10_7_2_TextMedicalHistoryParent']['_Self']
        }
        if (errors['D_PatientCharacteristics']['D_10_7_1_r_StructuredInformationParentMedDRACode']['_Self']){
            errorTabs[4].message = errors['D_PatientCharacteristics']['D_10_7_1_r_StructuredInformationParentMedDRACode']['_Self']
        }
    }
    
    if (errors['G_k_DrugInformation']) {
        let childrenError = false;
        for (const [key, value] of Object.entries(errors['G_k_DrugInformation'])) {
            if (value['G_k_4_r_DosageInformation']) {
                errorTabs[6].value = true;
                if (value['G_k_4_r_DosageInformation']['_Self']){
                    errorTabs[6].message = value['G_k_4_r_DosageInformation']['_Self']
                }
                childrenError = true;
                break;
            }
        }

        for (const [key, value] of Object.entries(errors['G_k_DrugInformation'])) {
            if (value['G_k_9_i_DrugReactionMatrix']) {
                errorTabs[7].value = true;
                if (value['G_k_9_i_DrugReactionMatrix']['_Self']){
                    errorTabs[7].message = value['G_k_9_i_DrugReactionMatrix']['_Self']
                }
                childrenError = true;
                break;
            }
        }

        if (!childrenError) {
            errorTabs[5].value = true;
            if (errors['G_k_DrugInformation']['_Self']){
                errorTabs[5].message = errors['G_k_DrugInformation']['_Self']
            }
        }
    }
    
    if (errors['C_2_r_PrimarySourceInformation']) {
        errorTabs[8].value = true;
        if (errors['C_2_r_PrimarySourceInformation']['_Self']){
            errorTabs[8].message = errors['C_2_r_PrimarySourceInformation']['_Self']
        }
    }

    if (errors['C_3_InformationSenderCaseSafetyReport']) {
        errorTabs[9].value = true;
        if (errors['C_3_InformationSenderCaseSafetyReport']['_Self']){
            errorTabs[9].message = errors['C_3_InformationSenderCaseSafetyReport']['_Self']
        }
    }
    if (errors['C_4_r_LiteratureReference']) {
        errorTabs[10].value = true;
        if (errors['C_4_r_LiteratureReference']['_Self']){
            errorTabs[10].message = errors['C_4_r_LiteratureReference']['_Self']
        }
    }
    if (errors['C_1_IdentificationCaseSafetyReport']) {
        errorTabs[11].value = true;
        if (errors['C_1_IdentificationCaseSafetyReport']['_Self']){
            errorTabs[11].message = errors['C_1_IdentificationCaseSafetyReport']['_Self']
        }
    }
    if (errors['C_5_StudyIdentification']) {
        errorTabs[12].value = true;
        if (errors['C_5_StudyIdentification']['_Self']){
            errorTabs[12].message = errors['C_5_StudyIdentification']['_Self']
        }
    }
    if (errors['H_NarrativeCaseSummary']) {
        errorTabs[13].value = true;
        if (errors['H_NarrativeCaseSummary']['_Self']){
            errorTabs[13].message = errors['H_NarrativeCaseSummary']['_Self']
        }
    }

    return errorTabs;
}

const initialState = {
    showSideMenu: false,
    showCasesList: false,
    openNewReport: false,
    currentTab: 0,
    currentId: null,
    currentSaved: 0,
    uploadedFile: null,
    showUpload: false,
    errors: {},
    errorTabs: {
        0: {value: false, message: null},
        1: {value: false, message: null},
        2: {value: false, message: null},
        3: {value: false, message: null},
        4: {value: false, message: null},
        5: {value: false, message: null},
        6: {value: false, message: null},
        7: {value: false, message: null},
        8: {value: false, message: null},
        9: {value: false, message: null},
        10: {value: false, message: null},
        11: {value: false, message: null},
        12: {value: false, message: null},
        13: {value: false, message: null},
    }
};

const displaySlice = createSlice({
    name: 'display',
    initialState,
    reducers: {
        setShowSideMenu: (state, action) => { state.showSideMenu = action.payload; },
        setShowCasesList: (state, action) => { state.showCasesList = action.payload; },
        setOpenNewReport: (state, action) => { state.openNewReport = action.payload; },
        setCurrentTab: (state, action) => { state.currentTab = action.payload; },
        setCurrentId: (state, action) => { state.currentId = action.payload; },
        setCurrentSaved: (state, action) => { state.currentSaved = action.payload; },
        setUploadedFile: (state, action) => { state.uploadedFile = action.payload; },
        setShowUpload: (state, action) => { state.showUpload = action.payload; },
        setErrorTabs: (state, action) => { state.errorTabs = action.payload; },
    },
    extraReducers: (builder) => {
        builder.addCase(revertAll, () => initialState);
        builder.addCase(getData.fulfilled, (state, action) => {
            console.log('data');
            state.currentId = action.payload['id'];
            console.log(action.payload);
        });
        builder.addCase(getData.rejected, (state, action) => {
            console.log('REJECTED');
            console.log(action.payload);
        });
        builder.addCase(saveData.fulfilled, (state, action) => {
            console.log('save');
            console.log(action.payload);
            if (action.payload['_errors']) {
                if (Object.keys(action.payload['_errors']).length !== 0) {
                    state.currentSaved = 2;
                    state.errors = e2bCaseKeys(action.payload['_errors']);
                    state.errorTabs = getTabsWithErrors(state.errors);
                    return;
                } else {
                    state.errors = {};
                }
            }
            state.currentId = action.payload.id;
            state.currentSaved = 1;
            state.errorTabs = getTabsWithErrors({});
        });
        builder.addCase(saveData.rejected, (state, action) => {
            console.log('save');
            console.log(action.payload);
            state.currentSaved = 2;
        });
        builder.addCase(changeData.fulfilled, (state, action) => {
            console.log('save');
            console.log(action.payload);
            if (action.payload['_errors']) {
                if (Object.keys(action.payload['_errors']).length !== 0) {
                    state.currentSaved = 2;
                    state.errors = e2bCaseKeys(action.payload['_errors']);
                    state.errorTabs = getTabsWithErrors(state.errors);
                    return;
                } else {
                    state.errors = {};
                }
            }
            state.currentId = action.payload.id;
            state.currentSaved = 1;
            state.errorTabs = getTabsWithErrors({});
        });
        builder.addCase(changeData.rejected, (state, action) => {
            console.log('changeData.rejected');
            console.log(action);
            state.currentSaved = 2;
        });
        builder.addCase(getXmlFromJson.fulfilled, (state, action) => {
            console.log('getXmlFromJson yes');
            console.log(action.payload);
            const element = document.createElement("a");
            const file = new Blob([action.payload], {type: 'text/plain'});
            element.href = URL.createObjectURL(file);
            element.download = `${state.currentId}.xml`;
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
            // state.xml = action.payload;
        });
        builder.addCase(getXmlFromJson.rejected, (state, action) => {
            console.log('getXmlFromJson no');
            console.log(action.payload);
        });
        builder.addCase(getJsonFromXml.fulfilled, (state, action) => {
            console.log('getJsonFromXml yes');
            state.currentId = action.payload['id'];
            console.log(action.payload);
        });
        builder.addCase(getJsonFromXml.rejected, (state, action) => {
            console.log('getJsonFromXml no');
            console.log(action.payload);
        });

    },

});

export default displaySlice.reducer;
export const {
    setShowSideMenu,
    setShowCasesList,
    setOpenNewReport,
    setCurrentTab,
    setCurrentId,
    setCurrentSaved,
    setUploadedFile,
    setShowUpload,
    setErrorTabs

} = displaySlice.actions;
