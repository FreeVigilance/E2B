import { createSlice } from '@reduxjs/toolkit'
import { getData } from '../display/slice';
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
		return data;
	}
}

export const parseReferences = (jsonData) => {
    let data = jsonData['c_4_r_literature_reference'];
	let referencesData = [];
	if (data) {
		Object.values(data).forEach((item, index) => {
			let itemData = new Reference();
			itemData['C_4_r_1_LiteratureReference'] = item['c_4_r_1_literature_reference'];
			referencesData.push(itemData);
		});
	}
	return referencesData;
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
	},
	extraReducers: (builder) => {
        builder.addCase(getData.fulfilled, (state, action) => {
            state.referencesData = parseReferences(action.payload);
        });
    },
})

export default referencesSlice.reducer;
export const {
    setReferencesData,

} = referencesSlice.actions;
