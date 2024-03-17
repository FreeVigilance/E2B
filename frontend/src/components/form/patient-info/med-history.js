
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

export const MedicalHistory = () => {
	const dispatch = useDispatch();
    const {medicalHistory} = useSelector(patientSelector);

    useEffect(() => {
        console.log("STATE");
        console.log(medicalHistory);
    });

    const handleChange = (fieldName, index) => (event) => {
        let medicalHistoryCopy = JSON.parse(JSON.stringify(medicalHistory));
        medicalHistoryCopy[index][fieldName].value = event.target.value;
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
                    <Grid container direction="row" columnGap={4}>
                        <Grid container item xs direction="column" rowGap={1}>
                                <TextField label="MedDRA Version for Medical History" variant="outlined"
                                    onChange={handleChange('D_7_1_r_1a_MedDRAVersionMedicalHistory', index)}
                                    value = {item['D_7_1_r_1a_MedDRAVersionMedicalHistory'].value}/>
                                <TextField label="Medical History code" variant="outlined"
                                    onChange={handleChange('D_7_1_r_1a_MedDRAVersionMedicalHistory', index)}
                                    value = {item['D_7_1_r_1b_MedicalHistoryMedDRACode'].value}/>
                                <Box className="text-small" style={{ padding: 0 }}>
                                        <FormControlLabel
                                        control={<Checkbox
                                            checked = {item['D_7_1_r_6_FamilyHistory'].nullFlavor !== null}
                                            onChange={setUnknown('D_7_1_r_6_FamilyHistory', index)}
                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                            style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                                            />}
                                        label="Family History"/>
                                </Box>
                        </Grid>

                        <Grid container item xs direction="column" rowGap={1}>
                                <Stack direction="row" spacing={2} justifyContent="flex-start"> 
                                    <Box className="text-small" style={{ padding: 0 }}>
                                        <FormControlLabel
                                        control={<Checkbox
                                                    checked = {item['D_7_1_r_2_StartDate'].nullFlavor !== null}
                                                    onChange={setUnknown('D_7_1_r_2_StartDate', index)}
                                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                                    style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                                                    />}
                                                label="No Info"/>
                                    </Box>
                                    {medicalHistory[index]['D_7_1_r_2_StartDate']['nullFlavor'] === null ? 
                                            <TextField
                                            label="Start Date"
                                            variant="outlined"
                                            value = {item['D_7_1_r_2_StartDate'].value}
                                            onChange={handleChange('D_7_1_r_2_StartDate', index)}
                                            />
                                            : <FormControl sx={{ width: '70%' }}>
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

                                <Stack direction="row" spacing={2} justifyContent="flex-start"> 
                                    <Box className="text-small" style={{ padding: 0 }}>
                                        <FormControlLabel
                                        control={<Checkbox
                                                    checked = {item['D_7_1_r_4_EndDate'].nullFlavor !== null}
                                                    onChange={setUnknown('D_7_1_r_4_EndDate', index)}
                                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                                    style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                                                    />}
                                                label="No Info"/>
                                    </Box>
                                    {medicalHistory[index]['D_7_1_r_4_EndDate']['nullFlavor'] === null ? 
                                            <TextField
                                            label="End Date"
                                            variant="outlined"
                                            value = {item['D_7_1_r_4_EndDate'].value}
                                            onChange={handleChange('D_7_1_r_4_EndDate', index)}
                                            />
                                            : <FormControl sx={{ width: '70%' }}>
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

                                <Stack direction="row" spacing={2} justifyContent="flex-start"> 
                                    <Box className="text-small" style={{ padding: 0 }}>
                                        <FormControlLabel
                                        control={<Checkbox
                                                    checked = {item['D_7_1_r_3_Continuing'].nullFlavor !== null}
                                                    onChange={setUnknown('D_7_1_r_3_Continuing', index)}
                                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                                    style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                                                    />}
                                                label="No Info"/>
                                    </Box>
                                    {medicalHistory[index]['D_7_1_r_3_Continuing']['nullFlavor'] === null ? 
                                            <FormControl sx={{ width: '70%' }}>
                                                <InputLabel >Continuing</InputLabel>
                                                <Select 
                                                    value = {item['D_7_1_r_3_Continuing'].value}
                                                    label="Continuing"
                                                    defaultValue = {0}
                                                    onChange={handleChange('D_7_1_r_3_Continuing', index)}
                                                >
                                                    <MenuItem value={1}>Yes</MenuItem>
                                                    <MenuItem value={0}>No</MenuItem>
                                                </Select>
                                            </FormControl>
                                            : <FormControl sx={{ width: '70%' }}>
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
                        </Grid>
                            <TextField label="Comments" variant="outlined"
                                            sx={{ width: '100%', marginTop: 2 }}
                                            onChange={handleChange('D_7_1_r_5_Comments', index)}
                                            value = {item['D_7_1_r_5_Comments'].value}
                                            multiline
                                            rows={3}/>
                            <span>
                                <IconButton size='large' style= {{ top: '10px', right: '10px'}}
                                sx={{ color: "white", backgroundColor: "#1976d2"}}
                                        onClick={() => removeForm(index)}><DeleteIcon/>
                                </IconButton>
                            </span>
                            {index === medicalHistory.length - 1 ?
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