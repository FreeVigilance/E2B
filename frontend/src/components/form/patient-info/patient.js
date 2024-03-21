
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Stack, FormControlLabel, Box, Select, MenuItem, FormControl, InputLabel, Grid, Divider, FormLabel} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { patientSelector, setPatientData } from '@src/features/patient/slice';
import { MedicalHistory } from './med-history';
import { DrugsHistory } from './drug-history';
import { CausesOfDeath } from './cause-of-death';
import { Autopsy } from './autopsy';

export const Patient = () => {
	const dispatch = useDispatch();
    const {patientData} = useSelector(patientSelector);

    useEffect(() => {
        console.log("STATE");
        console.log(patientData);
    });

    const handleChange = (fieldName) => (event) => {
        let patientDataCopy = JSON.parse(JSON.stringify(patientData));
        patientDataCopy[fieldName].value = event.target.value;
        dispatch(setPatientData(patientDataCopy));
    };

    const setNullFlavor = (fieldName) => (event) => {
        let patientDataCopy = JSON.parse(JSON.stringify(patientData));
        patientDataCopy[fieldName].nullFlavor = event.target.value;
        dispatch(setPatientData(patientDataCopy));
    };

    const setUnknown = (fieldName) => (event) => {
        let patientDataCopy = JSON.parse(JSON.stringify(patientData));
        if (event.target.checked) {
            patientDataCopy[fieldName].nullFlavor = -1;
        } else {
            patientDataCopy[fieldName].nullFlavor = null;
        }
        dispatch(setPatientData(patientDataCopy));
    };

	return (
        <>
        <Grid container direction="row" columnGap={4}>
            <Grid container item xs direction="column" rowGap={1}>
                <Stack direction="row" spacing={2} justifyContent="flex-start">
                    <Box className="text-small" style={{ padding: 0 }}>
                        <FormControlLabel
                            control={<Checkbox
                            value = {patientData['D_1_Patient'].nullFlavor === -1}
                            onChange={setUnknown('D_1_Patient')}
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                            style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                            />}
                            label="No Info"/>
                    </Box>
                    {patientData['D_1_Patient']['nullFlavor'] !== -1 ? 
                        <TextField label="Patient Name" variant="outlined"
                        sx={{ width: '80%' }}
                        inputProps={{ maxLength: 60}}
                        onChange={handleChange('D_1_Patient')}
                        value = {patientData['D_1_Patient'].value}/>
                    :   
                        <FormControl sx={{ width: '80%' }}>
                        <InputLabel>Null Flavor</InputLabel><Select
                            value = {patientData['D_1_Patient'].nullFlavor}
                            onChange={setNullFlavor('D_1_Patient')}
                        >
                            <MenuItem value={0}>Masked</MenuItem>
                            <MenuItem value={1}>Asked but unknown</MenuItem>
                            <MenuItem value={2}>Not asked</MenuItem>
                            <MenuItem value={3}>Unknown</MenuItem>
                        </Select>
                        </FormControl>}
                </Stack>

                    <Stack direction="row" spacing={2} justifyContent="flex-start">   
                        <Box className="text-small" style={{ padding: 0 }}>
                            <FormControlLabel
                                control={<Checkbox
                                value = {patientData['D_1_1_1_MedicalRecordNumberSourceGP'].nullFlavor === -1}
                                onChange={setUnknown('D_1_1_1_MedicalRecordNumberSourceGP')}
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                                />}
                                label="No Info"/>
                        </Box>
                        {patientData['D_1_1_1_MedicalRecordNumberSourceGP']['nullFlavor'] !== -1 ? 
                            <TextField label="GP Medical Record Number" variant="outlined"
                            sx={{ width: '80%' }}
                            inputProps={{ maxLength: 20}}
                            onChange={handleChange('D_1_1_1_MedicalRecordNumberSourceGP')}
                            value = {patientData['D_1_1_1_MedicalRecordNumberSourceGP'].value}/>
                        : <FormLabel>No GP Medical Record Number</FormLabel>}
                    </Stack>

                    <Stack direction="row" spacing={2} justifyContent="flex-start">   
                        <Box className="text-small" style={{ padding: 0 }}>
                            <FormControlLabel
                                control={<Checkbox
                                value = {patientData['D_1_1_2_MedicalRecordNumberSourceSpecialist'].nullFlavor === -1}
                                onChange={setUnknown('D_1_1_2_MedicalRecordNumberSourceSpecialist')}
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                                />}
                                label="No Info"/>
                        </Box>
                        {patientData['D_1_1_2_MedicalRecordNumberSourceSpecialist']['nullFlavor'] !== -1 ? 
                            <TextField label="Specialist Record Number" variant="outlined"
                            sx={{ width: '80%' }}
                            inputProps={{ maxLength: 20}}
                            onChange={handleChange('D_1_1_2_MedicalRecordNumberSourceSpecialist')}
                            value = {patientData['D_1_1_2_MedicalRecordNumberSourceSpecialist'].value}/>
                        : <FormLabel>No Specialist Record Number</FormLabel>}
                    </Stack>

                    <Stack direction="row" spacing={2} justifyContent="flex-start">   
                        <Box className="text-small" style={{ padding: 0 }}>
                            <FormControlLabel
                                control={<Checkbox
                                value = {patientData['D_1_1_3_MedicalRecordNumberSourceHospital'].nullFlavor === -1}
                                onChange={setUnknown('D_1_1_3_MedicalRecordNumberSourceHospital')}
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                                />}
                                label="No Info"/>
                        </Box>
                        {patientData['D_1_1_3_MedicalRecordNumberSourceHospital']['nullFlavor'] !== -1 ? 
                            <TextField label="Hospital Record Number" variant="outlined"
                            sx={{ width: '80%' }}
                            inputProps={{ maxLength: 20}}
                            onChange={handleChange('D_1_1_3_MedicalRecordNumberSourceHospital')}
                            value = {patientData['D_1_1_3_MedicalRecordNumberSourceHospital'].value}/>
                        : <FormLabel>No Hospital Record Number</FormLabel>}
                    </Stack>

                    <Stack direction="row" spacing={2} justifyContent="flex-start">   
                        <Box className="text-small" style={{ padding: 0 }}>
                            <FormControlLabel
                                control={<Checkbox
                                value = {patientData['D_1_1_4_MedicalRecordNumberSourceInvestigation'].nullFlavor === -1}
                                onChange={setUnknown('D_1_1_4_MedicalRecordNumberSourceInvestigation')}
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                                />}
                                label="No Info"/>
                        </Box>
                        {patientData['D_1_1_4_MedicalRecordNumberSourceInvestigation']['nullFlavor'] !== -1 ? 
                            <TextField label="Investigation Number" variant="outlined"
                            sx={{ width: '80%' }}
                            inputProps={{ maxLength: 20}}
                            onChange={handleChange('D_1_1_4_MedicalRecordNumberSourceInvestigation')}
                            value = {patientData['D_1_1_4_MedicalRecordNumberSourceInvestigation'].value}/>
                        : <FormLabel>No Investigation Number</FormLabel>}
                    </Stack>

                    <Stack direction="row" spacing={2} justifyContent="flex-start">   
                        <Box className="text-small" style={{ padding: 0 }}>
                            <FormControlLabel
                                control={<Checkbox
                                value = {patientData['D_2_1_DateBirth'].nullFlavor === -1}
                                onChange={setUnknown('D_2_1_DateBirth')}
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                                />}
                                label="No Info"/>
                        </Box>
                        {patientData['D_2_1_DateBirth']['nullFlavor'] !== -1 ? 
                            <TextField sx={{ width: '80%' }}
                            label="Date of birth"
                            variant="outlined"
                            value = {patientData['D_2_1_DateBirth'].value}
                            onChange={handleChange('D_2_1_DateBirth')}
                            />
                        : <FormLabel>No Date of Birth</FormLabel>}
                </Stack>
                <FormControlLabel
                    control={<Checkbox
                    value = {patientData['D_7_3_ConcomitantTherapies'].value}
                    onChange={handleChange('D_7_3_ConcomitantTherapies')}
                    sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                    style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                    />}
                    label="Concomitant Therapies"/>
            </Grid>

            <Grid container item xs direction="column" rowGap={1} style={{width: "40px"}}>
                <TextField label="Age at Time of Reaction (number)" variant="outlined"
                    sx={{ width: '100%' }}
                    inputProps={{ maxLength: 5}}
                    type='number'
                    onKeyDown={(evt) =>
                        (evt.key === "-" || evt.key === "+" || evt.key === "e" || evt.key === "," || evt.key === ".") &&
                        evt.preventDefault()
                    }
                    onChange={handleChange('D_2_2a_AgeOnsetReactionNum')}
                    value = {patientData['D_2_2a_AgeOnsetReactionNum'].value}/>

                <TextField label="Age at Time of Reaction (unit)" variant="outlined"
                    sx={{ width: '100%' }}
                    inputProps={{ maxLength: 50}}
                    onChange={handleChange('D_2_2b_AgeOnsetReactionUnit')}
                    value = {patientData['D_2_2b_AgeOnsetReactionUnit'].value}/>

                <TextField label="Gestation Period (number)" variant="outlined"
                    sx={{ width: '100%' }}
                    inputProps={{ maxLength: 3}}
                    type='number'
                    onKeyDown={(evt) =>
                        (evt.key === "-" || evt.key === "+" || evt.key === "e" || evt.key === "," || evt.key === ".") &&
                        evt.preventDefault()
                    }
                    onChange={handleChange('D_2_2_1a_GestationPeriodReactionFoetusNum')}
                    value = {patientData['D_2_2_1a_GestationPeriodReactionFoetusNum'].value}/>

                <TextField label="Gestation Period (unit)" variant="outlined"
                    sx={{ width: '100%' }}
                    inputProps={{ maxLength: 50}}
                    onChange={handleChange('D_2_2_1b_GestationPeriodReactionFoetusUnit')}
                    value = {patientData['D_2_2_1b_GestationPeriodReactionFoetusUnit'].value}/>

                <FormControl >
                <InputLabel>Patient Age Group</InputLabel>
                <Select
                    label="Patient Age Group"
                    sx={{ width: '100%' }}
                    defaultValue={0}
                    onChange={handleChange('D_2_3_PatientAgeGroup')}
                    value = {patientData['D_2_3_PatientAgeGroup'].value}>
                        <MenuItem value={0}>0 = Foetus</MenuItem>
                        <MenuItem value={1}>1 = Neonate (Preterm and Term newborns)</MenuItem>
                        <MenuItem value={2}>2 = Infant</MenuItem>
                        <MenuItem value={3}>3 = Child</MenuItem>
                        <MenuItem value={4}>4 = Adolescent</MenuItem>
                        <MenuItem value={5}>5 = Adult</MenuItem>
                        <MenuItem value={6}>6 = Elderly</MenuItem>
                </Select>
                </FormControl>

                <TextField label="Body Weight" variant="outlined"
                    sx={{ width: '100%' }}
                    inputProps={{ maxLength: 6}}
                    type='number'
                    onKeyDown={(evt) =>
                        (evt.key === "-" || evt.key === "+" || evt.key === "e" || evt.key === ",") &&
                        evt.preventDefault()
                    }
                    onChange={handleChange('D_3_BodyWeight')}
                    value = {patientData['D_3_BodyWeight'].value}/>

                <TextField label="Height" variant="outlined"
                    sx={{ width: '100%' }}
                    inputProps={{ maxLength: 3}}
                    type='number'
                    onKeyDown={(evt) =>
                        (evt.key === "-" || evt.key === "+" || evt.key === "e" || evt.key === ",") &&
                        evt.preventDefault()
                    }
                    onChange={handleChange('D_4_Height')}
                    value = {patientData['D_4_Height'].value}/>
            </Grid>
    
            <Grid container item xs direction="column" rowGap={1} >
                <Stack direction="row" spacing={2} justifyContent="flex-start">   
                    <Box className="text-small" style={{ padding: 0 }} sx={{ width: '100%' }}>
                        <FormControlLabel
                            control={<Checkbox
                            checked = {patientData['D_5_Sex'].nullFlavor !== null}
                            onChange={setUnknown('D_5_Sex')}
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                            style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                            />}
                            label="No Info"/>
                    
                        {patientData['D_5_Sex']['nullFlavor'] === null ? 
                            <FormControl sx={{ width: '80%' }}>
                            <InputLabel>Sex</InputLabel>
                            <Select
                                label="Sex"
                                defaultValue={0}
                                onChange={handleChange('D_5_Sex')}
                                value = {patientData['D_5_Sex'].value}>
                                    <MenuItem value={1}>1 = Male</MenuItem>
                                    <MenuItem value={2}>2 = Female (Preterm and Term newborns)</MenuItem>
                            </Select>
                            </FormControl>
                        :   <FormControl sx={{ width: '80%' }}>
                            <InputLabel>Null Flavor</InputLabel>
                            <Select
                                value = {patientData['D_5_Sex'].nullFlavor}
                                onChange={setNullFlavor('D_5_Sex')}
                            >
                                <MenuItem value={0}>Masked</MenuItem>
                                <MenuItem value={1}>Asked but unknown</MenuItem>
                                <MenuItem value={2}>Not asked</MenuItem>
                                <MenuItem value={3}>Unknown</MenuItem>
                            </Select>
                            </FormControl>}
                    </Box>
                </Stack>

                <Stack direction="row" spacing={2} justifyContent="flex-start">   
                    <Box className="text-small" style={{ padding: 0 }} sx={{ width: '100%' }}>
                        <FormControlLabel
                            control={<Checkbox
                            checked = {patientData['D_6_LastMenstrualPeriodDate'].nullFlavor !== null}
                            onChange={setUnknown('D_6_LastMenstrualPeriodDate')}
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                            style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                            />}
                            label="No Info"/>
                    {patientData['D_6_LastMenstrualPeriodDate']['nullFlavor'] === null ? 
                        <TextField sx={{ width: '80%' }}
                        label="Last Menstrual Period Date"
                        variant="outlined"
                        value = {patientData['D_6_LastMenstrualPeriodDate'].value}
                        onChange={handleChange('D_6_LastMenstrualPeriodDate')}
                        />
                    : <FormControl sx={{ width: '80%' }}>
                        <InputLabel>Null Flavor</InputLabel><Select
                            value = {patientData['D_1_Patient'].nullFlavor}
                            onChange={setNullFlavor('D_1_Patient')}
                        >
                            <MenuItem value={0}>Masked</MenuItem>
                            <MenuItem value={1}>Asked but unknown</MenuItem>
                            <MenuItem value={2}>Not asked</MenuItem>
                        </Select>
                        </FormControl>}
                    </Box>
                </Stack>

                <Stack direction="row" spacing={2} justifyContent="flex-start">   
                    <Box className="text-small" style={{ padding: 0 }} sx={{ width: '100%' }}>
                        <FormControlLabel
                            control={<Checkbox
                            checked = {patientData['D_7_2_TextMedicalHistory'].nullFlavor !== null}
                            onChange={setUnknown('D_7_2_TextMedicalHistory')}
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                            style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                            />}
                            label="No Info"/>
                        {patientData['D_7_2_TextMedicalHistory']['nullFlavor'] === null ? 
                            <TextField label="Result Unstructured Data" variant="outlined"
                                sx={{ width: '80%' }}
                                value = {patientData['D_7_2_TextMedicalHistory'].value}
                                onChange={handleChange('D_7_2_TextMedicalHistory')}
                                multiline
                                inputProps={{ maxLength: 10000}}
                                rows={5}/>
                        :   <FormControl sx={{ width: '80%' }}>
                            <InputLabel>Null Flavor</InputLabel>
                            <Select
                                value = {patientData['D_7_2_TextMedicalHistory'].nullFlavor}
                                onChange={setNullFlavor('D_7_2_TextMedicalHistory')}
                            >
                                <MenuItem value={0}>Masked</MenuItem>
                                <MenuItem value={1}>Asked but unknown</MenuItem>
                                <MenuItem value={2}>Not asked</MenuItem>
                                <MenuItem value={3}>Unknown</MenuItem>
                            </Select>
                            </FormControl>}
                    </Box>
                </Stack>
                
                <Stack direction="row" spacing={2} justifyContent="flex-start">   
                    <Box className="text-small" style={{ padding: 0 }} sx={{ width: '100%' }}>
                        <FormControlLabel
                            control={<Checkbox
                            checked = {patientData['D_9_1_DateDeath'].nullFlavor !== null}
                            onChange={setUnknown('D_9_1_DateDeath')}
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                            style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                            />}
                            label="No Info"/>
                        {patientData['D_9_1_DateDeath']['nullFlavor'] === null ? 
                            <TextField sx={{ width: '80%' }}
                            label="Date Of Death"
                            variant="outlined"
                            value = {patientData['D_9_1_DateDeath'].value}
                            onChange={handleChange('D_9_1_DateDeath')}
                            />
                        :   <FormControl sx={{ width: '80%' }}>
                            <InputLabel>Null Flavor</InputLabel>
                            <Select
                                value = {patientData['D_9_1_DateDeath'].nullFlavor}
                                onChange={setNullFlavor('D_9_1_DateDeath')}
                            >
                                <MenuItem value={0}>Masked</MenuItem>
                                <MenuItem value={1}>Asked but unknown</MenuItem>
                                <MenuItem value={2}>Not asked</MenuItem>
                            </Select>
                            </FormControl>}
                    </Box>
                </Stack>

                <Stack direction="row" spacing={2} justifyContent="flex-start">   
                    <Box className="text-small" style={{ padding: 0 }} sx={{ width: '100%' }}>
                        <FormControlLabel
                            control={<Checkbox
                            checked = {patientData['D_9_3_Autopsy'].nullFlavor !== null}
                            onChange={setUnknown('D_9_3_Autopsy')}
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                            style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                            />}
                            label="No Info"/>
                        {patientData['D_9_3_Autopsy']['nullFlavor'] === null ? 
                            <FormControl sx={{ width: '80%' }}>
                            <InputLabel>Was Autopsy Done</InputLabel>
                            <Select
                                value = {patientData['D_9_3_Autopsy'].nullFlavor}
                                onChange={handleChange('D_9_3_Autopsy')}
                                label="Was Autopsy Done"
                            >
                                <MenuItem value={0}>No</MenuItem>
                                <MenuItem value={1}>Yes</MenuItem>
                            </Select>
                            </FormControl>
                        :   <FormControl sx={{ width: '80%' }}>
                            <InputLabel>Null Flavor</InputLabel>
                            <Select
                                value = {patientData['D_9_3_Autopsy'].nullFlavor}
                                onChange={setNullFlavor('D_9_3_Autopsy')}
                            >
                                <MenuItem value={3}>Unknown</MenuItem>
                                <MenuItem value={1}>Asked but unknown</MenuItem>
                                <MenuItem value={2}>Not asked</MenuItem>
                            </Select>
                            </FormControl>}
                    </Box>
                </Stack>

            </Grid>
        </Grid>
        <Divider sx={{ borderBottomWidth: 5, padding: 2 }}/>

        <Grid container direction="row" columnGap={4}>
            <Grid container item xs direction="column" rowGap={1}>
                <FormLabel sx={{ fontSize: 30, marginLeft: '30%', color: 'black' }}>Medical History</FormLabel>
                <MedicalHistory></MedicalHistory>
            </Grid>
            <Grid container item xs direction="column" rowGap={1}>
                <FormLabel sx={{ fontSize: 30, marginLeft: '33%', color: 'black' }}>Drugs History</FormLabel>
                <DrugsHistory></DrugsHistory>
            </Grid>
            <Grid container item xs direction="column" rowGap={1}>
                <FormLabel sx={{ fontSize: 30, marginLeft: '27%', color: 'black' }}>Causes Of Death</FormLabel>
                <CausesOfDeath></CausesOfDeath>
            </Grid>
            <Grid container item xs direction="column" rowGap={1}>
                <FormLabel sx={{ fontSize: 27, marginLeft: '5%', color: 'black' }}>Autopsy-determined Cause of Deat</FormLabel>
                <Autopsy></Autopsy>
            </Grid>
        </Grid>
    </>
	);
}
