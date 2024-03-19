import { createSlice } from '@reduxjs/toolkit'
import { e2bCaseKeys } from '../common/changekeys';
import { changeData, getData, revertAll, saveData } from '../display/slice';
import { Reference } from './references';

export const referencesSelector = (state) => state.references;

export const getReferences = () => {
    return (dispatch, getState) => {
		let referencesData = getState().references.referencesData;
		let data = [];
		Object.values(referencesData).forEach((item, index) => {
			let itemData = {}
			itemData['id'] = item['id'];
			itemData['C_4_r_1_LiteratureReference'] = item['C_4_r_1_LiteratureReference'];
			data.push(itemData);
		});
		return data;
	}
}

const initialState = {
	referencesData: []
};

const referencesSlice = createSlice({
	name: 'references',
	initialState: initialState,
	reducers: {
		setReferencesData: (state, action) => {
			state.referencesData = action.payload;
		},	
	},
	extraReducers: (builder) => {
		builder.addCase(revertAll, () => initialState);

        builder.addCase(getData.fulfilled, (state, action) => {
			const data = e2bCaseKeys(action.payload.c_4_r_literature_reference);
            console.log('references', data);
			state.referencesData = data;
        });

		builder.addCase(saveData.fulfilled, (state, action) => {
			const data = e2bCaseKeys(action.payload.c_4_r_literature_reference);
            console.log('references', data);
			state.referencesData = data;
        });

		builder.addCase(changeData.fulfilled, (state, action) => {
			const data = e2bCaseKeys(action.payload.c_4_r_literature_reference);
            console.log('references', data);
			state.referencesData = data;
        });
    },
})

export default referencesSlice.reducer;
export const {
    setReferencesData,

} = referencesSlice.actions;
