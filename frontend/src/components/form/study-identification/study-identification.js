import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Stack, FormControlLabel, Select, MenuItem, FormControl, InputLabel, Grid, Divider } from '@mui/material';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { FormLabel } from '@mui/material';
import { Box } from '@mui/system';
import { setStudyIdentification, studyIdentificationSelector } from '@src/features/study-identification/slice';
import { StudyRegistrationComp } from './study-registration';

var snakecaseKeys = require('snakecase-keys')

export const StudyIdentificationComp = () => {
	const dispatch = useDispatch();
    const {studyIdentification} = useSelector(studyIdentificationSelector);

    useEffect(() => {
        console.log("STATE");
        console.log(snakecaseKeys(studyIdentification));
    });

    const handleChange = (fieldName) => (event) => {
        let studyIdentificationCopy = JSON.parse(JSON.stringify(studyIdentification));
        studyIdentificationCopy[fieldName].value = event.target.value;
        dispatch(setStudyIdentification(studyIdentificationCopy));
    };

    const setNullFlavor = (fieldName) => (event) => {
        let studyIdentificationCopy = JSON.parse(JSON.stringify(studyIdentification));
        studyIdentificationCopy[fieldName].nullFlavor = event.target.value;
        dispatch(setStudyIdentification(studyIdentificationCopy));
    };

    const setUnknown = (fieldName) => (event) => {
        let studyIdentificationCopy = JSON.parse(JSON.stringify(studyIdentification));
        if (event.target.checked) {
            studyIdentificationCopy[fieldName].nullFlavor = -1;
        } else {
            studyIdentificationCopy[fieldName].nullFlavor = null;
        }
        dispatch(setStudyIdentification(studyIdentificationCopy));
    };

    

	return (
        <>
        <Stack direction="column" spacing={2} justifyContent="flex-start">

                    <Stack direction="row" spacing={2} justifyContent="flex-start">   
                        <Box className="text-small" style={{ padding: 0 }} sx={{ width: '100%' }}>
                            <FormControlLabel
                                control={<Checkbox
                                checked = {studyIdentification['C_5_2_StudyName'].nullFlavor !== null}
                                onChange={setUnknown('C_5_2_StudyName')}
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                style={{padding: 1, marginLeft: 5, marginTop: 2 }}/>}
                                label="No Info"/>
                                    {studyIdentification['C_5_2_StudyName']['nullFlavor'] === null ? 
                                        <TextField label="Study Name" variant="outlined"
                                            sx={{ width: '80%' }}
                                            onChange={handleChange('C_5_2_StudyName')}
                                            value = {studyIdentification['C_5_2_StudyName'].value}
                                            multiline
                                            inputProps={{ maxLength: 2000}}
                                            rows={5}/>
                                    :   <FormControl sx={{ width: '20%' }}>
                                            <InputLabel>Null Flavor</InputLabel>
                                            <Select
                                                defaultValue = {0}
                                                value = {studyIdentification['C_5_2_StudyName'].nullFlavor}
                                                onChange={setNullFlavor('C_5_2_StudyName')}
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
                                checked = {studyIdentification['C_5_3_SponsorStudyNumber'].nullFlavor !== null}
                                onChange={setUnknown('C_5_3_SponsorStudyNumber')}
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                style={{padding: 1, marginLeft: 5, marginTop: 2 }}/>}
                                label="No Info"/>
                                    {studyIdentification['C_5_3_SponsorStudyNumber']['nullFlavor'] === null ? 
                                        <TextField label="Sponsor Study Number" variant="outlined"
                                            sx={{ width: '20%' }}
                                            inputProps={{ maxLength: 50}}
                                            onChange={handleChange('C_5_3_SponsorStudyNumber')}
                                            value = {studyIdentification['C_5_3_SponsorStudyNumber'].value}/>
                                    :   <FormControl sx={{ width: '20%' }}>
                                            <InputLabel>Null Flavor</InputLabel>
                                            <Select
                                                defaultValue = {0}
                                                value = {studyIdentification['C_5_3_SponsorStudyNumber'].nullFlavor}
                                                onChange={setNullFlavor('C_5_3_SponsorStudyNumber')}
                                            >
                                                <MenuItem value={1}>Asked, but not known</MenuItem>
                                                <MenuItem value={2}>Not asked</MenuItem>
                                            </Select>
                                        </FormControl>}
                        </Box>
                    </Stack>

                    <FormControl sx={{ width: '20%' }}>
                        <InputLabel>Study Type Where Reaction(s) Were Observed</InputLabel>
                        <Select
                            value = {studyIdentification['C_5_4_StudyTypeReaction'].value}
                            onChange={handleChange('C_5_4_StudyTypeReaction')}
                        >
                            <MenuItem value={1}>1 = Clinical trials</MenuItem>
                            <MenuItem value={2}>2 = Individual patient use</MenuItem>
                            <MenuItem value={3}>2 = Other studies</MenuItem>
                        </Select>
                    </FormControl>
        </Stack>

        <Divider sx={{ borderBottomWidth: 5, padding: 2 }}/>

        <Grid container direction="row" columnGap={4}>
            <Grid container item xs direction="column" rowGap={1}>
                <FormLabel sx={{ fontSize: 30, marginLeft: '35%', color: 'black' }}>Study Registration</FormLabel>
                <StudyRegistrationComp></StudyRegistrationComp>
            </Grid>        
        </Grid>
    </>


	);
}