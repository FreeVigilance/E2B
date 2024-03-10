import { createSlice } from '@reduxjs/toolkit'
import { nullFlavors } from '@src/components/nullFlavours';
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
		let jsonResult = {
			"id": null,
			"F_r_ResultsTestsProceduresInvestigationPatient": data
		}
		return jsonResult;
	}
}


export const parseResults = (jsonData) => {
    return (dispatch, getState) => {
		return (dispatch, getState) => {
			let data = jsonData['F_r_ResultsTestsProceduresInvestigationPatient'];
			let reactionsData = [];
			Object.values(data).forEach((item, index) => {
				let itemData = new Result();
				itemData['F_r_1_TestDate'] = item['F_r_1_TestDate'];
				itemData['F_r_2_1_TestName'] = item['F_r_2_TestName']['F_r_2_1_TestName'];
				itemData['F_r_2_2a_MedDRAVersionTestName'] = item['F_r_2_TestName']['F_r_2_2_TestNameMedDRACode']['F_r_2_2a_MedDRAVersionTestName'];
				itemData['F_r_2_2b_TestNameMedDRACode'] = item['F_r_2_TestName']['F_r_2_2_TestNameMedDRACode']['F_r_2_2b_TestNameMedDRACode'];

				itemData['F_r_3_1_TestResultCode'] = item['F_r_3_TestResult']['F_r_3_1_TestResultCode'];
				itemData['F_r_3_2_TestResultValQual'] = item['F_r_3_TestResult']['F_r_3_2_TestResultValQual'];
				itemData['F_r_3_3_TestResultUnit'] = item['F_r_3_TestResult']['F_r_3_3_TestResultUnit'];
				itemData['F_r_3_4_ResultUnstructuredData'] = item['F_r_3_TestResult']['F_r_3_4_ResultUnstructuredData'];

				itemData['F_r_4_NormalLowValue'] = item['F_r_4_NormalLowValue'];
				itemData['F_r_5_NormalHighValue'] = item['F_r_5_NormalHighValue'];
				itemData['F_r_6_Comments'] = item['F_r_6_Comments'];
				itemData['F_r_7_MoreInformationAvailable'] = item['F_r_7_MoreInformationAvailable'];
				data.push(itemData);
			});
		}
	}
}


const resultsSlice = createSlice({
	name: 'results',
	initialState: {resultsData: []},
	reducers: {
	    setResultsData: (state, action) => { state.resultsData = action.payload },
		
	}
})

export default resultsSlice.reducer;
export const {
    setResultsData
} = resultsSlice.actions;
