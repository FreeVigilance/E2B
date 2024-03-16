import { createSlice } from '@reduxjs/toolkit'
import { PrimarySource } from './primary-source';

export const primarySourceSelector = (state) => state.primarySource;

// export const getPrimarySources = () => {
//     return (dispatch, getState) => {
// 		let primarySourceData = getState().primarySource.primarySourceData;
// 		let data = [];

// 		C_2_r_PrimarySourceInformation
//     C_2_r_1_ReporterName
//         C_2_r_1_1_ReporterTitle
//         C_2_r_1_2_ReporterGivenName
//         C_2_r_1_3_ReporterMiddleName
//         C_2_r_1_4_ReporterFamilyName
//     C_2_r_2_ReporterAddressTelephone
//         C_2_r_2_1_ReporterOrganisation
//         C_2_r_2_2_ReporterDepartment
//         C_2_r_2_3_ReporterStreet
//         C_2_r_2_4_ReporterCity
//         C_2_r_2_5_ReporterStateProvince
//         C_2_r_2_6_ReporterPostcode
//         C_2_r_2_7_ReporterTelephone
//     C_2_r_3_ReporterCountryCode
//     C_2_r_4_Qualification
//     C_2_r_5_PrimarySourceRegulatoryPurposes

// 		Object.values(primarySourceData).forEach((item, index) => {
// 			let itemData = {}
// 			itemData['id'] = null;
// 			itemData['C_4_r_1_LiteratureReference'] = item['C_4_r_1_LiteratureReference']
// 			data.push(itemData);
// 		});

// 		let jsonResult = {
// 			"id": null,
// 			"C_4_r_LiteratureReference": data
// 		}
// 		return jsonResult;
// 	}
// }

// export const parseReferences = (jsonData) => {
//     return (dispatch, getState) => {
// 		let data = jsonData['C_4_r_LiteratureReference'];
// 		let referencesData = [];

// 		Object.values(data).forEach((item, index) => {
// 			let itemData = new Reference();
// 			itemData['C_4_r_1_LiteratureReference'] = item['C_4_r_1_LiteratureReference'];
// 			referencesData.push(itemData);
// 		});
// 	}
// }

const primarySourceSlice = createSlice({
	name: 'primarySource',
	initialState: {
		primarySourceData: []
	},
	reducers: {
		setPrimarySourceData: (state, action) => {
			state.primarySourceData = action.payload;
		},
		
	}
})

export default primarySourceSlice.reducer;
export const {
    setPrimarySourceData,

} = primarySourceSlice.actions;
