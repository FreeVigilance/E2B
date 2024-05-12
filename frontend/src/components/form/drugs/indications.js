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
    Card,
    CardContent,
    IconButton,
    Grid,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import AddIcon from '@mui/icons-material/Add';
import { drugsSelector, setIndications } from '@src/features/drugs/slice';
import { IndicationForUse } from '@src/features/drugs/drugs';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@mui/styles';
import { IndicationsFieldLabel } from '@src/components/field-labels/drugs/indications-label';
import { MedDRABtn } from '@src/components/meddra/meddra-btn';
import { meddraSelector } from '@src/features/meddra/slice';

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

export const Indications = ({ drugIndex }) => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const { indications } = useSelector(drugsSelector);
    const { meddraVersion } = useSelector(meddraSelector);


    useEffect(() => {
        console.log('STATE');
        console.log(indications);
    });

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
            let indicationsCopy = JSON.parse(JSON.stringify(indications));
            indicationsCopy[drugIndex][index][fieldName].value = value;
            dispatch(setIndications(indicationsCopy));
        };

    const setMeddraValue = (value, fieldName, index) => {
        let indicationsCopy = JSON.parse(JSON.stringify(indications));
        indicationsCopy[drugIndex][index][fieldName].value = value;
        indicationsCopy[drugIndex][index]['G_k_7_r_2a_MedDRAVersionIndication'].value = meddraVersion.split(' ')[0];
        dispatch(setIndications(indicationsCopy));
    };

    const setNullFlavor = (fieldName, index) => (event) => {
        let indicationsCopy = JSON.parse(JSON.stringify(indications));
        indicationsCopy[drugIndex][index][fieldName].nullFlavor =
            event.target.value;
        dispatch(setIndications(indicationsCopy));
    };

    const setUnknown = (fieldName, index) => (event) => {
        let indicationsCopy = JSON.parse(JSON.stringify(indications));
        if (event.target.checked) {
            indicationsCopy[drugIndex][index][fieldName].nullFlavor = -1;
        } else {
            indicationsCopy[drugIndex][index][fieldName].nullFlavor = null;
        }
        dispatch(setIndications(indicationsCopy));
    };

    const formList = () => {
        let list = [];
        if (indications[drugIndex].length === 0) {
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
        Object.values(indications[drugIndex]).forEach((item, index) => {
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
                                <IndicationsFieldLabel
                                    label="Indication as Reported by the Primary Source"
                                    field="G_k_7_r_1_IndicationPrimarySource"
                                    drugIndex={drugIndex}
                                    index={index}
                                ></IndicationsFieldLabel>
                            </Grid>
                            <Grid item xs={9}>
                                <Stack
                                    direction="row"
                                    spacing={2}
                                    justifyContent="flex-start"
                                >
                                    <Box
                                        className="text-small"
                                        style={{ padding: 0 }}
                                    >
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                checked={
                                                        item[
                                                            'G_k_7_r_1_IndicationPrimarySource'
                                                        ].nullFlavor !== null
                                                    }
                                                    onChange={setUnknown(
                                                        'G_k_7_r_1_IndicationPrimarySource',
                                                        index,
                                                    )}
                                                />
                                            }
                                            label="No Info"
                                        />
                                    </Box>
                                    {indications[drugIndex][index][
                                        'G_k_7_r_1_IndicationPrimarySource'
                                    ]['nullFlavor'] === null ? (
                                        <TextField
                                            variant="outlined"
                                            className={classes.textLong}
                                            onChange={handleChange(
                                                'G_k_7_r_1_IndicationPrimarySource',
                                                index,
                                            )}
                                            value={
                                                item[
                                                    'G_k_7_r_1_IndicationPrimarySource'
                                                ].value
                                            }
                                            multiline
                                            rows={5}
                                        />
                                    ) : (
                                        <FormControl
                                            className={classes.textXshort}
                                        >
                                            <InputLabel>Null Flavor</InputLabel>
                                            <Select
                                                value={
                                                    item[
                                                        'G_k_7_r_1_IndicationPrimarySource'
                                                    ].nullFlavor
                                                }
                                                onChange={setNullFlavor(
                                                    'G_k_7_r_1_IndicationPrimarySource',
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

                            <Grid item xs={5}>
                                <IndicationsFieldLabel
                                    label="MedDRA Version for Indication"
                                    field="G_k_7_r_2a_MedDRAVersionIndication"
                                    drugIndex={drugIndex}
                                    index={index}
                                ></IndicationsFieldLabel>
                            </Grid>
                            <Grid item xs={7}>
                                <TextField
                                    variant="outlined"
                                    onChange={handleChange(
                                        'G_k_7_r_2a_MedDRAVersionIndication',
                                        index,
                                        true,
                                        4,
                                    )}
                                    type="number"
                                    className={classes.textXshort}
                                    onKeyDown={(evt) =>
                                        (evt.key === '-' ||
                                            evt.key === '+' ||
                                            evt.key === 'e' ||
                                            evt.key === ',') &&
                                        evt.preventDefault()
                                    }
                                    value={
                                        item[
                                            'G_k_7_r_2a_MedDRAVersionIndication'
                                        ].value
                                    }
                                />
                            </Grid>

                            <Grid item xs={5}>
                                <IndicationsFieldLabel
                                    label="Indication (MedDRA code)"
                                    field="G_k_7_r_2b_IndicationMedDRACode"
                                    drugIndex={drugIndex}
                                    index={index}
                                ></IndicationsFieldLabel>
                            </Grid>
                            <Grid item xs={7}>
                                <TextField
                                    variant="outlined"
                                    onChange={handleChange(
                                        'G_k_7_r_2b_IndicationMedDRACode',
                                        index,
                                        true,
                                        8,
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
                                        item['G_k_7_r_2b_IndicationMedDRACode']
                                            .value
                                    }
                                />
                                <MedDRABtn
                                    field="G_k_7_r_2b_IndicationMedDRACode"
                                    index={index}
                                    handleChange={setMeddraValue}
                                    lastValue={item[
                                        'G_k_7_r_2b_IndicationMedDRACode'
                                    ].value}
                                ></MedDRABtn>
                            </Grid>
                        </Grid>

                        {index === indications[drugIndex].length - 1 ? (
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
        let indicationsCopy = JSON.parse(JSON.stringify(indications));
        let indicationNew = new IndicationForUse();
        indicationsCopy[drugIndex].push(indicationNew);
        dispatch(setIndications(indicationsCopy));
    };

    const removeForm = (index) => {
        let indicationsCopy = JSON.parse(JSON.stringify(indications));
        indicationsCopy[drugIndex].splice(index, 1);
        dispatch(setIndications(indicationsCopy));
    };

    return <div>{formList()}</div>;
};
