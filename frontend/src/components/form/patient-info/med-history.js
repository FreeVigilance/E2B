
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Stack, FormControlLabel, Box, Select, MenuItem, FormControl, InputLabel, Grid, Card, CardContent, IconButton} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { patientSelector, setMedicalHistory } from '@src/features/patient/slice';
import AddIcon from '@mui/icons-material/Add';
import { MedHistory } from '@src/features/patient/patient';
import DeleteIcon from '@mui/icons-material/Delete';

import {makeStyles} from '@mui/styles';
import { MedHistoryFieldLabel } from '@src/components/field-labels/patient/med-history-label';

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

export const MedicalHistory = () => {
    const classes = useStyles();
	const dispatch = useDispatch();
    const {medicalHistory} = useSelector(patientSelector);

    const handleChange = (fieldName, index, isNumber = false, length = 1) => (event) => {
        let value = event.target.value
        if (isNumber) {
            if (value.length > length)
                value = value.slice(0, length)
        }
        let medicalHistoryCopy = JSON.parse(JSON.stringify(medicalHistory));
        medicalHistoryCopy[index][fieldName].value = value;
        dispatch(setMedicalHistory(medicalHistoryCopy));
    };

    const setNullFlavor = (fieldName, index) => (event) => {
        let medicalHistoryCopy = JSON.parse(JSON.stringify(medicalHistory));
        medicalHistoryCopy[index][fieldName].nullFlavor = event.target.value;
        dispatch(setMedicalHistory(medicalHistoryCopy));
    };

    const setUnknown = (fieldName, index) => (event) => {
        console.log(event.target.checked);
        let medicalHistoryCopy = JSON.parse(JSON.stringify(medicalHistory));
        if (event.target.checked) {
            medicalHistoryCopy[index][fieldName].nullFlavor = -1;
        } else {
            medicalHistoryCopy[index][fieldName].nullFlavor = null;
        }
        dispatch(setMedicalHistory(medicalHistoryCopy));
    };

    const formList = () => {
        let list = [];
        if (medicalHistory.length === 0) {
            return ( <span>
                <IconButton size='large' style= {{ top: '10px'}}
                sx={{ color: "white", backgroundColor: "#1976d2"}}
                            onClick={addForm}><AddIcon/></IconButton>
            </span>);
        }
        Object.values(medicalHistory).forEach((item, index) => {
            list.push(
                <Card sx={{border: "3px solid #094B8C",
                padding: "10px",
                boxShadow: "5px 5px #356BA0",
                marginBottom: 5}}>
                    <CardContent>
                    <Grid container spacing={2}>

                            <Grid item xs={3}>
                                <MedHistoryFieldLabel label="MedDRA Version for Medical History"
                                field = 'D_7_1_r_1a_MedDRAVersionMedicalHistory' index={index}></MedHistoryFieldLabel>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField variant="outlined"
                                    onChange={handleChange('D_7_1_r_1a_MedDRAVersionMedicalHistory', index, true, 4)}
                                    value = {item['D_7_1_r_1a_MedDRAVersionMedicalHistory'].value}
                                    type='number'
                                    className={classes.textXshort}
                                    onKeyDown={(evt) =>
                                        (evt.key === "-" || evt.key === "+" || evt.key === "e" || evt.key === ",") &&
                                        evt.preventDefault()
                                    }/>
                            </Grid>

                            <Grid item xs={3}>
                                <MedHistoryFieldLabel label="Medical History MedDRA code"
                                field = 'D_7_1_r_1b_MedicalHistoryMedDRACode' index={index}></MedHistoryFieldLabel>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField variant="outlined"
                                    onChange={handleChange('D_7_1_r_1b_MedicalHistoryMedDRACode', index, true, 8)}
                                    value = {item['D_7_1_r_1b_MedicalHistoryMedDRACode'].value}
                                    className={classes.textXshort}
                                    type='number'
                                    onKeyDown={(evt) =>
                                        (evt.key === "-" || evt.key === "+" || evt.key === "e" || evt.key === "," || evt.key === '.') &&
                                        evt.preventDefault()
                                    }/>
                            </Grid>

                            <Grid item xs={3}>
                                <MedHistoryFieldLabel label="Family History Present"
                                field = 'D_7_1_r_6_FamilyHistory' index={index}></MedHistoryFieldLabel>
                            </Grid>
                            <Grid item xs={9}>
                                <Box className="text-small">
                                        <FormControlLabel
                                        control={<Checkbox
                                            checked = {item['D_7_1_r_6_FamilyHistory'].nullFlavor !== null}
                                            onChange={setUnknown('D_7_1_r_6_FamilyHistory', index)}
                                            />}/>
                                </Box>
                            </Grid>

                            <Grid item xs={3}>
                                <MedHistoryFieldLabel label="Start Date"
                                field = 'D_7_1_r_2_StartDate' index={index}></MedHistoryFieldLabel>
                            </Grid>
                            <Grid item xs={9}>
                                <Stack direction="row" spacing={2} justifyContent="flex-start"> 
                                    <Box className="text-small">
                                        <FormControlLabel
                                        control={<Checkbox
                                                    checked = {item['D_7_1_r_2_StartDate'].nullFlavor !== null}
                                                    onChange={setUnknown('D_7_1_r_2_StartDate', index)}
                                                    />}
                                                label="No Info"/>
                                    </Box>
                                    {medicalHistory[index]['D_7_1_r_2_StartDate']['nullFlavor'] === null ? 
                                            <TextField
                                            variant="outlined"
                                            className={classes.textShort}
                                            value = {item['D_7_1_r_2_StartDate'].value}
                                            onChange={handleChange('D_7_1_r_2_StartDate', index)}
                                            />
                                            : <FormControl className={classes.textXshort}>
                                                <InputLabel>Null Flavor</InputLabel>
                                                <Select
                                                    defaultValue = {0}
                                                    value = {item['D_7_1_r_2_StartDate'].nullFlavor}
                                                    onChange={setNullFlavor('D_7_1_r_2_StartDate', index)}
                                                >
                                                    <MenuItem value={0}>Masked</MenuItem>
                                                    <MenuItem value={1}>Asked, but not known</MenuItem>
                                                    <MenuItem value={2}>Not asked</MenuItem>
                                                </Select>
                                                </FormControl>
                                    }
                                </Stack>
                            </Grid>

                            <Grid item xs={3}>
                                <MedHistoryFieldLabel label="End Date"
                                field = 'D_7_1_r_4_EndDate' index={index}></MedHistoryFieldLabel>
                            </Grid>
                            <Grid item xs={9}>
                                <Stack direction="row" spacing={2} justifyContent="flex-start"> 
                                    <Box className="text-small">
                                        <FormControlLabel
                                        control={<Checkbox
                                                    checked = {item['D_7_1_r_4_EndDate'].nullFlavor !== null}
                                                    onChange={setUnknown('D_7_1_r_4_EndDate', index)}
                                                    />}
                                                label="No Info"/>
                                    </Box>
                                    {medicalHistory[index]['D_7_1_r_4_EndDate']['nullFlavor'] === null ? 
                                            <TextField
                                            className={classes.textShort}
                                            variant="outlined"
                                            value = {item['D_7_1_r_4_EndDate'].value}
                                            onChange={handleChange('D_7_1_r_4_EndDate', index)}
                                            />
                                            : <FormControl className={classes.textXshort}>
                                                <InputLabel>Null Flavor</InputLabel>
                                                <Select
                                                    defaultValue = {0}
                                                    value = {item['D_7_1_r_4_EndDate'].nullFlavor}
                                                    onChange={setNullFlavor('D_7_1_r_4_EndDate', index)}
                                                >
                                                    <MenuItem value={0}>Masked</MenuItem>
                                                    <MenuItem value={1}>Asked, but not known</MenuItem>
                                                    <MenuItem value={2}>Not asked</MenuItem>
                                                </Select>
                                                </FormControl>
                                    }
                                </Stack>
                            </Grid>

                            <Grid item xs={3}>
                                <MedHistoryFieldLabel label="Continuing"
                                field = 'D_7_1_r_3_Continuing' index={index}></MedHistoryFieldLabel>
                            </Grid>
                            <Grid item xs={9}>
                                <Stack direction="row" spacing={2} justifyContent="flex-start"> 
                                    <Box className="text-small">
                                        <FormControlLabel
                                        control={<Checkbox
                                                    checked = {item['D_7_1_r_3_Continuing'].nullFlavor !== null}
                                                    onChange={setUnknown('D_7_1_r_3_Continuing', index)}
                                                    />}
                                                label="No Info"/>
                                    </Box>
                                    {medicalHistory[index]['D_7_1_r_3_Continuing']['nullFlavor'] === null ? 
                                            <Select 
                                            className={classes.textXshort}
                                            value = {item['D_7_1_r_3_Continuing'].value}
                                            defaultValue = {0}
                                            onChange={handleChange('D_7_1_r_3_Continuing', index)}>
                                                <MenuItem value={1}>Yes</MenuItem>
                                                <MenuItem value={0}>No</MenuItem>
                                            </Select>
                                            : <FormControl className={classes.textXshort}>
                                                <InputLabel>Null Flavor</InputLabel>
                                                <Select
                                                    defaultValue = {0}
                                                    value = {item['D_7_1_r_3_Continuing'].nullFlavor}
                                                    onChange={setNullFlavor('D_7_1_r_3_Continuing', index)}
                                                >
                                                    <MenuItem value={0}>Masked</MenuItem>
                                                    <MenuItem value={1}>Asked, but not known</MenuItem>
                                                    <MenuItem value={2}>Not asked</MenuItem>
                                                    <MenuItem value={3}>Unknown</MenuItem>
                                                </Select>
                                                </FormControl>
                                        }
                                    </Stack>
                            </Grid>
                            <Grid item xs={3}>
                                <MedHistoryFieldLabel label="Comments"
                                field = 'D_7_1_r_5_Comments' index={index}></MedHistoryFieldLabel>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField variant="outlined"
                                    className={classes.textLong}
                                    onChange={handleChange('D_7_1_r_5_Comments', index)}
                                    value = {item['D_7_1_r_5_Comments'].value}
                                    multiline
                                    inputProps={{ maxLength: 2000}}
                                    rows={7}/>
                            </Grid>


                            {index === medicalHistory.length - 1 ?
                                <span>
                                    <IconButton size='large' style= {{ top: '10px', left: '5px'}}
                                    sx={{ color: "white", backgroundColor: "#1976d2"}}
                                                onClick={addForm}><AddIcon/></IconButton>
                                </span> : null}
                            <span>
                                <IconButton size='large' style= {{ top: '10px', left: '15px'}}
                                sx={{ color: "white", backgroundColor: "#000066"}}
                                        onClick={() => removeForm(index)}><DeleteIcon/>
                                </IconButton>
                            </span>
                    </Grid>
                </CardContent>
            </Card>);
        });
        return list;
    }

    const addForm = () => {
        let medHistoryCopy = JSON.parse(JSON.stringify(medicalHistory));
        let medicalHistoryNew = new MedHistory();
        medHistoryCopy.push(medicalHistoryNew);
        dispatch(setMedicalHistory(medHistoryCopy));
    }

    const removeForm = (index) => {
        let medHistoryCopy = JSON.parse(JSON.stringify(medicalHistory));
        medHistoryCopy.splice(index, 1);
        dispatch(setMedicalHistory(medHistoryCopy));
    }

    return(
        <div>
            {formList()}
        </div>
    )
}