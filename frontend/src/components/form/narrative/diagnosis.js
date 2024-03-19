import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Stack, FormControlLabel, Box, Select, MenuItem, FormControl, InputLabel, Card, CardContent, IconButton} from '@mui/material';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import AddIcon from '@mui/icons-material/Add';
import { setStudyRegistration, studyIdentificationSelector } from '@src/features/study-identification/slice';
import { StudyRegistration } from '@src/features/study-identification/study-identification';
import DeleteIcon from '@mui/icons-material/Delete';
import { narrativeSelector, setDiagnosis } from '@src/features/narrative/slice';
import { Diagnosis } from '@src/features/narrative/narrative';


export const DiagnosisComp = () => {
	const dispatch = useDispatch();
    const {diagnosis} = useSelector(narrativeSelector);

    useEffect(() => {
        console.log("STATE");
        console.log(diagnosis);
    });

    const handleChange = (fieldName, index) => (event) => {
        let diagnosisCopy = JSON.parse(JSON.stringify(diagnosis));
        diagnosisCopy[index][fieldName].value = event.target.value;
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
                        <Stack direction="column" spacing={2} justifyContent="flex-start">
                            <TextField label="MedDRA Version for Sender's Diagnosis" variant="outlined"
                                sx={{ width: '80%' }}
                                type='number'
                                onKeyDown={(evt) =>
                                    (evt.key === "-" || evt.key === "+" || evt.key === "e" || evt.key === ",") &&
                                    evt.preventDefault()
                                }
                                inputProps={{ maxLength: 4}}
                                onChange={handleChange('H_3_r_1a_MedDRAVersionSenderDiagnosis', index)}
                                value = {item['H_3_r_1a_MedDRAVersionSenderDiagnosis'].value}/>

                            <TextField label="Sender's Diagnosis (MedDRA code)" variant="outlined"
                                sx={{ width: '80%' }}
                                type='number'
                                onKeyDown={(evt) =>
                                    (evt.key === "-" || evt.key === "+" || evt.key === "e" || evt.key === "," || evt.key === ".") &&
                                    evt.preventDefault()
                                }
                                inputProps={{ maxLength: 8}}
                                onChange={handleChange('H_3_r_1b_SenderDiagnosisMedDRAcode', index)}
                                value = {item['H_3_r_1b_SenderDiagnosisMedDRAcode'].value}/>

                        <Stack direction="row" justifyContent="flex-start">
                            <span>
                                <IconButton size='large' style= {{ top: '10px', right: '10px'}}
                                sx={{ color: "white", backgroundColor: "#1976d2"}}
                                        onClick={() => removeForm(index)}><DeleteIcon/>
                                </IconButton>
                            </span>

                            {index === diagnosis.length - 1 ?
                                <span>
                                    <IconButton size='large' style= {{ top: '10px'}}
                                    sx={{ color: "white", backgroundColor: "#1976d2"}}
                                                onClick={addForm}><AddIcon/></IconButton>
                                </span> : null}
                            </Stack>
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