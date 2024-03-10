import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getCasesList = createAsyncThunk(
    'getCasesList',
    () => {
        return Array.from({ length: 40 }, () => Math.floor(Math.random() * 500000000));
    },
);

export const casesListSelector = (state) => state.casesList;

const casesListSlice = createSlice({
    name: 'casesList',
    initialState: {
        cases: [],
    },
    reducers: {
        setCases: (state, action) => { state.isAuth = action.payload; },

    },
    extraReducers: (builder) => {
        builder.addCase(getCasesList.fulfilled, (state, action) => {
            state.cases = action.payload;
        });
    },
});

export default casesListSlice.reducer;
export const {
    setCases,
} = casesListSlice.actions;
