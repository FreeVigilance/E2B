import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { nullFlavors } from '@src/components/nullFlavours';
import { e2bCaseKeys } from '../common/changekeys';
import { changeData, getData, getJsonFromXml, revertAll, saveData } from '../display/slice';
import { PrimarySource } from './primary-source';
import { api } from '@src/api';

export const primarySourceSelector = (state) => state.primarySource;

export const getCountryCodes = createAsyncThunk(
    'primarySource/getCountryCodes',
    (options) => {
        return api.getCountryCodes(options.data);
    },
);

export const getPrimarySources = () => {
    return (dispatch, getState) => {
        let primarySourceData = getState().primarySource.primarySourceData;
        let data = [];

        Object.values(primarySourceData).forEach((item, index) => {
            let itemData = {};
            itemData['id'] = item['id'];
            itemData['C_2_r_1_1_ReporterTitle'] = getNullFlavor(item, 'C_2_r_1_1_ReporterTitle');
            itemData['C_2_r_1_2_ReporterGivenName'] = getNullFlavor(item, 'C_2_r_1_2_ReporterGivenName');
            itemData['C_2_r_1_3_ReporterMiddleName'] = getNullFlavor(item, 'C_2_r_1_3_ReporterMiddleName');
            itemData['C_2_r_1_4_ReporterFamilyName'] = getNullFlavor(item, 'C_2_r_1_4_ReporterFamilyName');
            itemData['C_2_r_2_1_ReporterOrganisation'] = getNullFlavor(item, 'C_2_r_2_1_ReporterOrganisation');
            itemData['C_2_r_2_2_ReporterDepartment'] = getNullFlavor(item, 'C_2_r_2_2_ReporterDepartment');
            itemData['C_2_r_2_3_ReporterStreet'] = getNullFlavor(item, 'C_2_r_2_3_ReporterStreet');
            itemData['C_2_r_2_4_ReporterCity'] = getNullFlavor(item, 'C_2_r_2_4_ReporterCity');
            itemData['C_2_r_2_5_ReporterStateProvince'] = getNullFlavor(item, 'C_2_r_2_5_ReporterStateProvince');
            itemData['C_2_r_2_6_ReporterPostcode'] = getNullFlavor(item, 'C_2_r_2_6_ReporterPostcode');
            itemData['C_2_r_2_7_ReporterTelephone'] = getNullFlavor(item, 'C_2_r_2_7_ReporterTelephone');

            itemData['C_2_r_3_ReporterCountryCode'] = item['C_2_r_3_ReporterCountryCode'];

            itemData['C_2_r_4_Qualification'] = (item['C_2_r_4_Qualification']['nullFlavor'] !== null
                ? {'value': null, 'nullFlavor': 'UNK'}
                : item['C_2_r_4_Qualification']);

            itemData['C_2_r_5_PrimarySourceRegulatoryPurposes'] = item['C_2_r_5_PrimarySourceRegulatoryPurposes'];

            data.push(itemData);
        });

        return data;
    };
};

const getNullFlavor = (item, field) => {
    return item[field]['nullFlavor'] !== null
        ? {'value': null, 'nullFlavor': nullFlavors[item[field]['nullFlavor']]}
        : item[field];
};

const initialState = {
    primarySourceData: [],
    CC: [],
};

const primarySourceSlice = createSlice({
    name: 'primarySource',
    initialState: initialState,
    reducers: {
        setPrimarySourceData: (state, action) => {
            state.primarySourceData = action.payload;
        },
        setCountryCodes: (state, action) => {
            state.CC = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(revertAll, () => initialState);

        builder.addCase(getData.fulfilled, (state, action) => {
            const data = e2bCaseKeys(action.payload.c_2_r_primary_source_information);
            console.log('primarySourceData', data);
            state.primarySourceData = data;
        });

        builder.addCase(saveData.fulfilled, (state, action) => {
            const data = e2bCaseKeys(action.payload.c_2_r_primary_source_information);
            console.log('primarySourceData', data);
            state.primarySourceData = data;
        });

        builder.addCase(changeData.fulfilled, (state, action) => {
            const data = e2bCaseKeys(action.payload.c_2_r_primary_source_information);
            console.log('primarySourceData', data);
            state.primarySourceData = data;
        });

        builder.addCase(getJsonFromXml.fulfilled, (state, action) => {
            const data = e2bCaseKeys(action.payload.c_2_r_primary_source_information);
            console.log('primarySourceData', data);
            state.primarySourceData = data;
        });

        builder.addCase(getCountryCodes.fulfilled, (state, action) => {
            state.CC = action.payload;
        });
    },
});

export default primarySourceSlice.reducer;
export const {
    setPrimarySourceData,
    setCountryCodes,
} = primarySourceSlice.actions;
