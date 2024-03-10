import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Stack, FormControlLabel, Select, MenuItem, FormControl, InputLabel, Grid, Divider, FormLabel } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { Box } from '@mui/system';
import { identificationSelector, setIdentification } from '@src/features/identification/slice';
import { DocumentsHeldBySenderComp } from './documents-held-by-sender';
import { OtherIdentifiersComp } from './other-identifiers';
import { IdentificationNumberComp } from './identification-number';

const snakecaseKeys = require('snakecase-keys');

export const IdentificationComp = () => {
    const dispatch = useDispatch();
    const { identification } = useSelector(identificationSelector);

    useEffect(() => {
        console.log('STATE');
        console.log(snakecaseKeys(identification));
    });

    const handleChange = (fieldName) => (event) => {
        const identificationCopy = JSON.parse(JSON.stringify(identification));
        if (fieldName === 'C_1_9_1_OtherCaseIdsPreviousTransmissions') {
            identificationCopy[fieldName].value = event.target.checked;
        } else {
            identificationCopy[fieldName].value = event.target.value;
        }
        dispatch(setIdentification(identificationCopy));
    };

    const setUnknown = (fieldName) => (event) => {
        const identificationCopy = JSON.parse(JSON.stringify(identification));
        if (event.target.checked) {
            identificationCopy[fieldName].nullFlavor = -1;
        } else {
            identificationCopy[fieldName].nullFlavor = null;
        }
        dispatch(setIdentification(identificationCopy));
    };

    return (
        <>
            <Stack direction="column" spacing={2} justifyContent="flex-start">
                <Stack direction="row" spacing={2} justifyContent="flex-start">
                    <TextField label="Sender’s (case) Safety Report Unique Identifier" variant="outlined"
                        sx={{ width: '100%' }}
                        onChange={handleChange('C_1_1_SenderSafetyReportUniqueId')}
                        value = {identification.C_1_1_SenderSafetyReportUniqueId.value}
                        multiline
                        rows={2}/>

                    <TextField label="Worldwide Unique Case Identification Number" variant="outlined"
                        sx={{ width: '100%' }}
                        onChange={handleChange('C_1_8_1_WorldwideUniqueCaseIdentificationNumber')}
                        value = {identification.C_1_8_1_WorldwideUniqueCaseIdentificationNumber.value}
                        multiline
                        rows={2}/>

                </Stack>
                <Grid container direction="row" columnGap={4}>
                    <Grid container item xs direction="column" rowGap={1}>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                value = {identification.C_1_2_DateCreation.value}
                                renderInput={(props) => <TextField sx={{ width: '100%' }} {...props} />}
                                label="Date of Creation"
                                onChange={handleChange('C_1_2_DateCreation')}
                            />
                        </LocalizationProvider>

                        <FormControl sx={{ width: '100%' }}>
                            <InputLabel>Type of Report</InputLabel>
                            <Select
                                value = {identification.C_1_3_TypeReport.value}
                                onChange={handleChange('C_1_3_TypeReport')}
                            >
                                <MenuItem value={1}>1 = Spontaneous report</MenuItem>
                                <MenuItem value={2}>2 = Report from study</MenuItem>
                                <MenuItem value={3}>3 = Other</MenuItem>
                                <MenuItem value={4}>4 = Not available to sender (unknown)</MenuItem>
                            </Select>
                        </FormControl>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                value = {identification.C_1_4_DateReportFirstReceivedSource.value}
                                renderInput={(props) => <TextField sx={{ width: '100%' }} {...props} />}
                                label="Date Report Was First Received from Source"
                                onChange={handleChange('C_1_4_DateReportFirstReceivedSource')}
                            />
                        </LocalizationProvider>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                value = {identification.C_1_5_DateMostRecentInformation.value}
                                renderInput={(props) => <TextField sx={{ width: '100%' }} {...props} />}
                                label="Date of Most Recent Information for This Report"
                                onChange={handleChange('C_1_5_DateMostRecentInformation')}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid container item xs direction="column" rowGap={1}>
                        <FormControl sx={{ width: '100%' }}>
                            <InputLabel>Are Additional Documents Available?</InputLabel>
                            <Select
                                value = {identification.C_1_6_1_AdditionalDocumentsAvailable.value}
                                onChange={handleChange('C_1_6_1_AdditionalDocumentsAvailable')}
                            >
                                <MenuItem value={true}>Yes</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl sx={{ width: '100%' }}>
                            <InputLabel>First Sender of This Case</InputLabel>
                            <Select
                                value = {identification.C_1_8_2_FirstSender.value}
                                onChange={handleChange('C_1_8_2_FirstSender')}
                            >
                                <MenuItem value={1}>1 = Regulator</MenuItem>
                                <MenuItem value={2}>2 = Other</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl sx={{ width: '100%' }}>
                            <InputLabel>Report Nullification / Amendment</InputLabel>
                            <Select
                                value = {identification.C_1_11_1_ReportNullificationAmendment.value}
                                onChange = {handleChange('C_1_11_1_ReportNullificationAmendment')}
                            >
                                <MenuItem value={1}>1 = Nullification</MenuItem>
                                <MenuItem value={2}>2 = Amendment</MenuItem>
                            </Select>
                        </FormControl>

                        <Stack direction="row" spacing={2} justifyContent="flex-start">
                            <Box className="text-small" style={{ padding: 0 }} sx={{ width: '100%' }}>
                                <FormControlLabel
                                    control={<Checkbox
                                        checked = {identification.C_1_7_FulfilLocalCriteriaExpeditedReport.nullFlavor !== null}
                                        onChange={setUnknown('C_1_7_FulfilLocalCriteriaExpeditedReport')}
                                        sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                        style={{ padding: 1, marginLeft: 5, marginTop: 2 }}/>}
                                    label="No Info"/>
                                {identification.C_1_7_FulfilLocalCriteriaExpeditedReport.nullFlavor === null
                                    ? <FormControl sx={{ width: '90%' }}>
                                        <InputLabel>Does This Case Fulfil the Local Criteria for an Expedited Report?</InputLabel>
                                        <Select
                                            value = {identification.C_1_7_FulfilLocalCriteriaExpeditedReport.value}
                                            onChange={handleChange('C_1_7_FulfilLocalCriteriaExpeditedReport')}
                                        >
                                            <MenuItem value={true}>Yes</MenuItem>
                                            <MenuItem value={false}>No</MenuItem>
                                        </Select>
                                    </FormControl>
                                    : <FormLabel>No Information On Case Fulfilling the Local Criteria for an Expedited Report</FormLabel>}
                            </Box>
                        </Stack>

                        <FormControlLabel
                            control={<Checkbox
                                checked = {identification.C_1_9_1_OtherCaseIdsPreviousTransmissions.value}
                                onChange={handleChange('C_1_9_1_OtherCaseIdsPreviousTransmissions')}
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                style={{ padding: 1, marginLeft: 5, marginTop: 2 }}/>}
                            label="Other Case Identifiers in Previous Transmissions"/>
                    </Grid>
                </Grid>

                <TextField label="Reason for Nullification / Amendment" variant="outlined"
                    sx={{ width: '100%' }}
                    onChange={handleChange('C_1_11_2_ReasonNullificationAmendment')}
                    value = {identification.C_1_11_2_ReasonNullificationAmendment.value}
                    multiline
                    rows={5}/>
            </Stack>

            <Divider sx={{ borderBottomWidth: 5, padding: 2 }}/>

            <Grid container direction="row" columnGap={4}>
                <Grid container item xs direction="column" rowGap={1}>
                    <FormLabel sx={{ fontSize: 30, marginLeft: '35%', color: 'black' }}>Documents Held by Sender</FormLabel>
                    <DocumentsHeldBySenderComp></DocumentsHeldBySenderComp>
                </Grid>
                <Grid container item xs direction="column" rowGap={1}>
                    <FormLabel sx={{ fontSize: 30, marginLeft: '35%', color: 'black' }}>Other Case Identifiers</FormLabel>
                    <OtherIdentifiersComp></OtherIdentifiersComp>
                </Grid>
                <Grid container item xs direction="column" rowGap={1}>
                    <FormLabel sx={{ fontSize: 30, marginLeft: '35%', color: 'black' }}>Identification Number</FormLabel>
                    <IdentificationNumberComp></IdentificationNumberComp>
                </Grid>

            </Grid>
        </>

    );
};
