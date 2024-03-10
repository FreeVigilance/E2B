import { createSlice } from '@reduxjs/toolkit'
import { InfoSender } from './info-sender';

export const infoSenderSelector = (state) => state.infoSender;

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
