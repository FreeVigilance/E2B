import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { nullFlavors } from '@src/components/nullFlavours';
import { e2bCaseKeys } from '../common/changekeys';
import { changeData, getData, getJsonFromXml, revertAll, saveData } from '../display/slice';
import { StudyIdentification, StudyRegistration } from './study-identification';
import { api } from "@src/api";

export const studyIdentificationSelector = (state) => state.studyIdentification;

export const getCountryCodes = createAsyncThunk(
	'studyIdentification/getCountryCodes',
	(options) => {
		return api.getCountryCodes(options.data);
	},
);

export const getStudyIdentification = () => {
    return (dispatch, getState) => {
		let studyIdentification = getState().studyIdentification.studyIdentification;
		let studyRegistration = getState().studyIdentification.studyRegistration;
		let data = [];
		Object.values(studyRegistration).forEach((item, index) => {
			let itemData = {}
			itemData['id'] = index;
			itemData['C_5_1_r_1_StudyRegistrationNumber'] = getNullFlavor(item, 'C_5_1_r_1_StudyRegistrationNumber');
			itemData['C_5_1_r_2_StudyRegistrationCountry'] = getNullFlavor(item, 'C_5_1_r_2_StudyRegistrationCountry');
			itemData['id'] = item['id'];
			data.push(itemData);
		});
		let result = {
			'C_5_1_r_StudyRegistration': data,
			'C_5_2_StudyName': getNullFlavor(studyIdentification, 'C_5_2_StudyName'),
			'C_5_3_SponsorStudyNumber': getNullFlavor(studyIdentification, 'C_5_3_SponsorStudyNumber'),
			'C_5_4_StudyTypeReaction': studyIdentification['C_5_4_StudyTypeReaction'],
			'id': studyIdentification['id'],
		}
		return result;
	}
}

const getNullFlavor = (item, field) => {
    return item[field]['nullFlavor'] !== null
        ? { value: null, nullFlavor: nullFlavors[item[field]['nullFlavor']] }
        : item[field];
};

const initialState = {
	studyIdentification: new StudyIdentification(),
	studyRegistration: [],
	CC: []
}

const studyIdentificationSlice = createSlice({
	name: 'studyIdentification',
	initialState: initialState,
	reducers: {
		setStudyIdentification: (state, action) => {
			state.studyIdentification = action.payload;
		},
		setStudyRegistration: (state, action) => {
			state.studyRegistration = action.payload;
		},
		setCountryCodes: (state, action) => {
			state.CC = action.payload;
		}
	}, extraReducers: (builder) => {
		builder.addCase(revertAll, () => initialState);

        builder.addCase(getData.fulfilled, (state, action) => {
			const data = e2bCaseKeys(action.payload.c_5_study_identification);
            console.log('STUDY', data);
			state.studyIdentification = data;
			state.studyRegistration = data['C_5_1_r_StudyRegistration'];
        });

		builder.addCase(saveData.fulfilled, (state, action) => {
			const data = e2bCaseKeys(action.payload.c_5_study_identification);
            console.log('STUDY', data);
			state.studyIdentification = data;
			state.studyRegistration = data['C_5_1_r_StudyRegistration'];
        });

		builder.addCase(changeData.fulfilled, (state, action) => {
			const data = e2bCaseKeys(action.payload.c_5_study_identification);
            console.log('STUDY', data);
			state.studyIdentification = data;
			state.studyRegistration = data['C_5_1_r_StudyRegistration'];
        });

		builder.addCase(getJsonFromXml.fulfilled, (state, action) => {
			const data = e2bCaseKeys(action.payload.c_5_study_identification);
            console.log('STUDY', data);
			state.studyIdentification = data;
			state.studyRegistration = data['C_5_1_r_StudyRegistration'];
        });

		builder.addCase(getCountryCodes.fulfilled, (state, action) => {
			state.CC = action.payload;
		});
    },
})

export default studyIdentificationSlice.reducer;
export const {
    setStudyIdentification,
	setStudyRegistration,
	setCountryCodes,
} = studyIdentificationSlice.actions;
