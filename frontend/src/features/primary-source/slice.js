import { createSlice } from '@reduxjs/toolkit'
import { getData } from '../display/slice';
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
    let data = jsonData['c_2_r_primary_source_information'];
	let primarySource = [];
	if (data) {
		Object.values(data).forEach((item, index) => {
			let itemData = new PrimarySource();
			itemData['C_2_r_1_1_ReporterTitle'] = item['c_2_r_1_reporter_name']['c_2_r_1_1_reporter_title'];
			itemData['C_2_r_1_2_ReporterGivenName'] = item['c_2_r_1_reporter_name']['c_2_r_1_2_reporter_given_name'];
			itemData['C_2_r_1_3_ReporterMiddleName'] = item['c_2_r_1_reporter_name']['c_2_r_1_3_reporter_middle_name'];
			itemData['C_2_r_1_4_ReporterFamilyName'] = item['c_2_r_1_reporter_name']['c_2_r_1_4_reporter_family_name'];

			itemData['C_2_r_2_1_ReporterOrganisation'] = item['c_2_r_2_reporter_address_telephone']['c_2_r_2_1_reporter_organisation'];
			itemData['C_2_r_2_2_ReporterDepartment'] = item['c_2_r_2_reporter_address_telephone']['c_2_r_2_2_reporter_department'];
			itemData['C_2_r_2_3_ReporterStreet'] = item['c_2_r_2_reporter_address_telephone']['c_2_r_2_3_reporter_street'];
			itemData['C_2_r_2_4_ReporterCity'] = item['c_2_r_2_reporter_address_telephone']['c_2_r_2_4_reporter_city'];
			itemData['C_2_r_2_5_ReporterStateProvince'] = item['c_2_r_2_reporter_address_telephone']['c_2_r_2_5_reporter_state_province'];
			itemData['C_2_r_2_6_ReporterPostcode'] = item['c_2_r_2_reporter_address_telephone']['c_2_r_2_6_reporter_postcode'];
			itemData['C_2_r_2_7_ReporterTelephone'] = item['c_2_r_2_reporter_address_telephone']['c_2_r_2_7_reporter_telephone'];

			itemData['C_2_r_3_ReporterCountryCode'] = item['c_2_r_3_reporter_country_code'];
			itemData['C_2_r_4_Qualification'] = item['c_2_r_4_qualification'];
			itemData['C_2_r_5_PrimarySourceRegulatoryPurposes'] = item['c_2_r_5_primary_source_regulatory_purposes'];

			primarySource.push(itemData);
		});
	}
	return primarySource;
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
	},
	extraReducers: (builder) => {
        builder.addCase(getData.fulfilled, (state, action) => {
            state.primarySourceData = parsePrimarySources(action.payload);
        });
    },
})

export default primarySourceSlice.reducer;
export const {
    setPrimarySourceData,

} = primarySourceSlice.actions;
