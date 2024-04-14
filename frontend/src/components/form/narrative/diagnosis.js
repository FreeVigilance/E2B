import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Stack, FormControlLabel, Box, Select, MenuItem, FormControl, InputLabel, Card, CardContent, IconButton, Grid} from '@mui/material';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import AddIcon from '@mui/icons-material/Add';
import { setStudyRegistration, studyIdentificationSelector } from '@src/features/study-identification/slice';
import { StudyRegistration } from '@src/features/study-identification/study-identification';
import DeleteIcon from '@mui/icons-material/Delete';
import { narrativeSelector, setDiagnosis } from '@src/features/narrative/slice';
import { Diagnosis } from '@src/features/narrative/narrative';
import {makeStyles} from '@mui/styles';
import { DiagnosisFieldLabel } from '@src/components/field-labels/narrative/diagnosis-label';

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

export const DiagnosisComp = () => {
    const classes = useStyles();

	const dispatch = useDispatch();
    const {diagnosis} = useSelector(narrativeSelector);

    const handleChange = (fieldName, index, isNumber = false, length = 1) => (event) => {
        let value = event.target.value
        if (isNumber) {
            if (value.length > length)
                value = value.slice(0, length)
        }
        let diagnosisCopy = JSON.parse(JSON.stringify(diagnosis));
        diagnosisCopy[index][fieldName].value = value;
        dispatch(setDiagnosis(diagnosisCopy));
    };

    const formList = () => {
        let list = [];
        if (diagnosis.length === 0) {
            return ( <span>
                <IconButton size='large' style= {{ top: '10px'}}
                sx={{ color: "white", backgroundColor: "#1976d2"}}
                            onClick={addForm}><AddIcon/></IconButton>
            </span>);
        }
        Object.values(diagnosis).forEach((item, index) => {
            list.push(
                <Card sx={{border: "3px solid #094B8C",
                padding: "10px",
                boxShadow: "5px 5px #356BA0",
                marginBottom: 5}}>
                    <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <DiagnosisFieldLabel label="MedDRA Version for Sender's Diagnosis"
                            field = 'H_3_r_1a_MedDRAVersionSenderDiagnosis' index={index}></DiagnosisFieldLabel>
                        </Grid>
                        <Grid item xs={7}>
                            <TextField variant="outlined"
                                className={classes.textXshort}
                                type='number'
                                onKeyDown={(evt) =>
                                    (evt.key === "-" || evt.key === "+" || evt.key === "e" || evt.key === ",") &&
                                    evt.preventDefault()
                                }
                                onChange={handleChange('H_3_r_1a_MedDRAVersionSenderDiagnosis', index, true, 4)}
                                value = {item['H_3_r_1a_MedDRAVersionSenderDiagnosis'].value}/>
                        </Grid>

                        <Grid item xs={5}>
                            <DiagnosisFieldLabel label="Sender's Diagnosis (MedDRA code)"
                            field = 'H_3_r_1b_SenderDiagnosisMedDRAcode' index={index}></DiagnosisFieldLabel>
                        </Grid>
                        <Grid item xs={7}>
                            <TextField variant="outlined"
                                type='number'
                                className={classes.textXshort}
                                onKeyDown={(evt) =>
                                    (evt.key === "-" || evt.key === "+" || evt.key === "e" || evt.key === "," || evt.key === ".") &&
                                    evt.preventDefault()
                                }
                                onChange={handleChange('H_3_r_1b_SenderDiagnosisMedDRAcode', index, true, 8)}
                                value = {item['H_3_r_1b_SenderDiagnosisMedDRAcode'].value}/>
                        </Grid>
                    </Grid>
                        <Stack direction="row" justifyContent="flex-start">

                        {index === diagnosis.length - 1 ?
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

                        </Stack>
                </CardContent>
            </Card>
            );
        });
        return list;
    }

    const addForm = () => {
        let diagnosisCopy = JSON.parse(JSON.stringify(diagnosis));
        let diagnosisNew = new Diagnosis();
        diagnosisCopy.push(diagnosisNew);
        dispatch(setDiagnosis(diagnosisCopy));
    }

    const removeForm = (index) => {
        let diagnosisCopy = JSON.parse(JSON.stringify(diagnosis));
        diagnosisCopy.splice(index, 1);
        dispatch(setDiagnosis(diagnosisCopy));
    }

    return(
        <div>
            {formList()}
        </div>
    )
}