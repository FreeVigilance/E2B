
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Stack, FormControlLabel, Box, Select, MenuItem, FormControl, InputLabel, Grid, Divider, FormLabel, Card, CardContent, IconButton} from '@mui/material';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { patientSelector, setParentData } from '@src/features/patient/slice';
import AddIcon from '@mui/icons-material/Add';
import { ParentData } from '@src/features/patient/patient';
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

export const ParentInfo = () => {
    const classes = useStyles();
	const dispatch = useDispatch();
    const {parentData} = useSelector(patientSelector);

    const handleChange = (fieldName, index, isNumber = false, length = 1) => (event) => {
        let value = event.target.value
        if (isNumber) {
            if (value.length > length)
                value = value.slice(0, length)
        }
        let parentDataCopy = JSON.parse(JSON.stringify(parentData));
        parentDataCopy[index][fieldName].value = value;
        dispatch(setParentData(parentDataCopy));
    };

    const setNullFlavor = (fieldName, index) => (event) => {
        let parentDataCopy = JSON.parse(JSON.stringify(parentData));
        parentDataCopy[index][fieldName].nullFlavor = event.target.value;
        dispatch(setParentData(parentDataCopy));
    };

    const setUnknown = (fieldName, index) => (event) => {
        console.log(event.target.checked);
        let parentDataCopy = JSON.parse(JSON.stringify(parentData));
        if (event.target.checked) {
            parentDataCopy[index][fieldName].nullFlavor = -1;
        } else {
            parentDataCopy[index][fieldName].nullFlavor = null;
        }
        dispatch(setParentData(parentDataCopy));
    };

    const formList = () => {
        let list = [];
        if (parentData.length === 0) {
            return ( <span>
                <IconButton size='large' style= {{ top: '10px'}}
                sx={{ color: "white", backgroundColor: "#1976d2"}}
                            onClick={addForm}><AddIcon/></IconButton>
            </span>);
        }
        Object.values(parentData).forEach((item, index) => {
            list.push(
                <Card sx={{border: "3px solid #094B8C",
                padding: "10px",
                boxShadow: "5px 5px #356BA0",
                marginBottom: 5}}>
                    <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <FieldLabel label="MedDRA Version for Medical History"></FieldLabel>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField variant="outlined"
                                className={classes.textXshort}
                                onChange={handleChange('D_10_7_1_r_1a_MedDRAVersionMedicalHistory', index, true, 4)}
                                type='number'
                                onKeyDown={(evt) =>
                                    (evt.key === "-" || evt.key === "+" || evt.key === "e" || evt.key === ",") &&
                                    evt.preventDefault()
                                }
                                value = {item['D_10_7_1_r_1a_MedDRAVersionMedicalHistory'].value}/>
                        </Grid>

                        <Grid item xs={3}>
                            <FieldLabel label=" Medical History (MedDRA code)"></FieldLabel>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField variant="outlined"
                                className={classes.textXshort}
                                onChange={handleChange('D_10_7_1_r_1b_MedicalHistoryMedDRACode', index, true, 8)}
                                type='number'
                                onKeyDown={(evt) =>
                                    (evt.key === "-" || evt.key === "+" || evt.key === "e" || evt.key === "," || evt.key === ".") &&
                                    evt.preventDefault()
                                }
                                value = {item['D_10_7_1_r_1b_MedicalHistoryMedDRACode'].value}/>
                        </Grid>

                        <Grid item xs={3}>
                            <FieldLabel label="Start Date"></FieldLabel>
                        </Grid>
                        <Grid item xs={9}>                        
                            <Stack direction="row" spacing={2} justifyContent="flex-start"> 
                                <Box className="text-small" style={{ padding: 0 }}>
                                    <FormControlLabel
                                    control={<Checkbox
                                                checked = {item['D_10_7_1_r_2_StartDate'].nullFlavor !== null}
                                                onChange={setUnknown('D_10_7_1_r_2_StartDate', index)}
                                                />}
                                            label="No Info"/>
                                </Box>
                                {parentData[index]['D_10_7_1_r_2_StartDate']['nullFlavor'] === null ? 
                                        <TextField
                                            className={classes.textShort}
                                            variant="outlined"
                                            value = {item['D_10_7_1_r_2_StartDate'].value}
                                            onChange={handleChange('D_10_7_1_r_2_StartDate', index)}
                                        />
                                        : <FormControl className={classes.textXshort}>
                                            <InputLabel>Null Flavor</InputLabel>
                                            <Select
                                                defaultValue = {0}
                                                value = {item['D_10_7_1_r_2_StartDate'].nullFlavor}
                                                onChange={setNullFlavor('D_10_7_1_r_2_StartDate', index)}
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
                                                checked = {item['D_10_7_1_r_4_EndDate'].nullFlavor !== null}
                                                onChange={setUnknown('D_10_7_1_r_4_EndDate', index)}
                                                />}
                                            label="No Info"/>
                                </Box>
                                {parentData[index]['D_10_7_1_r_4_EndDate']['nullFlavor'] === null ? 
                                        <TextField
                                            className={classes.textShort}
                                            variant="outlined"
                                            value = {item['D_10_7_1_r_4_EndDate'].value}
                                            onChange={handleChange('D_10_7_1_r_4_EndDate', index)}
                                        />
                                        : <FormControl className={classes.textXshort}>
                                            <InputLabel>Null Flavor</InputLabel>
                                            <Select
                                                defaultValue = {0}
                                                value = {item['D_10_7_1_r_4_EndDate'].nullFlavor}
                                                onChange={setNullFlavor('D_10_7_1_r_4_EndDate', index)}
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
                            <FieldLabel label="Continuing"></FieldLabel>
                        </Grid>
                        <Grid item xs={9}>
                            <Stack direction="row" spacing={2} justifyContent="flex-start"> 
                                <Box className="text-small" style={{ padding: 0 }}>
                                    <FormControlLabel
                                    control={<Checkbox
                                                checked = {item['D_10_7_1_r_3_Continuing'].nullFlavor !== null}
                                                onChange={setUnknown('D_10_7_1_r_3_Continuing', index)}
                                                />}
                                            label="No Info"/>
                                </Box>
                                    {parentData[index]['D_10_7_1_r_3_Continuing']['nullFlavor'] === null ? 
                                        <Select 
                                            className={classes.textXshort}
                                            value = {item['D_10_7_1_r_3_Continuing'].value}
                                            defaultValue = {0}>
                                            <MenuItem value={1}>Yes</MenuItem>
                                            <MenuItem value={0}>No</MenuItem>
                                        </Select>
                                        : <FormControl className={classes.textXshort}>
                                            <InputLabel>Null Flavor</InputLabel>
                                            <Select
                                                defaultValue = {0}
                                                value = {item['D_10_7_1_r_3_Continuing'].nullFlavor}
                                                onChange={setNullFlavor('D_10_7_1_r_3_Continuing', index)}
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
                            <FieldLabel label="Comments"></FieldLabel>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField variant="outlined"
                                className={classes.textLong}
                                onChange={handleChange('D_10_7_1_r_5_Comments', index)}
                                value = {item['D_10_7_1_r_5_Comments'].value}
                                multiline
                                inputProps={{ maxLength: 2000}}
                                rows={10}/>
                        </Grid>
                    </Grid>

                        {index === parentData.length - 1 ?
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
        let parentDataCopy = JSON.parse(JSON.stringify(parentData));
        let parentDataNew = new ParentData();
        parentDataCopy.push(parentDataNew);
        dispatch(setParentData(parentDataCopy));
    }

    const removeForm = (index) => {
        let parentDataCopy = JSON.parse(JSON.stringify(parentData));
        parentDataCopy.splice(index, 1);
        dispatch(setParentData(parentDataCopy));
    }

    return(
        <div>
            {formList()}
        </div>
    )
}