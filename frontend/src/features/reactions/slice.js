import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { nullFlavors } from '@src/components/nullFlavours';
import { getData } from '../display/slice';
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
			itemData['id'] = null;
			itemData['E_i_1_ReactionPrimarySource'] = {
				'E_i_1_1_ReactionPrimarySourceNativeLanguage' : {
					'E_i_1_1a_ReactionPrimarySourceNativeLanguage': item['E_i_1_1a_ReactionPrimarySourceNativeLanguage'],
					'E_i_1_1b_ReactionPrimarySourceLanguage': item['E_i_1_1b_ReactionPrimarySourceLanguage'],
				},
				'E_i_1_2_ReactionPrimarySourceTranslation': item['E_i_1_2_ReactionPrimarySourceTranslation']
			}
			itemData['E_i_2_1_ReactionMedDRACode'] = {
				'E_i_2_1a_MedDRAVersionReaction': item['E_i_2_1a_MedDRAVersionReaction'],
				'E_i_2_1b_ReactionMedDRACode': item['E_i_2_1b_ReactionMedDRACode'],
			}
			itemData['E_i_3_1_TermHighlightedReporter'] = item['E_i_3_1_TermHighlightedReporter']

			itemData['E_i_3_2_SeriousnessCriteriaEventLevel'] = {
				'E_i_3_2a_ResultsDeath': (item['E_i_3_2a_ResultsDeath']['value'] === false
						? {'value': null, 'nullFlavor': 'NI'}
						: item['E_i_3_2a_ResultsDeath']),
				'E_i_3_2b_LifeThreatening': (item['E_i_3_2b_LifeThreatening']['value'] === false
						? {'value': null, 'nullFlavor': 'NI'}
						: item['E_i_3_2b_LifeThreatening']),
				'E_i_3_2c_CausedProlongedHospitalisation': (item['E_i_3_2c_CausedProlongedHospitalisation']['value'] === false
						? {'value': null, 'nullFlavor': 'NI'}
						: item['E_i_3_2c_CausedProlongedHospitalisation']),	
				'E_i_3_2d_DisablingIncapacitating': (item['E_i_3_2d_DisablingIncapacitating']['value'] === false
						? {'value': null, 'nullFlavor': 'NI'}
						: item['E_i_3_2d_DisablingIncapacitating']),	
				'E_i_3_2e_CongenitalAnomalyBirthDefect': (item['E_i_3_2e_CongenitalAnomalyBirthDefect']['value'] === false
						? {'value': null, 'nullFlavor': 'NI'}
						: item['E_i_3_2e_CongenitalAnomalyBirthDefect']),
				'E_i_3_2f_OtherMedicallyImportantCondition': (item['E_i_3_2f_OtherMedicallyImportantCondition']['value'] === false
						? {'value': null, 'nullFlavor': 'NI'}
						: item['E_i_3_2f_OtherMedicallyImportantCondition'])	
			}
			itemData['E_i_4_DateStartReaction'] = (item['E_i_4_DateStartReaction']['nullFlavor'] !== null
				? {'value': null, 'nullFlavor': nullFlavors[item['E_i_4_DateStartReaction']['nullFlavor']]}
				: item['E_i_4_DateStartReaction'])
			itemData['E_i_5_DateEndReaction'] = (item['E_i_5_DateEndReaction']['nullFlavor'] !== null
				? {'value': null, 'nullFlavor': nullFlavors[item['E_i_5_DateEndReaction']['nullFlavor']]}
				: item['E_i_5_DateEndReaction'])
			itemData['E_i_6_DurationReaction'] = {
					'E_i_6a_DurationReactionNum': item['E_i_6a_DurationReactionNum'],
					'E_i_6b_DurationReactionUnit': item['E_i_6b_DurationReactionUnit'],
				}
			itemData['E_i_7_OutcomeReactionLastObservation'] = item['E_i_7_OutcomeReactionLastObservation']
			itemData['E_i_8_MedicalConfirmationHealthcareProfessional'] = item['E_i_8_MedicalConfirmationHealthcareProfessional']
			itemData['E_i_9_IdentificationCountryReaction'] = item['E_i_9_IdentificationCountryReaction']


			data.push(itemData);
		});
		return data;
	}
}

