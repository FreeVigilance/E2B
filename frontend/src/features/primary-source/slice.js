import { createSlice } from '@reduxjs/toolkit'
import { PrimarySource } from './primary-source';

export const primarySourceSelector = (state) => state.primarySource;

export const getPrimarySources = () => {
    return (dispatch, getState) => {
		let primarySourceData = getState().primarySource.primarySourceData;
		let data = [];

		Object.values(primarySourceData).forEach((item, index) => {
			let itemData = {}
			itemData['C_2_r_1_ReporterName'] = {
				'C_2_r_1_1_ReporterTitle': item['C_2_r_1_1_ReporterTitle'],
				'C_2_r_1_2_ReporterGivenName': item['C_2_r_1_2_ReporterGivenName'],
				'C_2_r_1_3_ReporterMiddleName': item['C_2_r_1_3_ReporterMiddleName'],
				'C_2_r_1_4_ReporterFamilyName': item['C_2_r_1_4_ReporterFamilyName'],
			}
			itemData['C_2_r_2_ReporterAddressTelephone'] = {
				'C_2_r_2_1_ReporterOrganisation': item['C_2_r_2_1_ReporterOrganisation'],
				'C_2_r_2_2_ReporterDepartment': item['C_2_r_2_2_ReporterDepartment'],
				'C_2_r_2_3_ReporterStreet': item['C_2_r_2_3_ReporterStreet'],
				'C_2_r_2_4_ReporterCity': item['C_2_r_2_4_ReporterCity'],
				'C_2_r_2_5_ReporterStateProvince': item['C_2_r_2_5_ReporterStateProvince'],
				'C_2_r_2_6_ReporterPostcode': item['C_2_r_2_6_ReporterPostcode'],
				'C_2_r_2_7_ReporterTelephone': item['C_2_r_2_7_ReporterTelephone'],
			}
			itemData['C_2_r_3_ReporterCountryCode'] = item['C_2_r_3_ReporterCountryCode'];
			itemData['C_2_r_4_Qualification'] = item['C_2_r_4_Qualification'];
			itemData['C_2_r_5_PrimarySourceRegulatoryPurposes'] = item['C_2_r_5_PrimarySourceRegulatoryPurposes'];

			data.push(itemData);
		});

		return data;
	}
}

export const parsePrimarySources = (jsonData) => {
    return (dispatch, getState) => {
		return (dispatch, getState) => {
			let data = jsonData['C_2_r_PrimarySourceInformation'];
			let primarySource = [];
			Object.values(data).forEach((item, index) => {
				let itemData = new PrimarySource();
				itemData['C_2_r_1_1_ReporterTitle'] = item['C_2_r_1_ReporterName']['C_2_r_1_1_ReporterTitle'];
				itemData['C_2_r_1_2_ReporterGivenName'] = item['C_2_r_1_ReporterName']['C_2_r_1_2_ReporterGivenName'];
				itemData['C_2_r_1_3_ReporterMiddleName'] = item['C_2_r_1_ReporterName']['C_2_r_1_3_ReporterMiddleName'];
				itemData['C_2_r_1_4_ReporterFamilyName'] = item['C_2_r_1_ReporterName']['C_2_r_1_4_ReporterFamilyName'];

				itemData['C_2_r_2_1_ReporterOrganisation'] = item['C_2_r_2_ReporterAddressTelephone']['C_2_r_2_1_ReporterOrganisation'];
				itemData['C_2_r_2_2_ReporterDepartment'] = item['C_2_r_2_ReporterAddressTelephone']['C_2_r_2_2_ReporterDepartment'];
				itemData['C_2_r_2_3_ReporterStreet'] = item['C_2_r_2_ReporterAddressTelephone']['C_2_r_2_3_ReporterStreet'];
				itemData['C_2_r_2_4_ReporterCity'] = item['C_2_r_2_ReporterAddressTelephone']['C_2_r_2_4_ReporterCity'];
				itemData['C_2_r_2_5_ReporterStateProvince'] = item['C_2_r_2_ReporterAddressTelephone']['C_2_r_2_5_ReporterStateProvince'];
				itemData['C_2_r_2_6_ReporterPostcode'] = item['C_2_r_2_ReporterAddressTelephone']['C_2_r_2_6_ReporterPostcode'];
				itemData['C_2_r_2_7_ReporterTelephone'] = item['C_2_r_2_ReporterAddressTelephone']['C_2_r_2_7_ReporterTelephone'];

				itemData['C_2_r_3_ReporterCountryCode'] = item['C_2_r_3_ReporterCountryCode'];
				itemData['C_2_r_4_Qualification'] = item['C_2_r_4_Qualification'];
				itemData['C_2_r_5_PrimarySourceRegulatoryPurposes'] = item['C_2_r_5_PrimarySourceRegulatoryPurposes'];

				primarySource.push(itemData);
			});
			dispatch(setPrimarySourceData(primarySource));
		}
	}
}

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
