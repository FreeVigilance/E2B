
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Stack, Card, CardContent, IconButton} from '@mui/material';
import TextField from '@mui/material/TextField';
import { patientSelector, setAutopsy } from '@src/features/patient/slice';
import AddIcon from '@mui/icons-material/Add';
import { AutopsyData } from '@src/features/patient/patient';


export const Autopsy = () => {
	const dispatch = useDispatch();
    const {autopsy} = useSelector(patientSelector);

    useEffect(() => {
        console.log("STATE");
        console.log(autopsy);
    });

    const handleChange = (fieldName, index) => (event) => {
        let autopsyCopy = JSON.parse(JSON.stringify(autopsy));
        autopsyCopy[index][fieldName].value = event.target.value;
        dispatch(setAutopsy(autopsyCopy));
    };

    const formList = () => {
        let list = [];
        Object.values(autopsy).forEach((item, index) => {
            list.push(
                <Card sx={{border: "3px solid #094B8C",
                padding: "10px",
                boxShadow: "5px 5px #356BA0",
                marginBottom: 5}}>
                    <CardContent>
                        <Stack direction="column" spacing={2} justifyContent="flex-start"> 
                                <TextField label="Autopsy-determined Cause of Death" variant="outlined"
                                            onChange={handleChange('D_9_4_r_2_AutopsyDeterminedCauseDeath', index)}
                                            value = {item['D_9_4_r_2_AutopsyDeterminedCauseDeath'].value}
                                            multiline
                                            rows={3}/>

                                <TextField label="MedDRA Version for Autopsy-determined Cause of Death" variant="outlined"
                                            onChange={handleChange('D_9_4_r_1a_MedDRAVersionAutopsyDeterminedCauseDeath', index)}
                                            value = {item['D_9_4_r_1a_MedDRAVersionAutopsyDeterminedCauseDeath'].value}/>

                                <TextField label="Autopsy-determined Cause of Death (MedDRA code)" variant="outlined"
                                            onChange={handleChange('D_9_4_r_1b_AutopsyDeterminedCauseDeathMedDRACode', index)}
                                            value = {item['D_9_4_r_1b_AutopsyDeterminedCauseDeathMedDRACode'].value}/>
                                            
                            {index === autopsy.length - 1 ?
                                <span>
                                    <IconButton size='large' style= {{ top: '10px'}}
                                    sx={{ color: "white", backgroundColor: "#1976d2"}}
                                                onClick={addForm}><AddIcon/></IconButton>
                                </span> : null}
                        </Stack>
                </CardContent>
            </Card>);
        });
        return list;
    }

    const addForm = () => {
        let autopsyCopy = JSON.parse(JSON.stringify(autopsy));
        let autopsyNew = new AutopsyData();
        autopsyCopy.push(autopsyNew);
        dispatch(setAutopsy(autopsyCopy));
    }

    return(
        <div>
            {formList()}
        </div>
    )
}