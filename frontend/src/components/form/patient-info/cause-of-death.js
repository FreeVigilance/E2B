
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Stack, Card, CardContent, IconButton} from '@mui/material';
import TextField from '@mui/material/TextField';
import { patientSelector, setCauseOfDeath } from '@src/features/patient/slice';
import AddIcon from '@mui/icons-material/Add';
import { CauseOfDeath } from '@src/features/patient/patient';
import DeleteIcon from '@mui/icons-material/Delete';


export const CausesOfDeath = () => {
	const dispatch = useDispatch();
    const {causeOfDeath} = useSelector(patientSelector);

    useEffect(() => {
        console.log("STATE");
        console.log(causeOfDeath);
    });

    const handleChange = (fieldName, index) => (event) => {
        let causeOfDeathCopy = JSON.parse(JSON.stringify(causeOfDeath));
        causeOfDeathCopy[index][fieldName].value = event.target.value;
        dispatch(setCauseOfDeath(causeOfDeathCopy));
    };

    const formList = () => {
        let list = [];
        if (causeOfDeath.length === 0) {
            return ( <span>
                <IconButton size='large' style= {{ top: '10px'}}
                sx={{ color: "white", backgroundColor: "#1976d2"}}
                            onClick={addForm}><AddIcon/></IconButton>
            </span>);
        }
        Object.values(causeOfDeath).forEach((item, index) => {
            list.push(
                <Card sx={{border: "3px solid #094B8C",
                padding: "10px",
                boxShadow: "5px 5px #356BA0",
                marginBottom: 5}}>
                    <CardContent>
                        <Stack direction="column" spacing={2} justifyContent="flex-start"> 
                                <TextField label="Reported Cause of Death" variant="outlined"
                                            onChange={handleChange('D_9_2_r_2_CauseDeath', index)}
                                            value = {item['D_9_2_r_2_CauseDeath'].value}
                                            multiline
                                            rows={3}/>
        
                                <TextField label="MedDRA Version for Reported Cause(s) of Death" variant="outlined"
                                            onChange={handleChange('D_9_2_r_1a_MedDRAVersionCauseDeath', index)}
                                            value = {item['D_9_2_r_1a_MedDRAVersionCauseDeath'].value}/>

                                <TextField label="Reported Cause of Death (MedDRA code)" variant="outlined"
                                            onChange={handleChange('D_9_2_r_1b_CauseDeathMedDRACode', index)}
                                            value = {item['D_9_2_r_1b_CauseDeathMedDRACode'].value}/>
                                <Stack direction="row" justifyContent="flex-start"> 
                                    <span>
                                        <IconButton size='large' style= {{ top: '10px', right: '10px'}}
                                        sx={{ color: "white", backgroundColor: "#1976d2"}}
                                                onClick={() => removeForm(index)}><DeleteIcon/>
                                        </IconButton>
                                    </span>
                                    {index === causeOfDeath.length - 1 ?
                                        <span>
                                            <IconButton size='large' style= {{ top: '10px'}}
                                            sx={{ color: "white", backgroundColor: "#1976d2"}}
                                                        onClick={addForm}><AddIcon/></IconButton>
                                        </span> : null}
                                </Stack>
                        </Stack>
                </CardContent>
            </Card>);
        });
        return list;
    }

    const addForm = () => {
        let causeOfDeathCopy = JSON.parse(JSON.stringify(causeOfDeath));
        let causeOfDeathNew = new CauseOfDeath();
        causeOfDeathCopy.push(causeOfDeathNew);
        dispatch(setCauseOfDeath(causeOfDeathCopy));
    }

    const removeForm = (index) => {
        let causeOfDeathCopy = JSON.parse(JSON.stringify(causeOfDeath));
        causeOfDeathCopy.splice(index, 1);
        dispatch(setCauseOfDeath(causeOfDeathCopy));
    }

    return(
        <div>
            {formList()}
        </div>
    )
}