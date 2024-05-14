import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { matchSorter } from 'match-sorter';
import {
    Autocomplete,
    Select,
    MenuItem,
    Grid,
    Stack,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import {
    getCountryCodes,
    infoSenderSelector,
    setInfoSenderData,
} from '@src/features/info-sender/slice';

import { makeStyles } from '@mui/styles';
import { InfoSenderFieldLabel } from '../field-labels/info-sender-label';

const useStyles = makeStyles({
    margin: {
        marginTop: '10px',
        marginLeft: '10px',
        marginBottom: '5px',
    },
    textXshort: {
        marginLeft: 1,
        marginRight: 1,
        width: '35%',
    },
    textShort: {
        marginLeft: 1,
        marginRight: 1,
        width: '70%',
    },
    textMedium: {
        marginLeft: 1,
        marginRight: 1,
        width: '90%',
    },
    textLong: {
        marginLeft: 1,
        marginRight: 1,
        width: '100%',
    },
    label: {
        color: 'black',
    },
    checkbox: {
        paddingTop: '15px',
        paddingRight: '10px',
    },
});

export const InfoSenderComp = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const {
        infoSenderData,
        CC,
    } = useSelector(infoSenderSelector);

    const handleChange = (fieldName) => (event) => {
        let value = event.target.value;
        if (value === '') {
            value = null;
        }
        let infoSenderDataCopy = JSON.parse(JSON.stringify(infoSenderData));
        infoSenderDataCopy[fieldName].value = value;
        dispatch(setInfoSenderData(infoSenderDataCopy));
    };

    const handleAutocompleteChange = (fieldName) => (_, value) => {
        let infoSenderDataCopy = JSON.parse(JSON.stringify(infoSenderData));
        infoSenderDataCopy[fieldName].value = value?.code ?? null;
        dispatch(setInfoSenderData(infoSenderDataCopy));
    };

    const getCountryByCode = (code) => CC.find(country => country.code === code);

    useEffect(() => {dispatch(getCountryCodes({ data: '' }));}, []);

    return (
        <Stack direction={'row'} gap={2}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <InfoSenderFieldLabel
                        label="Sender Type"
                        field="C_3_1_SenderType"
                    ></InfoSenderFieldLabel>
                </Grid>
                <Grid item xs={9}>
                    <Select
                        className={classes.textMedium}
                        onChange={handleChange('C_3_1_SenderType')}
                        value={infoSenderData['C_3_1_SenderType'].value}
                    >
                        <MenuItem value={1}>
                            1 = Pharmaceutical Company
                        </MenuItem>
                        <MenuItem value={2}>2 = Regulatory Authority</MenuItem>
                        <MenuItem value={3}>3 = Health Professional</MenuItem>
                        <MenuItem value={4}>
                            4 = Regional Pharmacovigilance Centre
                        </MenuItem>
                        <MenuItem value={5}>
                            5 = WHO collaborating centres for international drug
                            monitoring
                        </MenuItem>
                        <MenuItem value={6}>
                            6 = Other (e.g. distributor or other organisation)
                        </MenuItem>
                        <MenuItem value={7}>7 = Patient / Consumer</MenuItem>
                    </Select>
                </Grid>

                <Grid item xs={3}>
                    <InfoSenderFieldLabel
                        label="Sender’s Organisation"
                        field="C_3_2_SenderOrganisation"
                    ></InfoSenderFieldLabel>
                </Grid>
                <Grid item xs={9}>
                    <TextField
                        variant="outlined"
                        className={classes.textMedium}
                        onChange={handleChange('C_3_2_SenderOrganisation')}
                        value={infoSenderData['C_3_2_SenderOrganisation'].value}
                        multiline
                        rows={2}
                    />
                </Grid>

                <Grid item xs={3}>
                    <InfoSenderFieldLabel
                        label="Sender’s Department"
                        field="C_3_3_1_SenderDepartment"
                    ></InfoSenderFieldLabel>
                </Grid>
                <Grid item xs={9}>
                    <TextField
                        variant="outlined"
                        className={classes.textMedium}
                        onChange={handleChange('C_3_3_1_SenderDepartment')}
                        value={infoSenderData['C_3_3_1_SenderDepartment'].value}
                    />
                </Grid>

                <Grid item xs={3}>
                    <InfoSenderFieldLabel
                        label="Sender’s Title"
                        field="C_3_3_2_SenderTitle"
                    ></InfoSenderFieldLabel>
                </Grid>
                <Grid item xs={9}>
                    <TextField
                        variant="outlined"
                        onChange={handleChange('C_3_3_2_SenderTitle')}
                        value={infoSenderData['C_3_3_2_SenderTitle'].value}
                        className={classes.textMedium}
                    />
                </Grid>

                <Grid item xs={3}>
                    <InfoSenderFieldLabel
                        label="Sender’s Given Name"
                        field="C_3_3_3_SenderGivenName"
                    ></InfoSenderFieldLabel>
                </Grid>
                <Grid item xs={9}>
                    <TextField
                        variant="outlined"
                        onChange={handleChange('C_3_3_3_SenderGivenName')}
                        value={infoSenderData['C_3_3_3_SenderGivenName'].value}
                        className={classes.textMedium}
                    />
                </Grid>

                <Grid item xs={3}>
                    <InfoSenderFieldLabel
                        label="Sender’s Middle Name"
                        field="C_3_3_4_SenderMiddleName"
                    ></InfoSenderFieldLabel>
                </Grid>
                <Grid item xs={9}>
                    <TextField
                        variant="outlined"
                        onChange={handleChange('C_3_3_4_SenderMiddleName')}
                        value={infoSenderData['C_3_3_4_SenderMiddleName'].value}
                        className={classes.textMedium}
                    />
                </Grid>

                <Grid item xs={3}>
                    <InfoSenderFieldLabel
                        label="Sender’s Family Name"
                        field="C_3_3_5_SenderFamilyName"
                    ></InfoSenderFieldLabel>
                </Grid>
                <Grid item xs={9}>
                    <TextField
                        variant="outlined"
                        onChange={handleChange('C_3_3_5_SenderFamilyName')}
                        value={infoSenderData['C_3_3_5_SenderFamilyName'].value}
                        className={classes.textMedium}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <InfoSenderFieldLabel
                        label="Sender’s Street Address"
                        field="C_3_4_1_SenderStreetAddress"
                    ></InfoSenderFieldLabel>
                </Grid>
                <Grid item xs={9}>
                    <TextField
                        variant="outlined"
                        onChange={handleChange('C_3_4_1_SenderStreetAddress')}
                        value={
                            infoSenderData['C_3_4_1_SenderStreetAddress'].value
                        }
                        className={classes.textMedium}
                        multiline
                        rows={2}
                    />
                </Grid>

                <Grid item xs={3}>
                    <InfoSenderFieldLabel
                        label="Sender’s City"
                        field="C_3_4_2_SenderCity"
                    ></InfoSenderFieldLabel>
                </Grid>
                <Grid item xs={9}>
                    <TextField
                        variant="outlined"
                        onChange={handleChange('C_3_4_2_SenderCity')}
                        value={infoSenderData['C_3_4_2_SenderCity'].value}
                        className={classes.textShort}
                    />
                </Grid>

                <Grid item xs={3}>
                    <InfoSenderFieldLabel
                        label="Sender’s State or Province"
                        field="C_3_4_3_SenderStateProvince"
                    ></InfoSenderFieldLabel>
                </Grid>
                <Grid item xs={9}>
                    <TextField
                        variant="outlined"
                        onChange={handleChange('C_3_4_3_SenderStateProvince')}
                        value={
                            infoSenderData['C_3_4_3_SenderStateProvince'].value
                        }
                        className={classes.textMedium}
                    />
                </Grid>

                <Grid item xs={3}>
                    <InfoSenderFieldLabel
                        label="Sender’s Postcode"
                        field="C_3_4_4_SenderPostcode"
                    ></InfoSenderFieldLabel>
                </Grid>
                <Grid item xs={9}>
                    <TextField
                        variant="outlined"
                        onChange={handleChange('C_3_4_4_SenderPostcode')}
                        value={infoSenderData['C_3_4_4_SenderPostcode'].value}
                        className={classes.textShort}
                    />
                </Grid>

                <Grid item xs={3}>
                    <InfoSenderFieldLabel
                        label="Sender’s Country Code"
                        field="C_3_4_5_SenderCountryCode"
                    ></InfoSenderFieldLabel>
                </Grid>
                <Grid item xs={9}>
                    {CC.length === 0 && <TextField
                        variant="outlined"
                        className={classes.textShort}
                        onChange={handleChange('C_3_4_5_SenderCountryCode')}
                        value={
                            infoSenderData['C_3_4_5_SenderCountryCode'].value
                        }
                    />}
                    {CC.length > 0 && <Autocomplete
                        className={classes.textShort}
                        autoHighlight
                        autoSelect
                        options={CC}
                        getOptionLabel={(option) => option.code ?? ''}
                        value={getCountryByCode(infoSenderData['C_3_4_5_SenderCountryCode'].value) ?? ''}
                        onChange={handleAutocompleteChange('C_3_4_5_SenderCountryCode')}
                        filterOptions={(options, { inputValue }) =>
                            matchSorter(options, inputValue, { keys: ['code', 'name'], threshold: matchSorter.rankings.ACRONYM })}
                        renderOption={(props2, option) => {
                            return (
                                <li {...props2} key={props2.key}>
                                    {`${option.code}\t${option.name}`}
                                </li>
                            );
                        }}
                        renderInput={(params) => (
                            <TextField
                                label="2-alpha country code"
                                {...params}
                            />
                        )}
                    ></Autocomplete>}
                </Grid>
                <Grid item xs={3}>
                    <InfoSenderFieldLabel
                        label="Sender’s Telephone"
                        field="C_3_4_6_SenderTelephone"
                    ></InfoSenderFieldLabel>
                </Grid>
                <Grid item xs={9}>
                    <TextField
                        variant="outlined"
                        className={classes.textMedium}
                        onChange={handleChange('C_3_4_6_SenderTelephone')}
                        value={infoSenderData['C_3_4_6_SenderTelephone'].value}
                    />
                </Grid>

                <Grid item xs={3}>
                    <InfoSenderFieldLabel
                        label="Sender’s Fax"
                        field="C_3_4_7_SenderFax"
                    ></InfoSenderFieldLabel>
                </Grid>
                <Grid item xs={9}>
                    <TextField
                        variant="outlined"
                        className={classes.textMedium}
                        onChange={handleChange('C_3_4_7_SenderFax')}
                        value={infoSenderData['C_3_4_7_SenderFax'].value}
                    />
                </Grid>

                <Grid item xs={3}>
                    <InfoSenderFieldLabel
                        label="Sender’s E-mail Address"
                        field="C_3_4_8_SenderEmail"
                    ></InfoSenderFieldLabel>
                </Grid>
                <Grid item xs={9}>
                    <TextField
                        variant="outlined"
                        onChange={handleChange('C_3_4_8_SenderEmail')}
                        value={infoSenderData['C_3_4_8_SenderEmail'].value}
                        className={classes.textMedium}
                        multiline
                        rows={2}
                    />
                </Grid>
            </Grid>
        </Stack>
    );
};
