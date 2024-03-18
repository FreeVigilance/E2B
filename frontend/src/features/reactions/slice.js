import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { nullFlavors } from '@src/components/nullFlavours';
import { e2bCaseKeys } from '../common/changekeys';
import { changeData, getData, revertAll, saveData } from '../display/slice';
import { Reaction } from './reaction';

export const reactionsSelector = (state) => state.reactions;

export const save = createAsyncThunk(
    'reactions/save',
    (data) => {
        return api.save(data);
    },
);

export const getReaction = () => {
    return (dispatch, getState) => {
		let reactionsData = getState().reactions.reactionsData;
		
		let data = [];
		Object.values(reactionsData).forEach((item, index) => {
			let itemData = {}
			itemData['id'] = item['id'];
			itemData['E_i_1_1a_ReactionPrimarySourceNativeLanguage'] =  item['E_i_1_1a_ReactionPrimarySourceNativeLanguage'];
			itemData['E_i_1_1b_ReactionPrimarySourceLanguage'] =  item['E_i_1_1b_ReactionPrimarySourceLanguage'];
			itemData['E_i_1_2_ReactionPrimarySourceTranslation'] = item['E_i_1_2_ReactionPrimarySourceTranslation'];
			itemData['E_i_2_1a_MedDRAVersionReaction'] = item['E_i_2_1a_MedDRAVersionReaction'];
			itemData['E_i_2_1b_ReactionMedDRACode'] = item['E_i_2_1b_ReactionMedDRACode'];

			itemData['E_i_3_1_TermHighlightedReporter'] = item['E_i_3_1_TermHighlightedReporter']

			itemData['E_i_3_2a_ResultsDeath'] =  (item['E_i_3_2a_ResultsDeath']['value'] === false ||item['E_i_3_2a_ResultsDeath']['value'] === null
						? {'value': null, 'nullFlavor': 'NI'}
						: item['E_i_3_2a_ResultsDeath']);
			itemData['E_i_3_2b_LifeThreatening'] =  (item['E_i_3_2b_LifeThreatening']['value'] === false || item['E_i_3_2b_LifeThreatening']['value'] === null
						? {'value': null, 'nullFlavor': 'NI'}
						: item['E_i_3_2b_LifeThreatening']);
			itemData['E_i_3_2c_CausedProlongedHospitalisation'] =  (item['E_i_3_2c_CausedProlongedHospitalisation']['value'] === false || item['E_i_3_2c_CausedProlongedHospitalisation']['value'] === null
						? {'value': null, 'nullFlavor': 'NI'}
						: item['E_i_3_2c_CausedProlongedHospitalisation']);
			itemData['E_i_3_2d_DisablingIncapacitating'] =  (item['E_i_3_2d_DisablingIncapacitating']['value'] === false || item['E_i_3_2d_DisablingIncapacitating']['value'] === null
						? {'value': null, 'nullFlavor': 'NI'}
						: item['E_i_3_2d_DisablingIncapacitating']);	
			itemData['E_i_3_2e_CongenitalAnomalyBirthDefect'] =  (item['E_i_3_2e_CongenitalAnomalyBirthDefect']['value'] === false || item['E_i_3_2e_CongenitalAnomalyBirthDefect']['value'] === null
						? {'value': null, 'nullFlavor': 'NI'}
						: item['E_i_3_2e_CongenitalAnomalyBirthDefect']);
			itemData['E_i_3_2f_OtherMedicallyImportantCondition'] =  (item['E_i_3_2f_OtherMedicallyImportantCondition']['value'] === false || item['E_i_3_2f_OtherMedicallyImportantCondition']['value'] === null
						? {'value': null, 'nullFlavor': 'NI'}
						: item['E_i_3_2f_OtherMedicallyImportantCondition']);
			itemData['E_i_4_DateStartReaction'] = (item['E_i_4_DateStartReaction']['nullFlavor'] !== null
				? {'value': null, 'nullFlavor': nullFlavors[item['E_i_4_DateStartReaction']['nullFlavor']]}
				: item['E_i_4_DateStartReaction'])
			itemData['E_i_5_DateEndReaction'] = (item['E_i_5_DateEndReaction']['nullFlavor'] !== null
				? {'value': null, 'nullFlavor': nullFlavors[item['E_i_5_DateEndReaction']['nullFlavor']]}
				: item['E_i_5_DateEndReaction'])
			itemData['E_i_6a_DurationReactionNum'] = item['E_i_6a_DurationReactionNum'];
			itemData['E_i_6b_DurationReactionUnit'] = item['E_i_6b_DurationReactionUnit'];
			itemData['E_i_7_OutcomeReactionLastObservation'] = item['E_i_7_OutcomeReactionLastObservation']
			itemData['E_i_8_MedicalConfirmationHealthcareProfessional'] = item['E_i_8_MedicalConfirmationHealthcareProfessional']
			itemData['E_i_9_IdentificationCountryReaction'] = item['E_i_9_IdentificationCountryReaction']


			data.push(itemData);
		});
		return data;
	}
}

const initialState = {
	reactionsData: []
};

const reactionsSlice = createSlice({
	name: 'reactions',
	initialState: initialState,
	reducers: {
		setReactionsData: (state, action) => {
			state.reactionsData = action.payload;
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
			if (action.payload.e_i_reaction_event) {
				const data = e2bCaseKeys(action.payload.e_i_reaction_event);
				console.log('reactions', data);
				state.reactionsData = data;
			}
        });
    },
})

export default reactionsSlice.reducer;
export const {
    setReactionsData

} = reactionsSlice.actions;
