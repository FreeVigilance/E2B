
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
import {makeStyles} from '@mui/styles';
import { FieldLabel } from '../fieldLabel';

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

export const Patient = () => {
    const classes = useStyles();
	const dispatch = useDispatch();
    const {patientData} = useSelector(patientSelector);

    const handleChange = (fieldName, isNumber = false, length = 1) => (event) => {
        let value = event.target.value
        if (isNumber) {
            if (value.length > length)
                value = value.slice(0, length)
        }
        let patientDataCopy = JSON.parse(JSON.stringify(patientData));
        patientDataCopy[fieldName].value = value;
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
        <Stack direction={'row'}>
            <Grid container spacing={2}>

                <Grid item xs={3}>
                    <FieldLabel label="Patient Name"></FieldLabel>
                </Grid>
                <Grid item xs={9}>
                    <Stack direction={'row'}>
                        <Box className="text-small">
                            <FormControlLabel
                                control={<Checkbox
                                value = {patientData['D_1_Patient'].nullFlavor === -1}
                                onChange={setUnknown('D_1_Patient')}
                                />}
                                label="No Info"/>
                        </Box>
                        {patientData['D_1_Patient']['nullFlavor'] !== -1 ? 
                            <TextField variant="outlined"
                            className={classes.textShort}
                            inputProps={{ maxLength: 60}}
                            onChange={handleChange('D_1_Patient')}
                            value = {patientData['D_1_Patient'].value}/>
                        :   
                            <FormControl className={classes.textXshort}>
                            <InputLabel>Null Flavor</InputLabel>
                            <Select
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
                </Grid>


                <Grid item xs={3}>
                    <FieldLabel label="GP Medical Record Number"></FieldLabel>
                </Grid>
                <Grid item xs={9}>
                    <Stack direction={'row'}>
                        <Box className="text-small">
                            <FormControlLabel
                                control={<Checkbox
                                value = {patientData['D_1_1_1_MedicalRecordNumberSourceGP'].nullFlavor === -1}
                                onChange={setUnknown('D_1_1_1_MedicalRecordNumberSourceGP')}
                                />}
                                label="No Info"/>
                        </Box>
                        {patientData['D_1_1_1_MedicalRecordNumberSourceGP']['nullFlavor'] !== -1 ? 
                            <TextField variant="outlined"
                            className={classes.textShort}
                            inputProps={{ maxLength: 20}}
                            onChange={handleChange('D_1_1_1_MedicalRecordNumberSourceGP')}
                            value = {patientData['D_1_1_1_MedicalRecordNumberSourceGP'].value}/>
                        : <FormLabel>No GP Medical Record Number</FormLabel>}
                    </Stack>
                </Grid>


                <Grid item xs={3}>
                    <FieldLabel label="Specialist Record Number"></FieldLabel>
                </Grid>
                <Grid item xs={9}>
                    <Stack direction={'row'}>
                        <Box className="text-small" style={{ padding: 0 }}>
                            <FormControlLabel
                                control={<Checkbox
                                value = {patientData['D_1_1_2_MedicalRecordNumberSourceSpecialist'].nullFlavor === -1}
                                onChange={setUnknown('D_1_1_2_MedicalRecordNumberSourceSpecialist')}
                                />}
                                label="No Info"/>
                        </Box>
                        {patientData['D_1_1_2_MedicalRecordNumberSourceSpecialist']['nullFlavor'] !== -1 ? 
                            <TextField variant="outlined"
                            className={classes.textShort}
                            inputProps={{ maxLength: 20}}
                            onChange={handleChange('D_1_1_2_MedicalRecordNumberSourceSpecialist')}
                            value = {patientData['D_1_1_2_MedicalRecordNumberSourceSpecialist'].value}/>
                        : <FormLabel>No Specialist Record Number</FormLabel>}
                    </Stack>
                </Grid>

                <Grid item xs={3}>
                    <FieldLabel label="Hospital Record Number"></FieldLabel>
                </Grid>
                <Grid item xs={9}>
                    <Stack direction={'row'}>
                        <Box className="text-small">
                            <FormControlLabel
                                control={<Checkbox
                                value = {patientData['D_1_1_3_MedicalRecordNumberSourceHospital'].nullFlavor === -1}
                                onChange={setUnknown('D_1_1_3_MedicalRecordNumberSourceHospital')}
                                />}
                                label="No Info"/>
                        </Box>
                        {patientData['D_1_1_3_MedicalRecordNumberSourceHospital']['nullFlavor'] !== -1 ? 
                            <TextField variant="outlined"
                            className={classes.textShort}
                            inputProps={{ maxLength: 20}}
                            onChange={handleChange('D_1_1_3_MedicalRecordNumberSourceHospital')}
                            value = {patientData['D_1_1_3_MedicalRecordNumberSourceHospital'].value}/>
                        : <FormLabel>No Hospital Record Number</FormLabel>}
                    </Stack>
                </Grid>


                <Grid item xs={3}>
                    <FieldLabel label="Investigation Number"></FieldLabel>
                </Grid>
                <Grid item xs={9}>
                    <Stack direction={'row'}>
                        <Box className="text-small">
                            <FormControlLabel
                                control={<Checkbox
                                value = {patientData['D_1_1_4_MedicalRecordNumberSourceInvestigation'].nullFlavor === -1}
                                onChange={setUnknown('D_1_1_4_MedicalRecordNumberSourceInvestigation')}
                                />}
                                label="No Info"/>
                        </Box>
                        {patientData['D_1_1_4_MedicalRecordNumberSourceInvestigation']['nullFlavor'] !== -1 ? 
                            <TextField variant="outlined"
                            className={classes.textShort}
                            inputProps={{ maxLength: 20}}
                            onChange={handleChange('D_1_1_4_MedicalRecordNumberSourceInvestigation')}
                            value = {patientData['D_1_1_4_MedicalRecordNumberSourceInvestigation'].value}/>
                        : <FormLabel>No Investigation Number</FormLabel>}
                    </Stack>
                </Grid>

                <Grid item xs={3}>
                    <FieldLabel label="Date of birth"></FieldLabel>
                </Grid>
                <Grid item xs={9}>
                    <Stack direction={'row'}>
                        <Box className="text-small" style={{ padding: 0 }}>
                            <FormControlLabel
                                control={<Checkbox
                                value = {patientData['D_2_1_DateBirth'].nullFlavor === -1}
                                onChange={setUnknown('D_2_1_DateBirth')}
                                />}
                                label="No Info"/>
                        </Box>
                        {patientData['D_2_1_DateBirth']['nullFlavor'] !== -1 ? 
                            <TextField
                            className={classes.textShort}
                            variant="outlined"
                            value = {patientData['D_2_1_DateBirth'].value}
                            onChange={handleChange('D_2_1_DateBirth')}
                            />
                        : <FormLabel>No Date of Birth</FormLabel>}
                    </Stack>
                </Grid>

                <Grid item xs={3}>
                    <FieldLabel label="Age at Time of Reaction (number)"></FieldLabel>
                </Grid>
                <Grid item xs={9}>
                    <TextField variant="outlined"
                        className={classes.textXshort}
                        type='number'
                        onKeyDown={(evt) =>
                            (evt.key === "-" || evt.key === "+" || evt.key === "e" || evt.key === "," || evt.key === ".") &&
                            evt.preventDefault()
                        }
                        onChange={handleChange('D_2_2a_AgeOnsetReactionNum', true, 5)}
                        value = {patientData['D_2_2a_AgeOnsetReactionNum'].value}/>
                </Grid>

                <Grid item xs={3}>
                    <FieldLabel label="Age at Time of Reaction (unit)"></FieldLabel>
                </Grid>
                <Grid item xs={9}>
                    <TextField variant="outlined"
                        className={classes.textMedium}
                        inputProps={{ maxLength: 50}}
                        onChange={handleChange('D_2_2b_AgeOnsetReactionUnit')}
                        value = {patientData['D_2_2b_AgeOnsetReactionUnit'].value}/>
                </Grid>

                <Grid item xs={3}>
                    <FieldLabel label="Gestation Period (number)"></FieldLabel>
                </Grid>
                <Grid item xs={9}>
                    <TextField variant="outlined"
                        className={classes.textXshort}
                        type='number'
                        onKeyDown={(evt) =>
                            (evt.key === "-" || evt.key === "+" || evt.key === "e" || evt.key === "," || evt.key === ".") &&
                            evt.preventDefault()
                        }
                        onChange={handleChange('D_2_2_1a_GestationPeriodReactionFoetusNum', true, 3)}
                        value = {patientData['D_2_2_1a_GestationPeriodReactionFoetusNum'].value}/>
                </Grid>

                <Grid item xs={3}>
                    <FieldLabel label="Gestation Period (unit)"></FieldLabel>
                </Grid>
                <Grid item xs={9}>
                    <TextField variant="outlined"
                        className={classes.textMedium}
                        inputProps={{ maxLength: 50}}
                        onChange={handleChange('D_2_2_1b_GestationPeriodReactionFoetusUnit')}
                        value = {patientData['D_2_2_1b_GestationPeriodReactionFoetusUnit'].value}/>
                </Grid>

                <Grid item xs={3}>
                    <FieldLabel label="Patient Age Group"></FieldLabel>
                </Grid>
                <Grid item xs={9}>
                    <Select
                        className={classes.textShort}
                        label="Patient Age Group"
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
                </Grid>

                <Grid item xs={3}>
                    <FieldLabel label="Body Weight"></FieldLabel>
                </Grid>
                <Grid item xs={9}>
                    <TextField variant="outlined"
                        className={classes.textXshort}
                        type='number'
                        onKeyDown={(evt) =>
                            (evt.key === "-" || evt.key === "+" || evt.key === "e" || evt.key === ",") &&
                            evt.preventDefault()
                        }
                        onChange={handleChange('D_3_BodyWeight', true, 6)}
                        value = {patientData['D_3_BodyWeight'].value}/>
                </Grid>


        </Grid>
        <Grid container spacing={2}>



                <Grid item xs={3}>
                    <FieldLabel label="Height"></FieldLabel>
                </Grid>
                <Grid item xs={9}>
                    <TextField variant="outlined"
                        className={classes.textXshort}
                        type='number'
                        onKeyDown={(evt) =>
                            (evt.key === "-" || evt.key === "+" || evt.key === "e" || evt.key === ",") &&
                            evt.preventDefault()
                        }
                        onChange={handleChange('D_4_Height', true, 3)}
                        value = {patientData['D_4_Height'].value}/>
                </Grid>

                <Grid item xs={3}>
                    <FieldLabel label="Sex"></FieldLabel>
                </Grid>
                <Grid item xs={9}>
                    <Stack direction={'row'}>
                        <Box className="text-small">
                            <FormControlLabel
                                control={<Checkbox
                                checked = {patientData['D_5_Sex'].nullFlavor !== null}
                                onChange={setUnknown('D_5_Sex')}
                                />}
                                label="No Info"/>
                        </Box>
                    
                        {patientData['D_5_Sex']['nullFlavor'] === null ? 
                            <Select
                                label="Sex"
                                className={classes.textShort}
                                onChange={handleChange('D_5_Sex')}
                                value = {patientData['D_5_Sex'].value}>
                                    <MenuItem value={1}>1 = Male</MenuItem>
                                    <MenuItem value={2}>2 = Female (Preterm and Term newborns)</MenuItem>
                            </Select>
                        :   <FormControl className={classes.textXshort}>
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
                    </Stack>
                </Grid>

                <Grid item xs={3}>
                    <FieldLabel label="Last Menstrual Period Date"></FieldLabel>
                </Grid>
                <Grid item xs={9}>
                    <Stack direction={'row'}>
                        <Box className="text-small">
                            <FormControlLabel
                                control={<Checkbox
                                checked = {patientData['D_6_LastMenstrualPeriodDate'].nullFlavor !== null}
                                onChange={setUnknown('D_6_LastMenstrualPeriodDate')}
                                />}
                                label="No Info"/>
                        </Box>
                    {patientData['D_6_LastMenstrualPeriodDate']['nullFlavor'] === null ? 
                        <TextField
                            className={classes.textShort}
                            variant="outlined"
                            value = {patientData['D_6_LastMenstrualPeriodDate'].value}
                            onChange={handleChange('D_6_LastMenstrualPeriodDate')}
                        />
                    : <FormControl className={classes.textXshort}>
                        <InputLabel>Null Flavor</InputLabel>
                        <Select
                            value = {patientData['D_1_Patient'].nullFlavor}
                            onChange={setNullFlavor('D_1_Patient')}>
                            <MenuItem value={0}>Masked</MenuItem>
                            <MenuItem value={1}>Asked but unknown</MenuItem>
                            <MenuItem value={2}>Not asked</MenuItem>
                        </Select>
                        </FormControl>}
                    </Stack>
                </Grid>
                              
                <Grid item xs={3}>
                    <FieldLabel label="Date Of Death"></FieldLabel>
                </Grid>
                <Grid item xs={9}>
                    <Stack direction={'row'}>
                        <Box className="text-small">
                            <FormControlLabel
                                control={<Checkbox
                                checked = {patientData['D_9_1_DateDeath'].nullFlavor !== null}
                                onChange={setUnknown('D_9_1_DateDeath')}
                                />}
                                label="No Info"/>
                        </Box>
                        {patientData['D_9_1_DateDeath']['nullFlavor'] === null ? 
                            <TextField
                                className={classes.textShort}
                                variant="outlined"
                                value = {patientData['D_9_1_DateDeath'].value}
                                onChange={handleChange('D_9_1_DateDeath')}
                                />
                        :   <FormControl className={classes.textXshort}>
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
                    </Stack>
                </Grid>

                <Grid item xs={3}>
                    <FieldLabel label="Was Autopsy Done"></FieldLabel>
                </Grid>
                <Grid item xs={9}>
                    <Stack direction={'row'}>
                        <Box className="text-small">
                            <FormControlLabel
                                control={<Checkbox
                                checked = {patientData['D_9_3_Autopsy'].nullFlavor !== null}
                                onChange={setUnknown('D_9_3_Autopsy')}
                                />}
                                label="No Info"/>
                        </Box>
                        {patientData['D_9_3_Autopsy']['nullFlavor'] === null ? 
                            <Select
                            className={classes.textXshort}
                            value = {patientData['D_9_3_Autopsy'].nullFlavor}
                            onChange={handleChange('D_9_3_Autopsy')}>
                                <MenuItem value={0}>No</MenuItem>
                                <MenuItem value={1}>Yes</MenuItem>
                            </Select>
                        :   <FormControl className={classes.textXshort}>
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
                    </Stack>
                </Grid>

                <Grid item xs={3}>
                </Grid>
                <Grid item xs={9}>
                    <FormControlLabel
                        control={<Checkbox
                        value = {patientData['D_7_3_ConcomitantTherapies'].value}
                        onChange={handleChange('D_7_3_ConcomitantTherapies')}
                        />}
                        label="Concomitant Therapies"/>
                </Grid>

                <Grid item xs={3}>
                    <FieldLabel label="Text for Relevant Medical History and Concurrent Conditions"></FieldLabel>
                </Grid>
                <Grid item xs={9}>
                    <Stack direction={'row'}>
                        <Box className="text-small">
                            <FormControlLabel
                                control={<Checkbox
                                checked = {patientData['D_7_2_TextMedicalHistory'].nullFlavor !== null}
                                onChange={setUnknown('D_7_2_TextMedicalHistory')}
                                />}
                                label="No Info"/>
                        </Box>
                        {patientData['D_7_2_TextMedicalHistory']['nullFlavor'] === null ? 
                            <TextField variant="outlined"
                                className={classes.textLong}
                                value = {patientData['D_7_2_TextMedicalHistory'].value}
                                onChange={handleChange('D_7_2_TextMedicalHistory')}
                                multiline
                                inputProps={{ maxLength: 10000}}
                                rows={15}/>
                        :   <FormControl className={classes.textXshort}>
                            <InputLabel>Null Flavor</InputLabel>
                            <Select
                                value = {patientData['D_7_2_TextMedicalHistory'].nullFlavor}
                                onChange={setNullFlavor('D_7_2_TextMedicalHistory')}>
                                <MenuItem value={0}>Masked</MenuItem>
                                <MenuItem value={1}>Asked but unknown</MenuItem>
                                <MenuItem value={2}>Not asked</MenuItem>
                                <MenuItem value={3}>Unknown</MenuItem>
                            </Select>
                            </FormControl>}
                    </Stack>
                </Grid>

        </Grid>

        </Stack>
        <Divider sx={{ borderBottomWidth: 5, padding: 2 }}/>

        <Grid container direction="row" columnGap={4}>
            <Grid container item xs direction="column" rowGap={1}>
                <FormLabel sx={{ fontSize: 30, marginLeft: '35%', color: 'black' }}>Medical History</FormLabel>
                <MedicalHistory></MedicalHistory>
            </Grid>
            <Grid container item xs direction="column" rowGap={1}>
                <FormLabel sx={{ fontSize: 30, marginLeft: '35%', color: 'black' }}>Drugs History</FormLabel>
                <DrugsHistory></DrugsHistory>
            </Grid>
        </Grid>
    </>
	);
}
