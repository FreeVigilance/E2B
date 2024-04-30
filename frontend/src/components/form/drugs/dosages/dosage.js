import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Stack, FormControlLabel, Box, Select, MenuItem, FormControl, InputLabel, Grid, Divider, FormLabel, Card, CardContent, IconButton } from '@mui/material';
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
import DeleteIcon from '@mui/icons-material/Delete';

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
        if (dosages[drugIndex].length === 0) {
            return (
                <span>
                    <IconButton size="large" style={{top: '10px'}}
                                sx={{color: "white", backgroundColor: "#1976d2"}}
                                onClick={addForm}><AddIcon/></IconButton>
                </span>
            );
        }
        Object.values(dosages[drugIndex]).forEach((item, index) => {
            list.push(
                <Card sx={{
                    border: "3px solid #094B8C",
                    padding: "10px",
                    boxShadow: "5px 5px #356BA0",
                    marginBottom: 5,
                }}>
                    <CardContent>
                        <Grid container direction="row" columnGap={2}>
                            <Grid container item xs direction="column" rowGap={1}>
                                <TextField label="Dose" variant="outlined"
                                           onChange={handleChange('G_k_4_r_1a_DoseNum', index)}
                                           inputProps={{maxLength: 8}}
                                           type="number"
                                           onKeyDown={(evt) =>
                                               (evt.key === "-" || evt.key === "+" || evt.key === "e" || evt.key === "," || evt.key === ".") &&
                                               evt.preventDefault()
                                           }
                                           value={item['G_k_4_r_1a_DoseNum'].value}/>

                                <TextField label="Dose (unit)" variant="outlined"
                                           onChange={handleChange('G_k_4_r_1b_DoseUnit', index)}
                                           inputProps={{maxLength: 50}}
                                           value={item['G_k_4_r_1b_DoseUnit'].value}/>

                                <TextField label="Number of Units in the Interval" variant="outlined"
                                           onChange={handleChange('G_k_4_r_2_NumberUnitsInterval', index)}
                                           inputProps={{maxLength: 4}}
                                           type="number"
                                           onKeyDown={(evt) =>
                                               (evt.key === "-" || evt.key === "+" || evt.key === "e" || evt.key === "," || evt.key === ".") &&
                                               evt.preventDefault()
                                           }
                                           value={item['G_k_4_r_2_NumberUnitsInterval'].value}/>


                                <Stack direction="row" spacing={2} justifyContent="flex-start">
                                    <Box className="text-small" style={{padding: 0}}>
                                        <FormControlLabel
                                            control={<Checkbox
                                                value={item['G_k_4_r_4_DateTimeDrug'].nullFlavor === -1}
                                                onChange={setUnknown('G_k_4_r_4_DateTimeDrug', index)}
                                                sx={{'& .MuiSvgIcon-root': {fontSize: 20}}}
                                                style={{padding: 1, marginLeft: 5, marginTop: 2}}
                                            />}
                                            label="No Info"/>
                                    </Box>
                                    {dosages[drugIndex][index]['G_k_4_r_4_DateTimeDrug']['nullFlavor'] !== -1 ?
                                        <TextField
                                            label="Date and Time of Start of Drug"
                                            variant="outlined"
                                            value={item['G_k_4_r_4_DateTimeDrug'].value}
                                            onChange={handleChange('G_k_4_r_4_DateTimeDrug', index)}
                                        />
                                        : <FormControl sx={{width: '70%'}}>
                                            <InputLabel>Null Flavor</InputLabel>
                                            <Select
                                                defaultValue={0}
                                                value={item['G_k_4_r_4_DateTimeDrug'].nullFlavor}
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
                                    <Box className="text-small" style={{padding: 0}}>
                                        <FormControlLabel
                                            control={<Checkbox
                                                value={item['G_k_4_r_5_DateTimeLastAdministration'].nullFlavor === -1}
                                                onChange={setUnknown('G_k_4_r_5_DateTimeLastAdministration', index)}
                                                sx={{'& .MuiSvgIcon-root': {fontSize: 20}}}
                                                style={{padding: 1, marginLeft: 5, marginTop: 2}}
                                            />}
                                            label="No Info"/>
                                    </Box>
                                    {dosages[drugIndex][index]['G_k_4_r_5_DateTimeLastAdministration']['nullFlavor'] !== -1 ?
                                        <TextField
                                            label="Date and Time of Last Administration"
                                            variant="outlined"
                                            value={item['G_k_4_r_5_DateTimeLastAdministration'].value}
                                            onChange={handleChange('G_k_4_r_5_DateTimeLastAdministration', index)}
                                        />
                                        : <FormControl sx={{width: '70%'}}>
                                            <InputLabel>Null Flavor</InputLabel>
                                            <Select
                                                defaultValue={0}
                                                value={item['G_k_4_r_5_DateTimeLastAdministration'].nullFlavor}
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
                                           inputProps={{maxLength: 5}}
                                           type="number"
                                           onKeyDown={(evt) =>
                                               (evt.key === "-" || evt.key === "+" || evt.key === "e" || evt.key === "," || evt.key === ".") &&
                                               evt.preventDefault()
                                           }
                                           value={item['G_k_4_r_6a_DurationDrugAdministrationNum'].value}/>

                                <FormControl>
                                    <InputLabel>Duration of Drug Administration (unit)</InputLabel>
                                    <Select
                                        label="Duration of Drug Administration (unit)"
                                        sx={{width: '100%'}}
                                        onChange={handleChange('G_k_4_r_6b_DurationDrugAdministrationUnit', index)}
                                        value={item['G_k_4_r_6b_DurationDrugAdministrationUnit'].value}
                                    >
                                        <MenuItem value={'s'}>Second (s)</MenuItem>
                                        <MenuItem value={'min'}>Minute (min)</MenuItem>
                                        <MenuItem value={'h'}>Hour (h)</MenuItem>
                                        <MenuItem value={'d'}>Day (d)</MenuItem>
                                        <MenuItem value={'wk'}>Week (wk)</MenuItem>
                                        <MenuItem value={'mo'}>Month (mo)</MenuItem>
                                        <MenuItem value={'a'}>Year (a)</MenuItem>
                                    </Select>
                                </FormControl>

                                <Stack direction="row" spacing={2} justifyContent="flex-start">
                                    <Box className="text-small" style={{padding: 0}}>
                                        <FormControlLabel
                                            control={<Checkbox
                                                value={item['G_k_4_r_9_1_PharmaceuticalDoseForm'].nullFlavor === -1}
                                                onChange={setUnknown('G_k_4_r_9_1_PharmaceuticalDoseForm', index)}
                                                sx={{'& .MuiSvgIcon-root': {fontSize: 20}}}
                                                style={{padding: 1, marginLeft: 5, marginTop: 2}}
                                            />}
                                            label="No Info"/>
                                    </Box>
                                    {dosages[drugIndex][index]['G_k_4_r_9_1_PharmaceuticalDoseForm']['nullFlavor'] !== -1 ?
                                        <TextField label="Pharmaceutical Dose Form" variant="outlined"
                                                   inputProps={{maxLength: 60}}
                                                   onChange={handleChange('G_k_4_r_9_1_PharmaceuticalDoseForm', index)}
                                                   value={item['G_k_4_r_9_1_PharmaceuticalDoseForm'].value}/>
                                        : <FormControl sx={{width: '70%'}}>
                                            <InputLabel>Null Flavor</InputLabel>
                                            <Select
                                                defaultValue={0}
                                                value={item['G_k_4_r_9_1_PharmaceuticalDoseForm'].nullFlavor}
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
                                           value={item['G_k_4_r_9_2a_PharmaceuticalDoseFormTermIDVersion'].value}/>
                                <TextField label="Pharmaceutical Dose Form TermID" variant="outlined"

                                           onChange={handleChange('G_k_4_r_9_2b_PharmaceuticalDoseFormTermID', index)}
                                           value={item['G_k_4_r_9_2b_PharmaceuticalDoseFormTermID'].value}/>
                            </Grid>
                            <Grid container item xs direction="column" rowGap={1}>

                                <Stack direction="row" spacing={2} justifyContent="flex-start">
                                    <Box className="text-small" style={{padding: 0}}>
                                        <FormControlLabel
                                            control={<Checkbox
                                                value={item['G_k_4_r_10_1_RouteAdministration'].nullFlavor === -1}
                                                onChange={setUnknown('G_k_4_r_10_1_RouteAdministration', index)}
                                                sx={{'& .MuiSvgIcon-root': {fontSize: 20}}}
                                                style={{padding: 1, marginLeft: 5, marginTop: 2}}
                                            />}
                                            label="No Info"/>
                                    </Box>
                                    {dosages[drugIndex][index]['G_k_4_r_10_1_RouteAdministration']['nullFlavor'] !== -1 ?
                                        <TextField label="Route of Administration" variant="outlined"
                                                   onChange={handleChange('G_k_4_r_10_1_RouteAdministration', index)}
                                                   inputProps={{maxLength: 60}}
                                                   value={item['G_k_4_r_10_1_RouteAdministration'].value}/>
                                        : <FormControl sx={{width: '70%'}}>
                                            <InputLabel>Null Flavor</InputLabel>
                                            <Select
                                                defaultValue={0}
                                                value={item['G_k_4_r_10_1_RouteAdministration'].nullFlavor}
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
                                           value={item['G_k_4_r_10_2a_RouteAdministrationTermIDVersion'].value}/>

                                <TextField label="Route of Administration TermID" variant="outlined"
                                           onChange={handleChange('G_k_4_r_10_2b_RouteAdministrationTermID', index)}
                                           value={item['G_k_4_r_10_2b_RouteAdministrationTermID'].value}/>

                                <Stack direction="row" spacing={2} justifyContent="flex-start">
                                    <Box className="text-small" style={{padding: 0}}>
                                        <FormControlLabel
                                            control={<Checkbox
                                                value={item['G_k_4_r_11_1_ParentRouteAdministration'].nullFlavor === -1}
                                                onChange={setUnknown('G_k_4_r_11_1_ParentRouteAdministration', index)}
                                                sx={{'& .MuiSvgIcon-root': {fontSize: 20}}}
                                                style={{padding: 1, marginLeft: 5, marginTop: 2}}
                                            />}
                                            label="No Info"/>
                                    </Box>
                                    {dosages[drugIndex][index]['G_k_4_r_11_1_ParentRouteAdministration']['nullFlavor'] !== -1 ?
                                        <TextField label="Parent Route of Administration" variant="outlined"
                                                   onChange={handleChange('G_k_4_r_11_1_ParentRouteAdministration', index)}
                                                   inputProps={{maxLength: 60}}
                                                   value={item['G_k_4_r_11_1_ParentRouteAdministration'].value}/>
                                        : <FormControl sx={{width: '70%'}}>
                                            <InputLabel>Null Flavor</InputLabel>
                                            <Select
                                                defaultValue={0}
                                                value={item['G_k_4_r_11_1_ParentRouteAdministration'].nullFlavor}
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
                                           value={item['G_k_4_r_11_2a_ParentRouteAdministrationTermIDVersion'].value}/>

                                <TextField label="Parent Route of Administration TermID" variant="outlined"
                                           onChange={handleChange('G_k_4_r_11_2b_ParentRouteAdministrationTermID', index)}
                                           value={item['G_k_4_r_11_2b_ParentRouteAdministrationTermID'].value}/>

                            </Grid>
                            <Grid container item xs direction="column" rowGap={1}>
                                <TextField label="Batch / Lot Number" variant="outlined"
                                           onChange={handleChange('G_k_4_r_7_BatchLotNumber', index)}
                                           inputProps={{maxLength: 35}}
                                           value={item['G_k_4_r_7_BatchLotNumber'].value}/>

                                <TextField label="Dosage Text" variant="outlined"
                                           onChange={handleChange('G_k_4_r_8_DosageText', index)}
                                           value={item['G_k_4_r_8_DosageText'].value}
                                           multiline
                                           inputProps={{maxLength: 2000}}
                                           rows={5}/>

                                <FormControl>
                                    <InputLabel>Definition of the Time Interval Unit</InputLabel>
                                    <Select
                                        label="Definition of the Time Interval Unit"
                                        sx={{width: '100%'}}
                                        onChange={handleChange('G_k_4_r_3_DefinitionIntervalUnit', index)}
                                        value={item['G_k_4_r_3_DefinitionIntervalUnit'].value}
                                    >
                                        <MenuItem value={'min'}>Minute (min)</MenuItem>
                                        <MenuItem value={'h'}>Hour (h)</MenuItem>
                                        <MenuItem value={'d'}>Day (d)</MenuItem>
                                        <MenuItem value={'wk'}>Week (wk)</MenuItem>
                                        <MenuItem value={'mo'}>Month (mo)</MenuItem>
                                        <MenuItem value={'a'}>Year (a)</MenuItem>
                                        <MenuItem value={'{cyclical}'}>Cyclical</MenuItem>
                                        <MenuItem value={'{asnecessary}'}>As necessary</MenuItem>
                                        <MenuItem value={'{total}'}>Total</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <span>
                            <IconButton size="large" style={{top: '10px', right: '10px'}}
                                        sx={{color: "white", backgroundColor: "#1976d2"}}
                                        onClick={() => removeForm(index)}><DeleteIcon/>
                            </IconButton>
                        </span>
                        {index === dosages[drugIndex].length - 1 ?
                            <span>
                                <IconButton size="large" style={{top: '10px'}}
                                            sx={{color: "white", backgroundColor: "#1976d2"}}
                                            onClick={addForm}><AddIcon/></IconButton>
                            </span> : null}
                    </CardContent>
                </Card>);
        });
        return list;
    };

    const addForm = () => {
        let dosagesCopy = JSON.parse(JSON.stringify(dosages));
        let dosageNew = new Dosage();
        dosagesCopy[drugIndex].push(dosageNew);
        dispatch(setDosages(dosagesCopy));
    };

    const removeForm = (index) => {
        let dosagesCopy = JSON.parse(JSON.stringify(dosages));
        dosagesCopy[drugIndex].splice(index, 1);
        dispatch(setDosages(dosagesCopy));
    };

    return (
        <div>
            {formList()}
        </div>
    );
};
