import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@src/api';

export const meddraSelector = (state) => state.meddra;

export const getTerms = createAsyncThunk(
    'meddra/getTerms',
    (options) => {
        console.log(options);
        return api.getTerms(options.id, options.data);
    },
);

export const getMeddraReleases = createAsyncThunk(
    'meddra/getMeddraOptions',
    () => {
        return api.getReleases();
    },
);
// [{'code': '1', 'name': 'name1'}, {'code': '2', 'name': 'name2'}]

// export const getSOC = (input) => {
//     return (dispatch, getState) => {
//         const data = dispatch(prepareData('SOC'));
//         dispatch(getTerms(data));
//     }
// }

// export const getHLGT = () => {
//     return (dispatch, getState) => {
//         const data = dispatch(prepareData('HLGT'));
//         dispatch(getTerms(data));
//     }
// }

// export const getAllHLT = () => {
//     return (dispatch, getState) => {
//         const data = dispatch(prepareData('HLT'));
//         dispatch(getTerms(data));
//     }
// }

// export const getAllPT = () => {
//     return (dispatch, getState) => {
//         const data = dispatch(prepareData('PT'));
//         dispatch(getTerms(data));
//     }
// }

// export const getAllHLLT = () => {
//     return (dispatch, getState) => {
//         const data = dispatch(prepareData('LLT'));
//         dispatch(getTerms(data));
//     }
// }

export const prepareData = (level, input = '') => {
    return (dispatch, getState) => {
        let state = {};
        if (getState().meddra.SOCvalue) {
            state['SOC'] = getMeddraCode(getState().meddra.SOCvalue);
        }
        if (getState().meddra.HLGTvalue) {
            state['HLGT'] = getMeddraCode(getState().meddra.HLGTvalue);
        }
        if (getState().meddra.HLTvalue) {
            state['HLT'] = getMeddraCode(getState().meddra.HLTvalue);
        }
        if (getState().meddra.PTvalue) {
            state['PT'] = getMeddraCode(getState().meddra.PTvalue);
        }
        if (getState().meddra.LLTvalue) {
            state['LLT'] = getMeddraCode(getState().meddra.LLTvalue);
        }
        return {
            state: state,
            search: { level: level, input: input },
        };
    };
};

export const getMeddraCode = (value) => {
    return value.split(': ')[1];
}

export const getIdOfMeddraVersion = (version, language) => {
    return (dispatch, getState) => {
        return getState().meddra.meddraOptions.find(x => x.version === getState().meddra.meddraVersion.split(' ')[0]
        && x.language === getState().meddra.meddraVersion.split(' ')[1]).id;
    };
};

const initialState = {
    SOC: [],
    HLGT: [],
    HLT: [],
    PT: [],
    LLT: [],
    SOCvalue: null,
    HLGTvalue: null,
    HLTvalue: null,
    PTvalue: null,
    LLTvalue: null,
    meddraOptions: [],
    // [
    //     { id: 1, language: 1, version: 1 },
    //     { id: 2, language: 2, version: 2 },
    // ],
    meddraVersion: null,
};

const meddraSlice = createSlice({
    name: 'meddra',
    initialState,
    reducers: {
        reset: () => initialState,
        setSOC: (state, action) => {
            state.SOC = action.payload;
        },
        setHLGT: (state, action) => {
            state.HLGT = action.payload;
        },
        setHLT: (state, action) => {
            state.HLT = action.payload;
        },
        setPT: (state, action) => {
            state.PT = action.payload;
        },
        setLLT: (state, action) => {
            state.LLT = action.payload;
        },
        setSOCvalue: (state, action) => {
            state.SOCvalue = action.payload;
        },
        setHLGTvalue: (state, action) => {
            state.HLGTvalue = action.payload;
        },
        setHLTvalue: (state, action) => {
            state.HLTvalue = action.payload;
        },
        setPTvalue: (state, action) => {
            state.PTvalue = action.payload;
        },
        setLLTvalue: (state, action) => {
            state.LLTvalue = action.payload;
        },
        setMeddraVersion: (state, action) => {
            state.meddraVersion = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getTerms.fulfilled, (state, action) => {
            console.log('medra data');
            console.log(action.payload);
            const data = action.payload;
            if (data.level === 'SOC') {
                console.log("AAAAAAA");
                state.SOC = data.terms;
                console.log(state.SOC)

            }
            if (data.level === 'HLGT') {
                state.HLGT = data.terms;
            }
            if (data.level === 'HLT') {
                state.HLT = data.terms;
            }
            if (data.level === 'PT') {
                state.PT = data.terms;
            }
            if (data.level === 'LLT') {
                state.LLT = data.terms;
            }
        });
        builder.addCase(getMeddraReleases.fulfilled, (state, action) => {
            console.log('medra data');
            console.log(action.payload);
            state.meddraOptions = action.payload;
        });
    },
});

export default meddraSlice.reducer;
export const {
    reset,
    setSOC,
    setHLGT,
    setHLT,
    setPT,
    setLLT,
    setSOCvalue,
    setHLGTvalue,
    setHLTvalue,
    setPTvalue,
    setLLTvalue,
    setMeddraVersion,
} = meddraSlice.actions;
