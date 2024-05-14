import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Autocomplete,
    Stack,
    FormControlLabel,
    Box,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Grid,
    Divider,
    FormLabel,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { getCountryCodes, drugsSelector, setDrugs, getDoseCodes } from '@src/features/drugs/slice';
import { Substances } from './substance';
import { Indications } from './indications';
import { AddInfo } from './add-info';
import { makeStyles } from '@mui/styles';
import { DrugsFieldLabel } from '@src/components/field-labels/drugs/drugs-label';
import { matchSorter } from 'match-sorter';

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

export const Drugs = ({ index }) => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const { drugs, countryCodes, doseCodes } = useSelector(drugsSelector);

    const handleChange =
        (fieldName, index, isNumber = false, length = 1) =>
            (event) => {
                let value = event.target.value;
                if (isNumber) {
                    if (value.length > length) value = value.slice(0, length);
                }
                if (value === '') {
                    value = null;
                }
                let drugsDataCopy = JSON.parse(JSON.stringify(drugs));
                drugsDataCopy[index][fieldName].value = value;
                dispatch(setDrugs(drugsDataCopy));
            };

    const handleAutocompleteChange = (fieldName, index) => (_, value) => {
        let drugsDataCopy = JSON.parse(JSON.stringify(drugs));
        drugsDataCopy[index][fieldName].value = value?.code ?? null;
        dispatch(setDrugs(drugsDataCopy));
    };

    const handleAutocompleteFreeSoloChange = (fieldName, index) => (_, value) => {
        let drugsDataCopy = JSON.parse(JSON.stringify(drugs));
        drugsDataCopy[index][fieldName].value = value?.code ?? value;
        dispatch(setDrugs(drugsDataCopy));
    };

    const getCountryByCode = (code) => countryCodes.find(country => country.code === code);
    const getDoseByCode = (code) => doseCodes.find(dose => dose.code === code);

    useEffect(() => {dispatch(getCountryCodes({ data: '' }));}, []);
    useEffect(() => {dispatch(getDoseCodes({ data: '' }));}, []);

    return (
        <>
            <Stack direction={'row'}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <DrugsFieldLabel
                            label="Characterisation of Drug Role"
                            field="G_k_1_CharacterisationDrugRole"
                            index={index}
                        ></DrugsFieldLabel>
                    </Grid>
                    <Grid item xs={9}>
                        <Select
                            className={classes.textXshort}
                            value={
                                drugs[index]['G_k_1_CharacterisationDrugRole'].value
                            }
                            onChange={handleChange(
                                'G_k_1_CharacterisationDrugRole',
                                index,
                            )}
                        >
                            <MenuItem value={1}>1 = Suspect</MenuItem>
                            <MenuItem value={2}>2 = Concomitant</MenuItem>
                            <MenuItem value={3}>3 = Interacting</MenuItem>
                            <MenuItem value={4}>
                                4 = Drug Not Administered
                            </MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={3}>
                        <DrugsFieldLabel
                            label="MPID Version Date / Number"
                            field="G_k_2_1_1a_MPIDVersion"
                            index={index}
                        ></DrugsFieldLabel>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            variant="outlined"
                            className={classes.textShort}
                            onChange={handleChange(
                                'G_k_2_1_1a_MPIDVersion',
                                index,
                            )}
                            value={drugs[index]['G_k_2_1_1a_MPIDVersion'].value}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <DrugsFieldLabel
                            label="Medicinal Product Identifier"
                            field="G_k_2_1_1b_MPID"
                            index={index}
                        ></DrugsFieldLabel>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            variant="outlined"
                            className={classes.textShort}
                            onChange={handleChange('G_k_2_1_1b_MPID', index)}
                            value={drugs[index]['G_k_2_1_1b_MPID'].value}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <DrugsFieldLabel
                            label="PhPID Version Date/Number"
                            field="G_k_2_1_2a_PhPIDVersion"
                            index={index}
                        ></DrugsFieldLabel>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            variant="outlined"
                            className={classes.textShort}
                            onChange={handleChange(
                                'G_k_2_1_2a_PhPIDVersion',
                                index,
                            )}
                            value={
                                drugs[index]['G_k_2_1_2a_PhPIDVersion'].value
                            }
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <DrugsFieldLabel
                            label="Pharmaceutical Product Identifier"
                            field="G_k_2_1_2b_PhPID"
                            index={index}
                        ></DrugsFieldLabel>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            variant="outlined"
                            className={classes.textShort}
                            onChange={handleChange('G_k_2_1_2b_PhPID', index)}
                            value={drugs[index]['G_k_2_1_2b_PhPID'].value}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <DrugsFieldLabel
                            label="Medicinal Product Name as Reported by the Primary Source"
                            field="G_k_2_2_MedicinalProductNamePrimarySource"
                            index={index}
                        ></DrugsFieldLabel>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            variant="outlined"
                            className={classes.textMedium}
                            onChange={handleChange(
                                'G_k_2_2_MedicinalProductNamePrimarySource',
                                index,
                            )}
                            value={
                                drugs[index][
                                    'G_k_2_2_MedicinalProductNamePrimarySource'
                                    ].value
                            }
                            multiline
                            rows={4}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <DrugsFieldLabel
                            label="Identification of the Country Where the Drug Was Obtained"
                            field="G_k_2_4_IdentificationCountryDrugObtained"
                            index={index}
                        ></DrugsFieldLabel>
                    </Grid>
                    <Grid item xs={9}>
                        {countryCodes.length === 0 && <TextField
                            variant="outlined"
                            className={classes.textXshort}
                            onChange={handleChange(
                                'G_k_2_4_IdentificationCountryDrugObtained',
                                index,
                            )}
                            value={
                                drugs[index][
                                    'G_k_2_4_IdentificationCountryDrugObtained'
                                    ].value
                            }
                        />}
                        {countryCodes.length > 0 && <Autocomplete
                            className={classes.textShort}
                            autoHighlight
                            autoSelect
                            options={countryCodes}
                            getOptionLabel={(option) => option.code ?? ''}
                            value={getCountryByCode(drugs[index]['G_k_2_4_IdentificationCountryDrugObtained'].value) ?? ''}
                            onChange={handleAutocompleteChange('G_k_2_4_IdentificationCountryDrugObtained', index)}
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
                        <DrugsFieldLabel
                            label="Authorisation / Application Number"
                            field="G_k_3_1_AuthorisationApplicationNumber"
                            index={index}
                        ></DrugsFieldLabel>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            variant="outlined"
                            className={classes.textShort}
                            onChange={handleChange(
                                'G_k_3_1_AuthorisationApplicationNumber',
                                index,
                            )}
                            value={
                                drugs[index][
                                    'G_k_3_1_AuthorisationApplicationNumber'
                                    ].value
                            }
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <DrugsFieldLabel
                            label="Country of Authorisation / Application"
                            field="G_k_3_2_CountryAuthorisationApplication"
                            index={index}
                        ></DrugsFieldLabel>
                    </Grid>
                    <Grid item xs={9}>
                        {countryCodes.length === 0 && <TextField
                            variant="outlined"
                            className={classes.textXshort}
                            onChange={handleChange(
                                'G_k_3_2_CountryAuthorisationApplication',
                                index,
                            )}
                            value={
                                drugs[index][
                                    'G_k_3_2_CountryAuthorisationApplication'
                                    ].value
                            }
                        />}
                        {countryCodes.length > 0 && <Autocomplete
                            className={classes.textShort}
                            autoHighlight
                            autoSelect
                            options={countryCodes}
                            getOptionLabel={(option) => option.code ?? ''}
                            value={getCountryByCode(drugs[index]['G_k_3_2_CountryAuthorisationApplication'].value) ?? ''}
                            onChange={handleAutocompleteChange('G_k_3_2_CountryAuthorisationApplication', index)}
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
                        <DrugsFieldLabel
                            label="Name of Holder / Applicant"
                            field="G_k_3_3_NameHolderApplicant"
                            index={index}
                        ></DrugsFieldLabel>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            variant="outlined"
                            className={classes.textMedium}
                            onChange={handleChange(
                                'G_k_3_3_NameHolderApplicant',
                                index,
                            )}
                            value={
                                drugs[index]['G_k_3_3_NameHolderApplicant'].value
                            }
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <DrugsFieldLabel
                            label="Cumulative Dose to First Reaction"
                            field="G_k_5a_CumulativeDoseFirstReactionNum"
                            index={index}
                        ></DrugsFieldLabel>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            variant="outlined"
                            onChange={handleChange(
                                'G_k_5a_CumulativeDoseFirstReactionNum',
                                index,
                                true,
                                10,
                            )}
                            type="number"
                            className={classes.textXshort}
                            onKeyDown={(evt) =>
                                (evt.key === '-' ||
                                    evt.key === '+' ||
                                    evt.key === 'e' ||
                                    evt.key === ',' ||
                                    evt.key === '.') &&
                                evt.preventDefault()
                            }
                            value={
                                drugs[index][
                                    'G_k_5a_CumulativeDoseFirstReactionNum'
                                    ].value
                            }
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <DrugsFieldLabel
                            label="Cumulative Dose to First Reaction (unit)"
                            field="G_k_5b_CumulativeDoseFirstReactionUnit"
                            index={index}
                        ></DrugsFieldLabel>
                    </Grid>
                    <Grid item xs={9}>
                        {doseCodes.length === 0 && <TextField
                            variant="outlined"
                            className={classes.textMedium}
                            onChange={handleChange(
                                'G_k_5b_CumulativeDoseFirstReactionUnit',
                                index,
                            )}
                            value={
                                drugs[index][
                                    'G_k_5b_CumulativeDoseFirstReactionUnit'
                                    ].value
                            }
                        />}
                        {doseCodes.length > 0 && <Autocomplete
                            className={classes.textShort}
                            freeSolo
                            options={doseCodes}
                            getOptionLabel={(option) => option?.code ?? option}
                            value={getDoseByCode(drugs[index]['G_k_5b_CumulativeDoseFirstReactionUnit'].value) ?? drugs[index]['G_k_5b_CumulativeDoseFirstReactionUnit'].value}
                            onChange={handleAutocompleteFreeSoloChange('G_k_5b_CumulativeDoseFirstReactionUnit', index)}
                            onInputChange={handleAutocompleteFreeSoloChange('G_k_5b_CumulativeDoseFirstReactionUnit', index)}
                            filterOptions={(options, { inputValue }) =>
                                matchSorter(options, inputValue, { keys: ['code', 'name'], threshold: matchSorter.rankings.CONTAINS })}
                            renderOption={(props2, option) => {
                                return (
                                    <li {...props2} key={props2.key}>
                                        {`${option.code}, ${option.name}`}
                                    </li>
                                );
                            }}
                            renderInput={(params) => (
                                <TextField
                                    label="UCUM code"
                                    {...params}
                                />
                            )}
                        ></Autocomplete>}
                    </Grid>

                    <Grid item xs={3}>
                        <DrugsFieldLabel
                            label="Gestation Period at Time of Exposure (number)"
                            field="G_k_6a_GestationPeriodExposureNum"
                            index={index}
                        ></DrugsFieldLabel>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            variant="outlined"
                            className={classes.textXshort}
                            onChange={handleChange(
                                'G_k_6a_GestationPeriodExposureNum',
                                index,
                                true,
                                3,
                            )}
                            type="number"
                            onKeyDown={(evt) =>
                                (evt.key === '-' ||
                                    evt.key === '+' ||
                                    evt.key === 'e' ||
                                    evt.key === ',' ||
                                    evt.key === '.') &&
                                evt.preventDefault()
                            }
                            value={
                                drugs[index][
                                    'G_k_6a_GestationPeriodExposureNum'
                                    ].value
                            }
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <DrugsFieldLabel
                            label="Gestation Period at Time of Exposure (unit)"
                            field="G_k_6b_GestationPeriodExposureUnit"
                            index={index}
                        ></DrugsFieldLabel>
                    </Grid>
                    <Grid item xs={9}>
                        <Select
                            className={classes.textXshort}
                            onChange={handleChange('G_k_6b_GestationPeriodExposureUnit', index)}
                            value={drugs[index]['G_k_6b_GestationPeriodExposureUnit'].value}
                        >
                            <MenuItem value={'d'}>Day (d)</MenuItem>
                            <MenuItem value={'wk'}>Week (wk)</MenuItem>
                            <MenuItem value={'mo'}>Month (mo)</MenuItem>
                            <MenuItem value={'{trimester}'}>Trimester</MenuItem>
                        </Select>
                    </Grid>

                    <Grid item xs={3}>
                        <DrugsFieldLabel
                            label="Action(s) Taken with Drug"
                            field="G_k_8_ActionTakenDrug"
                            index={index}
                        ></DrugsFieldLabel>
                    </Grid>
                    <Grid item xs={9}>
                        <Select
                            className={classes.textXshort}
                            value={
                                drugs[index]['G_k_8_ActionTakenDrug'].value
                            }
                            onChange={handleChange(
                                'G_k_8_ActionTakenDrug',
                                index,
                            )}
                        >
                            <MenuItem value={1}>1 = Drug withdrawn</MenuItem>
                            <MenuItem value={2}>2 = Dose reduced</MenuItem>
                            <MenuItem value={3}>3 = Dose increased</MenuItem>
                            <MenuItem value={4}>4 = Dose not changed</MenuItem>
                            <MenuItem value={0}>0 = Unknown</MenuItem>
                            <MenuItem value={9}>9 = Not applicable</MenuItem>
                        </Select>
                    </Grid>

                    <Grid item xs={3}>
                        <DrugsFieldLabel
                            label="Investigational Product Blinded"
                            field="G_k_2_5_InvestigationalProductBlinded"
                            index={index}
                        ></DrugsFieldLabel>
                    </Grid>
                    <Grid item xs={9}>
                        <Box className="text-small" style={{ padding: 0 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={
                                            drugs[index][
                                                'G_k_2_5_InvestigationalProductBlinded'
                                                ]
                                        }
                                        onChange={handleChange(
                                            'G_k_2_5_InvestigationalProductBlinded',
                                            index,
                                        )}
                                    />
                                }
                                label="Investigational Product Blinded"
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={3}>
                        <DrugsFieldLabel
                            label="Additional Information on Drug"
                            field="G_k_11_AdditionalInformationDrug"
                            index={index}
                        ></DrugsFieldLabel>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            variant="outlined"
                            className={classes.textLong}
                            onChange={handleChange(
                                'G_k_11_AdditionalInformationDrug',
                                index,
                            )}
                            value={
                                drugs[index]['G_k_11_AdditionalInformationDrug'].value
                            }
                            multiline
                            rows={10}
                        />
                    </Grid>
                </Grid>
            </Stack>

            <Divider sx={{ borderBottomWidth: 5, padding: 2 }} />

            <Grid container direction="row" columnGap={2}>
                <Grid container item xs direction="column" rowGap={1}>
                    <FormLabel
                        sx={{ fontSize: 30, marginLeft: '20%', color: 'black' }}
                    >
                        Substance Identifier and Strength
                    </FormLabel>
                    <Substances drugIndex={index}></Substances>
                </Grid>
                <Grid container item xs direction="column" rowGap={1}>
                    <FormLabel
                        sx={{ fontSize: 30, marginLeft: '25%', color: 'black' }}
                    >
                        Indication for Use in Case
                    </FormLabel>
                    <Indications drugIndex={index}></Indications>
                </Grid>
                <Grid container item xs direction="column" rowGap={1}>
                    <FormLabel
                        sx={{ fontSize: 30, marginLeft: '25%', color: 'black' }}
                    >
                        Additional Information on Drug
                    </FormLabel>

                    <AddInfo drugIndex={index}></AddInfo>
                </Grid>
            </Grid>
        </>
    );
};
