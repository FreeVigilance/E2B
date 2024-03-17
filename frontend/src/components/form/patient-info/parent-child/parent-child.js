
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Stack, FormControlLabel, Box, Select, MenuItem, FormControl, InputLabel, Grid, Divider, FormLabel} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { patientSelector, setParentChildData } from '@src/features/patient/slice';
import { ParentDrugsHistory } from './parent-drug-history';
import { ParentHistory } from './parent-history';

export const ParentChild = () => {
	const dispatch = useDispatch();
    const {parentChildData} = useSelector(patientSelector);

    useEffect(() => {
        console.log("STATE");
        console.log(parentChildData);
    });

    const handleChange = (fieldName) => (event) => {
        let parentChildDataCopy = JSON.parse(JSON.stringify(parentChildData));
        parentChildDataCopy[fieldName].value = event.target.value;
        dispatch(setParentChildData(parentChildDataCopy));
    };

    const setNullFlavor = (fieldName) => (event) => {
        let parentChildDataCopy = JSON.parse(JSON.stringify(parentChildData));
        parentChildDataCopy[fieldName].nullFlavor = event.target.value;
        dispatch(setParentChildData(parentChildDataCopy));
    };

    const setUnknown = (fieldName) => (event) => {
        let parentChildDataCopy = JSON.parse(JSON.stringify(parentChildData));
        if (event.target.checked) {
            parentChildDataCopy[fieldName].nullFlavor = -1;
        } else {
            parentChildDataCopy[fieldName].nullFlavor = null;
        }
        dispatch(setParentChildData(parentChildDataCopy));
    };

	return (
        <>
            <Grid container direction="row" columnGap={2}>
                <Grid container item xs direction="column" rowGap={1}>
                    <Stack direction="row" spacing={2} justifyContent="flex-start">
                        <Box className="text-small" style={{ padding: 0 }} sx={{ width: '100%' }}>
                            <FormControlLabel
                                control={<Checkbox
                                checked = {parentChildData['D_10_1_ParentIdentification'].nullFlavor !== null}
                                onChange={setUnknown('D_10_1_ParentIdentification')}
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                                />}
                                label="No Info"/>
                        {parentChildData['D_10_1_ParentIdentification']['nullFlavor'] === null ? 
                            <TextField label="Parent Identification" variant="outlined"
                            sx={{ width: '80%' }}
                            onChange={handleChange('D_10_1_ParentIdentification')}
                            value = {parentChildData['D_10_1_ParentIdentification'].value}/>
                        :   
                            <FormControl>
                            <InputLabel>Null Flavor</InputLabel><Select
                                value = {parentChildData['D_10_1_ParentIdentification'].nullFlavor}
                                onChange={setNullFlavor('D_10_1_ParentIdentification')}
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
                                    checked = {parentChildData['D_10_2_1_DateBirthParent'].nullFlavor !== null}
                                    onChange={setUnknown('D_10_2_1_DateBirthParent')}
                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                    style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                                    />}
                                    label="No Info"/>
                            {parentChildData['D_10_2_1_DateBirthParent']['nullFlavor'] === null ? 
                                <TextField sx={{ width: '80%' }}
                                label="Date of Birth of Parent"
                                variant="outlined"
                                value = {parentChildData['D_10_2_1_DateBirthParent'].value}
                                onChange={handleChange('D_10_2_1_DateBirthParent')}
                                />
                            : <FormControl>
                            <InputLabel>Null Flavor</InputLabel><Select
                                value = {parentChildData['D_10_2_1_DateBirthParent'].nullFlavor}
                                onChange={setNullFlavor('D_10_2_1_DateBirthParent')}
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
                                checked = {parentChildData['D_10_6_SexParent'].nullFlavor !== null}
                                onChange={setUnknown('D_10_6_SexParent')}
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                                />}
                                label="No Info"/>
                        
                            {parentChildData['D_10_6_SexParent']['nullFlavor'] === null ? 
                                <FormControl sx={{ width: '80%' }}>
                                <InputLabel>Sex of Parent</InputLabel>
                                <Select
                                    label="Sex of Parent"
                                    defaultValue={0}
                                    onChange={handleChange('D_10_6_SexParent')}
                                    value = {parentChildData['D_10_6_SexParent'].value}>
                                        <MenuItem value={1}>1 = Male</MenuItem>
                                        <MenuItem value={2}>2 = Female (Preterm and Term newborns)</MenuItem>
                                </Select>
                                </FormControl>
                            :   <FormControl sx={{ width: '80%' }}>
                                <InputLabel>Null Flavor</InputLabel>
                                <Select
                                    value = {parentChildData['D_10_6_SexParent'].nullFlavor}
                                    onChange={setNullFlavor('D_10_6_SexParent')}
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
                                checked = {parentChildData['D_10_3_LastMenstrualPeriodDateParent'].nullFlavor !== null}
                                onChange={setUnknown('D_10_3_LastMenstrualPeriodDateParent')}
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                                />}
                                label="No Info"/>
                        {parentChildData['D_10_3_LastMenstrualPeriodDateParent']['nullFlavor'] === null ? 
                            <TextField sx={{ width: '80%' }}
                            label="Last Menstrual Period Date of Parent"
                            variant="outlined"
                            value = {parentChildData['D_10_3_LastMenstrualPeriodDateParent'].value}
                            onChange={handleChange('D_10_3_LastMenstrualPeriodDateParent')}
                            />
                        : <FormControl sx={{ width: '80%' }}>
                            <InputLabel>Null Flavor</InputLabel><Select
                                value = {parentChildData['D_10_3_LastMenstrualPeriodDateParent'].nullFlavor}
                                onChange={setNullFlavor('D_10_3_LastMenstrualPeriodDateParent')}
                            >
                                <MenuItem value={0}>Masked</MenuItem>
                                <MenuItem value={1}>Asked but unknown</MenuItem>
                                <MenuItem value={2}>Not asked</MenuItem>
                            </Select>
                            </FormControl>}
                        </Box>
                    </Stack>
                </Grid>

                <Grid container item xs direction="column" rowGap={1}>

                    <TextField label="Age of Parent" variant="outlined"
                        sx={{ width: '100%' }}
                        onChange={handleChange('D_10_2_2a_AgeParentNum')}
                        value = {parentChildData['D_10_2_2a_AgeParentNum'].value}/>

                    <TextField label="Age of Parent (unit)" variant="outlined"
                        sx={{ width: '100%' }}
                        onChange={handleChange('D_10_2_2b_AgeParentUnit')}
                        value = {parentChildData['D_10_2_2b_AgeParentUnit'].value}/>

                    <TextField label="Body Weight (kg) of Parent" variant="outlined"
                        sx={{ width: '100%' }}
                        onChange={handleChange('D_10_4_BodyWeightParent')}
                        value = {parentChildData['D_10_4_BodyWeightParent'].value}/>
                    
                    <TextField label="Height (cm) of Parent" variant="outlined"
                        sx={{ width: '100%' }}
                        onChange={handleChange('D_10_5_HeightParent')}
                        value = {parentChildData['D_10_5_HeightParent'].value}/>
                </Grid>
        </Grid>

        <Divider sx={{ borderBottomWidth: 5, padding: 2 }}/>

        <Grid container direction="row" columnGap={4}>
            <Grid container item xs direction="column" rowGap={1}>
                <FormLabel sx={{ fontSize: 30, marginLeft: '15%', color: 'black' }}>Relevant Medical History and Concurrent Conditions of Parent</FormLabel>
                    <ParentHistory></ParentHistory>
            </Grid>
            <Grid container item xs direction="column" rowGap={1}>
                <FormLabel sx={{ fontSize: 30, marginLeft: '25%', color: 'black' }}>Relevant Past Drug History of Parent</FormLabel>
                <ParentDrugsHistory></ParentDrugsHistory>
            </Grid>
        </Grid>
    </>
	);
}