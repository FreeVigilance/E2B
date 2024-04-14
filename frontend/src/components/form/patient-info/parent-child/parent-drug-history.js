
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Stack, FormControlLabel, Box, Select, MenuItem, FormControl, InputLabel, Grid, Card, CardContent, IconButton} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { patientSelector, setParentDrugHistory } from '@src/features/patient/slice';
import AddIcon from '@mui/icons-material/Add';
import { ParentDrugHistory } from '@src/features/patient/patient';
import DeleteIcon from '@mui/icons-material/Delete';
import {makeStyles} from '@mui/styles';
import { FieldLabel } from '../../fieldLabel';

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

export const ParentDrugsHistory = () => {
    const classes = useStyles();
	const dispatch = useDispatch();
    const {parentDrugHistory} = useSelector(patientSelector);

    const handleChange = (fieldName, index, isNumber = false, length = 1) => (event) => {
        let value = event.target.value
        if (isNumber) {
            if (value.length > length)
                value = value.slice(0, length)
        }
        let parentdrugHistoryCopy = JSON.parse(JSON.stringify(parentDrugHistory));
        parentdrugHistoryCopy[index][fieldName].value = value;
        dispatch(setParentDrugHistory(parentdrugHistoryCopy));
    };

    const setNullFlavor = (fieldName, index) => (event) => {
        let parentdrugHistoryCopy = JSON.parse(JSON.stringify(parentDrugHistory));
        parentdrugHistoryCopy[index][fieldName].nullFlavor = event.target.value;
        dispatch(setParentDrugHistory(parentdrugHistoryCopy));
    };

    const setUnknown = (fieldName, index) => (event) => {
        console.log(event.target.checked);
        let parentdrugHistoryCopy = JSON.parse(JSON.stringify(parentDrugHistory));
        if (event.target.checked) {
            parentdrugHistoryCopy[index][fieldName].nullFlavor = -1;
        } else {
            parentdrugHistoryCopy[index][fieldName].nullFlavor = null;
        }
        dispatch(setParentDrugHistory(parentdrugHistoryCopy));
    };

    const formList = () => {
        let list = [];
        if (parentDrugHistory.length === 0) {
            return ( <span>
                <IconButton size='large' style= {{ top: '10px'}}
                sx={{ color: "white", backgroundColor: "#1976d2"}}
                            onClick={addForm}><AddIcon/></IconButton>
            </span>);
        }
        Object.values(parentDrugHistory).forEach((item, index) => {
            list.push(
                <Card sx={{border: "3px solid #094B8C",
                padding: "10px",
                boxShadow: "5px 5px #356BA0",
                marginBottom: 5}}>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <FieldLabel label="Name of Drug"></FieldLabel>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField variant="outlined"
                                    className={classes.textLong}
                                    onChange={handleChange('D_10_8_r_1_NameDrug', index)}
                                    value = {item['D_10_8_r_1_NameDrug'].value}
                                    multiline
                                    inputProps={{ maxLength: 250}}
                                    rows={3}
                                    sx={{ width: '100%' }}/>
                            </Grid>
                            
                            <Grid item xs={3}>
                                <FieldLabel label="MPID Version Date/Number"></FieldLabel>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField variant="outlined"
                                        className={classes.textShort}
                                        onChange={handleChange('D_10_8_r_2a_MPIDVersion', index)}
                                        value = {item['D_10_8_r_2a_MPIDVersion'].value}/>
                            </Grid>

                            <Grid item xs={3}>
                                <FieldLabel label="Medicinal Product Identifier"></FieldLabel>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField variant="outlined"
                                        className={classes.textShort}
                                        onChange={handleChange('D_10_8_r_2b_MPID', index)}
                                        value = {item['D_10_8_r_2b_MPID'].value}/>
                            </Grid>

                            <Grid item xs={3}>
                                <FieldLabel label="PhPID Version Date/Number"></FieldLabel>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField variant="outlined"
                                        className={classes.textShort}
                                        onChange={handleChange('D_10_8_r_3a_PhPIDVersion', index)}
                                        value = {item['D_10_8_r_3a_PhPIDVersion'].value}/>
                            </Grid>

                            <Grid item xs={3}>
                                <FieldLabel label="Pharmaceutical Product Identifier"></FieldLabel>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField variant="outlined"
                                        className={classes.textShort}
                                        onChange={handleChange('D_10_8_r_3b_PhPID', index)}
                                        value = {item['D_10_8_r_3b_PhPID'].value}/>
                            </Grid>



                            <Grid item xs={3}>
                                <FieldLabel label="MedDRA Version for Indication"></FieldLabel>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField variant="outlined"
                                        className={classes.textXshort}
                                        onChange={handleChange('D_10_8_r_6a_MedDRAVersionIndication', index, true, 4)}
                                        type='number'
                                        onKeyDown={(evt) =>
                                            (evt.key === "-" || evt.key === "+" || evt.key === "e" || evt.key === ",") &&
                                            evt.preventDefault()
                                        }
                                        value = {item['D_10_8_r_6a_MedDRAVersionIndication'].value}/>
                            </Grid>

                            <Grid item xs={3}>
                                <FieldLabel label="Indication (MedDRA code)"></FieldLabel>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField variant="outlined"
                                        className={classes.textXshort}
                                        onChange={handleChange('D_10_8_r_6b_IndicationMedDRACode', index, true, 8)}
                                        type='number'
                                        onKeyDown={(evt) =>
                                            (evt.key === "-" || evt.key === "+" || evt.key === "e" || evt.key === "," || evt.key === ".") &&
                                            evt.preventDefault()
                                        }
                                        value = {item['D_10_8_r_6b_IndicationMedDRACode'].value}/>
                            </Grid>

                            <Grid item xs={3}>
                                <FieldLabel label="MedDRA Version for Reaction"></FieldLabel>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField variant="outlined"
                                        className={classes.textXshort}
                                        onChange={handleChange('D_10_8_r_7a_MedDRAVersionReaction', index, true, 4)}
                                        type='number'
                                        onKeyDown={(evt) =>
                                            (evt.key === "-" || evt.key === "+" || evt.key === "e" || evt.key === ",") &&
                                            evt.preventDefault()
                                        }
                                        value = {item['D_10_8_r_7a_MedDRAVersionReaction'].value}/>
                            </Grid>

                            <Grid item xs={3}>
                                <FieldLabel label="Reaction (MedDRA code)"></FieldLabel>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField variant="outlined"
                                        onChange={handleChange('D_10_8_r_7b_ReactionsMedDRACode', index, true, 8)}
                                        type='number'
                                        className={classes.textXshort}
                                        onKeyDown={(evt) =>
                                            (evt.key === "-" || evt.key === "+" || evt.key === "e" || evt.key === "," || evt.key === ".") &&
                                            evt.preventDefault()
                                        }
                                        value = {item['D_10_8_r_7b_ReactionsMedDRACode'].value}/>
                            </Grid>

                            <Grid item xs={3}>
                                <FieldLabel label="Start Date"></FieldLabel>
                            </Grid>
                            <Grid item xs={9}>
                                <Stack direction="row" spacing={2} justifyContent="flex-start"> 
                                    <Box className="text-small">
                                        <FormControlLabel
                                        control={<Checkbox
                                                    checked = {item['D_10_8_r_4_StartDate'].nullFlavor !== null}
                                                    onChange={setUnknown('D_10_8_r_4_StartDate', index)}
                                                    />}
                                                label="No Info"/>
                                    </Box>
                                    {parentDrugHistory[index]['D_10_8_r_4_StartDate']['nullFlavor'] === null ? 
                                            <TextField
                                            className={classes.textShort}
                                            variant="outlined"
                                            value = {item['D_10_8_r_4_StartDate'].value}
                                            onChange={handleChange('D_10_8_r_4_StartDate', index)}
                                            />
                                            : <FormControl className={classes.textXshort}>
                                                <InputLabel>Null Flavor</InputLabel>
                                                <Select
                                                    defaultValue = {0}
                                                    value = {item['D_10_8_r_4_StartDate'].nullFlavor}
                                                    onChange={setNullFlavor('D_10_8_r_4_StartDate', index)}
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
                                <FieldLabel label="End Date"></FieldLabel>
                            </Grid>
                            <Grid item xs={9}>
                                <Stack direction="row" spacing={2} justifyContent="flex-start"> 
                                    <Box className="text-small" style={{ padding: 0 }}>
                                        <FormControlLabel
                                        control={<Checkbox
                                                    checked = {item['D_10_8_r_5_EndDate'].nullFlavor !== null}
                                                    onChange={setUnknown('D_10_8_r_5_EndDate', index)}
                                                    />}
                                                label="No Info"/>
                                    </Box>
                                    {parentDrugHistory[index]['D_10_8_r_5_EndDate']['nullFlavor'] === null ? 
                                            <TextField
                                            className={classes.textShort}
                                            variant="outlined"
                                            value = {item['D_10_8_r_5_EndDate'].value}
                                            onChange={handleChange('D_10_8_r_5_EndDate', index)}
                                            />
                                            : <FormControl className={classes.textXshort}>
                                                <InputLabel>Null Flavor</InputLabel>
                                                <Select
                                                    value = {item['D_10_8_r_5_EndDate'].nullFlavor}
                                                    onChange={setNullFlavor('D_10_8_r_5_EndDate', index)}
                                                >
                                                    <MenuItem value={0}>Masked</MenuItem>
                                                    <MenuItem value={1}>Asked, but not known</MenuItem>
                                                    <MenuItem value={2}>Not asked</MenuItem>
                                                </Select>
                                                </FormControl>
                                    }
                                </Stack>
                            </Grid>
                        </Grid>
                            
                            {index === parentDrugHistory.length - 1 ?
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
                </CardContent>
            </Card>);
        });
        return list;
    }

    const addForm = () => {
        let parentDrugHistoryCopy = JSON.parse(JSON.stringify(parentDrugHistory));
        let parentDrugHistoryNew = new ParentDrugHistory();
        parentDrugHistoryCopy.push(parentDrugHistoryNew);
        dispatch(setParentDrugHistory(parentDrugHistoryCopy));
    }

    const removeForm = (index) => {
        let parentDrugHistoryCopy = JSON.parse(JSON.stringify(parentDrugHistory));
        parentDrugHistoryCopy.splice(index, 1);
        dispatch(setParentDrugHistory(parentDrugHistoryCopy));
    }

    return(
        <div>
            {formList()}
        </div>
    )
}