import { createSlice } from '@reduxjs/toolkit'
import { getData } from '../display/slice';
import { StudyIdentification, StudyRegistration } from './study-identification';

export const studyIdentificationSelector = (state) => state.studyIdentification;

export const getStudyIdentification = () => {
    return (dispatch, getState) => {
		let studyIdentification = getState().studyIdentification.studyIdentification;
		let studyRegistration = getState().studyIdentification.studyRegistration;
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
	let studyIdentification = new StudyIdentification();
	let studyRegistration = [];
	if (jsonData['c_5_study_identification']) {
		let data = jsonData['c_5_study_identification']['c_5_1_r_study_registration'];
		if (data) {
			Object.values(data).forEach((item, index) => {
				let itemData = new StudyRegistration();
				itemData['C_5_1_r_1_StudyRegistrationNumber'] = item['c_5_1_r_1_study_registration_number'];
				itemData['C_5_1_r_2_StudyRegistrationCountry'] = item['c_5_1_r_2_study_registration_country'];
				studyRegistration.push(itemData);
			});
		}
		if (jsonData['c_5_study_identification']) {
			studyIdentification['C_5_2_StudyName'] = jsonData['c_5_study_identification']['c_5_2_study_name'];
			studyIdentification['C_5_3_SponsorStudyNumber'] = jsonData['c_5_study_identification']['c_5_3_sponsor_study_number'];
			studyIdentification['C_5_4_StudyTypeReaction'] = jsonData['c_5_study_identification']['c_5_4_study_type_reaction'];
		}
	}
	return [studyRegistration, studyIdentification];

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
	}, extraReducers: (builder) => {
        builder.addCase(getData.fulfilled, (state, action) => {
            const res = parseStudyIdentification(action.payload);
			state.studyRegistration = res[0];
			state.studyIdentification = res[1];
        });
    },
})

export default studyIdentificationSlice.reducer;
export const {
    setStudyIdentification,
	setStudyRegistration,

} = studyIdentificationSlice.actions;
