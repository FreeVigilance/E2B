
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Stack, FormControlLabel, Card, CardContent, IconButton, Box, Select, MenuItem, FormControl, InputLabel, InputAdornment, OutlinedInput} from '@mui/material';
import { resultsSelector, setResultsData } from '@src/features/results/slice';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { Result } from '@src/features/results/result';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export const Results = () => {
	const dispatch = useDispatch();
    const {resultsData} = useSelector(resultsSelector);

    useEffect(() => {
        console.log("STATE");
        console.log(resultsData);
    });

    const handleChange = (fieldName, index) => (event) => {
        console.log(event);
        let resultsDataCopy = JSON.parse(JSON.stringify(resultsData));
        if (event.target === undefined) {
            resultsDataCopy[index][fieldName].value = event.d;
        } else {
            if (fieldName === 'F_r_7_MoreInformationAvailable') {
                resultsDataCopy[index][fieldName].value = event.target.checked;
            } else {
                resultsDataCopy[index][fieldName].value = event.target.value;
            }
        }
        dispatch(setResultsData(resultsDataCopy));
    };

    const setNullFlavor = (fieldName, index) => (event) => {
        let resultsDataCopy = JSON.parse(JSON.stringify(resultsData));
        resultsDataCopy[index][fieldName].nullFlavor = event.target.value;
        dispatch(setResultsData(resultsDataCopy));
    };

    const setUnknown = (fieldName, index) => (event) => {
        let resultsDataCopy = JSON.parse(JSON.stringify(resultsData));
        if (event.target.checked) {
            resultsDataCopy[index][fieldName].nullFlavor = -1;
        } else {
            resultsDataCopy[index][fieldName].nullFlavor = null;
        }
        dispatch(setResultsData(resultsDataCopy));
    };

    const formList = () => {
        let list = [];
        if (resultsData.length === 0) {
            return ( <span>
                <IconButton size='large' style= {{ top: '10px'}}
                sx={{ color: "white", backgroundColor: "#1976d2"}}
                            onClick={addForm}><AddIcon/></IconButton>
            </span>);
        }
        Object.values(resultsData).forEach((item, index) => {
            list.push(
                <Card sx={{border: "3px solid #094B8C",
                padding: "10px",
                boxShadow: "5px 5px #356BA0",
                marginBottom: 5}}>
                    <CardContent>
                        <Stack direction="column" spacing={2} justifyContent="flex-start">
                            <Stack direction="row" spacing={2} justifyContent="flex-start">   
                                <Box className="text-small" style={{ padding: 0 }}>
                                    <FormControlLabel
                                    control={<Checkbox
                                        checked = {item['F_r_1_TestDate'].nullFlavor !== null}
                                        onChange={setUnknown('F_r_1_TestDate', index)}
                                        sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                        style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                                        />}
                                    label="No Date Info"/>
                                </Box>
                                {resultsData[index]['F_r_1_TestDate']['nullFlavor'] === null ? 
                                    <TextField sx={{ width: '25%' }}
                                        label="Test Date"
                                        variant="outlined"
                                        value = {item['F_r_1_TestDate'].value}
                                        onChange={handleChange('F_r_1_TestDate', index)}
                                        />
                                    : null}
                            </Stack>

                            <Stack direction="row" spacing={2} justifyContent="flex-start">                              

                                <TextField label="Test Name" variant="outlined"
                                onChange={handleChange('F_r_2_1_TestName', index)}
                                inputProps={{ maxLength: 250 }}
                                value = {item['F_r_2_1_TestName'].value}/>

                                <TextField label="MedDRA Version for Test Name" variant="outlined"
                                onChange={handleChange('F_r_2_2a_MedDRAVersionTestName', index)}
                                value = {item['F_r_2_2a_MedDRAVersionTestName'].value}
                                inputProps={{ maxLength: 4}}
                                type='number'
                                onKeyDown={(evt) =>
                                    (evt.key === "-" || evt.key === "+" || evt.key === "e" || evt.key === ",") &&
                                    evt.preventDefault()
                                }/>

                                <TextField label="Test Name (MedDRA code)" variant="outlined"
                                onChange={handleChange('F_r_2_2b_TestNameMedDRACode', index)}
                                value = {item['F_r_2_2b_TestNameMedDRACode'].value}
                                inputProps={{ maxLength: 8}}
                                type='number'
                                onKeyDown={(evt) =>
                                    (evt.key === "-" || evt.key === "+" || evt.key === "e" || evt.key === "," || evt.key === ".") &&
                                    evt.preventDefault()
                                }/>

                                <FormControl sx={{ width: '15%' }}>
                                <InputLabel>Test Result Code</InputLabel>
                                <Select
                                    label="Test Result Code"
                                    defaultValue={0}
                                    onChange={handleChange('F_r_3_1_TestResultCode', index)}
                                    value = {item['F_r_3_1_TestResultCode'].value}
                                    >
                                    <MenuItem value={1}>1 = Positive</MenuItem>
                                    <MenuItem value={2}>2 = Negative</MenuItem>
                                    <MenuItem value={3}>3 = Borderline</MenuItem>
                                    <MenuItem value={4}>4 = Inconclusive</MenuItem>
                                    <MenuItem value={0}>0 = unknown</MenuItem>
                                </Select>
                                </FormControl>
                            </Stack>

                            <Stack direction="row" spacing={2} justifyContent="flex-start">

                                <Box className="text-small" style={{ padding: 0 }}>
                                    <FormControlLabel
                                    control={<Checkbox
                                        checked = {item['F_r_3_2_TestResultValQual'].nullFlavor !== null}
                                        onChange={setUnknown('F_r_3_2_TestResultValQual', index)}
                                        sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                        style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                                        />}
                                    label="No Info"/>
                                </Box>
                                {resultsData[index]['F_r_3_2_TestResultValQual']['nullFlavor'] === null ? 
                                    <TextField label="Test Result (value/qualifier)" variant="outlined"
                                        onChange={handleChange('F_r_3_2_TestResultValQual', index)}
                                        value = {item['F_r_3_2_TestResultValQual'].value}
                                        inputProps={{ maxLength: 50}}
                                        type='number'
                                        onKeyDown={(evt) =>
                                            (evt.key === "-" || evt.key === "+" || evt.key === "e" || evt.key === "," || evt.key === ".") &&
                                            evt.preventDefault()
                                        }/>
                                : 
                                    <FormControl sx={{ width: '15%' }}>
                                    <InputLabel>Null Flavor</InputLabel>
                                    <Select
                                        value = {item['F_r_3_2_TestResultValQual'].nullFlavor}
                                        onChange={setNullFlavor('F_r_3_2_TestResultValQual', index)}
                                    >
                                        <MenuItem value={4}>Negative Infinity</MenuItem>
                                        <MenuItem value={5}>Positive Infinity</MenuItem>
                                    </Select>
                                    </FormControl>
                                }

                            </Stack>

                            <Stack direction="row" spacing={2} justifyContent="flex-start">

                                <TextField label="Test Result (unit)" variant="outlined"
                                onChange={handleChange('F_r_3_3_TestResultUnit', index)}
                                value = {item['F_r_3_3_TestResultUnit'].value}
                                inputProps={{ maxLength: 50}}/>

                                <TextField label="Normal Low Value" variant="outlined"
                                onChange={handleChange('F_r_4_NormalLowValue', index)}
                                value = {item['F_r_4_NormalLowValue'].value}
                                inputProps={{ maxLength: 50}}/>
                            
                                <TextField label="Normal High Value" variant="outlined"
                                onChange={handleChange('F_r_5_NormalHighValue', index)}
                                value = {item['F_r_5_NormalHighValue'].value}
                                inputProps={{ maxLength: 50}}/>

                                <FormControlLabel 
                                    control={<Checkbox
                                        onChange={handleChange('F_r_7_MoreInformationAvailable', index)}
                                        checked = {item['F_r_7_MoreInformationAvailable'].value}/>}
                                    label="More Information Available"/>
                            </Stack>

                            <TextField label="Result Unstructured Data" variant="outlined"
                                value = {item['F_r_3_4_ResultUnstructuredData'].value}
                                onChange={handleChange('F_r_3_4_ResultUnstructuredData', index)}
                                multiline
                                inputProps={{ maxLength: 2000}}
                                rows={5}/>

                            <TextField label="Comments" variant="outlined"
                                value = {item['F_r_6_Comments'].value}
                                onChange={handleChange('F_r_6_Comments', index)}
                                multiline
                                inputProps={{ maxLength: 2000}}
                                rows={5}/>
                        </Stack>
                        <span>
                            <IconButton size='large' style= {{ top: '10px', right: '10px'}}
                            sx={{ color: "white", backgroundColor: "#1976d2"}}
                                    onClick={() => removeForm(index)}><DeleteIcon/>
                            </IconButton>
                        </span>
                        {index === resultsData.length - 1 ?
                            <span>
                                <IconButton size='large' style= {{ top: '10px'}}
                                sx={{ color: "white", backgroundColor: "#1976d2"}}
                                            onClick={addForm}><AddIcon/></IconButton>
                            </span> : null}
                        </CardContent>
                </Card>
            );
        });
        return list;
    };

    const addForm = () => {
        let resultsDataCopy = JSON.parse(JSON.stringify(resultsData));
        let reasultNew = new Result();
        resultsDataCopy.push(reasultNew);
        dispatch(setResultsData(resultsDataCopy));
    }

    const removeForm = (index) => {
        let resultsDataCopy = JSON.parse(JSON.stringify(resultsData));
        resultsDataCopy.splice(index, 1);
        dispatch(setResultsData(resultsDataCopy));
    }

    return (
        <div >
            {formList()}
        </div>
	);

}