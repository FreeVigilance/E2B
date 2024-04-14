
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Stack, Card, CardContent, IconButton, Grid} from '@mui/material';
import TextField from '@mui/material/TextField';
import { patientSelector, setCauseOfDeath } from '@src/features/patient/slice';
import AddIcon from '@mui/icons-material/Add';
import { CauseOfDeath } from '@src/features/patient/patient';
import DeleteIcon from '@mui/icons-material/Delete';
import {makeStyles} from '@mui/styles';
import { CauseOfDeathFieldLabel } from '@src/components/field-labels/patient/cause-of-death-label';

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

export const CausesOfDeath = () => {
    const classes = useStyles();
	const dispatch = useDispatch();
    const {causeOfDeath} = useSelector(patientSelector);

    useEffect(() => {
        console.log("STATE");
        console.log(causeOfDeath);
    });

    const handleChange = (fieldName, index, isNumber = false, length = 1) => (event) => {
        let value = event.target.value
        if (isNumber) {
            if (value.length > length)
                value = value.slice(0, length)
        }
        let causeOfDeathCopy = JSON.parse(JSON.stringify(causeOfDeath));
        causeOfDeathCopy[index][fieldName].value = value;
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
                        <Grid container spacing={2}>

                            <Grid item xs={3}>
                                <CauseOfDeathFieldLabel label="Reported Cause of Death"
                                field = 'D_9_2_r_2_CauseDeath' index={index}></CauseOfDeathFieldLabel>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField variant="outlined"
                                    className={classes.textLong}
                                    onChange={handleChange('D_9_2_r_2_CauseDeath', index)}
                                    value = {item['D_9_2_r_2_CauseDeath'].value}
                                    inputProps={{ maxLength: 250}}
                                    multiline
                                    rows={3}/>
                            </Grid>

                            <Grid item xs={3}>
                                <CauseOfDeathFieldLabel label="MedDRA Version for Reported Cause(s) of Death"
                                field = 'D_9_2_r_1a_MedDRAVersionCauseDeath' index={index}></CauseOfDeathFieldLabel>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField variant="outlined"
                                    onChange={handleChange('D_9_2_r_1a_MedDRAVersionCauseDeath', index, true, 4)}
                                    type='number'
                                    className={classes.textXshort}
                                    onKeyDown={(evt) =>
                                        (evt.key === "-" || evt.key === "+" || evt.key === "e" || evt.key === ",") &&
                                        evt.preventDefault()
                                    }
                                    value = {item['D_9_2_r_1a_MedDRAVersionCauseDeath'].value}/>
                            </Grid>

                            <Grid item xs={3}>
                                <CauseOfDeathFieldLabel label="Reported Cause of Death (MedDRA code)"
                                field = 'D_9_2_r_1b_CauseDeathMedDRACode' index={index}></CauseOfDeathFieldLabel>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField variant="outlined"
                                    className={classes.textXshort}
                                    onChange={handleChange('D_9_2_r_1b_CauseDeathMedDRACode', index, true, 8)}
                                    type='number'
                                    onKeyDown={(evt) =>
                                        (evt.key === "-" || evt.key === "+" || evt.key === "e" || evt.key === "," || evt.key === ".") &&
                                        evt.preventDefault()
                                    }
                                    value = {item['D_9_2_r_1b_CauseDeathMedDRACode'].value}/>
                            </Grid>
                        </Grid>

                        <Stack direction="row" justifyContent="flex-start"> 
                            {index === causeOfDeath.length - 1 ?
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