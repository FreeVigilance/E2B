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

const initialState = {
    showSideMenu: false,
    showCasesList: false,
    openNewReport: false,
    currentTab: 0,
    currentId: null,
};

const displaySlice = createSlice({
    name: 'display',
    initialState,
    reducers: {
        setShowSideMenu: (state, action) => { state.showSideMenu = action.payload; },
        setShowCasesList: (state, action) => { state.showCasesList = action.payload; },
        setOpenNewReport: (state, action) => { state.openNewReport = action.payload; },
        setCurrentTab: (state, action) => { state.currentTab = action.payload; },
    },
    extraReducers: (builder) => {
        builder.addCase(revertAll, () => initialState);
        builder.addCase(getData.fulfilled, (state, action) => {
            console.log('data');
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
        });
        builder.addCase(saveData.rejected, (state, action) => {
            console.log('save');
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

} = displaySlice.actions;
