import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Stack, Select, MenuItem, FormControl, InputLabel, Grid, FormLabel, Card, CardContent, IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { drugsSelector, setDrugReactionMatrix, setRelatedness } from '@src/features/drugs/slice';
import { DrugReactionMatrix, Relatedness } from '@src/features/drugs/drugs';
import { Relatednesses } from './relatedness';
import DeleteIcon from '@mui/icons-material/Delete';

export const DrugReactionsMatrix = ({drugIndex}) => {
    const dispatch = useDispatch();
    const {drugReactionMatrix, relatedness} = useSelector(drugsSelector);

    useEffect(() => {
        console.log("STATE matrix");
        console.log(drugReactionMatrix);
        console.log(relatedness);
    });

    const handleChange = (fieldName, index) => (event) => {
        let drugReactionMatrixCopy = JSON.parse(JSON.stringify(drugReactionMatrix));
        drugReactionMatrixCopy[drugIndex][index][fieldName].value = event.target.value;
        dispatch(setDrugReactionMatrix(drugReactionMatrixCopy));
    };

    const formList = () => {
        let list = [];
        if (drugReactionMatrix[drugIndex].length === 0) {
            return (
                <span>
                    <IconButton size="large" style={{top: '10px'}}
                                sx={{color: "white", backgroundColor: "#1976d2"}}
                                onClick={addForm}><AddIcon/></IconButton>
                </span>
            );
        }
        Object.values(drugReactionMatrix[drugIndex]).forEach((item, index) => {
            list.push(
                <Card sx={{
                    border: "3px solid #094B8C",
                    padding: "10px",
                    boxShadow: "5px 5px #356BA0",
                    marginBottom: 5,
                }}>
                    <CardContent>
                        <Grid container direction="row" columnGap={4}>
                            <Grid container item xs direction="column" rowGap={1}>
                                <Stack direction="column" spacing={1} justifyContent="flex-start">

                                    <FormLabel sx={{fontSize: 30, marginLeft: '25%', color: 'black'}}>Drug-reaction Matrix</FormLabel>

                                    <Stack direction="column" spacing={1} justifyContent="flex-start">

                                        <TextField label="Time Interval Beginning of Drug Administration and Start of Reaction" variant="outlined"
                                                   onChange={handleChange('G_k_9_i_3_1a_IntervalDrugAdministrationReactionNum', index)}
                                                   inputProps={{maxLength: 5}}
                                                   type="number"
                                                   onKeyDown={(evt) =>
                                                       (evt.key === "-" || evt.key === "+" || evt.key === "e" || evt.key === "," || evt.key === ".") &&
                                                       evt.preventDefault()
                                                   }
                                                   value={item['G_k_9_i_3_1a_IntervalDrugAdministrationReactionNum'].value}/>

                                        <FormControl>
                                            <InputLabel>Time Interval between Beginning of Drug Administration and Start of Reaction / Event (unit)</InputLabel>
                                            <Select
                                                label="Time Interval between Beginning of Drug Administration and Start of Reaction / Event (unit)"
                                                sx={{width: '100%'}}
                                                onChange={handleChange('G_k_9_i_3_1b_IntervalDrugAdministrationReactionUnit', index)}
                                                value={item['G_k_9_i_3_1b_IntervalDrugAdministrationReactionUnit'].value}
                                            >
                                                <MenuItem value={'s'}>Second (s)</MenuItem>
                                                <MenuItem value={'min'}>Minute (min)</MenuItem>
                                                <MenuItem value={'h'}>Hour (h)</MenuItem>
                                                <MenuItem value={'d'}>Day (d)</MenuItem>
                                                <MenuItem value={'wk'}>Week (wk)</MenuItem>
                                                <MenuItem value={'mo'}>Month (mo)</MenuItem>
                                                <MenuItem value={'a'}>Year (a)</MenuItem>
                                            </Select>
                                        </FormControl>

                                        <TextField label="Time Interval Last Dose of Drug and Start of Reaction / Event" variant="outlined"
                                                   onChange={handleChange('G_k_9_i_3_2a_IntervalLastDoseDrugReactionNum', index)}
                                                   inputProps={{maxLength: 5}}
                                                   type="number"
                                                   onKeyDown={(evt) =>
                                                       (evt.key === "-" || evt.key === "+" || evt.key === "e" || evt.key === "," || evt.key === ".") &&
                                                       evt.preventDefault()
                                                   }
                                                   value={item['G_k_9_i_3_2a_IntervalLastDoseDrugReactionNum'].value}/>

                                        <FormControl>
                                            <InputLabel>Time Interval between Beginning of Drug Administration and Start of Reaction / Event (unit)</InputLabel>
                                            <Select
                                                label="Time Interval between Last Dose of Drug and Start of Reaction / Event (unit)"
                                                sx={{width: '100%'}}
                                                onChange={handleChange('G_k_9_i_3_2b_IntervalLastDoseDrugReactionUnit', index)}
                                                value={item['G_k_9_i_3_2b_IntervalLastDoseDrugReactionUnit'].value}
                                            >
                                                <MenuItem value={'s'}>Second (s)</MenuItem>
                                                <MenuItem value={'min'}>Minute (min)</MenuItem>
                                                <MenuItem value={'h'}>Hour (h)</MenuItem>
                                                <MenuItem value={'d'}>Day (d)</MenuItem>
                                                <MenuItem value={'wk'}>Week (wk)</MenuItem>
                                                <MenuItem value={'mo'}>Month (mo)</MenuItem>
                                                <MenuItem value={'a'}>Year (a)</MenuItem>
                                            </Select>
                                        </FormControl>

                                        <FormControl>
                                            <InputLabel>Did Reaction Recur on Re-administration</InputLabel>
                                            <Select
                                                defaultValue={0}
                                                value={item['G_k_9_i_4_ReactionRecurReadministration'].value}
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
                                    <FormLabel sx={{fontSize: 30, marginLeft: '25%', color: 'black'}}>Assessment of Relatedness of Drug to reaction</FormLabel>
                                    <Relatednesses drugIndex={drugIndex} matrixIndex={index}></Relatednesses>
                                </Stack>
                            </Grid>
                        </Grid>
                        <span>
                            <IconButton size="large" style={{top: '10px', right: '10px'}}
                                        sx={{color: "white", backgroundColor: "#1976d2"}}
                                        onClick={() => removeForm(index)}><DeleteIcon/>
                            </IconButton>
                        </span>
                        {index === drugReactionMatrix[drugIndex].length - 1 ?
                            <span>
                                <IconButton size="large" style={{top: '10px'}}
                                            sx={{color: "white", backgroundColor: "#1976d2"}}
                                            onClick={addForm}><AddIcon/></IconButton>
                            </span> : null}
                    </CardContent>
                </Card>);
        });
        return list;
    };

    const addForm = () => {
        let drugReactionMatrixCopy = JSON.parse(JSON.stringify(drugReactionMatrix));
        let drugReactionMatrixNew = new DrugReactionMatrix();
        drugReactionMatrixCopy[drugIndex].push(drugReactionMatrixNew);

        const relatednessCopy = JSON.parse(JSON.stringify(relatedness));
        const newMatrixInd = drugReactionMatrix[drugIndex].length;
        relatednessCopy[drugIndex][newMatrixInd] = [];

        dispatch(setDrugReactionMatrix(drugReactionMatrixCopy));
        dispatch(setRelatedness(relatednessCopy));
    };

    const removeForm = (index) => {
        let drugReactionMatrixCopy = JSON.parse(JSON.stringify(drugReactionMatrix));
        drugReactionMatrixCopy[drugIndex].splice(index, 1);

        let relatednessCopy = JSON.parse(JSON.stringify(relatedness));

        console.log("!!!!!");
        console.log(relatednessCopy);
        console.log(index);
        for (let ind = index; ind <= Object.keys(relatedness[drugIndex]).length; ind++) {
            console.log(ind);
            relatednessCopy[drugIndex][ind] = relatednessCopy[drugIndex][ind + 1];
        }
        console.log(relatednessCopy);

        dispatch(setDrugReactionMatrix(drugReactionMatrixCopy));
        dispatch(setRelatedness(relatednessCopy));

    };

    return (
        <div>
            {formList()}
        </div>
    );
};
