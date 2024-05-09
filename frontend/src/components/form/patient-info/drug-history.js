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
    Card,
    CardContent,
    IconButton,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { patientSelector, setDrugHistory } from '@src/features/patient/slice';
import AddIcon from '@mui/icons-material/Add';
import { DrugHistory } from '@src/features/patient/patient';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@mui/styles';
import { DrugHistoryFieldLabel } from '@src/components/field-labels/patient/drug-history-label';
import InputMask from 'react-input-mask';
import { MedDRABtn } from '@src/components/meddra/meddra-btn';

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

export const DrugsHistory = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { drugHistory } = useSelector(patientSelector);

    const handleChange =
        (fieldName, index, isNumber = false, length = 1) =>
        (event) => {
            let value = event.target.value;
            console.log(value)
            if (isNumber) {
                if (value.length > length) value = value.slice(0, length);
            }
            if (value === '') {
                value = null;
            }
            let drugHistoryCopy = JSON.parse(JSON.stringify(drugHistory));
            drugHistoryCopy[index][fieldName].value = value;
            dispatch(setDrugHistory(drugHistoryCopy));
        };
    
    const setMeddraValue = (value, fieldName, index) => {
        let drugHistoryCopy = JSON.parse(JSON.stringify(drugHistory));
        drugHistoryCopy[index][fieldName].value = value;
        dispatch(setDrugHistory(drugHistoryCopy));
    };

    const setNullFlavor = (fieldName, index) => (event) => {
        let drugHistoryCopy = JSON.parse(JSON.stringify(drugHistory));
        drugHistoryCopy[index][fieldName].nullFlavor = event.target.value;
        dispatch(setDrugHistory(drugHistoryCopy));
    };

    const setUnknown = (fieldName, index) => (event) => {
        console.log(event.target.checked);
        let drugHistoryCopy = JSON.parse(JSON.stringify(drugHistory));
        if (event.target.checked) {
            drugHistoryCopy[index][fieldName].nullFlavor = -1;
        } else {
            drugHistoryCopy[index][fieldName].nullFlavor = null;
        }
        dispatch(setDrugHistory(drugHistoryCopy));
    };

    const formList = () => {
        let list = [];
        if (drugHistory.length === 0) {
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
        Object.values(drugHistory).forEach((item, index) => {
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
                                <DrugHistoryFieldLabel
                                    label="Name of Drug"
                                    field="D_8_r_1_NameDrug"
                                    index={index}
                                ></DrugHistoryFieldLabel>
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
                                                        item['D_8_r_1_NameDrug']
                                                            .nullFlavor !== null
                                                    }
                                                    onChange={setUnknown(
                                                        'D_8_r_1_NameDrug',
                                                        index,
                                                    )}
                                                />
                                            }
                                            label="No Info"
                                        />
                                    </Box>
                                    {drugHistory[index]['D_8_r_1_NameDrug'][
                                        'nullFlavor'
                                    ] === null ? (
                                        <TextField
                                            variant="outlined"
                                            className={classes.textMedium}
                                            onChange={handleChange(
                                                'D_8_r_1_NameDrug',
                                                index,
                                            )}
                                            value={
                                                item['D_8_r_1_NameDrug'].value
                                            }
                                            multiline
                                            rows={3}
                                        />
                                    ) : (
                                        <FormControl
                                            className={classes.textXshort}
                                        >
                                            <InputLabel>Null Flavor</InputLabel>
                                            <Select
                                                defaultValue={0}
                                                value={
                                                    item['D_8_r_1_NameDrug']
                                                        .nullFlavor
                                                }
                                                onChange={setNullFlavor(
                                                    'D_8_r_1_NameDrug',
                                                    index,
                                                )}
                                            >
                                                <MenuItem value={3}>
                                                    Unknown
                                                </MenuItem>
                                                <MenuItem value={6}>
                                                    Not applicable
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    )}
                                </Stack>
                            </Grid>

                            <Grid item xs={3}>
                                <DrugHistoryFieldLabel
                                    label="MPID Version Date/Number"
                                    field="D_8_r_2a_MPIDVersion"
                                    index={index}
                                ></DrugHistoryFieldLabel>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField
                                    variant="outlined"
                                    className={classes.textMedium}
                                    onChange={handleChange(
                                        'D_8_r_2a_MPIDVersion',
                                        index,
                                    )}
                                    value={item['D_8_r_2a_MPIDVersion'].value}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <DrugHistoryFieldLabel
                                    label="Medicinal Product Identifier"
                                    field="D_8_r_2b_MPID"
                                    index={index}
                                ></DrugHistoryFieldLabel>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField
                                    variant="outlined"
                                    className={classes.textMedium}
                                    onChange={handleChange(
                                        'D_8_r_2b_MPID',
                                        index,
                                    )}
                                    value={item['D_8_r_2b_MPID'].value}
                                />
                            </Grid>

                            <Grid item xs={3}>
                                <DrugHistoryFieldLabel
                                    label="PhPID Version Date/Number"
                                    field="D_8_r_3a_PhPIDVersion"
                                    index={index}
                                ></DrugHistoryFieldLabel>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField
                                    variant="outlined"
                                    className={classes.textMedium}
                                    onChange={handleChange(
                                        'D_8_r_3a_PhPIDVersion',
                                        index,
                                    )}
                                    value={item['D_8_r_3a_PhPIDVersion'].value}
                                />
                            </Grid>

                            <Grid item xs={3}>
                                <DrugHistoryFieldLabel
                                    label="Pharmaceutical Product Identifier"
                                    field="D_8_r_3b_PhPID"
                                    index={index}
                                ></DrugHistoryFieldLabel>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField
                                    variant="outlined"
                                    className={classes.textMedium}
                                    onChange={handleChange(
                                        'D_8_r_3b_PhPID',
                                        index,
                                    )}
                                    value={item['D_8_r_3b_PhPID'].value}
                                />
                            </Grid>

                            <Grid item xs={3}>
                                <DrugHistoryFieldLabel
                                    label="MedDRA Version for Indication"
                                    field="D_8_r_6a_MedDRAVersionIndication"
                                    index={index}
                                ></DrugHistoryFieldLabel>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField
                                    variant="outlined"
                                    className={classes.textXshort}
                                    onChange={handleChange(
                                        'D_8_r_6a_MedDRAVersionIndication',
                                        index,
                                        true,
                                        4,
                                    )}
                                    type="number"
                                    onKeyDown={(evt) =>
                                        (evt.key === '-' ||
                                            evt.key === '+' ||
                                            evt.key === 'e' ||
                                            evt.key === ',') &&
                                        evt.preventDefault()
                                    }
                                    value={
                                        item['D_8_r_6a_MedDRAVersionIndication']
                                            .value
                                    }
                                />
                            </Grid>

                            <Grid item xs={3}>
                                <DrugHistoryFieldLabel
                                    label="Indication (MedDRA code)"
                                    field="D_8_r_6b_IndicationMedDRACode"
                                    index={index}
                                ></DrugHistoryFieldLabel>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField
                                    variant="outlined"
                                    className={classes.textXshort}
                                    onChange={handleChange(
                                        'D_8_r_6b_IndicationMedDRACode',
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
                                    value={
                                        item['D_8_r_6b_IndicationMedDRACode']
                                            .value
                                    }
                                />
                                <MedDRABtn
                                    field="D_8_r_6b_IndicationMedDRACode"
                                    index={index}
                                    handleChange={setMeddraValue}
                                    lastValue={item[
                                        'D_8_r_6b_IndicationMedDRACode'
                                    ].value}
                                ></MedDRABtn>
                            </Grid>

                            <Grid item xs={3}>
                                <DrugHistoryFieldLabel
                                    label="MedDRA Version for Reaction"
                                    field="D_8_r_7a_MedDRAVersionReaction"
                                    index={index}
                                ></DrugHistoryFieldLabel>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField
                                    variant="outlined"
                                    className={classes.textXshort}
                                    onChange={handleChange(
                                        'D_8_r_7a_MedDRAVersionReaction',
                                        index,
                                        true,
                                        4,
                                    )}
                                    type="number"
                                    onKeyDown={(evt) =>
                                        (evt.key === '-' ||
                                            evt.key === '+' ||
                                            evt.key === 'e' ||
                                            evt.key === ',') &&
                                        evt.preventDefault()
                                    }
                                    value={
                                        item['D_8_r_7a_MedDRAVersionReaction']
                                            .value
                                    }
                                />
                            </Grid>

                            <Grid item xs={3}>
                                <DrugHistoryFieldLabel
                                    label="Reaction (MedDRA code)"
                                    field="D_8_r_7b_ReactionMedDRACode"
                                    index={index}
                                ></DrugHistoryFieldLabel>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField
                                    variant="outlined"
                                    className={classes.textXshort}
                                    onChange={handleChange(
                                        'D_8_r_7b_ReactionMedDRACode',
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
                                    value={
                                        item['D_8_r_7b_ReactionMedDRACode']
                                            .value
                                    }
                                />

                                <MedDRABtn
                                    field="D_8_r_7b_ReactionMedDRACode"
                                    index={index}
                                    handleChange={setMeddraValue}
                                    lastValue={item[
                                        'D_8_r_7b_ReactionMedDRACode'
                                    ].value}
                                ></MedDRABtn>
                            </Grid>

                            <Grid item xs={3}>
                                <DrugHistoryFieldLabel
                                    label="Start Date"
                                    field="D_8_r_4_StartDate"
                                    index={index}
                                ></DrugHistoryFieldLabel>
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
                                                            'D_8_r_4_StartDate'
                                                        ].nullFlavor !== null
                                                    }
                                                    onChange={setUnknown(
                                                        'D_8_r_4_StartDate',
                                                        index,
                                                    )}
                                                />
                                            }
                                            label="No Info"
                                        />
                                    </Box>
                                    {drugHistory[index]['D_8_r_4_StartDate'][
                                        'nullFlavor'
                                    ] === null ? (
                                        <InputMask
                                            mask="9999-99-99 99:99:99"
                                            maskChar="_"
                                            className={classes.textShort}
                                            value={
                                                item['D_8_r_4_StartDate'].value
                                            }
                                            onChange={handleChange(
                                                'D_8_r_4_StartDate',
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
                                            <InputLabel>Null Flavor</InputLabel>
                                            <Select
                                                value={
                                                    item['D_8_r_4_StartDate']
                                                        .nullFlavor
                                                }
                                                onChange={setNullFlavor(
                                                    'D_8_r_4_StartDate',
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
                                <DrugHistoryFieldLabel
                                    label="End Date"
                                    field="D_8_r_5_EndDate"
                                    index={index}
                                ></DrugHistoryFieldLabel>
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
                                                        item['D_8_r_5_EndDate']
                                                            .nullFlavor !== null
                                                    }
                                                    onChange={setUnknown(
                                                        'D_8_r_5_EndDate',
                                                        index,
                                                    )}
                                                />
                                            }
                                            label="No Info"
                                        />
                                    </Box>
                                    {drugHistory[index]['D_8_r_5_EndDate'][
                                        'nullFlavor'
                                    ] === null ? (
                                        <InputMask
                                            mask="9999-99-99 99:99:99"
                                            maskChar="_"
                                            className={classes.textShort}
                                            value={
                                                item['D_8_r_5_EndDate'].value
                                            }
                                            onChange={handleChange(
                                                'D_8_r_5_EndDate',
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
                                            <InputLabel>Null Flavor</InputLabel>
                                            <Select
                                                value={
                                                    item['D_8_r_5_EndDate']
                                                        .nullFlavor
                                                }
                                                onChange={setNullFlavor(
                                                    'D_8_r_5_EndDate',
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
                        </Grid>

                        {index === drugHistory.length - 1 ? (
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
        let drugHistoryCopy = JSON.parse(JSON.stringify(drugHistory));
        let drugHistoryNew = new DrugHistory();
        drugHistoryCopy.push(drugHistoryNew);
        dispatch(setDrugHistory(drugHistoryCopy));
    };

    const removeForm = (index) => {
        let drugHistoryCopy = JSON.parse(JSON.stringify(drugHistory));
        drugHistoryCopy.splice(index, 1);
        dispatch(setDrugHistory(drugHistoryCopy));
    };

    return <div>{formList()}</div>;
};