export const parseReaction = (jsonData) => {
    let data = jsonData['e_i_reaction_event'];
	let reactionsData = [];
	if (data) {
		Object.values(data).forEach((item, index) => {
			let itemData = new Reaction();
			itemData['E_i_1_1a_ReactionPrimarySourceNativeLanguage'] = item['e_i_1_reaction_primary_source']['e_i_1_1_reaction_primary_source_native_language']['e_i_1_1a_reaction_primary_source_native_language'];
			itemData['E_i_1_1b_ReactionPrimarySourceLanguage'] = item['e_i_1_reaction_primary_source']['e_i_1_1_reaction_primary_source_native_language']['e_i_1_1b_reaction_primary_source_language'];
			itemData['E_i_1_2_ReactionPrimarySourceTranslation'] = item['e_i_1_reaction_primary_source']['e_i_1_2_reaction_primary_source_translation'];
			itemData['E_i_2_1a_MedDRAVersionReaction'] = item['e_i_2_1_reaction_meddra_code']['e_i_2_1a_meddra_version_reaction'];
			itemData['E_i_2_1b_ReactionMedDRACode'] = item['e_i_2_1_reaction_meddra_code']['e_i_2_1b_reaction_meddra_code'];
			itemData['E_i_3_1_TermHighlightedReporter'] = item['e_i_3_1_term_highlighted_reporter'];

			itemData['E_i_3_2a_ResultsDeath'] = item['e_i_3_2_seriousness_criteria_event_level']['e_i_3_2a_results_death'];
			itemData['E_i_3_2b_LifeThreatening'] = item['e_i_3_2_seriousness_criteria_event_level']['e_i_3_2b_life_threatening'];
			itemData['E_i_3_2c_CausedProlongedHospitalisation'] = item['e_i_3_2_seriousness_criteria_event_level']['e_i_3_2c_caused_prolonged_hospitalisation'];
			itemData['E_i_3_2d_DisablingIncapacitating'] = item['e_i_3_2_seriousness_criteria_event_level']['e_i_3_2d_disabling_incapacitating'];
			itemData['E_i_3_2e_CongenitalAnomalyBirthDefect'] = item['e_i_3_2_seriousness_criteria_event_level']['e_i_3_2e_congenital_anomaly_birth_defect'];
			itemData['E_i_3_2f_OtherMedicallyImportantCondition'] = item['e_i_3_2_seriousness_criteria_event_level']['e_i_3_2f_other_medically_important_condition'];

			itemData['E_i_4_DateStartReaction'] = item['e_i_4_date_start_reaction'];
			itemData['E_i_5_DateEndReaction'] = item['e_i_5_date_end_reaction'];
			itemData['E_i_6a_DurationReactionNum'] = item['e_i_6_duration_reaction']['e_i_6a_duration_reaction_num'];
			itemData['E_i_6b_DurationReactionUnit'] = item['e_i_6_duration_reaction']['e_i_6b_duration_reaction_unit'];
			itemData['E_i_7_OutcomeReactionLastObservation'] = item['e_i_7_outcome_reaction_last_observation'];
			itemData['E_i_8_MedicalConfirmationHealthcareProfessional'] = item['e_i_8_medical_confirmation_healthcare_professional'];
			itemData['E_i_9_IdentificationCountryReaction'] = item['e_i_9_identification_country_reaction'];

			reactionsData.push(itemData);
		});
	}
	return reactionsData;
}

const reactionsSlice = createSlice({
	name: 'reactions',
	initialState: {
		reactionsData: []
	},
	reducers: {
		setReactionsData: (state, action) => {
			state.reactionsData = action.payload;
		},
	},
	extraReducers: (builder) => {
        builder.addCase(getData.fulfilled, (state, action) => {
            state.reactionsData = parseReaction(action.payload);
        });
    },
})

export default reactionsSlice.reducer;
export const {
    setReactionsData

} = reactionsSlice.actions;
