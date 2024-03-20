import { createSlice } from '@reduxjs/toolkit'
import { e2bCaseKeys } from '../common/changekeys';
import { changeData, getData, revertAll, saveData } from '../display/slice';
import { InfoSender } from './info-sender';

export const infoSenderSelector = (state) => state.infoSender;

export const getInfoSender = () => {
    return (dispatch, getState) => {
		let infoSenderData = getState().infoSender.infoSenderData;
		let itemData = {}
		itemData['id'] = infoSenderData['id'];
		itemData['C_3_1_SenderType'] = infoSenderData['C_3_1_SenderType'];
		itemData['C_3_2_SenderOrganisation'] = infoSenderData['C_3_2_SenderOrganisation'];
		itemData['C_3_3_1_SenderDepartment'] = infoSenderData['C_3_3_1_SenderDepartment'];
		itemData['C_3_3_2_SenderTitle'] = infoSenderData['C_3_3_2_SenderTitle'];
		itemData['C_3_3_3_SenderGivenName'] = infoSenderData['C_3_3_3_SenderGivenName'];
		itemData['C_3_3_4_SenderMiddleName'] = infoSenderData['C_3_3_4_SenderMiddleName'];
		itemData['C_3_3_5_SenderFamilyName'] = infoSenderData['C_3_3_5_SenderFamilyName'];
		itemData['C_3_4_1_SenderStreetAddress'] = infoSenderData['C_3_4_1_SenderStreetAddress'];
		itemData['C_3_4_2_SenderCity'] = infoSenderData['C_3_4_2_SenderCity'];
		itemData['C_3_4_3_SenderStateProvince'] = infoSenderData['C_3_4_3_SenderStateProvince'];
		itemData['C_3_4_5_SenderCountryCode'] = infoSenderData['C_3_4_5_SenderCountryCode'];
		itemData['C_3_4_6_SenderTelephone'] = infoSenderData['C_3_4_6_SenderTelephone'];
		itemData['C_3_4_7_SenderFax'] = infoSenderData['C_3_4_7_SenderFax'];
		itemData['C_3_4_8_SenderEmail'] = infoSenderData['C_3_4_8_SenderEmail'];
		return itemData;
	}
}

const initialState = {
	infoSenderData: new InfoSender()
}

const infoSenderSlice = createSlice({
	name: 'infoSender',
	initialState: initialState,
	reducers: {
		setInfoSenderData: (state, action) => {
			state.infoSenderData = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(revertAll, () => initialState);

        builder.addCase(getData.fulfilled, (state, action) => {
			const data = e2bCaseKeys(action.payload.c_3_information_sender_case_safety_report);
            console.log('infoSender', data);
			state.infoSenderData = data;
        });

		builder.addCase(saveData.fulfilled, (state, action) => {
			const data = e2bCaseKeys(action.payload.c_3_information_sender_case_safety_report);
            console.log('infoSender', data);
			state.infoSenderData = data;
        });

		builder.addCase(changeData.fulfilled, (state, action) => {
			const data = e2bCaseKeys(action.payload.c_3_information_sender_case_safety_report);
            console.log('infoSender', data);
			state.infoSenderData = data;
        });
    },
})

export default infoSenderSlice.reducer;
export const {
    setInfoSenderData,

} =infoSenderSlice.actions;
