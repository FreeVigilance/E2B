import { createSlice } from '@reduxjs/toolkit';
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
import { Result } from './result';

export const resultsSelector = (state) => state.results;

export const getResults = () => {
    return (dispatch, getState) => {
        let resultsData = getState().results.resultsData;

        let data = [];
        Object.values(resultsData).forEach((item, index) => {
            let itemData = {};
            itemData['id'] = item['id'];
            itemData['F_r_1_TestDate'] = {
                value: parseDate(item['F_r_1_TestDate'].value),
                nullFlavor: item['F_r_1_TestDate'].nullFlavor,
            };
            if (itemData['F_r_1_TestDate']['nullFlavor'] === -1) {
                itemData['F_r_1_TestDate'] = { value: null, nullFlavor: 'UNK' };
            }
            itemData['F_r_2_1_TestName'] = item['F_r_2_1_TestName'];
            itemData['F_r_2_2a_MedDRAVersionTestName'] =
                item['F_r_2_2a_MedDRAVersionTestName'];
            itemData['F_r_2_2b_TestNameMedDRACode'] =
                item['F_r_2_2b_TestNameMedDRACode'];

            itemData['F_r_3_1_TestResultCode'] = item['F_r_3_1_TestResultCode'];
            itemData['F_r_3_2_TestResultValQual'] =
                item['F_r_3_2_TestResultValQual']['nullFlavor'] !== null
                    ? {
                          value: null,
                          nullFlavor:
                              nullFlavors[
                                  item['F_r_3_2_TestResultValQual'][
                                      'nullFlavor'
                                  ]
                              ],
                      }
                    : item['F_r_3_2_TestResultValQual'];
            itemData['F_r_3_3_TestResultUnit'] = item['F_r_3_3_TestResultUnit'];
            itemData['F_r_3_4_ResultUnstructuredData'] =
                item['F_r_3_4_ResultUnstructuredData'];

            itemData['F_r_4_NormalLowValue'] = item['F_r_4_NormalLowValue'];
            itemData['F_r_5_NormalHighValue'] = item['F_r_5_NormalHighValue'];
            itemData['F_r_6_Comments'] = item['F_r_6_Comments'];
            itemData['F_r_7_MoreInformationAvailable'] =
                item['F_r_7_MoreInformationAvailable'];
            data.push(itemData);
        });
        return data;
    };
};

const initialState = {
    resultsData: [],
};

const resultsSlice = createSlice({
    name: 'results',
    initialState: initialState,
    reducers: {
        setResultsData: (state, action) => {
            state.resultsData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(revertAll, () => initialState);

        builder.addCase(getData.fulfilled, (state, action) => {
            if (
                action.payload
                    .f_r_results_tests_procedures_investigation_patient
            ) {
                const data = e2bCaseKeys(
                    action.payload
                        .f_r_results_tests_procedures_investigation_patient,
                );
                console.log('results', data);
                state.resultsData = data;
            }
        });

        builder.addCase(changeData.fulfilled, (state, action) => {
            if (
                action.payload
                    .f_r_results_tests_procedures_investigation_patient
            ) {
                const data = e2bCaseKeys(
                    action.payload
                        .f_r_results_tests_procedures_investigation_patient,
                );
                console.log('results saved', data);
                state.resultsData = data;
            }
        });

        builder.addCase(changeData.rejected, (state, action) => {
            console.log(action.payload);
            // if (action.payload.f_r_results_tests_procedures_investigation_patient) {
            // 	const data = e2bCaseKeys(action.payload.f_r_results_tests_procedures_investigation_patient);
            // 	console.log('results rejected', data);
            // 	state.resultsData = data;
            // }
        });

        builder.addCase(saveData.fulfilled, (state, action) => {
            if (
                action.payload
                    .f_r_results_tests_procedures_investigation_patient
            ) {
                const data = e2bCaseKeys(
                    action.payload
                        .f_r_results_tests_procedures_investigation_patient,
                );
                console.log('results saved', data);
                state.resultsData = data;
            }
        });

        builder.addCase(saveData.rejected, (state, action) => {
            console.log(action.payload);
            // if (action.payload.f_r_results_tests_procedures_investigation_patient) {
            // 	const data = e2bCaseKeys(action.payload.f_r_results_tests_procedures_investigation_patient);
            // 	console.log('results rejected', data);
            // 	state.resultsData = data;
            // }
        });

        builder.addCase(getJsonFromXml.fulfilled, (state, action) => {
            if (
                action.payload
                    .f_r_results_tests_procedures_investigation_patient
            ) {
                const data = e2bCaseKeys(
                    action.payload
                        .f_r_results_tests_procedures_investigation_patient,
                );
                console.log('results', data);
                state.resultsData = data;
            }
        });
    },
});

export default resultsSlice.reducer;
export const { setResultsData } = resultsSlice.actions;
