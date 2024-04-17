
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Stack, FormControlLabel, Box, Select, MenuItem, FormControl, InputLabel, Grid, Divider, FormLabel, Card, CardContent, IconButton} from '@mui/material';
import { resultsSelector, setResults } from '@src/features/results/slice';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { patientSelector, setMedicalHistory, setPatientData } from '@src/features/patient/slice';
import AddIcon from '@mui/icons-material/Add';
import { MedHistory } from '@src/features/patient/patient';
import { drugsSelector, setAdditionalInfo, setSubstances } from '@src/features/drugs/slice';
import { AdditionalInfo, Substance } from '@src/features/drugs/drugs';
import DeleteIcon from '@mui/icons-material/Delete';
import {makeStyles} from '@mui/styles';
import { AddInfoFieldLabel } from '@src/components/field-labels/drugs/add-info-label';

const useStyles = makeStyles({
    margin: {
      marginTop: '10px',
      marginLeft: '10px',
      marginBottom: '5px'
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
        color: 'black'
    },
    checkbox: {
        paddingTop: '15px',
        paddingRight: '10px',
    }
})

export const AddInfo = ({drugIndex}) => {
    const classes = useStyles();

	const dispatch = useDispatch();
    const {additionalInfo} = useSelector(drugsSelector);

    const handleChange = (fieldName, index) => (event) => {
        let value = event.target.value;
        if (value === '') {
            value = null;
        };
        let additionalInfoCopy = JSON.parse(JSON.stringify(additionalInfo));
        additionalInfoCopy[drugIndex][index][fieldName].value = value;
        dispatch(setAdditionalInfo(additionalInfoCopy));
    };

    const formList = () => {
        let list = [];
        if (additionalInfo[drugIndex].length === 0) {
            return ( <span>
                <IconButton size='large' style= {{ top: '10px'}}
                sx={{ color: "white", backgroundColor: "#1976d2"}}
                            onClick={addForm}><AddIcon/></IconButton>
            </span>);
        }
        Object.values(additionalInfo[drugIndex]).forEach((item, index) => {
            list.push(
                <Card sx={{border: "3px solid #094B8C",
                padding: "10px",
                boxShadow: "5px 5px #356BA0",
                marginBottom: 5}}>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <AddInfoFieldLabel label="Additional Information on Drug (coded)"
                                field = 'G_k_10_r_AdditionalInformationDrug' drugIndex={drugIndex} index={index}></AddInfoFieldLabel>
                            </Grid>
                            <Grid item xs={9}>
                                <Select
                                        className={classes.textMedium}
                                        defaultValue = {0}
                                        value = {item['G_k_10_r_AdditionalInformationDrug'].value}
                                        onChange={handleChange('G_k_10_r_AdditionalInformationDrug', index)}
                                    >
                                        <MenuItem value={1}>1 = Counterfeit</MenuItem>
                                        <MenuItem value={2}>2 = Overdose</MenuItem>
                                        <MenuItem value={3}>3 = Drug taken by the father</MenuItem>
                                        <MenuItem value={4}>4 = Drug taken beyond expiry date</MenuItem>
                                        <MenuItem value={5}>5 = Batch and lot tested and found within specifications</MenuItem>
                                        <MenuItem value={6}>6 = Batch and lot tested and found not within specifications</MenuItem>
                                        <MenuItem value={7}>7 = Medication error</MenuItem>
                                        <MenuItem value={8}>8 = Misuse</MenuItem>
                                        <MenuItem value={9}>9 = Abuse</MenuItem>
                                        <MenuItem value={10}>10 = Occupational exposure</MenuItem>
                                        <MenuItem value={11}>11 = Off label use</MenuItem>

                                    </Select>
                            </Grid>
                        </Grid>

                            {index === additionalInfo[drugIndex].length - 1 ?
                                    <span>
                                        <IconButton size='large' style= {{ top: '10px', right: '10px'}}
                                        sx={{ color: "white", backgroundColor: "#1976d2"}}
                                                    onClick={addForm}><AddIcon/></IconButton>
                                    </span> : null}
                            <span>
                                <IconButton size='large' style= {{ top: '10px'}}
                                sx={{ color: "white", backgroundColor: "#000066"}}
                                        onClick={() => removeForm(index)}><DeleteIcon/>
                                </IconButton>
                            </span>  
                    </CardContent>
                </Card>);
        });
        return list;
    }

    const addForm = () => {
        let additionalInfoCopy = JSON.parse(JSON.stringify(additionalInfo));
        let additionalInfoNew = new AdditionalInfo();
        additionalInfoCopy[drugIndex].push(additionalInfoNew);
        dispatch(setAdditionalInfo(additionalInfoCopy));
    }

    const removeForm = (index) => {
        let additionalInfoCopy = JSON.parse(JSON.stringify(additionalInfo));
        additionalInfoCopy[drugIndex].splice(index, 1);
        dispatch(setAdditionalInfo(additionalInfoCopy));
    }

    return(
        <div>
            {formList()}
        </div>
    )
}