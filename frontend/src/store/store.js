import thunk from 'redux-thunk';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from '../features/auth/slice';
import casesListReducer from '../features/cases-list/slice';
import displayReducer from '../features/display/slice';
import resultsReducer from '../features/results/slice';
import reactionsReducer from '../features/reactions/slice';
import patientReducer from '../features/patient/slice';
import drugsReducer from '../features/drugs/slice';
import primarySourceReducer from '../features/primary-source/slice';
import infoSenderReducer from '../features/info-sender/slice';
import referencesReducer from '../features/references/slice';
import identificationReducer from '../features/identification/slice';
import studyIdentificationReducer from '../features/study-identification/slice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        casesList: casesListReducer,
        display: displayReducer,
        results: resultsReducer,
        reactions: reactionsReducer,
        patient: patientReducer,
        drugs: drugsReducer,
        primarySource: primarySourceReducer,
        infoSender: infoSenderReducer,
        references: referencesReducer,
        identification: identificationReducer,
        studyIdentification: studyIdentificationReducer,
    },

    middleware: getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
});
