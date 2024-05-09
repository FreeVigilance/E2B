import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import {
    Stack,
    FormControlLabel,
    Card,
    CardContent,
    IconButton,
    Box,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Grid,
} from '@mui/material';
import { resultsSelector, setResultsData } from '@src/features/results/slice';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { Result } from '@src/features/results/result';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { ResultFieldLabel } from '../field-labels/result-field-label';
import InputMask from 'react-input-mask';
import { MedDRABtn } from '../meddra/meddra-btn';

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

export const Results = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { resultsData } = useSelector(resultsSelector);

    const handleChange =
        (fieldName, index, isNumber = false, length = 1) =>
        (event) => {
            console.log(event);
            let value = event.target.value;
            if (isNumber) {
                if (value.length > length) value = value.slice(0, length);
            }
            if (value === '') {
                value = null;
            }
            let resultsDataCopy = JSON.parse(JSON.stringify(resultsData));
            if (event.target === undefined) {
                resultsDataCopy[index][fieldName].value = event.d;
            } else {
                if (fieldName === 'F_r_7_MoreInformationAvailable') {
                    resultsDataCopy[index][fieldName].value =
                        event.target.checked;
                } else {
                    resultsDataCopy[index][fieldName].value = value;
                }
            }
            dispatch(setResultsData(resultsDataCopy));
        };

    const setMeddraValue = (value, fieldName, index) => {
        let resultsDataCopy = JSON.parse(JSON.stringify(resultsData));
        resultsDataCopy[index][fieldName].value = value;
        dispatch(setResultsData(resultsDataCopy));
    };

    const setNullFlavor = (fieldName, index) => (event) => {
        let resultsDataCopy = JSON.parse(JSON.stringify(resultsData));
        resultsDataCopy[index][fieldName].nullFlavor = event.target.value;
        dispatch(setResultsData(resultsDataCopy));
    };

    const setUnknown = (fieldName, index) => (event) => {
        let resultsDataCopy = JSON.parse(JSON.stringify(resultsData));
        if (event.target.checked) {
            resultsDataCopy[index][fieldName].nullFlavor = -1;
        } else {
            resultsDataCopy[index][fieldName].nullFlavor = null;
        }
        dispatch(setResultsData(resultsDataCopy));
    };

    const formList = () => {
        let list = [];
        if (resultsData.length === 0) {
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
        Object.values(resultsData).forEach((item, index) => {
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
                        <Stack direction={'row'}>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <ResultFieldLabel
                                        label={'Test Name'}
                                        field="F_r_2_1_TestName"
                                        index={index}
                                    ></ResultFieldLabel>
                                </Grid>
                                <Grid item xs={10}>
                                    <TextField
                                        variant="outlined"
                                        onChange={handleChange(
                                            'F_r_2_1_TestName',
                                            index,
                                        )}
                                        className={classes.textMedium}
                                        multiline
                                        rows={3}
                                        value={item['F_r_2_1_TestName'].value}
                                    />
                                </Grid>

                                <Grid item xs={2}>
                                    <ResultFieldLabel
                                        label={'MedDRA Version for Test Name'}
                                        field="F_r_2_2a_MedDRAVersionTestName"
                                        index={index}
                                    ></ResultFieldLabel>
                                </Grid>
                                <Grid item xs={10}>
                                    <TextField
                                        variant="outlined"
                                        onChange={handleChange(
                                            'F_r_2_2a_MedDRAVersionTestName',
                                            index,
                                            true,
                                            4,
                                        )}
                                        value={
                                            item[
                                                'F_r_2_2a_MedDRAVersionTestName'
                                            ].value
                                        }
                                        type="number"
                                        className={classes.textXshort}
                                        onKeyDown={(evt) =>
                                            (evt.key === '-' ||
                                                evt.key === '+' ||
                                                evt.key === 'e' ||
                                                evt.key === ',') &&
                                            evt.preventDefault()
                                        }
                                    />
                                </Grid>

                                <Grid item xs={2}>
                                    <ResultFieldLabel
                                        label="Test Name (MedDRA code)"
                                        field="F_r_2_2b_TestNameMedDRACode"
                                        index={index}
                                    ></ResultFieldLabel>
                                </Grid>
                                <Grid item xs={10}>
                                    <TextField
                                        variant="outlined"
                                        onChange={handleChange(
                                            'F_r_2_2b_TestNameMedDRACode',
                                            index,
                                            true,
                                            8,
                                        )}
                                        value={
                                            item['F_r_2_2b_TestNameMedDRACode']
                                                .value
                                        }
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
                                    />
                                    <MedDRABtn
                                        field="F_r_2_2b_TestNameMedDRACode"
                                        index={index}
                                        handleChange={setMeddraValue}
                                        lastValue={item[
                                            'F_r_2_2b_TestNameMedDRACode'
                                        ].value}
                                    ></MedDRABtn>
                                </Grid>

                                <Grid item xs={2}>
                                    <ResultFieldLabel
                                        label="Test Date"
                                        field="F_r_1_TestDate"
                                        index={index}
                                    ></ResultFieldLabel>
                                </Grid>
                                <Grid item xs={10}>
                                    <Stack direction={'row'}>
                                        <Box className="text-small">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={
                                                            item[
                                                                'F_r_1_TestDate'
                                                            ].nullFlavor !==
                                                            null
                                                        }
                                                        onChange={setUnknown(
                                                            'F_r_1_TestDate',
                                                            index,
                                                        )}
                                                        className={
                                                            classes.checkbox
                                                        }
                                                    />
                                                }
                                                label="No Info"
                                            />
                                        </Box>
                                        {resultsData[index]['F_r_1_TestDate'][
                                            'nullFlavor'
                                        ] === null ? (
                                            <InputMask
                                                mask="9999-99-99 99:99:99"
                                                maskChar="_"
                                                className={classes.textShort}
                                                value={
                                                    item['F_r_1_TestDate'].value
                                                }
                                                onChange={handleChange(
                                                    'F_r_1_TestDate',
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
                                        ) : // <InputMask mask="99/99/9999">
                                        //     <TextField
                                        //         className={classes.textShort}
                                        //         variant="outlined"
                                        //         type="text"
                                        //         value = {item['F_r_1_TestDate'].value}
                                        //         onChange={handleChange('F_r_1_TestDate', index)}
                                        //         />
                                        // </InputMask>
                                        null}
                                    </Stack>
                                </Grid>

                                <Grid item xs={2}>
                                    <ResultFieldLabel
                                        label="Test Result Code"
                                        field="F_r_3_1_TestResultCode"
                                        index={index}
                                    ></ResultFieldLabel>
                                </Grid>
                                <Grid item xs={10}>
                                    <Select
                                        className={classes.textXshort}
                                        onChange={handleChange(
                                            'F_r_3_1_TestResultCode',
                                            index,
                                        )}
                                        value={
                                            item['F_r_3_1_TestResultCode'].value
                                        }
                                    >
                                        <MenuItem value={1}>
                                            1 = Positive
                                        </MenuItem>
                                        <MenuItem value={2}>
                                            2 = Negative
                                        </MenuItem>
                                        <MenuItem value={3}>
                                            3 = Borderline
                                        </MenuItem>
                                        <MenuItem value={4}>
                                            4 = Inconclusive
                                        </MenuItem>
                                        <MenuItem value={0}>
                                            0 = unknown
                                        </MenuItem>
                                    </Select>
                                </Grid>

                                <Grid item xs={2}>
                                    <ResultFieldLabel
                                        label="Test Result Value"
                                        field="F_r_3_2_TestResultValQual"
                                        index={index}
                                    ></ResultFieldLabel>
                                </Grid>
                                <Grid item xs={10}>
                                    <Stack direction={'row'}>
                                        <Box className="text-small">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={
                                                            item[
                                                                'F_r_3_2_TestResultValQual'
                                                            ].nullFlavor !==
                                                            null
                                                        }
                                                        onChange={setUnknown(
                                                            'F_r_3_2_TestResultValQual',
                                                            index,
                                                        )}
                                                        className={
                                                            classes.checkbox
                                                        }
                                                    />
                                                }
                                                label="No Info"
                                            />
                                        </Box>
                                        {resultsData[index][
                                            'F_r_3_2_TestResultValQual'
                                        ]['nullFlavor'] === null ? (
                                            <TextField
                                                variant="outlined"
                                                onChange={handleChange(
                                                    'F_r_3_2_TestResultValQual',
                                                    index,
                                                    true,
                                                    50,
                                                )}
                                                value={
                                                    item[
                                                        'F_r_3_2_TestResultValQual'
                                                    ].value
                                                }
                                                type="number"
                                                className={classes.textShort}
                                                onKeyDown={(evt) =>
                                                    (evt.key === '-' ||
                                                        evt.key === '+' ||
                                                        evt.key === 'e' ||
                                                        evt.key === ',' ||
                                                        evt.key === '.') &&
                                                    evt.preventDefault()
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
                                                        item[
                                                            'F_r_3_2_TestResultValQual'
                                                        ].nullFlavor
                                                    }
                                                    onChange={setNullFlavor(
                                                        'F_r_3_2_TestResultValQual',
                                                        index,
                                                    )}
                                                >
                                                    <MenuItem value={4}>
                                                        Negative Infinity
                                                    </MenuItem>
                                                    <MenuItem value={5}>
                                                        Positive Infinity
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        )}
                                    </Stack>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <ResultFieldLabel
                                        label="Test Result (unit)"
                                        field="F_r_3_3_TestResultUnit"
                                        index={index}
                                    ></ResultFieldLabel>
                                </Grid>
                                <Grid item xs={10}>
                                    <TextField
                                        variant="outlined"
                                        className={classes.textShort}
                                        onChange={handleChange(
                                            'F_r_3_3_TestResultUnit',
                                            index,
                                        )}
                                        value={
                                            item['F_r_3_3_TestResultUnit'].value
                                        }
                                    />
                                </Grid>

                                <Grid item xs={2}>
                                    <ResultFieldLabel
                                        label="Normal Low Value"
                                        field="F_r_4_NormalLowValue"
                                        index={index}
                                    ></ResultFieldLabel>
                                </Grid>
                                <Grid item xs={10}>
                                    <TextField
                                        variant="outlined"
                                        className={classes.textShort}
                                        onChange={handleChange(
                                            'F_r_4_NormalLowValue',
                                            index,
                                        )}
                                        value={
                                            item['F_r_4_NormalLowValue'].value
                                        }
                                    />
                                </Grid>

                                <Grid item xs={2}>
                                    <ResultFieldLabel
                                        label="Normal High Value"
                                        field="F_r_5_NormalHighValue"
                                        index={index}
                                    ></ResultFieldLabel>
                                </Grid>
                                <Grid item xs={10}>
                                    <TextField
                                        variant="outlined"
                                        className={classes.textShort}
                                        onChange={handleChange(
                                            'F_r_5_NormalHighValue',
                                            index,
                                        )}
                                        value={
                                            item['F_r_5_NormalHighValue'].value
                                        }
                                    />
                                </Grid>

                                <Grid item xs={2}>
                                    <ResultFieldLabel
                                        label="More Information Available"
                                        field="F_r_7_MoreInformationAvailable"
                                        index={index}
                                    ></ResultFieldLabel>
                                </Grid>
                                <Grid item xs={10}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                className={classes.checkbox}
                                                onChange={handleChange(
                                                    'F_r_7_MoreInformationAvailable',
                                                    index,
                                                )}
                                                checked={
                                                    item[
                                                        'F_r_7_MoreInformationAvailable'
                                                    ].value
                                                }
                                            />
                                        }
                                    />
                                </Grid>

                                <Grid item xs={2}>
                                    <ResultFieldLabel
                                        label="Result Unstructured Data"
                                        field="F_r_3_4_ResultUnstructuredData"
                                        index={index}
                                    ></ResultFieldLabel>
                                </Grid>
                                <Grid item xs={10}>
                                    <TextField
                                        variant="outlined"
                                        value={
                                            item[
                                                'F_r_3_4_ResultUnstructuredData'
                                            ].value
                                        }
                                        onChange={handleChange(
                                            'F_r_3_4_ResultUnstructuredData',
                                            index,
                                        )}
                                        multiline
                                        className={classes.textLong}
                                        rows={7}
                                    />
                                </Grid>

                                <Grid item xs={2}>
                                    <ResultFieldLabel
                                        label="Comments"
                                        field="F_r_6_Comments"
                                        index={index}
                                    ></ResultFieldLabel>
                                </Grid>
                                <Grid item xs={10}>
                                    <TextField
                                        variant="outlined"
                                        value={item['F_r_6_Comments'].value}
                                        onChange={handleChange(
                                            'F_r_6_Comments',
                                            index,
                                        )}
                                        multiline
                                        className={classes.textLong}
                                        rows={7}
                                    />
                                </Grid>
                            </Grid>
                        </Stack>
                        {index === resultsData.length - 1 ? (
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
        let resultsDataCopy = JSON.parse(JSON.stringify(resultsData));
        let reasultNew = new Result();
        resultsDataCopy.push(reasultNew);
        dispatch(setResultsData(resultsDataCopy));
    };

    const removeForm = (index) => {
        let resultsDataCopy = JSON.parse(JSON.stringify(resultsData));
        resultsDataCopy.splice(index, 1);
        dispatch(setResultsData(resultsDataCopy));
    };

    return <div>{formList()}</div>;
};
