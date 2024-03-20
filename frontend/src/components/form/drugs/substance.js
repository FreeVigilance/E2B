
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Stack, Card, CardContent, IconButton} from '@mui/material';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { drugsSelector, setSubstances } from '@src/features/drugs/slice';
import { Substance } from '@src/features/drugs/drugs';
import DeleteIcon from '@mui/icons-material/Delete';


export const Substances = ({drugIndex}) => {
	const dispatch = useDispatch();
    const {substances} = useSelector(drugsSelector);

    useEffect(() => {
        console.log("STATE");
        console.log(substances);
    });

    const handleChange = (fieldName, index) => (event) => {
        let substancesCopy = JSON.parse(JSON.stringify(substances));
        substancesCopy[drugIndex][index][fieldName].value = event.target.value;
        dispatch(setSubstances(substancesCopy));
    };

    const formList = () => {
        let list = [];
        console.log(substances);
        console.log(drugIndex);
        if (substances[drugIndex].length === 0) {
            return ( <span>
                <IconButton size='large' style= {{ top: '10px'}}
                sx={{ color: "white", backgroundColor: "#1976d2"}}
                            onClick={addForm}><AddIcon/></IconButton>
            </span>);
        }
        Object.values(substances[drugIndex]).forEach((item, index) => {
            list.push(
                <Card sx={{border: "3px solid #094B8C",
                padding: "10px",
                boxShadow: "5px 5px #356BA0",
                marginBottom: 5}}>
                    <CardContent>
                        <Stack direction="column" spacing={1} justifyContent="flex-start">  
                            <TextField label="Substance Name" variant="outlined"
                                    onChange={handleChange('G_k_2_3_r_1_SubstanceName', index)}
                                    value = {item['G_k_2_3_r_1_SubstanceName'].value}
                                    multiline
                                    inputProps={{ maxLength: 250}}
                                    rows={3}/> 
                            <TextField label="Substance TermID Version Date/Number" variant="outlined"
                                    onChange={handleChange('G_k_2_3_r_2a_SubstanceTermIDVersion', index)}
                                    value = {item['G_k_2_3_r_2a_SubstanceTermIDVersion'].value}/>
                            <TextField label="Substance TermID" variant="outlined"
                                    onChange={handleChange('G_k_2_3_r_2b_SubstanceTermID', index)}
                                    value = {item['G_k_2_3_r_2b_SubstanceTermID'].value}/>
                            <TextField label="Strength" variant="outlined"
                                    inputProps={{ maxLength: 10}}
                                    type='number'
                                    onKeyDown={(evt) =>
                                        (evt.key === "-" || evt.key === "+" || evt.key === "e" || evt.key === "," || evt.key === ".") &&
                                        evt.preventDefault()
                                    }
                                    onChange={handleChange('G_k_2_3_r_3a_StrengthNum', index)}
                                    value = {item['G_k_2_3_r_3a_StrengthNum'].value}/>
                            <TextField label="Strength (unit)" variant="outlined"
                                    inputProps={{ maxLength: 50}}
                                    onChange={handleChange('G_k_2_3_r_3b_StrengthUnit', index)}
                                    value = {item['G_k_2_3_r_3b_StrengthUnit'].value}/>

                        <Stack direction="row" justifyContent="flex-start">  

                            <span>
                                        <IconButton size='large' style= {{ top: '10px', right: '10px'}}
                                        sx={{ color: "white", backgroundColor: "#1976d2"}}
                                                onClick={() => removeForm(index)}><DeleteIcon/>
                                        </IconButton>
                                    </span>  
                            {index === substances[drugIndex].length - 1 ?
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
        let substancesCopy = JSON.parse(JSON.stringify(substances));
        let substanceNew = new Substance();
        substancesCopy[drugIndex].push(substanceNew);
        dispatch(setSubstances(substancesCopy));
    }

    const removeForm = (index) => {
        let substancesCopy = JSON.parse(JSON.stringify(substances));
        substancesCopy[drugIndex].splice(index, 1);
        dispatch(setSubstances(substancesCopy));
    }

    return(
        <div>
            {formList()}
        </div>
    )
}