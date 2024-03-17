
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Stack, FormControlLabel, Box, Select, MenuItem, FormControl, InputLabel, Grid, Divider, FormLabel, Card, CardContent, IconButton} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { patientSelector, setParentData } from '@src/features/patient/slice';
import AddIcon from '@mui/icons-material/Add';
import { ParentData } from '@src/features/patient/patient';
import DeleteIcon from '@mui/icons-material/Delete';


export const ParentInfo = () => {
	const dispatch = useDispatch();
    const {parentData} = useSelector(patientSelector);

    useEffect(() => {
        console.log("STATE");
        console.log(parentData);
    });

    const handleChange = (fieldName, index) => (event) => {
        let parentDataCopy = JSON.parse(JSON.stringify(parentData));
        parentDataCopy[index][fieldName].value = event.target.value;
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
                    <Stack direction="column" spacing={2} justifyContent="flex-start">
                            <TextField label="MedDRA Version for Medical History" variant="outlined"
                                                onChange={handleChange('D_10_7_1_r_1a_MedDRAVersionMedicalHistory', index)}
                                                value = {item['D_10_7_1_r_1a_MedDRAVersionMedicalHistory'].value}/>
                            <TextField label=" Medical History (disease / surgical procedure / etc.) (MedDRA code)" variant="outlined"
                                                onChange={handleChange('D_10_7_1_r_1b_MedicalHistoryMedDRACode', index)}
                                                value = {item['D_10_7_1_r_1b_MedicalHistoryMedDRACode'].value}/>                        
                                <Stack direction="row" spacing={2} justifyContent="flex-start"> 
                                    <Box className="text-small" style={{ padding: 0 }}>
                                        <FormControlLabel
                                        control={<Checkbox
                                                    checked = {item['D_10_7_1_r_2_StartDate'].nullFlavor !== null}
                                                    onChange={setUnknown('D_10_7_1_r_2_StartDate', index)}
                                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                                    style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                                                    />}
                                                label="No Info"/>
                                    </Box>
                                    {parentData[index]['D_10_7_1_r_2_StartDate']['nullFlavor'] === null ? 
                                            <TextField
                                            label="Start Date"
                                            variant="outlined"
                                            value = {item['D_10_7_1_r_2_StartDate'].value}
                                            onChange={handleChange('D_10_7_1_r_2_StartDate', index)}
                                            />
                                            : <FormControl sx={{ width: '70%' }}>
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

                                <Stack direction="row" spacing={2} justifyContent="flex-start"> 
                                    <Box className="text-small" style={{ padding: 0 }}>
                                        <FormControlLabel
                                        control={<Checkbox
                                                    checked = {item['D_10_7_1_r_4_EndDate'].nullFlavor !== null}
                                                    onChange={setUnknown('D_10_7_1_r_4_EndDate', index)}
                                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                                    style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                                                    />}
                                                label="No Info"/>
                                    </Box>
                                    {parentData[index]['D_10_7_1_r_4_EndDate']['nullFlavor'] === null ? 
                                            <TextField
                                            label="End Date"
                                            variant="outlined"
                                            value = {item['D_10_7_1_r_4_EndDate'].value}
                                            onChange={handleChange('D_10_7_1_r_4_EndDate', index)}
                                            />
                                            : <FormControl sx={{ width: '70%' }}>
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

                                <Stack direction="row" spacing={2} justifyContent="flex-start"> 
                                    <Box className="text-small" style={{ padding: 0 }}>
                                        <FormControlLabel
                                        control={<Checkbox
                                                    checked = {item['D_10_7_1_r_3_Continuing'].nullFlavor !== null}
                                                    onChange={setUnknown('D_10_7_1_r_3_Continuing', index)}
                                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                                    style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                                                    />}
                                                label="No Info"/>
                                    </Box>
                                        {parentData[index]['D_10_7_1_r_3_Continuing']['nullFlavor'] === null ? 
                                            <FormControl sx={{ width: '70%' }}>
                                                <InputLabel >Continuing</InputLabel>
                                                <Select 
                                                    value = {item['D_10_7_1_r_3_Continuing'].value}
                                                    label="Continuing"
                                                    defaultValue = {0}
                                                    onChange={handleChange('D_10_7_1_r_3_Continuing', index)}
                                                >
                                                    <MenuItem value={1}>Yes</MenuItem>
                                                    <MenuItem value={0}>No</MenuItem>
                                                </Select>
                                            </FormControl>
                                            : <FormControl sx={{ width: '70%' }}>
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

                        <TextField label="Comments" variant="outlined"
                                            sx={{ width: '100%', marginTop: 2 }}
                                            onChange={handleChange('D_10_7_1_r_5_Comments', index)}
                                            value = {item['D_10_7_1_r_5_Comments'].value}
                                            multiline
                                            rows={3}/>
                    </Stack>
                                 <span>
                                        <IconButton size='large' style= {{ top: '10px', right: '10px'}}
                                        sx={{ color: "white", backgroundColor: "#1976d2"}}
                                                onClick={() => removeForm(index)}><DeleteIcon/>
                                        </IconButton>
                                    </span>  
                            {index === parentData.length - 1 ?
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