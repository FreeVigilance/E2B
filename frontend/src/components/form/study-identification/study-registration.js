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
    Card,
    CardContent,
    IconButton,
    Grid,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import AddIcon from '@mui/icons-material/Add';
import {
    getCountryCodes,
    setStudyRegistration,
    studyIdentificationSelector,
} from '@src/features/study-identification/slice';
import { StudyRegistration } from '@src/features/study-identification/study-identification';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@mui/styles';
import { StudyRegistrationFieldLabel } from '@src/components/field-labels/study-identification/study-registration-label';
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
        width: '80%',
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

export const StudyRegistrationComp = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const { studyRegistration, countryCodes } = useSelector(studyIdentificationSelector);

    const handleChange = (fieldName, index) => (event) => {
        let value = event.target.value;
        if (value === '') {
            value = null;
        }
        let studyRegistrationCopy = JSON.parse(
            JSON.stringify(studyRegistration),
        );
        studyRegistrationCopy[index][fieldName].value = value;
        dispatch(setStudyRegistration(studyRegistrationCopy));
    };

    const handleAutocompleteChange = (fieldName, index) => (event, value) => {
        let studyRegistrationCopy = JSON.parse(JSON.stringify(studyRegistration));
        studyRegistrationCopy[index][fieldName].value = value?.code ?? null;
        dispatch(setStudyRegistration(studyRegistrationCopy));
    };

    const getCountryByCode = (code) => countryCodes.find(country => country.code === code);

    useEffect(() => {dispatch(getCountryCodes({ data: '' }));}, []);

    const setNullFlavor = (fieldName, index) => (event) => {
        let studyRegistrationCopy = JSON.parse(
            JSON.stringify(studyRegistration),
        );
        studyRegistrationCopy[index][fieldName].nullFlavor = event.target.value;
        dispatch(setStudyRegistration(studyRegistrationCopy));
    };

    const setUnknown = (fieldName, index) => (event) => {
        let studyRegistrationCopy = JSON.parse(
            JSON.stringify(studyRegistration),
        );
        if (event.target.checked) {
            studyRegistrationCopy[index][fieldName].nullFlavor = -1;
        } else {
            studyRegistrationCopy[index][fieldName].nullFlavor = null;
        }
        dispatch(setStudyRegistration(studyRegistrationCopy));
    };

    const formList = () => {
        let list = [];
        if (studyRegistration.length === 0) {
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
        Object.values(studyRegistration).forEach((item, index) => {
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
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <StudyRegistrationFieldLabel
                                    label="Study Registration Number"
                                    field="C_5_1_r_1_StudyRegistrationNumber"
                                    index={index}
                                ></StudyRegistrationFieldLabel>
                            </Grid>
                            <Grid item xs={9}>
                                <Stack direction="row" spacing={2}>
                                    <Box className="text-small">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={
                                                        item[
                                                            'C_5_1_r_1_StudyRegistrationNumber'
                                                            ].nullFlavor !== null
                                                    }
                                                    onChange={setUnknown(
                                                        'C_5_1_r_1_StudyRegistrationNumber',
                                                        index,
                                                    )}
                                                />
                                            }
                                            label="No Info"
                                        />
                                    </Box>
                                    {item['C_5_1_r_1_StudyRegistrationNumber'][
                                        'nullFlavor'
                                        ] === null ? (
                                        <TextField
                                            variant="outlined"
                                            className={classes.textMedium}
                                            onChange={handleChange(
                                                'C_5_1_r_1_StudyRegistrationNumber',
                                                index,
                                            )}
                                            value={
                                                item[
                                                    'C_5_1_r_1_StudyRegistrationNumber'
                                                    ].value
                                            }
                                        />
                                    ) : (
                                        <FormControl
                                            className={classes.textXshort}
                                        >
                                            <InputLabel>Null Flavor</InputLabel>
                                            <Select
                                                value={
                                                    item[
                                                        'C_5_1_r_1_StudyRegistrationNumber'
                                                        ].nullFlavor
                                                }
                                                onChange={setNullFlavor(
                                                    'C_5_1_r_1_StudyRegistrationNumber',
                                                    index,
                                                )}
                                            >
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
                                <StudyRegistrationFieldLabel
                                    label="Study Registration Country"
                                    field="C_5_1_r_2_StudyRegistrationCountry"
                                    index={index}
                                ></StudyRegistrationFieldLabel>
                            </Grid>
                            <Grid item xs={9}>
                                <Stack
                                    direction="row"
                                    spacing={2}
                                    justifyContent="flex-start"
                                >
                                    <Box className="text-small">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={
                                                        item[
                                                            'C_5_1_r_2_StudyRegistrationCountry'
                                                            ].nullFlavor !== null
                                                    }
                                                    onChange={setUnknown(
                                                        'C_5_1_r_2_StudyRegistrationCountry',
                                                        index,
                                                    )}
                                                />
                                            }
                                            label="No Info"
                                        />
                                    </Box>
                                    {item['C_5_1_r_2_StudyRegistrationCountry'][
                                        'nullFlavor'
                                        ] === null ? (
                                        <>
                                            {countryCodes.length === 0 && <TextField
                                                variant="outlined"
                                                className={classes.textShort}
                                                onChange={handleChange(
                                                    'C_5_1_r_2_StudyRegistrationCountry',
                                                    index,
                                                )}
                                                value={
                                                    item[
                                                        'C_5_1_r_2_StudyRegistrationCountry'
                                                        ].value
                                                }
                                            />}
                                            {countryCodes.length > 0 && <Autocomplete
                                                className={classes.textShort}
                                                autoHighlight
                                                autoSelect
                                                options={countryCodes}
                                                getOptionLabel={(option) => option.name ?? ''}
                                                value={getCountryByCode(item['C_5_1_r_2_StudyRegistrationCountry'].value) ?? ''}
                                                onChange={handleAutocompleteChange('C_5_1_r_2_StudyRegistrationCountry', index)}
                                                filterOptions={(options, { inputValue }) =>
                                                    matchSorter(options, inputValue, { keys: ['code', 'name'], threshold: matchSorter.rankings.ACRONYM })}
                                                renderOption={(props2, option) => {
                                                    return (
                                                        <li {...props2} key={props2.key}>
                                                            {`${option.code} — ${option.name}`}
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
                                        </>) : (
                                        <FormControl
                                            className={classes.textXshort}
                                        >
                                            <InputLabel>Null Flavor</InputLabel>
                                            <Select
                                                value={
                                                    item[
                                                        'C_5_1_r_2_StudyRegistrationCountry'
                                                        ].nullFlavor
                                                }
                                                onChange={setNullFlavor(
                                                    'C_5_1_r_2_StudyRegistrationCountry',
                                                    index,
                                                )}
                                            >
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
                        </Grid>

                        <Stack direction="row" justifyContent="flex-start">
                            {index === studyRegistration.length - 1 ? (
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
                        </Stack>
                    </CardContent>
                </Card>,
            )
            ;
        });
        return list;
    };

    const addForm = () => {
        let studyRegistrationCopy = JSON.parse(
            JSON.stringify(studyRegistration),
        );
        let studyRegistrationNew = new StudyRegistration();
        studyRegistrationCopy.push(studyRegistrationNew);
        dispatch(setStudyRegistration(studyRegistrationCopy));
    };

    const removeForm = (index) => {
        let studyRegistrationCopy = JSON.parse(
            JSON.stringify(studyRegistration),
        );
        studyRegistrationCopy.splice(index, 1);
        dispatch(setStudyRegistration(studyRegistrationCopy));
    };

    return <div>{formList()}</div>;
};
