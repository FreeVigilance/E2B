import { createSlice } from '@reduxjs/toolkit'
import { StudyIdentification, StudyRegistration } from './study-identification';

export const studyIdentificationSelector = (state) => state.studyIdentification;

export const getStudyIdentification = () => {
    return (dispatch, getState) => {
		let studyIdentification = getState().results.studyIdentification;
		let studyRegistration = getState().results.studyRegistration;
		let data = [];
		Object.values(studyRegistration).forEach((item, index) => {
			let itemData = {}
			itemData['id'] = index;
			itemData['C_5_1_r_1_StudyRegistrationNumber'] = item['C_5_1_r_1_StudyRegistrationNumber']
			itemData['C_5_1_r_2_StudyRegistrationCountry'] = item['C_5_1_r_2_StudyRegistrationCountry']
			data.push(itemData);
		});
		let result = {
			'C_5_1_r_StudyRegistration': data,
			'C_5_2_StudyName': studyIdentification['C_5_2_StudyName'],
			'C_5_3_SponsorStudyNumber': studyIdentification['C_5_3_SponsorStudyNumber'],
			'C_5_4_StudyTypeReaction': studyIdentification['C_5_4_StudyTypeReaction'],
		}
		return result;
	}
}

export const parseStudyIdentification = (jsonData) => {
    return (dispatch, getState) => {
		return (dispatch, getState) => {
			let data = jsonData['C_5_StudyIdentification']['C_5_1_r_StudyRegistration'];
			let studyRegistration = [];
			Object.values(data).forEach((item, index) => {
				let itemData = new StudyRegistration();
				itemData['C_5_1_r_1_StudyRegistrationNumber'] = item['C_5_1_r_1_StudyRegistrationNumber'];
				itemData['C_5_1_r_2_StudyRegistrationCountry'] = item['C_5_1_r_2_StudyRegistrationCountry'];
				studyRegistration.push(itemData);
			});
			dispatch(setStudyRegistration(studyRegistration));
			let studyIdentification = new StudyIdentification();
			studyIdentification['C_5_2_StudyName'] = jsonData['C_5_StudyIdentification']['C_5_2_StudyName'];
			studyIdentification['C_5_3_SponsorStudyNumber'] = jsonData['C_5_StudyIdentification']['C_5_3_SponsorStudyNumber'];
			studyIdentification['C_5_4_StudyTypeReaction'] = jsonData['C_5_StudyIdentification']['C_5_4_StudyTypeReaction'];
			dispatch(setStudyIdentification(studyIdentification));
		}
	}
}

const studyIdentificationSlice = createSlice({
	name: 'studyIdentification',
	initialState: {
		studyIdentification: new StudyIdentification(),
		studyRegistration: []
	},
	reducers: {
		setStudyIdentification: (state, action) => {
			state.studyIdentification = action.payload;
		},
		setStudyRegistration: (state, action) => {
			state.studyRegistration = action.payload;
		},
		
	}
})

export default studyIdentificationSlice.reducer;
export const {
    setStudyIdentification,
	setStudyRegistration,

} = studyIdentificationSlice.actions;
