import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
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
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import {
    patientSelector,
    setParentChildData,
} from '@src/features/patient/slice';
import { ParentDrugsHistory } from './parent-drug-history';
import { ParentHistory } from './parent-history';
import { makeStyles } from '@mui/styles';
import { ParentChildFieldLabel } from '@src/components/field-labels/patient/parent-child/parent-child-label';
import InputMask from 'react-input-mask';

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

export const ParentChild = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { parentChildData } = useSelector(patientSelector);

    const handleChange =
        (fieldName, isNumber = false, length = 1) =>
        (event) => {
            let value = event.target.value;
            if (isNumber) {
                if (value.length > length) value = value.slice(0, length);
            }
            if (value === '') {
                value = null;
            }
            let parentChildDataCopy = JSON.parse(
                JSON.stringify(parentChildData),
            );
            parentChildDataCopy[fieldName].value = value;
            dispatch(setParentChildData(parentChildDataCopy));
        };

    const setNullFlavor = (fieldName) => (event) => {
        let parentChildDataCopy = JSON.parse(JSON.stringify(parentChildData));
        parentChildDataCopy[fieldName].nullFlavor = event.target.value;
        dispatch(setParentChildData(parentChildDataCopy));
    };

    const setUnknown = (fieldName) => (event) => {
        let parentChildDataCopy = JSON.parse(JSON.stringify(parentChildData));
        if (event.target.checked) {
            parentChildDataCopy[fieldName].nullFlavor = -1;
        } else {
            parentChildDataCopy[fieldName].nullFlavor = null;
        }
        dispatch(setParentChildData(parentChildDataCopy));
    };

    return (
        <>
            <Stack direction={'row'}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <ParentChildFieldLabel
                            label="Parent Identification"
                            field="D_10_1_ParentIdentification"
                        ></ParentChildFieldLabel>
                    </Grid>
                    <Grid item xs={9}>
                        <Stack direction="row">
                            <Box className="text-small">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={
                                                parentChildData[
                                                    'D_10_1_ParentIdentification'
                                                ].nullFlavor !== null
                                            }
                                            onChange={setUnknown(
                                                'D_10_1_ParentIdentification',
                                            )}
                                        />
                                    }
                                    label="No Info"
                                />
                            </Box>

                            {parentChildData['D_10_1_ParentIdentification'][
                                'nullFlavor'
                            ] === null ? (
                                <TextField
                                    variant="outlined"
                                    className={classes.textShort}
                                    onChange={handleChange(
                                        'D_10_1_ParentIdentification',
                                    )}
                                    value={
                                        parentChildData[
                                            'D_10_1_ParentIdentification'
                                        ].value
                                    }
                                />
                            ) : (
                                <FormControl className={classes.textXshort}>
                                    <InputLabel>Null Flavor</InputLabel>
                                    <Select
                                        value={
                                            parentChildData[
                                                'D_10_1_ParentIdentification'
                                            ].nullFlavor
                                        }
                                        onChange={setNullFlavor(
                                            'D_10_1_ParentIdentification',
                                        )}
                                    >
                                        <MenuItem value={0}>Masked</MenuItem>
                                        <MenuItem value={1}>
                                            Asked but unknown
                                        </MenuItem>
                                        <MenuItem value={2}>Not asked</MenuItem>
                                        <MenuItem value={3}>Unknown</MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        </Stack>
                    </Grid>

                    <Grid item xs={3}>
                        <ParentChildFieldLabel
                            label="Date of Birth of Parent"
                            field="D_10_2_1_DateBirthParent"
                        ></ParentChildFieldLabel>
                    </Grid>
                    <Grid item xs={9}>
                        <Stack direction={'row'}>
                            <Box className="text-small">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={
                                                parentChildData[
                                                    'D_10_2_1_DateBirthParent'
                                                ].nullFlavor !== null
                                            }
                                            onChange={setUnknown(
                                                'D_10_2_1_DateBirthParent',
                                            )}
                                        />
                                    }
                                    label="No Info"
                                />
                            </Box>
                            {parentChildData['D_10_2_1_DateBirthParent'][
                                'nullFlavor'
                            ] === null ? (
                                <InputMask
                                    mask="9999-99-99 99:99:99"
                                    maskChar="_"
                                    className={classes.textShort}
                                    value={
                                        parentChildData[
                                            'D_10_2_1_DateBirthParent'
                                        ].value
                                    }
                                    onChange={handleChange(
                                        'D_10_2_1_DateBirthParent',
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
                                <FormControl className={classes.textXshort}>
                                    <InputLabel>Null Flavor</InputLabel>
                                    <Select
                                        value={
                                            parentChildData[
                                                'D_10_2_1_DateBirthParent'
                                            ].nullFlavor
                                        }
                                        onChange={setNullFlavor(
                                            'D_10_2_1_DateBirthParent',
                                        )}
                                    >
                                        <MenuItem value={0}>Masked</MenuItem>
                                        <MenuItem value={1}>
                                            Asked but unknown
                                        </MenuItem>
                                        <MenuItem value={2}>Not asked</MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        </Stack>
                    </Grid>

                    <Grid item xs={3}>
                        <ParentChildFieldLabel
                            label="Sex of Parent"
                            field="D_10_6_SexParent"
                        ></ParentChildFieldLabel>
                    </Grid>
                    <Grid item xs={9}>
                        <Stack direction="row">
                            <Box className="text-small">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={
                                                parentChildData[
                                                    'D_10_6_SexParent'
                                                ].nullFlavor !== null
                                            }
                                            onChange={setUnknown(
                                                'D_10_6_SexParent',
                                            )}
                                        />
                                    }
                                    label="No Info"
                                />
                            </Box>

                            {parentChildData['D_10_6_SexParent'][
                                'nullFlavor'
                            ] === null ? (
                                <Select
                                    className={classes.textShort}
                                    label="Sex of Parent"
                                    defaultValue={0}
                                    onChange={handleChange('D_10_6_SexParent')}
                                    value={
                                        parentChildData['D_10_6_SexParent']
                                            .value
                                    }
                                >
                                    <MenuItem value={1}>1 = Male</MenuItem>
                                    <MenuItem value={2}>
                                        2 = Female (Preterm and Term newborns)
                                    </MenuItem>
                                </Select>
                            ) : (
                                <FormControl className={classes.textXshort}>
                                    <InputLabel>Null Flavor</InputLabel>
                                    <Select
                                        value={
                                            parentChildData['D_10_6_SexParent']
                                                .nullFlavor
                                        }
                                        onChange={setNullFlavor(
                                            'D_10_6_SexParent',
                                        )}
                                    >
                                        <MenuItem value={0}>Masked</MenuItem>
                                        <MenuItem value={1}>
                                            Asked but unknown
                                        </MenuItem>
                                        <MenuItem value={2}>Not asked</MenuItem>
                                        <MenuItem value={3}>Unknown</MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        </Stack>
                    </Grid>

                    <Grid item xs={3}>
                        <ParentChildFieldLabel
                            label="Last Menstrual Period Date of Parent"
                            field="D_10_3_LastMenstrualPeriodDateParent"
                        ></ParentChildFieldLabel>
                    </Grid>
                    <Grid item xs={9}>
                        <Stack direction="row">
                            <Box className="text-small">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={
                                                parentChildData[
                                                    'D_10_3_LastMenstrualPeriodDateParent'
                                                ].nullFlavor !== null
                                            }
                                            onChange={setUnknown(
                                                'D_10_3_LastMenstrualPeriodDateParent',
                                            )}
                                        />
                                    }
                                    label="No Info"
                                />
                            </Box>
                            {parentChildData[
                                'D_10_3_LastMenstrualPeriodDateParent'
                            ]['nullFlavor'] === null ? (
                                <InputMask
                                    mask="9999-99-99 99:99:99"
                                    maskChar="_"
                                    className={classes.textShort}
                                    value={
                                        parentChildData[
                                            'D_10_3_LastMenstrualPeriodDateParent'
                                        ].value
                                    }
                                    onChange={handleChange(
                                        'D_10_3_LastMenstrualPeriodDateParent',
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
                                <FormControl className={classes.textXshort}>
                                    <InputLabel>Null Flavor</InputLabel>
                                    <Select
                                        value={
                                            parentChildData[
                                                'D_10_3_LastMenstrualPeriodDateParent'
                                            ].nullFlavor
                                        }
                                        onChange={setNullFlavor(
                                            'D_10_3_LastMenstrualPeriodDateParent',
                                        )}
                                    >
                                        <MenuItem value={0}>Masked</MenuItem>
                                        <MenuItem value={1}>
                                            Asked but unknown
                                        </MenuItem>
                                        <MenuItem value={2}>Not asked</MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        </Stack>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <ParentChildFieldLabel
                            label="Age of Parent"
                            field="D_10_2_2a_AgeParentNum"
                        ></ParentChildFieldLabel>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            variant="outlined"
                            className={classes.textXshort}
                            onChange={handleChange(
                                'D_10_2_2a_AgeParentNum',
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
                                parentChildData['D_10_2_2a_AgeParentNum'].value
                            }
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <ParentChildFieldLabel
                            label="Age of Parent (unit)"
                            field="D_10_2_2b_AgeParentUnit"
                        ></ParentChildFieldLabel>
                    </Grid>
                    <Grid item xs={9}>
                        <FormControl>
                            <InputLabel>Age of Parent (unit)</InputLabel>
                            <Select
                                label="Age of Parent (unit)"
                                sx={{width: '100%'}}
                                onChange={handleChange('D_10_2_2b_AgeParentUnit')}
                                value={parentChildData['D_10_2_2b_AgeParentUnit'].value}
                            >
                                <MenuItem value={'{decade}'}>Decade</MenuItem>
                                <MenuItem value={'a'}>Year (a)</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={3}>
                        <ParentChildFieldLabel
                            label="Body Weight (kg) of Parent"
                            field="D_10_4_BodyWeightParent"
                        ></ParentChildFieldLabel>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            variant="outlined"
                            className={classes.textXshort}
                            type="number"
                            onKeyDown={(evt) =>
                                (evt.key === '-' ||
                                    evt.key === '+' ||
                                    evt.key === 'e' ||
                                    evt.key === ',') &&
                                evt.preventDefault()
                            }
                            onChange={handleChange(
                                'D_10_4_BodyWeightParent',
                                true,
                                6,
                            )}
                            value={
                                parentChildData['D_10_4_BodyWeightParent'].value
                            }
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <ParentChildFieldLabel
                            label="Height (cm) of Parent"
                            field="D_10_5_HeightParent"
                        ></ParentChildFieldLabel>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            variant="outlined"
                            className={classes.textXshort}
                            type="number"
                            onKeyDown={(evt) =>
                                (evt.key === '-' ||
                                    evt.key === '+' ||
                                    evt.key === 'e' ||
                                    evt.key === ',' ||
                                    evt.key === '.') &&
                                evt.preventDefault()
                            }
                            onChange={handleChange(
                                'D_10_5_HeightParent',
                                true,
                                3,
                            )}
                            value={parentChildData['D_10_5_HeightParent'].value}
                        />
                    </Grid>
                </Grid>
            </Stack>

            <Divider sx={{ borderBottomWidth: 5, padding: 2 }} />

            <Grid container direction="row" columnGap={4}>
                <Grid container item xs direction="column" rowGap={1}>
                    <FormLabel
                        sx={{ fontSize: 30, marginLeft: '15%', color: 'black' }}
                    >
                        Relevant Medical History and Concurrent Conditions of
                        Parent
                    </FormLabel>
                    <ParentHistory></ParentHistory>
                </Grid>
                <Grid container item xs direction="column" rowGap={1}>
                    <FormLabel
                        sx={{ fontSize: 30, marginLeft: '25%', color: 'black' }}
                    >
                        Relevant Past Drug History of Parent
                    </FormLabel>

                    <ParentDrugsHistory></ParentDrugsHistory>
                </Grid>
            </Grid>
        </>
    );
};
