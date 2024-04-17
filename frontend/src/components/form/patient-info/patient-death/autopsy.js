
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Stack, Card, CardContent, IconButton, Grid} from '@mui/material';
import TextField from '@mui/material/TextField';
import { patientSelector, setAutopsy } from '@src/features/patient/slice';
import AddIcon from '@mui/icons-material/Add';
import { AutopsyData } from '@src/features/patient/patient';
import DeleteIcon from '@mui/icons-material/Delete';
import {makeStyles} from '@mui/styles';
import { AutopsyFieldLabel } from '@src/components/field-labels/patient/autopsy-label';
import { MedDRABtn } from '@src/components/meddra/meddra-btn';

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

export const Autopsy = () => {
    const classes = useStyles();
	const dispatch = useDispatch();
    const {autopsy} = useSelector(patientSelector);

    const handleChange = (fieldName, index, isNumber = false, length = 1) => (event) => {
        let value = event.target.value;
        if (value === '') {
            value = null;
        };
        if (isNumber) {
            if (value.length > length)
                value = value.slice(0, length)
        }
        let autopsyCopy = JSON.parse(JSON.stringify(autopsy));
        autopsyCopy[index][fieldName].value = event.target.value;
        dispatch(setAutopsy(autopsyCopy));
    };

    const formList = () => {
        let list = [];
        if (autopsy.length === 0) {
            return ( <span>
                <IconButton size='large' style= {{ top: '10px', left: '20px'}}
                sx={{ color: "white", backgroundColor: "#1976d2"}}
                            onClick={addForm}><AddIcon/></IconButton>
            </span>);
        }
        Object.values(autopsy).forEach((item, index) => {
            list.push(
                <Card sx={{border: "3px solid #094B8C",
                padding: "10px",
                boxShadow: "5px 5px #356BA0",
                marginBottom: 5}}>
                    <CardContent>
                    <Grid container spacing={2}>

                        <Grid item xs={3}>
                            <AutopsyFieldLabel label="Autopsy-determined Cause of Death"
                            field = 'D_9_4_r_2_AutopsyDeterminedCauseDeath' index={index}></AutopsyFieldLabel>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField variant="outlined"
                                className={classes.textLong}
                                onChange={handleChange('D_9_4_r_2_AutopsyDeterminedCauseDeath', index)}
                                value = {item['D_9_4_r_2_AutopsyDeterminedCauseDeath'].value}
                                multiline
                                inputProps={{ maxLength: 250}}
                                rows={3}/>
                        </Grid>

                        <Grid item xs={3}>
                            <AutopsyFieldLabel label="MedDRA Version for Autopsy-determined Cause of Death"
                            field = 'D_9_4_r_1a_MedDRAVersionAutopsyDeterminedCauseDeath' index={index}></AutopsyFieldLabel>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField variant="outlined"
                                className={classes.textXshort}
                                onChange={handleChange('D_9_4_r_1a_MedDRAVersionAutopsyDeterminedCauseDeath', index, true, 4)}
                                type='number'
                                onKeyDown={(evt) =>
                                    (evt.key === "-" || evt.key === "+" || evt.key === "e" || evt.key === ",") &&
                                    evt.preventDefault()
                                }
                                value = {item['D_9_4_r_1a_MedDRAVersionAutopsyDeterminedCauseDeath'].value}/>
                        </Grid>

                        <Grid item xs={3}>
                            <AutopsyFieldLabel label="Autopsy-determined Cause of Death (MedDRA code)"
                            field = 'D_9_4_r_1b_AutopsyDeterminedCauseDeathMedDRACode' index={index}></AutopsyFieldLabel>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField variant="outlined"
                                className={classes.textXshort}
                                onChange={handleChange('D_9_4_r_1b_AutopsyDeterminedCauseDeathMedDRACode', index, true, 8)}
                                type='number'
                                onKeyDown={(evt) =>
                                    (evt.key === "-" || evt.key === "+" || evt.key === "e" || evt.key === "," || evt.key === ".") &&
                                    evt.preventDefault()
                                }
                                value = {item['D_9_4_r_1b_AutopsyDeterminedCauseDeathMedDRACode'].value}/>
                            <MedDRABtn field='D_9_4_r_1b_AutopsyDeterminedCauseDeathMedDRACode' index={index}
                                handleChange={handleChange}></MedDRABtn>
                        </Grid>
                    </Grid>

                    <Stack direction="row" justifyContent="flex-start"> 
                        {index === autopsy.length - 1 ?
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
        let autopsyCopy = JSON.parse(JSON.stringify(autopsy));
        let autopsyNew = new AutopsyData();
        autopsyCopy.push(autopsyNew);
        dispatch(setAutopsy(autopsyCopy));
    }

    const removeForm = (index) => {
        let autopsyCopy = JSON.parse(JSON.stringify(autopsy));
        autopsyCopy.splice(index, 1);
        dispatch(setAutopsy(autopsyCopy));
    }

    return(
        <div>
            {formList()}
        </div>
    )
}