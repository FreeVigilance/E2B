import { createSlice } from '@reduxjs/toolkit'
import { StudyIdentification, StudyRegistration } from './study-identification';

export const studyIdentificationSelector = (state) => state.studyIdentification;

const studyIdentificationSlice = createSlice({
	name: 'studyIdentification',
	initialState: {
		studyIdentification: new StudyIdentification(),
		studyRegistration: [new StudyRegistration()]
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
