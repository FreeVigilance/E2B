import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Stack, Select, MenuItem, FormControl, InputLabel, Grid, FormLabel, Card, CardContent, IconButton} from '@mui/material';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { drugsSelector, setDrugReactionMatrix, setRelatedness } from '@src/features/drugs/slice';
import { DrugReactionMatrix, Relatedness } from '@src/features/drugs/drugs';
import { Relatednesses } from './relatedness';
import DeleteIcon from '@mui/icons-material/Delete';
import { ReactionSelect } from './reaction-select';
import {makeStyles} from '@mui/styles';
import { MatrixFieldLabel } from '@src/components/field-labels/drugs/matrix/matrix-label';

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

export const DrugReactionsMatrix = ({drugIndex}) => {
    const classes = useStyles();

	const dispatch = useDispatch();
    const {drugReactionMatrix, relatedness} = useSelector(drugsSelector);

    useEffect(() => {
        console.log("STATE matrix");
        console.log(drugReactionMatrix);
        console.log(relatedness);
    });

    const handleChange = (fieldName, index, isNumber = false, length = 1) => (event) => {
        let value = event.target.value
        if (isNumber) {
            if (value.length > length)
                value = value.slice(0, length)
        }
        let drugReactionMatrixCopy = JSON.parse(JSON.stringify(drugReactionMatrix));
        drugReactionMatrixCopy[drugIndex][index][fieldName].value = value;
        dispatch(setDrugReactionMatrix(drugReactionMatrixCopy));
    };

    const formList = () => {
        let list = [];
        if (drugReactionMatrix[drugIndex].length === 0) {
            return ( <span>
                <IconButton size='large' style= {{ top: '10px'}}
                sx={{ color: "white", backgroundColor: "#1976d2"}}
                            onClick={addForm}><AddIcon/></IconButton>
            </span>);
        }
        Object.values(drugReactionMatrix[drugIndex]).forEach((item, index) => {
            list.push(
                <Card sx={{border: "3px solid #094B8C",
                        padding: "10px",
                        boxShadow: "5px 5px #356BA0",
                        marginBottom: 5}}>
                    <CardContent>
                    <Grid container item xs direction="row" rowGap={1}>
                        <Grid container item xs direction="column" rowGap={1}>
                            
                        <ReactionSelect index={index} drugIndex={drugIndex}></ReactionSelect>

                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <MatrixFieldLabel label="Time Interval Beginning of Drug Administration and Start of Reaction"
                                field = 'G_k_9_i_3_1a_IntervalDrugAdministrationReactionNum' drugIndex={drugIndex} index={index}></MatrixFieldLabel>
                            </Grid>
                            <Grid item xs={8}>     
                                <TextField variant="outlined"
                                    onChange={handleChange('G_k_9_i_3_1a_IntervalDrugAdministrationReactionNum', index, true, 5)}
                                    type='number'
                                    className={classes.textXshort}
                                    onKeyDown={(evt) =>
                                        (evt.key === "-" || evt.key === "+" || evt.key === "e" || evt.key === "," || evt.key === ".") &&
                                        evt.preventDefault()
                                    }
                                    value = {item['G_k_9_i_3_1a_IntervalDrugAdministrationReactionNum'].value}/>
                            </Grid>

                            <Grid item xs={4}>
                                <MatrixFieldLabel label="(unit) Time Interval Beginning of Drug Administration and Start of Reaction"
                                field = 'G_k_9_i_3_1b_IntervalDrugAdministrationReactionUnit' drugIndex={drugIndex} index={index}></MatrixFieldLabel>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField variant="outlined"
                                    className={classes.textMedium}
                                            onChange={handleChange('G_k_9_i_3_1b_IntervalDrugAdministrationReactionUnit', index)}
                                            inputProps={{ maxLength: 50}}
                                            value = {item['G_k_9_i_3_1b_IntervalDrugAdministrationReactionUnit'].value}/>
                            </Grid>

                            <Grid item xs={4}>
                                <MatrixFieldLabel label="Time Interval Last Dose of Drug and Start of Reaction / Event"
                                field = 'G_k_9_i_3_2a_IntervalLastDoseDrugReactionNum' drugIndex={drugIndex} index={index}></MatrixFieldLabel>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField variant="outlined"
                                className={classes.textXshort}
                                            onChange={handleChange('G_k_9_i_3_2a_IntervalLastDoseDrugReactionNum', index, true, 5)}
                                            type='number'
                                            onKeyDown={(evt) =>
                                                (evt.key === "-" || evt.key === "+" || evt.key === "e" || evt.key === "," || evt.key === ".") &&
                                                evt.preventDefault()
                                            }
                                            value = {item['G_k_9_i_3_2a_IntervalLastDoseDrugReactionNum'].value}/>
                            </Grid>

                            <Grid item xs={4}>
                                <MatrixFieldLabel label="(unit) Time Interval Last Dose of Drug and Start of Reaction / Event"
                                field = 'G_k_9_i_3_2b_IntervalLastDoseDrugReactionUnit' drugIndex={drugIndex} index={index}></MatrixFieldLabel>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField variant="outlined"
                                            onChange={handleChange('G_k_9_i_3_2b_IntervalLastDoseDrugReactionUnit', index)}
                                            inputProps={{ maxLength: 50}}
                                            className={classes.textMedium}
                                            value = {item['G_k_9_i_3_2b_IntervalLastDoseDrugReactionUnit'].value}/>
                            </Grid>

                            <Grid item xs={4}>
                                <MatrixFieldLabel label="Did Reaction Recur on Re-administration"
                                field = 'G_k_9_i_4_ReactionRecurReadministration' drugIndex={drugIndex} index={index}></MatrixFieldLabel>
                            </Grid>
                            <Grid item xs={8}>
                                <Select
                                className={classes.textMedium}
                                    value = {item['G_k_9_i_4_ReactionRecurReadministration'].value}
                                    onChange={handleChange('G_k_9_i_4_ReactionRecurReadministration', index)}
                                >
                                    <MenuItem value={1}>1 = yes – yes (rechallenge was done, reaction recurred)</MenuItem>
                                    <MenuItem value={2}>2 = yes – no (rechallenge was done, reaction did not recur)</MenuItem>
                                    <MenuItem value={3}>3 = yes – unk (rechallenge was done, outcome unknown)</MenuItem>
                                    <MenuItem value={4}>4 = no – n/a (no rechallenge was done, recurrence is not applicable)</MenuItem>
                                </Select>
                            </Grid>        
                        </Grid>
                        </Grid>

                        <Grid container item xs direction="column" rowGap={1}>
                                <Stack direction="column" spacing={1} justifyContent="flex-start">  
                                    <FormLabel sx={{ fontSize: 30, marginLeft: '25%', color: 'black' }}>Assessment of Relatedness of Drug to reaction</FormLabel>
                                    <Relatednesses drugIndex={drugIndex} matrixIndex={index}></Relatednesses>
                                </Stack>
                        </Grid>
                    </Grid>
                        <span>
                                        <IconButton size='large' style= {{ top: '10px', right: '10px'}}
                                        sx={{ color: "white", backgroundColor: "#000066"}}
                                                onClick={() => removeForm(index)}><DeleteIcon/>
                                        </IconButton>
                                    </span> 
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
        console.log('ADDDDD');
        console.log('drugReactionMatrix', drugReactionMatrix);
        console.log('relatedness', relatedness);

        let drugReactionMatrixCopy = JSON.parse(JSON.stringify(drugReactionMatrix));
        let drugReactionMatrixNew = new DrugReactionMatrix();
        drugReactionMatrixCopy[drugIndex].push(drugReactionMatrixNew);

        const relatednessCopy = JSON.parse(JSON.stringify(relatedness));
        const newMatrixInd = drugReactionMatrix[drugIndex].length;
        if (Object.keys(relatednessCopy).length <= drugIndex) {
            relatednessCopy[drugIndex] = {};
        }
        let relatednessNew = new Relatedness();
        relatednessCopy[drugIndex][newMatrixInd] = [];
        relatednessCopy[drugIndex][newMatrixInd].push(relatednessNew);

        console.log('new relat', relatednessCopy)
        dispatch(setDrugReactionMatrix(drugReactionMatrixCopy));
        dispatch(setRelatedness(relatednessCopy));
    }

    const removeForm = (index) => {
        let drugReactionMatrixCopy = JSON.parse(JSON.stringify(drugReactionMatrix));
        drugReactionMatrixCopy[drugIndex].splice(index, 1);

        let relatednessCopy = JSON.parse(JSON.stringify(relatedness));

        for (let ind = index; ind <= Object.keys(relatedness[drugIndex]).length; ind++) {
            relatednessCopy[drugIndex][ind] = relatednessCopy[drugIndex][ind + 1];
        }
        console.log(relatednessCopy);

        dispatch(setDrugReactionMatrix(drugReactionMatrixCopy));
        dispatch(setRelatedness(relatednessCopy));

    }

    return(
        <div>
            {formList()}
        </div>
    )
}