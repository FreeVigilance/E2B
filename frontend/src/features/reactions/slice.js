import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { nullFlavors } from '@src/components/nullFlavours';
import { e2bCaseKeys } from '../common/changekeys';
import {
    changeData,
    getData,
    getJsonFromXml,
    parseDate,
    revertAll,
    saveData,
} from '../display/slice';
import { Reaction } from './reaction';
import { api } from '@src/api';

export const reactionsSelector = (state) => state.reactions;

export const save = createAsyncThunk('reactions/save', (data) => {
    return api.save(data);
});

export const getLanguageCodes = createAsyncThunk(
    'reactions/getLanguageCodes',
    (options) => {
        return api.getLanguageCodes(options.data);
    },
);

export const getCountryCodes = createAsyncThunk(
    'reactions/getCountryCodes',
    (options) => {
        return api.getCountryCodes(options.data);
    },
);

export const getReaction = () => {
    return (dispatch, getState) => {
        let reactionsData = getState().reactions.reactionsData;

        let data = [];
        Object.values(reactionsData).forEach((item, index) => {
            let itemData = {};
            itemData['id'] = item['id'];
            itemData['uuid'] = item['uuid'];
            itemData['E_i_1_1a_ReactionPrimarySourceNativeLanguage'] =
                item['E_i_1_1a_ReactionPrimarySourceNativeLanguage'];
            itemData['E_i_1_1b_ReactionPrimarySourceLanguage'] =
                item['E_i_1_1b_ReactionPrimarySourceLanguage'];
            itemData['E_i_1_2_ReactionPrimarySourceTranslation'] =
                item['E_i_1_2_ReactionPrimarySourceTranslation'];
            itemData['E_i_2_1a_MeddraVersionReaction'] =
                item['E_i_2_1a_MedDRAVersionReaction'];
            itemData['E_i_2_1b_ReactionMeddraCode'] =
                item['E_i_2_1b_ReactionMedDRACode'];

            itemData['E_i_3_1_TermHighlightedReporter'] =
                item['E_i_3_1_TermHighlightedReporter'];

            itemData['E_i_3_2a_ResultsDeath'] =
                item['E_i_3_2a_ResultsDeath']['value'] === false ||
                item['E_i_3_2a_ResultsDeath']['value'] === null
                    ? { value: null, nullFlavor: 'NI' }
                    : {
                        value: item['E_i_3_2a_ResultsDeath']['value'],
                        nullFlavor: null,
                    };
            itemData['E_i_3_2b_LifeThreatening'] =
                item['E_i_3_2b_LifeThreatening']['value'] === false ||
                item['E_i_3_2b_LifeThreatening']['value'] === null
                    ? { value: null, nullFlavor: 'NI' }
                    : {
                        value: item['E_i_3_2b_LifeThreatening']['value'],
                        nullFlavor: null,
                    };
            itemData['E_i_3_2c_CausedProlongedHospitalisation'] =
                item['E_i_3_2c_CausedProlongedHospitalisation']['value'] ===
                false ||
                item['E_i_3_2c_CausedProlongedHospitalisation']['value'] ===
                null
                    ? { value: null, nullFlavor: 'NI' }
                    : {
                        value: item[
                            'E_i_3_2c_CausedProlongedHospitalisation'
                            ]['value'],
                        nullFlavor: null,
                    };
            itemData['E_i_3_2d_DisablingIncapacitating'] =
                item['E_i_3_2d_DisablingIncapacitating']['value'] === false ||
                item['E_i_3_2d_DisablingIncapacitating']['value'] === null
                    ? { value: null, nullFlavor: 'NI' }
                    : {
                        value: item['E_i_3_2d_DisablingIncapacitating'][
                            'value'
                            ],
                        nullFlavor: null,
                    };
            itemData['E_i_3_2e_CongenitalAnomalyBirthDefect'] =
                item['E_i_3_2e_CongenitalAnomalyBirthDefect']['value'] ===
                false ||
                item['E_i_3_2e_CongenitalAnomalyBirthDefect']['value'] === null
                    ? { value: null, nullFlavor: 'NI' }
                    : {
                        value: item['E_i_3_2e_CongenitalAnomalyBirthDefect'][
                            'value'
                            ],
                        nullFlavor: null,
                    };
            itemData['E_i_3_2f_OtherMedicallyImportantCondition'] =
                item['E_i_3_2f_OtherMedicallyImportantCondition']['value'] ===
                false ||
                item['E_i_3_2f_OtherMedicallyImportantCondition']['value'] ===
                null
                    ? { value: null, nullFlavor: 'NI' }
                    : {
                        value: item[
                            'E_i_3_2f_OtherMedicallyImportantCondition'
                            ]['value'],
                        nullFlavor: null,
                    };
            itemData['E_i_4_DateStartReaction'] =
                item['E_i_4_DateStartReaction']['nullFlavor'] !== null
                    ? {
                        value: null,
                        nullFlavor:
                            nullFlavors[
                                item['E_i_4_DateStartReaction']['nullFlavor']
                                ],
                    }
                    : {
                        value: parseDate(
                            item['E_i_4_DateStartReaction'].value,
                        ),
                        nullFlavor: null,
                    };
            itemData['E_i_5_DateEndReaction'] =
                item['E_i_5_DateEndReaction']['nullFlavor'] !== null
                    ? {
                        value: null,
                        nullFlavor:
                            nullFlavors[
                                item['E_i_5_DateEndReaction']['nullFlavor']
                                ],
                    }
                    : {
                        value: parseDate(item['E_i_5_DateEndReaction'].value),
                        nullFlavor: null,
                    };
            itemData['E_i_6a_DurationReactionNum'] =
                item['E_i_6a_DurationReactionNum'];
            itemData['E_i_6b_DurationReactionUnit'] =
                item['E_i_6b_DurationReactionUnit'];
            itemData['E_i_7_OutcomeReactionLastObservation'] =
                item['E_i_7_OutcomeReactionLastObservation'];
            itemData['E_i_8_MedicalConfirmationHealthcareProfessional'] =
                item['E_i_8_MedicalConfirmationHealthcareProfessional'];
            itemData['E_i_9_IdentificationCountryReaction'] =
                item['E_i_9_IdentificationCountryReaction'];

            data.push(itemData);
        });
        return data;
    };
};

