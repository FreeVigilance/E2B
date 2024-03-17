import { createSlice } from '@reduxjs/toolkit'
import { nullFlavors } from '@src/components/nullFlavours';
import { getData } from '../display/slice';
import { Result } from './result';

export const resultsSelector = (state) => state.results;

export const getResults = () => {
    return (dispatch, getState) => {
		let resultsData = getState().results.resultsData;
		
		let data = [];
		Object.values(resultsData).forEach((item, index) => {
			let itemData = {}
			itemData['id'] = index;
			itemData['F_r_1_TestDate'] = item['F_r_1_TestDate'];
			if (itemData['F_r_1_TestDate']['nullFlavor'] === -1) {
				itemData['F_r_1_TestDate'] = {'value': null, 'nullFlavor': 'UNK'}
			}
			itemData['F_r_2_TestName'] = { 
				"F_r_2_1_TestName": item['F_r_2_1_TestName'],
				"F_r_2_2_TestNameMedDRACode": {
					"F_r_2_2a_MedDRAVersionTestName": item["F_r_2_2a_MedDRAVersionTestName"],
					"F_r_2_2b_TestNameMedDRACode": item["F_r_2_2b_TestNameMedDRACode"],
				}
			};
			itemData['F_r_3_TestResult'] = { 
				"F_r_3_1_TestResultCode": item['F_r_3_1_TestResultCode'],
				"F_r_3_2_TestResultValQual": 
					(item['F_r_3_2_TestResultValQual']['nullFlavor'] !== null
						? {'value': null, 'nullFlavor': nullFlavors[item['F_r_3_2_TestResultValQual']['nullFlavor']]}
						: item['F_r_3_2_TestResultValQual']),
				"F_r_3_3_TestResultUnit": item['F_r_3_3_TestResultUnit'],
				"F_r_3_4_ResultUnstructuredData": item['F_r_3_4_ResultUnstructuredData'],
			};

			itemData['F_r_4_NormalLowValue'] = item["F_r_4_NormalLowValue"];
			itemData['F_r_5_NormalHighValue'] = item["F_r_5_NormalHighValue"];
			itemData['F_r_6_Comments'] = item["F_r_6_Comments"];
			itemData['F_r_7_MoreInformationAvailable'] = item["F_r_7_MoreInformationAvailable"];
			data.push(itemData);
		});
		return data;
	}
}


export const parseResults = (jsonData) => {
    let data = jsonData['f_r_results_tests_procedures_investigation_patient'];
	let reactionsData = [];
	if (data) {
		Object.values(data).forEach((item, index) => {
			let itemData = new Result();
			itemData['F_r_1_TestDate'] = item['f_r_1_test_date'];
			itemData['F_r_2_1_TestName'] = item['f_r_2_test_name']['f_r_2_1_test_name'];
			itemData['F_r_2_2a_MedDRAVersionTestName'] = item['f_r_2_test_name']['f_r_2_2_test_name_meddra_code']['f_r_2_2a_meddra_version_test_name'];
			itemData['F_r_2_2b_TestNameMedDRACode'] = item['f_r_2_test_name']['f_r_2_2_test_name_meddra_code']['f_r_2_2b_test_name_meddra_code'];

			itemData['F_r_3_1_TestResultCode'] = item['f_r_3_test_result']['f_r_3_1_test_result_code'];
			itemData['F_r_3_2_TestResultValQual'] = item['f_r_3_test_result']['f_r_3_2_test_result_val_qual'];
			itemData['F_r_3_3_TestResultUnit'] = item['f_r_3_test_result']['f_r_3_3_test_result_unit'];
			itemData['F_r_3_4_ResultUnstructuredData'] = item['f_r_3_test_result']['f_r_3_4_result_unstructured_data'];

			itemData['F_r_4_NormalLowValue'] = item['f_r_4_normal_low_value'];
			itemData['F_r_5_NormalHighValue'] = item['f_r_5_normal_high_value'];
			itemData['F_r_6_Comments'] = item['f_r_6_comments'];
			itemData['F_r_7_MoreInformationAvailable'] = item['f_r_7_more_information_available'];
			reactionsData.push(itemData);
		});
	}
	return reactionsData;
}


const resultsSlice = createSlice({
	name: 'results',
	initialState: {resultsData: []},
	reducers: {
	    setResultsData: (state, action) => { state.resultsData = action.payload },
	},
	extraReducers: (builder) => {
        builder.addCase(getData.fulfilled, (state, action) => {
            state.resultsData = parseResults(action.payload);
        });
    },
})

export default resultsSlice.reducer;
export const {
    setResultsData
} = resultsSlice.actions;
