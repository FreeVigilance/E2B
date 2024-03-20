import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@src/api';

// export const getCasesList = createAsyncThunk(
//     'getCasesList',
//     () => {
//         return Array.from({ length: 40 }, () => Math.floor(Math.random() * 500000000));
//     },
// );

export const getCasesList = createAsyncThunk(
    'casesList/getCasesList',
    () => {
        console.log('getCasesList');
        return api.getCasesList();
    },
);

export const casesListSelector = (state) => state.casesList;

const casesListSlice = createSlice({
    name: 'casesList',
    initialState: {
        cases: [],
    },
    reducers: {
        setCases: (state, action) => { state.cases = action.payload; },
    },
    extraReducers: (builder) => {
        builder.addCase(getCasesList.fulfilled, (state, action) => {
            state.cases = action.payload;
            console.log(action.payload);
        });
    },
});

export default casesListSlice.reducer;
export const {
    setCases,
} = casesListSlice.actions;
