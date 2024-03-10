import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Stack, Select, MenuItem, FormControl, InputLabel, Grid, FormLabel, Card, CardContent, IconButton} from '@mui/material';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { drugsSelector, setDrugReactionMatrix, setRelatedness } from '@src/features/drugs/slice';
import { DrugReactionMatrix, Relatedness } from '@src/features/drugs/drugs';
import { Relatednesses } from './relatedness';


export const DrugReactionsMatrix = ({drugIndex}) => {
	const dispatch = useDispatch();
    const {drugReactionMatrix, relatedness} = useSelector(drugsSelector);

    useEffect(() => {
        console.log("STATE");
        console.log(drugReactionMatrix);
    });

    const handleChange = (fieldName, index) => (event) => {
        let drugReactionMatrixCopy = JSON.parse(JSON.stringify(drugReactionMatrix));
        drugReactionMatrixCopy[drugIndex][index][fieldName].value = event.target.value;
        dispatch(setDrugReactionMatrix(drugReactionMatrixCopy));
    };

    const formList = () => {
        let list = [];
        Object.values(drugReactionMatrix[drugIndex]).forEach((item, index) => {
            list.push(
                <Card sx={{border: "3px solid #094B8C",
                        padding: "10px",
                        boxShadow: "5px 5px #356BA0",
                        marginBottom: 5}}>
                    <CardContent>
                        <Grid container direction="row" columnGap={4}>
                            <Grid container item xs direction="column" rowGap={1}>
                                <Stack direction="column" spacing={1} justifyContent="flex-start">  

                                    <FormLabel sx={{ fontSize: 30, marginLeft: '25%', color: 'black' }}>Drug-reaction Matrix</FormLabel>

                                            <Stack direction="column" spacing={1} justifyContent="flex-start">  
                                            
                                            <TextField label="Time Interval Beginning of Drug Administration and Start of Reaction" variant="outlined"
                                                        onChange={handleChange('G_k_9_i_3_1a_IntervalDrugAdministrationReactionNum', index)}
                                                        value = {item['G_k_9_i_3_1a_IntervalDrugAdministrationReactionNum'].value}/>

                                            <TextField label="(unit) Time Interval Beginning of Drug Administration and Start of Reaction" variant="outlined"
                                                        onChange={handleChange('G_k_9_i_3_1b_IntervalDrugAdministrationReactionUnit', index)}
                                                        value = {item['G_k_9_i_3_1b_IntervalDrugAdministrationReactionUnit'].value}/>
                                            
                                            <TextField label="Time Interval Last Dose of Drug and Start of Reaction / Event" variant="outlined"
                                                        onChange={handleChange('G_k_9_i_3_2a_IntervalLastDoseDrugReactionNum', index)}
                                                        value = {item['G_k_9_i_3_2a_IntervalLastDoseDrugReactionNum'].value}/>
                                            
                                            <TextField label="(unit) Time Interval Last Dose of Drug and Start of Reaction / Event" variant="outlined"
                                                        onChange={handleChange('G_k_9_i_3_2b_IntervalLastDoseDrugReactionUnit', index)}
                                                        value = {item['G_k_9_i_3_2b_IntervalLastDoseDrugReactionUnit'].value}/>

                                            <FormControl>
                                                <InputLabel>Did Reaction Recur on Re-administration</InputLabel>
                                                    <Select
                                                        defaultValue = {0}
                                                        value = {item['G_k_9_i_4_ReactionRecurReadministration'].value}
                                                        onChange={handleChange('G_k_9_i_4_ReactionRecurReadministration', index)}
                                                    >
                                                        <MenuItem value={1}>1 = yes – yes (rechallenge was done, reaction recurred)</MenuItem>
                                                        <MenuItem value={2}>2 = yes – no (rechallenge was done, reaction did not recur)</MenuItem>
                                                        <MenuItem value={3}>3 = yes – unk (rechallenge was done, outcome unknown)</MenuItem>
                                                        <MenuItem value={4}>4 = no – n/a (no rechallenge was done, recurrence is not applicable)</MenuItem>
                                                    </Select>
                                            </FormControl>
                                            </Stack>
                                </Stack>
                            </Grid>
                            <Grid container item xs direction="column" rowGap={1}>
                                <Stack direction="column" spacing={1} justifyContent="flex-start">  
                                    <FormLabel sx={{ fontSize: 30, marginLeft: '25%', color: 'black' }}>Assessment of Relatedness of Drug to reaction</FormLabel>
                                    <Relatednesses drugIndex={drugIndex} matrixIndex={index}></Relatednesses>
                                </Stack>
                            </Grid>
                        </Grid>

                        {index === drugReactionMatrix[drugIndex].length - 1 ?
                                                <span>
                                                    <IconButton size='large' style= {{ top: '10px'}}
                                                    sx={{ color: "white", backgroundColor: "#1976d2"}}
                                                                onClick={addForm}><AddIcon/></IconButton>
                                                </span> : null}
                    </CardContent>
                </Card>);
        });
        return list;
    }

    const addForm = () => {
        let drugReactionMatrixCopy = JSON.parse(JSON.stringify(drugReactionMatrix));
        let drugReactionMatrixNew = new DrugReactionMatrix();
        drugReactionMatrixCopy[drugIndex].push(drugReactionMatrixNew);

        const relatednessCopy = JSON.parse(JSON.stringify(relatedness));
        const newMatrixInd = drugReactionMatrix[drugIndex].length;
        relatednessCopy[drugIndex][newMatrixInd] = [new Relatedness()];

        dispatch(setDrugReactionMatrix(drugReactionMatrixCopy));
        dispatch(setRelatedness(relatednessCopy));
    }

    return(
        <div>
            {formList()}
        </div>
    )
}