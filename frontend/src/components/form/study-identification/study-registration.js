
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Stack, FormControlLabel, Box, Select, MenuItem, FormControl, InputLabel, Card, CardContent, IconButton} from '@mui/material';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import AddIcon from '@mui/icons-material/Add';
import { setStudyRegistration, studyIdentificationSelector } from '@src/features/study-identification/slice';
import { StudyRegistration } from '@src/features/study-identification/study-identification';
import DeleteIcon from '@mui/icons-material/Delete';


export const StudyRegistrationComp = () => {
	const dispatch = useDispatch();
    const {studyRegistration} = useSelector(studyIdentificationSelector);

    useEffect(() => {
        console.log("STATE");
        console.log(studyRegistration);
    });

    const handleChange = (fieldName, index) => (event) => {
        let studyRegistrationCopy = JSON.parse(JSON.stringify(studyRegistration));
        studyRegistrationCopy[index][fieldName].value = event.target.value;
        dispatch(setStudyRegistration(studyRegistrationCopy));
    };

    const setNullFlavor = (fieldName, index) => (event) => {
        let studyRegistrationCopy = JSON.parse(JSON.stringify(studyRegistration));
        studyRegistrationCopy[index][fieldName].nullFlavor = event.target.value;
        dispatch(setStudyRegistration(studyRegistrationCopy));
    };

    const setUnknown = (fieldName, index) => (event) => {
        let studyRegistrationCopy = JSON.parse(JSON.stringify(studyRegistration));
        if (event.target.checked) {
            studyRegistrationCopy[index][fieldName].nullFlavor = -1;
        } else {
            studyRegistrationCopy[index][fieldName].nullFlavor = null;
        }
        dispatch(setStudyRegistration(studyRegistrationCopy));
    };

    const formList = () => {
        let list = [];
        if (studyRegistration.length === 0) {
            return ( <span>
                <IconButton size='large' style= {{ top: '10px'}}
                sx={{ color: "white", backgroundColor: "#1976d2"}}
                            onClick={addForm}><AddIcon/></IconButton>
            </span>);
        }
        Object.values(studyRegistration).forEach((item, index) => {
            list.push(
                <Card sx={{border: "3px solid #094B8C",
                padding: "10px",
                boxShadow: "5px 5px #356BA0",
                marginBottom: 5}}>
                    <CardContent>
                        <Stack direction="column" spacing={2} justifyContent="flex-start">
                            <Stack direction="row" spacing={2} justifyContent="flex-start">   
                                <Box className="text-small" style={{ padding: 0 }} sx={{ width: '100%' }}>
                                    <FormControlLabel
                                        control={<Checkbox
                                        checked = {item['C_5_1_r_1_StudyRegistrationNumber'].nullFlavor !== null}
                                        onChange={setUnknown('C_5_1_r_1_StudyRegistrationNumber', index)}
                                        sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                        style={{padding: 1, marginLeft: 5, marginTop: 2 }}/>}
                                        label="No Info"/>
                                            {item['C_5_1_r_1_StudyRegistrationNumber']['nullFlavor'] === null ? 
                                                <TextField label="Study Registration Number" variant="outlined"
                                                    sx={{ width: '80%' }}
                                                    inputProps={{ maxLength: 50}}
                                                    onChange={handleChange('C_5_1_r_1_StudyRegistrationNumber', index)}
                                                    value = {item['C_5_1_r_1_StudyRegistrationNumber'].value}/>
                                        :   <FormControl sx={{ width: '20%' }}>
                                                <InputLabel>Null Flavor</InputLabel>
                                                <Select
                                                    defaultValue = {0}
                                                    value = {item['C_5_1_r_1_StudyRegistrationNumber'].nullFlavor}
                                                    onChange={setNullFlavor('C_5_1_r_1_StudyRegistrationNumber', index)}
                                                >
                                                    <MenuItem value={1}>Asked, but not known</MenuItem>
                                                    <MenuItem value={2}>Not asked</MenuItem>
                                                </Select>
                                    </FormControl>}
                                </Box>
                            </Stack>

                            <Stack direction="row" spacing={2} justifyContent="flex-start">   
                                <Box className="text-small" style={{ padding: 0 }} sx={{ width: '100%' }}>
                                    <FormControlLabel
                                        control={<Checkbox
                                        checked = {item['C_5_1_r_2_StudyRegistrationCountry'].nullFlavor !== null}
                                        onChange={setUnknown('C_5_1_r_2_StudyRegistrationCountry', index)}
                                        sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                        style={{padding: 1, marginLeft: 5, marginTop: 2 }}/>}
                                        label="No Info"/>
                                            {item['C_5_1_r_2_StudyRegistrationCountry']['nullFlavor'] === null ? 
                                                <TextField label="Study Registration Country" variant="outlined"
                                                    sx={{ width: '80%' }}
                                                    inputProps={{ maxLength: 2}}
                                                    onChange={handleChange('C_5_1_r_2_StudyRegistrationCountry', index)}
                                                    value = {item['C_5_1_r_2_StudyRegistrationCountry'].value}/>
                                        :   <FormControl sx={{ width: '20%' }}>
                                                <InputLabel>Null Flavor</InputLabel>
                                                <Select
                                                    defaultValue = {0}
                                                    value = {item['C_5_1_r_2_StudyRegistrationCountry'].nullFlavor}
                                                    onChange={setNullFlavor('C_5_1_r_2_StudyRegistrationCountry', index)}
                                                >
                                                    <MenuItem value={1}>Asked, but not known</MenuItem>
                                                    <MenuItem value={2}>Not asked</MenuItem>
                                                </Select>
                                    </FormControl>}
                                </Box>
                            </Stack>
                        <Stack direction="row" justifyContent="flex-start">
                            <span>
                                <IconButton size='large' style= {{ top: '10px', right: '10px'}}
                                sx={{ color: "white", backgroundColor: "#1976d2"}}
                                        onClick={() => removeForm(index)}><DeleteIcon/>
                                </IconButton>
                            </span>
                            {index === studyRegistration.length - 1 ?
                                <span>
                                    <IconButton size='large' style= {{ top: '10px'}}
                                    sx={{ color: "white", backgroundColor: "#1976d2"}}
                                                onClick={addForm}><AddIcon/></IconButton>
                                </span> : null}
                            </Stack>
                        </Stack>
                </CardContent>
            </Card>
            );
        });
        return list;
    }

    const addForm = () => {
        let studyRegistrationCopy = JSON.parse(JSON.stringify(studyRegistration));
        let studyRegistrationNew = new StudyRegistration();
        studyRegistrationCopy.push(studyRegistrationNew);
        dispatch(setStudyRegistration(studyRegistrationCopy));
    }

    const removeForm = (index) => {
        let studyRegistrationCopy = JSON.parse(JSON.stringify(studyRegistration));
        studyRegistrationCopy.splice(index, 1);
        dispatch(setStudyRegistration(studyRegistrationCopy));
    }

    return(
        <div>
            {formList()}
        </div>
    )
}