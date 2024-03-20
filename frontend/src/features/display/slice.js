import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@src/api';

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


const initialState = {
    showSideMenu: false,
    showCasesList: false,
    openNewReport: false,
    currentTab: 0,
    currentId: null,
    currentSaved: 0,
    uploadedFile: null,
    showUpload: false,
    // xml: null,
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
            state.currentId = action.payload.id;
            state.currentSaved = 1;
        });
        builder.addCase(saveData.rejected, (state, action) => {
            console.log('save');
            console.log(action.payload);
            state.currentSaved = 2;
        });
        builder.addCase(changeData.fulfilled, (state, action) => {
            console.log('save');
            console.log(action.payload);
            state.currentId = action.payload.id;
            state.currentSaved = 1;
        });
        builder.addCase(changeData.rejected, (state, action) => {
            console.log('save');
            console.log(action.payload);
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
    setShowUpload

} = displaySlice.actions;