// export const parseErrors = (errors, stateReactionsData) => {
// 	for (const [key, value] of Object.entries(errors)) {
// 		console.log(key, value);
// 		stateReactionsData[key]
// 	}
// }

const initialState = {
    reactionsData: [],
    languageCodes: [],
    countryCodes: [],
};

const reactionsSlice = createSlice({
    name: 'reactions',
    initialState: initialState,
    reducers: {
        setReactionsData: (state, action) => {
            state.reactionsData = action.payload;
        },
        setLanguageCodes: (state, action) => {
            state.languageCodes = action.payload;
        },
        setCountryCodes: (state, action) => {
            state.countryCodes = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(revertAll, () => initialState);

        builder.addCase(getData.fulfilled, (state, action) => {
            if (action.payload.e_i_reaction_event) {
                const data = e2bCaseKeys(action.payload.e_i_reaction_event);
                console.log('reactions', data);
                state.reactionsData = data;
            }
        });

        builder.addCase(saveData.fulfilled, (state, action) => {
            if (action.payload.e_i_reaction_event) {
                const data = e2bCaseKeys(action.payload.e_i_reaction_event);
                console.log('reactions', data);
                state.reactionsData = data;
            }
        });

        builder.addCase(changeData.fulfilled, (state, action) => {
            // if (action.payload['_errors']) {
            //     if (Object.keys(action.payload['_errors']).length !== 0) {
            // 		const data = e2bCaseKeys(action.payload['_errors']);
            // 		console.log('REACTION ERRORS');
            // 		parseErrors(data['E_i_ReactionEvent'], state.reactionsData);
            //     }
            // }
            if (action.payload.e_i_reaction_event) {
                const data = e2bCaseKeys(action.payload.e_i_reaction_event);
                console.log('reactions', data);
                state.reactionsData = data;
            }
        });

        builder.addCase(getJsonFromXml.fulfilled, (state, action) => {
            if (action.payload.e_i_reaction_event) {
                const data = e2bCaseKeys(action.payload.e_i_reaction_event);
                console.log('reactions', data);
                state.reactionsData = data;
            }
        });

        builder.addCase(getLanguageCodes.fulfilled, (state, action) => {
            state.languageCodes = action.payload;
        });

        builder.addCase(getCountryCodes.fulfilled, (state, action) => {
            state.countryCodes = action.payload;
        });
    },
});

export default reactionsSlice.reducer;
export const {
    setReactionsData,
    setLanguageCodes,
    setCountryCodes,
} = reactionsSlice.actions;
