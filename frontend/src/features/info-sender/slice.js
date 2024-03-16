import { createSlice } from '@reduxjs/toolkit'
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
    return (dispatch, getState) => {
		return (dispatch, getState) => {
			let infoSenderData = jsonData['C_3_InformationSenderCaseSafetyReport'];
			let itemData = new InfoSender();
			itemData['C_3_1_SenderType'] = infoSenderData['C_3_1_SenderType'];
			itemData['C_3_2_SenderOrganisation'] = infoSenderData['C_3_2_SenderOrganisation'];

			itemData['C_3_3_1_SenderDepartment'] = infoSenderData['C_3_3_PersonResponsibleSendingReport']['C_3_3_1_SenderDepartment'];
			itemData['C_3_3_2_SenderTitle'] = infoSenderData['C_3_3_PersonResponsibleSendingReport']['C_3_3_2_SenderTitle'];
			itemData['C_3_3_3_SenderGivenName'] = infoSenderData['C_3_3_PersonResponsibleSendingReport']['C_3_3_3_SenderGivenName'];
			itemData['C_3_3_4_SenderMiddleName'] = infoSenderData['C_3_3_PersonResponsibleSendingReport']['C_3_3_4_SenderMiddleName'];
			itemData['C_3_3_5_SenderFamilyName'] = infoSenderData['C_3_3_PersonResponsibleSendingReport']['C_3_3_5_SenderFamilyName'];

			itemData['C_3_4_1_SenderStreetAddress'] = infoSenderData['C_3_4_SenderAddressFaxTelephoneEmail']['C_3_4_1_SenderStreetAddress'];
			itemData['C_3_4_2_SenderCity'] = infoSenderData['C_3_4_SenderAddressFaxTelephoneEmail']['C_3_4_2_SenderCity'];
			itemData['C_3_4_3_SenderStateProvince'] = infoSenderData['C_3_4_SenderAddressFaxTelephoneEmail']['C_3_4_3_SenderStateProvince'];
			itemData['C_3_4_4_SenderPostcode'] = infoSenderData['C_3_4_SenderAddressFaxTelephoneEmail']['C_3_4_4_SenderPostcode'];
			itemData['C_3_4_5_SenderCountryCode'] = infoSenderData['C_3_4_SenderAddressFaxTelephoneEmail']['C_3_4_5_SenderCountryCode'];
			itemData['C_3_4_6_SenderTelephone'] = infoSenderData['C_3_4_SenderAddressFaxTelephoneEmail']['C_3_4_6_SenderTelephone'];
			itemData['C_3_4_7_SenderFax'] = infoSenderData['C_3_4_SenderAddressFaxTelephoneEmail']['C_3_4_7_SenderFax'];
			itemData['C_3_4_8_SenderEmail'] = infoSenderData['C_3_4_SenderAddressFaxTelephoneEmail']['C_3_4_8_SenderEmail'];

			
			dispatch(setInfoSenderData(itemData));
		}
	}
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
		
	}
})

export default infoSenderSlice.reducer;
export const {
    setInfoSenderData,

} =infoSenderSlice.actions;
