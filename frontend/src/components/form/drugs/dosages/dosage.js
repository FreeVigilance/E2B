import React, { useState, useEffect } from 'react';
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
    Card,
    CardContent,
    IconButton,
    TextField,
    Checkbox,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    drugsSelector,
    getRouteOfAdministrationCodes,
    getDosageFormCodes,
    getDoseCodes,
    setDosages,
} from '@src/features/drugs/slice';
import { Dosage, Substance } from '@src/features/drugs/drugs';
import { makeStyles } from '@mui/styles';
import { DosageFieldLabel } from '@src/components/field-labels/drugs/dosage-label';
import InputMask from 'react-input-mask';
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

export const Dosages = ({ drugIndex }) => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const { dosages, doseCodes, dosageFormCodes, routeOfAdministrationCodes } = useSelector(drugsSelector);

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
                let dosagesCopy = JSON.parse(JSON.stringify(dosages));
                dosagesCopy[drugIndex][index][fieldName].value = value;
                dispatch(setDosages(dosagesCopy));
            };

    const handleAutocompleteChange = (fieldName, index) => (_, value) => {
        let dosagesCopy = JSON.parse(JSON.stringify(dosages));
        dosagesCopy[drugIndex][index][fieldName].value = value?.code ?? value;
        dispatch(setDosages(dosagesCopy));
    };

    const getDoseByCode = (code) => doseCodes.find(dose => dose.code === code);
    const getDosageFormByCode = (code) => dosageFormCodes.find(dosageForm => dosageForm.code === code);
    const getRouteOfAdministrationByCode = (code) => routeOfAdministrationCodes.find(routeOfAdministration => routeOfAdministration.code === code);

    useEffect(() => {dispatch(getDoseCodes({ data: '' }));}, []);
    useEffect(() => {dispatch(getDosageFormCodes({ data: '' }));}, []);
    useEffect(() => {dispatch(getRouteOfAdministrationCodes({ data: '' }));}, []);

    const setNullFlavor = (fieldName, index) => (event) => {
        let dosagesCopy = JSON.parse(JSON.stringify(dosages));
        dosagesCopy[drugIndex][index][fieldName].nullFlavor =
            event.target.value;
        dispatch(setDosages(dosagesCopy));
    };

    const setUnknown = (fieldName, index) => (event) => {
        let dosagesCopy = JSON.parse(JSON.stringify(dosages));
        if (event.target.checked) {
            dosagesCopy[drugIndex][index][fieldName].nullFlavor = -1;
        } else {
            dosagesCopy[drugIndex][index][fieldName].nullFlavor = null;
        }
        dispatch(setDosages(dosagesCopy));
    };

    const formList = () => {
        let list = [];
        if (dosages[drugIndex].length === 0) {
            return (
                <span>
                    <IconButton
                        size="large"
                        style={{ top: '10px' }}
                        sx={{ color: 'white', backgroundColor: '#1976d2' }}
                        onClick={addForm}
                    >
                        <AddIcon />
                    </IconButton>
                </span>
            );
        }
        Object.values(dosages[drugIndex]).forEach((item, index) => {
            list.push(
                <Card
                    sx={{
                        border: '3px solid #094B8C',
                        padding: '10px',
                        boxShadow: '5px 5px #356BA0',
                        marginBottom: 5,
                    }}
                >
                    <CardContent>
                        <Stack direction={'row'} gap={2}>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <DosageFieldLabel
                                        label="Dose"
                                        field="G_k_4_r_1a_DoseNum"
                                        drugIndex={drugIndex}
                                        index={index}
                                    ></DosageFieldLabel>
                                </Grid>
                                <Grid item xs={9}>
                                    <TextField
                                        variant="outlined"
                                        className={classes.textXshort}
                                        onChange={handleChange(
                                            'G_k_4_r_1a_DoseNum',
                                            index,
                                            true,
                                            8,
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
                                        value={item['G_k_4_r_1a_DoseNum'].value}
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <DosageFieldLabel
                                        label="Dose (unit)"
                                        field="G_k_4_r_1b_DoseUnit"
                                        drugIndex={drugIndex}
                                        index={index}
                                    ></DosageFieldLabel>
                                </Grid>
                                <Grid item xs={9}>
                                    {doseCodes.length === 0 && <TextField
                                        variant="outlined"
                                        className={classes.textShort}
                                        onChange={handleChange(
                                            'G_k_4_r_1b_DoseUnit',
                                            index,
                                        )}
                                        value={
                                            item['G_k_4_r_1b_DoseUnit'].value
                                        }
                                    />}
                                    {doseCodes.length > 0 && <Autocomplete
                                        className={classes.textShort}
                                        freeSolo
                                        autoSelect
                                        options={doseCodes}
                                        getOptionLabel={(option) => option?.code ?? option}
                                        value={getDoseByCode(item['G_k_4_r_1b_DoseUnit'].value) ?? item['G_k_4_r_1b_DoseUnit'].value}
                                        onChange={handleAutocompleteChange('G_k_4_r_1b_DoseUnit', index)}
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
                                    <DosageFieldLabel
                                        label="Number of Units in the Interval"
                                        field="G_k_4_r_2_NumberUnitsInterval"
                                        drugIndex={drugIndex}
                                        index={index}
                                    ></DosageFieldLabel>
                                </Grid>
                                <Grid item xs={9}>
                                    <TextField
                                        variant="outlined"
                                        className={classes.textXshort}
                                        onChange={handleChange(
                                            'G_k_4_r_2_NumberUnitsInterval',
                                            index,
                                            true,
                                            4,
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
                                            item['G_k_4_r_2_NumberUnitsInterval'].value
                                        }
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <DosageFieldLabel
                                        label="Date and Time of Start of Drug"
                                        field="G_k_4_r_4_DateTimeDrug"
                                        drugIndex={drugIndex}
                                        index={index}
                                    ></DosageFieldLabel>
                                </Grid>
                                <Grid item xs={9}>
                                    <Stack direction="row">
                                        <Box className="text-small">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={
                                                            item['G_k_4_r_4_DateTimeDrug'].nullFlavor !==
                                                            null
                                                        }
                                                        onChange={setUnknown(
                                                            'G_k_4_r_4_DateTimeDrug',
                                                            index,
                                                        )}
                                                    />
                                                }
                                                label="No Info"
                                            />
                                        </Box>
                                        {dosages[drugIndex][index][
                                            'G_k_4_r_4_DateTimeDrug'
                                            ]['nullFlavor'] === null ? (
                                            <InputMask
                                                mask="9999-99-99 99:99:99"
                                                maskChar="_"
                                                className={classes.textShort}
                                                value={
                                                    item['G_k_4_r_4_DateTimeDrug'].value
                                                }
                                                onChange={handleChange(
                                                    'G_k_4_r_4_DateTimeDrug',
                                                    index,
                                                )}
                                            >
                                                {(inputProps) => (
                                                    <TextField
                                                        {...inputProps}
                                                        variant="outlined"
                                                    />
                                                )}
                                            </InputMask>
                                        ) : (
                                            <FormControl
                                                className={classes.textXshort}
                                            >
                                                <InputLabel>
                                                    Null Flavor
                                                </InputLabel>
                                                <Select
                                                    value={
                                                        item['G_k_4_r_4_DateTimeDrug'].nullFlavor
                                                    }
                                                    onChange={setNullFlavor(
                                                        'G_k_4_r_4_DateTimeDrug',
                                                        index,
                                                    )}
                                                >
                                                    <MenuItem value={0}>
                                                        Masked
                                                    </MenuItem>
                                                    <MenuItem value={1}>
                                                        Asked, but not known
                                                    </MenuItem>
                                                    <MenuItem value={2}>
                                                        Not asked
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        )}
                                    </Stack>
                                </Grid>

                                <Grid item xs={3}>
                                    <DosageFieldLabel
                                        label="Date and Time of Last Administration"
                                        field="G_k_4_r_5_DateTimeLastAdministration"
                                        drugIndex={drugIndex}
                                        index={index}
                                    ></DosageFieldLabel>
                                </Grid>
                                <Grid item xs={9}>
                                    <Stack direction={'row'}>
                                        <Box className="text-small">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={
                                                            item['G_k_4_r_5_DateTimeLastAdministration'].nullFlavor !== null
                                                        }
                                                        onChange={setUnknown(
                                                            'G_k_4_r_5_DateTimeLastAdministration',
                                                            index,
                                                        )}
                                                    />
                                                }
                                                label="No Info"
                                            />
                                        </Box>
                                        {dosages[drugIndex][index]['G_k_4_r_5_DateTimeLastAdministration']['nullFlavor'] === null ? (
                                            <InputMask
                                                mask="9999-99-99 99:99:99"
                                                maskChar="_"
                                                className={classes.textShort}
                                                value={
                                                    item['G_k_4_r_5_DateTimeLastAdministration'].value
                                                }
                                                onChange={handleChange(
                                                    'G_k_4_r_5_DateTimeLastAdministration',
                                                    index,
                                                )}
                                            >
                                                {(inputProps) => (
                                                    <TextField
                                                        {...inputProps}
                                                        variant="outlined"
                                                    />
                                                )}
                                            </InputMask>
                                        ) : (
                                            <FormControl
                                                className={classes.textXshort}
                                            >
                                                <InputLabel>
                                                    Null Flavor
                                                </InputLabel>
                                                <Select
                                                    defaultValue={0}
                                                    value={
                                                        item['G_k_4_r_5_DateTimeLastAdministration'].nullFlavor
                                                    }
                                                    onChange={setNullFlavor(
                                                        'G_k_4_r_5_DateTimeLastAdministration',
                                                        index,
                                                    )}
                                                >
                                                    <MenuItem value={0}>
                                                        Masked
                                                    </MenuItem>
                                                    <MenuItem value={1}>
                                                        Asked, but not known
                                                    </MenuItem>
                                                    <MenuItem value={2}>
                                                        Not asked
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        )}
                                    </Stack>
                                </Grid>

                                <Grid item xs={3}>
                                    <DosageFieldLabel
                                        label="Duration of Drug Administration"
                                        field="G_k_4_r_6a_DurationDrugAdministrationNum"
                                        drugIndex={drugIndex}
                                        index={index}
                                    ></DosageFieldLabel>
                                </Grid>
                                <Grid item xs={9}>
                                    <TextField
                                        variant="outlined"
                                        className={classes.textXshort}
                                        onChange={handleChange(
                                            'G_k_4_r_6a_DurationDrugAdministrationNum',
                                            index,
                                            true,
                                            5,
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
                                            item['G_k_4_r_6a_DurationDrugAdministrationNum'].value
                                        }
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <DosageFieldLabel
                                        label="Duration of Drug Administration (unit)"
                                        field="G_k_4_r_6b_DurationDrugAdministrationUnit"
                                        drugIndex={drugIndex}
                                        index={index}
                                    ></DosageFieldLabel>
                                </Grid>
                                <Grid item xs={9}>
                                    <Select
                                        className={classes.textXshort}
                                        onChange={handleChange('G_k_4_r_6b_DurationDrugAdministrationUnit', index)}
                                        value={item['G_k_4_r_6b_DurationDrugAdministrationUnit'].value}
                                    >
                                        <MenuItem value={'s'}>Second (s)</MenuItem>
                                        <MenuItem value={'min'}>Minute (min)</MenuItem>
                                        <MenuItem value={'h'}>Hour (h)</MenuItem>
                                        <MenuItem value={'d'}>Day (d)</MenuItem>
                                        <MenuItem value={'wk'}>Week (wk)</MenuItem>
                                        <MenuItem value={'mo'}>Month (mo)</MenuItem>
                                        <MenuItem value={'a'}>Year (a)</MenuItem>
                                    </Select>
                                </Grid>

                                <Grid item xs={3}>
                                    <DosageFieldLabel
                                        label="Pharmaceutical Dose Form"
                                        field="G_k_4_r_9_1_PharmaceuticalDoseForm"
                                        drugIndex={drugIndex}
                                        index={index}
                                    ></DosageFieldLabel>
                                </Grid>
                                <Grid item xs={9}>
                                    <Stack direction="row">
                                        <Box className="text-small">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={
                                                            item['G_k_4_r_9_1_PharmaceuticalDoseForm'].nullFlavor !== null
                                                        }
                                                        onChange={setUnknown(
                                                            'G_k_4_r_9_1_PharmaceuticalDoseForm',
                                                            index,
                                                        )}
                                                    />
                                                }
                                                label="No Info"
                                            />
                                        </Box>
                                        {dosages[drugIndex][index]['G_k_4_r_9_1_PharmaceuticalDoseForm']['nullFlavor'] === null ? (
                                            <TextField
                                                variant="outlined"
                                                className={classes.textLong}
                                                onChange={handleChange(
                                                    'G_k_4_r_9_1_PharmaceuticalDoseForm',
                                                    index,
                                                )}
                                                value={
                                                    item['G_k_4_r_9_1_PharmaceuticalDoseForm'].value
                                                }
                                            />
                                        ) : (
                                            <FormControl
                                                className={classes.textXshort}
                                            >
                                                <InputLabel>
                                                    Null Flavor
                                                </InputLabel>
                                                <Select
                                                    value={
                                                        item['G_k_4_r_9_1_PharmaceuticalDoseForm'].nullFlavor
                                                    }
                                                    onChange={setNullFlavor(
                                                        'G_k_4_r_9_1_PharmaceuticalDoseForm',
                                                        index,
                                                    )}
                                                >
                                                    <MenuItem value={1}>
                                                        Asked, but not known
                                                    </MenuItem>
                                                    <MenuItem value={2}>
                                                        Not asked
                                                    </MenuItem>
                                                    <MenuItem value={3}>
                                                        Unknown
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        )}
                                    </Stack>
                                </Grid>

                                <Grid item xs={3}>
                                    <DosageFieldLabel
                                        label="Pharmaceutical Dose Form TermID Version Date/Number"
                                        field="G_k_4_r_9_2a_PharmaceuticalDoseFormTermIDVersion"
                                        drugIndex={drugIndex}
                                        index={index}
                                    ></DosageFieldLabel>
                                </Grid>
                                <Grid item xs={9}>
                                    <TextField
                                        variant="outlined"
                                        className={classes.textMedium}
                                        onChange={handleChange(
                                            'G_k_4_r_9_2a_PharmaceuticalDoseFormTermIDVersion',
                                            index,
                                        )}
                                        value={
                                            item['G_k_4_r_9_2a_PharmaceuticalDoseFormTermIDVersion'].value
                                        }
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <DosageFieldLabel
                                        label="Pharmaceutical Dose Form TermID"
                                        field="G_k_4_r_9_2b_PharmaceuticalDoseFormTermID"
                                        drugIndex={drugIndex}
                                        index={index}
                                    ></DosageFieldLabel>
                                </Grid>
                                <Grid item xs={9}>
                                    {dosageFormCodes.length === 0 && <TextField
                                        variant="outlined"
                                        className={classes.textLong}
                                        onChange={handleChange(
                                            'G_k_4_r_9_2b_PharmaceuticalDoseFormTermID',
                                            index,
                                        )}
                                        value={
                                            item['G_k_4_r_9_2b_PharmaceuticalDoseFormTermID'].value
                                        }
                                    />}
                                    {dosageFormCodes.length > 0 && <Autocomplete
                                        className={classes.textLong}
                                        autoHighlight
                                        autoSelect
                                        options={dosageFormCodes}
                                        getOptionLabel={(option) => option.name ?? ''}
                                        value={getDosageFormByCode(item['G_k_4_r_9_2b_PharmaceuticalDoseFormTermID'].value) ?? ''}
                                        onChange={handleAutocompleteChange('G_k_4_r_9_2b_PharmaceuticalDoseFormTermID', index)}
                                        filterOptions={(options, { inputValue }) =>
                                            matchSorter(options, inputValue, { keys: ['code', 'name'], threshold: matchSorter.rankings.CONTAINS })}
                                        renderOption={(props2, option) => {
                                            return (
                                                <li {...props2} key={option.code}>
                                                    {`${option.code}\t${option.name}`}
                                                </li>
                                            );
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                label="EDQM dosage form code"
                                                {...params}
                                            />
                                        )}
                                    ></Autocomplete>}
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <DosageFieldLabel
                                        label="Route of Administration"
                                        field="G_k_4_r_10_1_RouteAdministration"
                                        drugIndex={drugIndex}
                                        index={index}
                                    ></DosageFieldLabel>
                                </Grid>
                                <Grid item xs={9}>
                                    <Stack direction="row">
                                        <Box className="text-small">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={
                                                            item['G_k_4_r_10_1_RouteAdministration'].nullFlavor !== null
                                                        }
                                                        onChange={setUnknown(
                                                            'G_k_4_r_10_1_RouteAdministration',
                                                            index,
                                                        )}
                                                    />
                                                }
                                                label="No Info"
                                            />
                                        </Box>
                                        {dosages[drugIndex][index]['G_k_4_r_10_1_RouteAdministration']['nullFlavor'] === null ? (
                                            <TextField
                                                variant="outlined"
                                                className={classes.textLong}
                                                onChange={handleChange(
                                                    'G_k_4_r_10_1_RouteAdministration',
                                                    index,
                                                )}
                                                value={
                                                    item['G_k_4_r_10_1_RouteAdministration'].value
                                                }
                                            />
                                        ) : (
                                            <FormControl
                                                className={classes.textXshort}
                                            >
                                                <InputLabel>
                                                    Null Flavor
                                                </InputLabel>
                                                <Select
                                                    value={
                                                        item['G_k_4_r_10_1_RouteAdministration'].nullFlavor
                                                    }
                                                    onChange={setNullFlavor(
                                                        'G_k_4_r_10_1_RouteAdministration',
                                                        index,
                                                    )}
                                                >
                                                    <MenuItem value={1}>
                                                        Asked, but not known
                                                    </MenuItem>
                                                    <MenuItem value={2}>
                                                        Not asked
                                                    </MenuItem>
                                                    <MenuItem value={3}>
                                                        Unknown
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        )}
                                    </Stack>
                                </Grid>

                                <Grid item xs={3}>
                                    <DosageFieldLabel
                                        label="Route of Administration TermID Version Date / Number"
                                        field="G_k_4_r_10_2a_RouteAdministrationTermIDVersion"
                                        drugIndex={drugIndex}
                                        index={index}
                                    ></DosageFieldLabel>
                                </Grid>
                                <Grid item xs={9}>
                                    <TextField
                                        variant="outlined"
                                        className={classes.textMedium}
                                        onChange={handleChange(
                                            'G_k_4_r_10_2a_RouteAdministrationTermIDVersion',
                                            index,
                                        )}
                                        value={
                                            item['G_k_4_r_10_2a_RouteAdministrationTermIDVersion'].value
                                        }
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <DosageFieldLabel
                                        label="Route of Administration TermID"
                                        field="G_k_4_r_10_2b_RouteAdministrationTermID"
                                        drugIndex={drugIndex}
                                        index={index}
                                    ></DosageFieldLabel>
                                </Grid>
                                <Grid item xs={9}>
                                    {routeOfAdministrationCodes.length === 0 && <TextField
                                        variant="outlined"
                                        className={classes.textMedium}
                                        onChange={handleChange(
                                            'G_k_4_r_10_2b_RouteAdministrationTermID',
                                            index,
                                        )}
                                        value={
                                            item['G_k_4_r_10_2b_RouteAdministrationTermID'].value
                                        }
                                    />}
                                    {routeOfAdministrationCodes.length > 0 && <Autocomplete
                                        className={classes.textMedium}
                                        autoHighlight
                                        autoSelect
                                        options={routeOfAdministrationCodes}
                                        getOptionLabel={(option) => option.name ?? ''}
                                        value={getRouteOfAdministrationByCode(item['G_k_4_r_10_2b_RouteAdministrationTermID'].value) ?? ''}
                                        onChange={handleAutocompleteChange('G_k_4_r_10_2b_RouteAdministrationTermID', index)}
                                        filterOptions={(options, { inputValue }) =>
                                            matchSorter(options, inputValue, { keys: ['code', 'name'], threshold: matchSorter.rankings.CONTAINS })}
                                        renderOption={(props2, option) => {
                                            return (
                                                <li {...props2} key={props2.key}>
                                                    {`${option.code}\t${option.name}`}
                                                </li>
                                            );
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                label="EDQM route of administration code"
                                                {...params}
                                            />
                                        )}
                                    ></Autocomplete>}
                                </Grid>

                                <Grid item xs={3}>
                                    <DosageFieldLabel
                                        label="Parent Route of Administration"
                                        field="G_k_4_r_11_1_ParentRouteAdministration"
                                        drugIndex={drugIndex}
                                        index={index}
                                    ></DosageFieldLabel>
                                </Grid>
                                <Grid item xs={9}>
                                    <Stack direction="row">
                                        <Box className="text-small">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={
                                                            item['G_k_4_r_11_1_ParentRouteAdministration'].nullFlavor !== null
                                                        }
                                                        onChange={setUnknown(
                                                            'G_k_4_r_11_1_ParentRouteAdministration',
                                                            index,
                                                        )}
                                                    />
                                                }
                                                label="No Info"
                                            />
                                        </Box>
                                        {dosages[drugIndex][index]['G_k_4_r_11_1_ParentRouteAdministration']['nullFlavor'] === null ? (
                                            <TextField
                                                variant="outlined"
                                                className={classes.textLong}
                                                onChange={handleChange(
                                                    'G_k_4_r_11_1_ParentRouteAdministration',
                                                    index,
                                                )}
                                                value={
                                                    item['G_k_4_r_11_1_ParentRouteAdministration'].value
                                                }
                                            />
                                        ) : (
                                            <FormControl
                                                className={classes.textXshort}
                                            >
                                                <InputLabel>
                                                    Null Flavor
                                                </InputLabel>
                                                <Select
                                                    value={
                                                        item['G_k_4_r_11_1_ParentRouteAdministration'].nullFlavor
                                                    }
                                                    onChange={setNullFlavor(
                                                        'G_k_4_r_11_1_ParentRouteAdministration',
                                                        index,
                                                    )}
                                                >
                                                    <MenuItem value={1}>
                                                        Asked, but not known
                                                    </MenuItem>
                                                    <MenuItem value={2}>
                                                        Not asked
                                                    </MenuItem>
                                                    <MenuItem value={3}>
                                                        Unknown
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        )}
                                    </Stack>
                                </Grid>

                                <Grid item xs={3}>
                                    <DosageFieldLabel
                                        label="Parent Route of Administration TermID Version Date / Number"
                                        field="G_k_4_r_11_2a_ParentRouteAdministrationTermIDVersion"
                                        drugIndex={drugIndex}
                                        index={index}
                                    ></DosageFieldLabel>
                                </Grid>
                                <Grid item xs={9}>
                                    <TextField
                                        variant="outlined"
                                        className={classes.textMedium}
                                        onChange={handleChange(
                                            'G_k_4_r_11_2a_ParentRouteAdministrationTermIDVersion',
                                            index,
                                        )}
                                        value={
                                            item['G_k_4_r_11_2a_ParentRouteAdministrationTermIDVersion'].value
                                        }
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <DosageFieldLabel
                                        label="Parent Route of Administration TermID"
                                        field="G_k_4_r_11_2b_ParentRouteAdministrationTermID"
                                        drugIndex={drugIndex}
                                        index={index}
                                    ></DosageFieldLabel>
                                </Grid>
                                <Grid item xs={9}>
                                    {routeOfAdministrationCodes.length === 0 && <TextField
                                        variant="outlined"
                                        className={classes.textMedium}
                                        onChange={handleChange(
                                            'G_k_4_r_11_2b_ParentRouteAdministrationTermID',
                                            index,
                                        )}
                                        value={
                                            item['G_k_4_r_11_2b_ParentRouteAdministrationTermID'].value
                                        }
                                    />}
                                    {routeOfAdministrationCodes.length > 0 && <Autocomplete
                                        className={classes.textMedium}
                                        autoHighlight
                                        autoSelect
                                        options={routeOfAdministrationCodes}
                                        getOptionLabel={(option) => option.name ?? ''}
                                        value={getRouteOfAdministrationByCode(item['G_k_4_r_11_2b_ParentRouteAdministrationTermID'].value) ?? ''}
                                        onChange={handleAutocompleteChange('G_k_4_r_11_2b_ParentRouteAdministrationTermID', index)}
                                        filterOptions={(options, { inputValue }) =>
                                            matchSorter(options, inputValue, { keys: ['code', 'name'], threshold: matchSorter.rankings.CONTAINS })}
                                        renderOption={(props2, option) => {
                                            return (
                                                <li {...props2} key={props2.key}>
                                                    {`${option.code}\t${option.name}`}
                                                </li>
                                            );
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                label="EDQM route of administration code"
                                                {...params}
                                            />
                                        )}
                                    ></Autocomplete>}
                                </Grid>

                                <Grid item xs={3}>
                                    <DosageFieldLabel
                                        label="Batch / Lot Number"
                                        field="G_k_4_r_7_BatchLotNumber"
                                        drugIndex={drugIndex}
                                        index={index}
                                    ></DosageFieldLabel>
                                </Grid>
                                <Grid item xs={9}>
                                    <TextField
                                        variant="outlined"
                                        className={classes.textShort}
                                        onChange={handleChange(
                                            'G_k_4_r_7_BatchLotNumber',
                                            index,
                                        )}
                                        value={
                                            item['G_k_4_r_7_BatchLotNumber'].value
                                        }
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <DosageFieldLabel
                                        label="Dosage Text"
                                        field="G_k_4_r_8_DosageText"
                                        drugIndex={drugIndex}
                                        index={index}
                                    ></DosageFieldLabel>
                                </Grid>
                                <Grid item xs={9}>
                                    <TextField
                                        variant="outlined"
                                        className={classes.textLong}
                                        onChange={handleChange(
                                            'G_k_4_r_8_DosageText',
                                            index,
                                        )}
                                        value={
                                            item['G_k_4_r_8_DosageText'].value
                                        }
                                        multiline
                                        rows={7}
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <DosageFieldLabel
                                        label="Definition of the Time Interval Unit"
                                        field="G_k_4_r_3_DefinitionIntervalUnit"
                                        drugIndex={drugIndex}
                                        index={index}
                                    ></DosageFieldLabel>
                                </Grid>
                                <Grid item xs={9}>
                                    <Select
                                        className={classes.textXshort}
                                        onChange={handleChange('G_k_4_r_3_DefinitionIntervalUnit', index)}
                                        value={item['G_k_4_r_3_DefinitionIntervalUnit'].value}
                                    >
                                        <MenuItem value={'min'}>Minute (min)</MenuItem>
                                        <MenuItem value={'h'}>Hour (h)</MenuItem>
                                        <MenuItem value={'d'}>Day (d)</MenuItem>
                                        <MenuItem value={'wk'}>Week (wk)</MenuItem>
                                        <MenuItem value={'mo'}>Month (mo)</MenuItem>
                                        <MenuItem value={'a'}>Year (a)</MenuItem>
                                        <MenuItem value={'{cyclical}'}>Cyclical</MenuItem>
                                        <MenuItem value={'{asnecessary}'}>As necessary</MenuItem>
                                        <MenuItem value={'{total}'}>Total</MenuItem>
                                    </Select>
                                </Grid>
                            </Grid>
                        </Stack>

                        {index === dosages[drugIndex].length - 1 ? (
                            <span>
                                <IconButton
                                    size="large"
                                    style={{ top: '10px', right: '10px' }}
                                    sx={{
                                        color: 'white',
                                        backgroundColor: '#1976d2',
                                    }}
                                    onClick={addForm}
                                >
                                    <AddIcon />
                                </IconButton>
                            </span>
                        ) : null}
                        <span>
                            <IconButton
                                size="large"
                                style={{ top: '10px' }}
                                sx={{
                                    color: 'white',
                                    backgroundColor: '#000066',
                                }}
                                onClick={() => removeForm(index)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </span>
                    </CardContent>
                </Card>,
            );

        });
        return list;
    };

    const addForm = () => {
        let dosagesCopy = JSON.parse(JSON.stringify(dosages));
        let dosageNew = new Dosage();
        dosagesCopy[drugIndex].push(dosageNew);
        dispatch(setDosages(dosagesCopy));
    };

    const removeForm = (index) => {
        let dosagesCopy = JSON.parse(JSON.stringify(dosages));
        dosagesCopy[drugIndex].splice(index, 1);
        dispatch(setDosages(dosagesCopy));
    };

    return <div>{formList()}</div>;
};
