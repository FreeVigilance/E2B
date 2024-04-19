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

const parseDate = (value) => {
    if (value === null)
        return null;
    let result = '';
    if (value.slice(0, 4) !== ''){
        result += `${value.slice(0, 4)}`
    }
    if (value.slice(4, 6) !== ''){
        result += `-${value.slice(4, 6)}`
    }
    if (value.slice(6, 8) !== ''){
        result += `-${value.slice(6, 8)}`
    }
    if (value.slice(8, 10) !== ''){
        result += `  ${value.slice(8, 10)}`
    }
    if (value.slice(10, 12) !== ''){
        result += `:${value.slice(10, 12)}`
    }
    if (value.slice(12, 14) !== ''){
        result += `:${value.slice(12, 14)}`
    }
    return result;
}

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
            let data = action.payload;
            console.log(data);
            for (let i = 0; i < data.length; ++i) {
                let value = data[i];
                value['creation_date'] = parseDate(value['creation_date']);
                value['received_date'] = parseDate(value['received_date']);
                data[i] = value;
            }
            state.cases = data;
        });
    },
});

export default casesListSlice.reducer;
export const {
    setCases,
} = casesListSlice.actions;
