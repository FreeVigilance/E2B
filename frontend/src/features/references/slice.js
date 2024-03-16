import { createSlice } from '@reduxjs/toolkit'
import { Reference } from './references';

export const referencesSelector = (state) => state.references;

export const getReferences = () => {
    return (dispatch, getState) => {
		let referencesData = getState().references.referencesData;
		let data = [];
		Object.values(referencesData).forEach((item, index) => {
			let itemData = {}
			itemData['id'] = null;
			itemData['C_4_r_1_LiteratureReference'] = item['C_4_r_1_LiteratureReference']
			data.push(itemData);
		});
		let jsonResult = {
			"id": null,
			"C_4_r_LiteratureReference": data
		}
		return jsonResult;
	}
}

export const parseReferences = (jsonData) => {
    return (dispatch, getState) => {
		let data = jsonData['C_4_r_LiteratureReference'];
		let referencesData = [];

		Object.values(data).forEach((item, index) => {
			let itemData = new Reference();
			itemData['C_4_r_1_LiteratureReference'] = item['C_4_r_1_LiteratureReference'];
			referencesData.push(itemData);
		});
	}
}

const referencesSlice = createSlice({
	name: 'references',
	initialState: {
		referencesData: []
	},
	reducers: {
		setReferencesData: (state, action) => {
			state.referencesData = action.payload;
		},
		
	}
})

export default referencesSlice.reducer;
export const {
    setReferencesData,

} = referencesSlice.actions;
