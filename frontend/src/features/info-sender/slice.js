import { createSlice } from '@reduxjs/toolkit'
import { getData } from '../display/slice';
import { InfoSender } from './info-sender';

export const infoSenderSelector = (state) => state.infoSender;

export const getInfoSender = () => {
    return (dispatch, getState) => {
		let infoSenderData = getState().infoSender.infoSenderData;
		let itemData = {}
		itemData['C_3_1_SenderType'] = infoSenderData['C_3_1_SenderType'];
		itemData['C_3_2_SenderOrganisation'] = infoSenderData['C_3_2_SenderOrganisation'];
		itemData['C_3_3_PersonResponsibleSendingReport'] = {
				'C_3_3_1_SenderDepartment': infoSenderData['C_3_3_1_SenderDepartment'],
				'C_3_3_2_SenderTitle': infoSenderData['C_3_3_2_SenderTitle'],
				'C_3_3_3_SenderGivenName': infoSenderData['C_3_3_3_SenderGivenName'],
				'C_3_3_4_SenderMiddleName': infoSenderData['C_3_3_4_SenderMiddleName'],
				'C_3_3_5_SenderFamilyName': infoSenderData['C_3_3_5_SenderFamilyName'],
		}
		itemData['C_3_4_SenderAddressFaxTelephoneEmail'] = {
				'C_3_4_1_SenderStreetAddress': infoSenderData['C_3_4_1_SenderStreetAddress'],
				'C_3_4_2_SenderCity': infoSenderData['C_3_4_2_SenderCity'],
				'C_3_4_3_SenderStateProvince': infoSenderData['C_3_4_3_SenderStateProvince'],
				'C_3_4_5_SenderCountryCode': infoSenderData['C_3_4_5_SenderCountryCode'],
				'C_3_4_6_SenderTelephone': infoSenderData['C_3_4_6_SenderTelephone'],
				'C_3_4_7_SenderFax': infoSenderData['C_3_4_7_SenderFax'],
				'C_3_4_8_SenderEmail': infoSenderData['C_3_4_8_SenderEmail'],
		}
		return itemData;
	}
}

export const parseInfoSender = (jsonData) => {
    let infoSenderData = jsonData['c_3_information_sender_case_safety_report'];
	let itemData = new InfoSender();
	if (infoSenderData) {
		itemData['C_3_1_SenderType'] = infoSenderData['c_3_1_sender_type'];
		itemData['C_3_2_SenderOrganisation'] = infoSenderData['c_3_2_sender_organisation'];

		itemData['C_3_3_1_SenderDepartment'] = infoSenderData['c_3_3_person_responsible_sending_report']['c_3_3_1_sender_department'];
		itemData['C_3_3_2_SenderTitle'] = infoSenderData['c_3_3_person_responsible_sending_report']['c_3_3_2_sender_title'];
		itemData['C_3_3_3_SenderGivenName'] = infoSenderData['c_3_3_person_responsible_sending_report']['c_3_3_3_sender_given_name'];
		itemData['C_3_3_4_SenderMiddleName'] = infoSenderData['c_3_3_person_responsible_sending_report']['c_3_3_4_sender_middle_name'];
		itemData['C_3_3_5_SenderFamilyName'] = infoSenderData['c_3_3_person_responsible_sending_report']['c_3_3_5_sender_family_name'];

		itemData['C_3_4_1_SenderStreetAddress'] = infoSenderData['c_3_4_sender_address_fax_telephone_email']['c_3_4_1_sender_street_address'];
		itemData['C_3_4_2_SenderCity'] = infoSenderData['c_3_4_sender_address_fax_telephone_email']['c_3_4_2_sender_city'];
		itemData['C_3_4_3_SenderStateProvince'] = infoSenderData['c_3_4_sender_address_fax_telephone_email']['c_3_4_3_sender_state_province'];
		itemData['C_3_4_4_SenderPostcode'] = infoSenderData['c_3_4_sender_address_fax_telephone_email']['c_3_4_4_sender_postcode'];
		itemData['C_3_4_5_SenderCountryCode'] = infoSenderData['c_3_4_sender_address_fax_telephone_email']['c_3_4_5_sender_country_code'];
		itemData['C_3_4_6_SenderTelephone'] = infoSenderData['c_3_4_sender_address_fax_telephone_email']['c_3_4_6_sender_telephone'];
		itemData['C_3_4_7_SenderFax'] = infoSenderData['c_3_4_sender_address_fax_telephone_email']['c_3_4_7_sender_fax'];
		itemData['C_3_4_8_SenderEmail'] = infoSenderData['c_3_4_sender_address_fax_telephone_email']['c_3_4_8_sender_email'];
	}
	return itemData;
}

const infoSenderSlice = createSlice({
	name: 'infoSender',
	initialState: {
		infoSenderData: new InfoSender()
	},
	reducers: {
		setInfoSenderData: (state, action) => {
			state.infoSenderData = action.payload;
		},
	},
	extraReducers: (builder) => {
        builder.addCase(getData.fulfilled, (state, action) => {
            state.infoSenderData = parseInfoSender(action.payload);
        });
    },
})

export default infoSenderSlice.reducer;
export const {
    setInfoSenderData,

} =infoSenderSlice.actions;
