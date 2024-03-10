import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Stack, FormControlLabel, Box, Select, MenuItem, FormControl, InputLabel, Grid, Divider, FormLabel, Card, CardContent, IconButton} from '@mui/material';
import { resultsSelector, setResults } from '@src/features/results/slice';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { patientSelector, setMedicalHistory, setPatientData } from '@src/features/patient/slice';
import AddIcon from '@mui/icons-material/Add';
import { MedHistory } from '@src/features/patient/patient';
import { drugsSelector, setDosages, setSubstances } from '@src/features/drugs/slice';
import { Dosage, Substance } from '@src/features/drugs/drugs';

export const Dosages = ({drugIndex}) => {
	const dispatch = useDispatch();
    const {dosages} = useSelector(drugsSelector);

    useEffect(() => {
        console.log("STATE");
        console.log(dosages);
    });

    const handleChange = (fieldName, index) => (event) => {
        let dosagesCopy = JSON.parse(JSON.stringify(dosages));
        dosagesCopy[drugIndex][index][fieldName].value = event.target.value;
        dispatch(setDosages(dosagesCopy));
    };

    const setNullFlavor = (fieldName, index) => (event) => {
        let dosagesCopy = JSON.parse(JSON.stringify(dosages));
        dosagesCopy[drugIndex][index][fieldName].nullFlavor = event.target.value;
        dispatch(setDosages(dosagesCopy));
    };

    const setUnknown = (fieldName, index) => (event) => {
        let dosagesCopy = JSON.parse(JSON.stringify(dosages));
        if (event.target.checked) {
            dosagesCopy[drugIndex][index][fieldName].nullFlavor = -1;
        } else {
            dosagesCopy[drugIndex][index][fieldName].nullFlavor = null;
        }
        dispatch(setDosages(dosagesCopy));
    };

    const formList = () => {
        let list = [];
        Object.values(dosages[drugIndex]).forEach((item, index) => {
            list.push(
                <Card sx={{border: "3px solid #094B8C",
                padding: "10px",
                boxShadow: "5px 5px #356BA0",
                marginBottom: 5}}>
                    <CardContent>
                    <Grid container direction="row" columnGap={2}>
                        <Grid container item xs direction="column" rowGap={1}>
                            <TextField label="Dose" variant="outlined"
                                    onChange={handleChange('G_k_4_r_1a_DoseNum', index)}
                                    value = {item['G_k_4_r_1a_DoseNum'].value}/> 

                            <TextField label="Dose (unit)" variant="outlined"
                                    onChange={handleChange('G_k_4_r_1b_DoseUnit', index)}
                                    value = {item['G_k_4_r_1b_DoseUnit'].value}/> 

                            <TextField label="Number of Units in the Interval" variant="outlined"
                                    onChange={handleChange('G_k_4_r_2_NumberUnitsInterval', index)}
                                    value = {item['G_k_4_r_2_NumberUnitsInterval'].value}/> 
   

                            <Stack direction="row" spacing={2} justifyContent="flex-start"> 
                                    <Box className="text-small" style={{ padding: 0 }}>
                                        <FormControlLabel
                                        control={<Checkbox
                                                    value = {item['G_k_4_r_4_DateTimeDrug'].nullFlavor === -1}
                                                    onChange={setUnknown('G_k_4_r_4_DateTimeDrug', index)}
                                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                                    style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                                                    />}
                                                label="No Info"/>
                                    </Box>
                                    {dosages[drugIndex][index]['G_k_4_r_4_DateTimeDrug']['nullFlavor'] !== -1 ? 
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DateTimePicker
                                                        value = {item['G_k_4_r_4_DateTimeDrug'].value}
                                                        renderInput={(props) => <TextField  {...props} />}
                                                        label="Date and Time of Start of Drug"
                                                        onChange={handleChange('G_k_4_r_4_DateTimeDrug', index)}
                                                        />
                                            </LocalizationProvider>
                                            : <FormControl sx={{ width: '70%' }}>
                                                <InputLabel>Null Flavor</InputLabel>
                                                <Select
                                                    defaultValue = {0}
                                                    value = {item['G_k_4_r_4_DateTimeDrug'].nullFlavor}
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
                                                    value = {item['G_k_4_r_5_DateTimeLastAdministration'].nullFlavor === -1}
                                                    onChange={setUnknown('G_k_4_r_5_DateTimeLastAdministration', index)}
                                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                                    style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                                                    />}
                                                label="No Info"/>
                                    </Box>
                                    {dosages[drugIndex][index]['G_k_4_r_5_DateTimeLastAdministration']['nullFlavor'] !== -1 ? 
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DateTimePicker
                                                        value = {item['G_k_4_r_5_DateTimeLastAdministration'].value}
                                                        renderInput={(props) => <TextField  {...props} />}
                                                        label="Date and Time of Last Administration"
                                                        onChange={handleChange('G_k_4_r_5_DateTimeLastAdministration', index)}
                                                        />
                                            </LocalizationProvider>
                                            : <FormControl sx={{ width: '70%' }}>
                                                <InputLabel>Null Flavor</InputLabel>
                                                <Select
                                                    defaultValue = {0}
                                                    value = {item['G_k_4_r_5_DateTimeLastAdministration'].nullFlavor}
                                                    onChange={setNullFlavor('G_k_4_r_5_DateTimeLastAdministration', index)}
                                                >
                                                    <MenuItem value={0}>Masked</MenuItem>
                                                    <MenuItem value={1}>Asked, but not known</MenuItem>
                                                    <MenuItem value={2}>Not asked</MenuItem>
                                                </Select>
                                                </FormControl>
                                    }
                            </Stack>
                        </Grid>
                        <Grid container item xs direction="column" rowGap={1}>
                            <TextField label="Duration of Drug Administration" variant="outlined"
                                    onChange={handleChange('G_k_4_r_6a_DurationDrugAdministrationNum', index)}
                                    value = {item['G_k_4_r_6a_DurationDrugAdministrationNum'].value}/>

                            <TextField label="Duration of Drug Administration (unit)" variant="outlined"
                                    onChange={handleChange('G_k_4_r_6b_DurationDrugAdministrationUnit', index)}
                                    value = {item['G_k_4_r_6b_DurationDrugAdministrationUnit'].value}/>

                            <Stack direction="row" spacing={2} justifyContent="flex-start"> 
                                    <Box className="text-small" style={{ padding: 0 }}>
                                        <FormControlLabel
                                        control={<Checkbox
                                                    value = {item['G_k_4_r_9_1_PharmaceuticalDoseForm'].nullFlavor === -1}
                                                    onChange={setUnknown('G_k_4_r_9_1_PharmaceuticalDoseForm', index)}
                                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                                    style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                                                    />}
                                                label="No Info"/>
                                    </Box>
                                    {dosages[drugIndex][index]['G_k_4_r_9_1_PharmaceuticalDoseForm']['nullFlavor'] !== -1 ? 
                                            <TextField label="Pharmaceutical Dose Form" variant="outlined"
                                                onChange={handleChange('G_k_4_r_9_1_PharmaceuticalDoseForm', index)}
                                                value = {item['G_k_4_r_9_1_PharmaceuticalDoseForm'].value}/> 
                                            : <FormControl sx={{ width: '70%' }}>
                                                <InputLabel>Null Flavor</InputLabel>
                                                <Select
                                                    defaultValue = {0}
                                                    value = {item['G_k_4_r_9_1_PharmaceuticalDoseForm'].nullFlavor}
                                                    onChange={setNullFlavor('G_k_4_r_9_1_PharmaceuticalDoseForm', index)}
                                                >
                                                    <MenuItem value={1}>Asked, but not known</MenuItem>
                                                    <MenuItem value={2}>Not asked</MenuItem>
                                                    <MenuItem value={3}>Unknown</MenuItem>
                                                </Select>
                                                </FormControl>
                                    }
                            </Stack>

                            <TextField label="Pharmaceutical Dose Form TermID Version Date/Number" variant="outlined"
                                    onChange={handleChange('G_k_4_r_9_2a_PharmaceuticalDoseFormTermIDVersion', index)}
                                    value = {item['G_k_4_r_9_2a_PharmaceuticalDoseFormTermIDVersion'].value}/> 
                            <TextField label="Pharmaceutical Dose Form TermID" variant="outlined"

                                    onChange={handleChange('G_k_4_r_9_2b_PharmaceuticalDoseFormTermID', index)}
                                    value = {item['G_k_4_r_9_2b_PharmaceuticalDoseFormTermID'].value}/> 
                        </Grid>
                        <Grid container item xs direction="column" rowGap={1}>

                            <Stack direction="row" spacing={2} justifyContent="flex-start"> 
                                    <Box className="text-small" style={{ padding: 0 }}>
                                        <FormControlLabel
                                        control={<Checkbox
                                                    value = {item['G_k_4_r_10_1_RouteAdministration'].nullFlavor === -1}
                                                    onChange={setUnknown('G_k_4_r_10_1_RouteAdministration', index)}
                                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                                    style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                                                    />}
                                                label="No Info"/>
                                    </Box>
                                    {dosages[drugIndex][index]['G_k_4_r_10_1_RouteAdministration']['nullFlavor'] !== -1 ? 
                                            <TextField label="Route of Administration" variant="outlined"
                                                onChange={handleChange('G_k_4_r_10_1_RouteAdministration', index)}
                                                value = {item['G_k_4_r_10_1_RouteAdministration'].value}/> 
                                            : <FormControl sx={{ width: '70%' }}>
                                                <InputLabel>Null Flavor</InputLabel>
                                                <Select
                                                    defaultValue = {0}
                                                    value = {item['G_k_4_r_10_1_RouteAdministration'].nullFlavor}
                                                    onChange={setNullFlavor('G_k_4_r_10_1_RouteAdministration', index)}
                                                >
                                                    <MenuItem value={1}>Asked, but not known</MenuItem>
                                                    <MenuItem value={2}>Not asked</MenuItem>
                                                    <MenuItem value={3}>Unknown</MenuItem>
                                                </Select>
                                                </FormControl>
                                    }
                            </Stack>

                            <TextField label="Route of Administration TermID Version Date / Number" variant="outlined"
                                    onChange={handleChange('G_k_4_r_10_2a_RouteAdministrationTermIDVersion', index)}
                                    value = {item['G_k_4_r_10_2a_RouteAdministrationTermIDVersion'].value}/> 

                            <TextField label="Route of Administration TermID" variant="outlined"
                                    onChange={handleChange('G_k_4_r_10_2b_RouteAdministrationTermID', index)}
                                    value = {item['G_k_4_r_10_2b_RouteAdministrationTermID'].value}/> 

                            <Stack direction="row" spacing={2} justifyContent="flex-start"> 
                                    <Box className="text-small" style={{ padding: 0 }}>
                                        <FormControlLabel
                                        control={<Checkbox
                                                    value = {item['G_k_4_r_11_1_ParentRouteAdministration'].nullFlavor === -1}
                                                    onChange={setUnknown('G_k_4_r_11_1_ParentRouteAdministration', index)}
                                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                                    style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                                                    />}
                                                label="No Info"/>
                                    </Box>
                                    {dosages[drugIndex][index]['G_k_4_r_11_1_ParentRouteAdministration']['nullFlavor'] !== -1 ? 
                                            <TextField label="Parent Route of Administration" variant="outlined"
                                                onChange={handleChange('G_k_4_r_11_1_ParentRouteAdministration', index)}
                                                value = {item['G_k_4_r_11_1_ParentRouteAdministration'].value}/> 
                                            : <FormControl sx={{ width: '70%' }}>
                                                <InputLabel>Null Flavor</InputLabel>
                                                <Select
                                                    defaultValue = {0}
                                                    value = {item['G_k_4_r_11_1_ParentRouteAdministration'].nullFlavor}
                                                    onChange={setNullFlavor('G_k_4_r_11_1_ParentRouteAdministration', index)}
                                                >
                                                    <MenuItem value={1}>Asked, but not known</MenuItem>
                                                    <MenuItem value={2}>Not asked</MenuItem>
                                                    <MenuItem value={3}>Unknown</MenuItem>
                                                </Select>
                                                </FormControl>
                                    }
                            </Stack>

                            <TextField label="Parent Route of Administration TermID Version Date / Number" variant="outlined"
                                    onChange={handleChange('G_k_4_r_11_2a_ParentRouteAdministrationTermIDVersion', index)}
                                    value = {item['G_k_4_r_11_2a_ParentRouteAdministrationTermIDVersion'].value}/> 

                            <TextField label="Parent Route of Administration TermID" variant="outlined"
                                    onChange={handleChange('G_k_4_r_11_2b_ParentRouteAdministrationTermID', index)}
                                    value = {item['G_k_4_r_11_2b_ParentRouteAdministrationTermID'].value}/> 

                        </Grid>
                        <Grid container item xs direction="column" rowGap={1}> 
                            <TextField label="Batch / Lot Number" variant="outlined"
                                    onChange={handleChange('G_k_4_r_7_BatchLotNumber', index)}
                                    value = {item['G_k_4_r_7_BatchLotNumber'].value}/>                         
                            
                            <TextField label="Dosage Text" variant="outlined"
                                    onChange={handleChange('G_k_4_r_8_DosageText', index)}
                                    value = {item['G_k_4_r_8_DosageText'].value}
                                    multiline
                                    rows={5}/> 

                            <TextField label="Definition of the Time Interval Unit" variant="outlined"
                                    onChange={handleChange('G_k_4_r_3_DefinitionIntervalUnit', index)}
                                    value = {item['G_k_4_r_3_DefinitionIntervalUnit'].value}
                                    multiline
                                    rows={3}/> 
                        </Grid>   
                    </Grid>
                    {index === dosages[drugIndex].length - 1 ?
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
        let dosagesCopy = JSON.parse(JSON.stringify(dosages));
        let dosageNew = new Dosage();
        dosagesCopy[drugIndex].push(dosageNew);
        dispatch(setDosages(dosagesCopy));
    }

    return(
        <div>
            {formList()}
        </div>
    )
}