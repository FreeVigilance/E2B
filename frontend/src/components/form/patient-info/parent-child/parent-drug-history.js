
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Stack, FormControlLabel, Box, Select, MenuItem, FormControl, InputLabel, Grid, Card, CardContent, IconButton} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { patientSelector, setParentDrugHistory } from '@src/features/patient/slice';
import AddIcon from '@mui/icons-material/Add';
import { ParentDrugHistory } from '@src/features/patient/patient';


export const ParentDrugsHistory = () => {
	const dispatch = useDispatch();
    const {parentDrugHistory} = useSelector(patientSelector);

    useEffect(() => {
        console.log("STATE");
        console.log(parentDrugHistory);
    });

    const handleChange = (fieldName, index) => (event) => {
        let parentdrugHistoryCopy = JSON.parse(JSON.stringify(parentDrugHistory));
        parentdrugHistoryCopy[index][fieldName].value = event.target.value;
        dispatch(setParentDrugHistory(parentdrugHistoryCopy));
    };

    const setNullFlavor = (fieldName, index) => (event) => {
        let parentdrugHistoryCopy = JSON.parse(JSON.stringify(parentDrugHistory));
        parentdrugHistoryCopy[index][fieldName].nullFlavor = event.target.value;
        dispatch(setParentDrugHistory(parentdrugHistoryCopy));
    };

    const setUnknown = (fieldName, index) => (event) => {
        console.log(event.target.checked);
        let parentdrugHistoryCopy = JSON.parse(JSON.stringify(parentDrugHistory));
        if (event.target.checked) {
            parentdrugHistoryCopy[index][fieldName].nullFlavor = -1;
        } else {
            parentdrugHistoryCopy[index][fieldName].nullFlavor = null;
        }
        dispatch(setParentDrugHistory(parentdrugHistoryCopy));
    };

    const formList = () => {
        let list = [];
        Object.values(parentDrugHistory).forEach((item, index) => {
            list.push(
                <Card sx={{border: "3px solid #094B8C",
                padding: "10px",
                boxShadow: "5px 5px #356BA0",
                marginBottom: 5}}>
                    <CardContent>
                            <Stack direction="row" spacing={2} justifyContent="flex-start"> 
                                    <Box className="text-small" style={{ padding: 0 }}>
                                        <FormControlLabel
                                        control={<Checkbox
                                                    checked = {item['D_10_8_r_1_NameDrug'].nullFlavor !== null}
                                                    onChange={setUnknown('D_10_8_r_1_NameDrug', index)}
                                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                                    style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                                                    />}
                                                label="No Info"/>
                                    </Box>
                                    {parentDrugHistory[index]['D_10_8_r_1_NameDrug']['nullFlavor'] === null ? 
                                            <TextField label="Name of Drug" variant="outlined"
                                            onChange={handleChange('D_10_8_r_1_NameDrug', index)}
                                            value = {item['D_10_8_r_1_NameDrug'].value}
                                            multiline
                                            rows={3}
                                            sx={{ width: '100%' }}/>
                                            : <FormControl sx={{ width: '100%' }}>
                                                <InputLabel>Null Flavor</InputLabel>
                                                <Select
                                                    defaultValue = {0}
                                                    value = {item['D_10_8_r_1_NameDrug'].nullFlavor}
                                                    onChange={setNullFlavor('D_10_8_r_1_NameDrug', index)}
                                                >
                                                    <MenuItem value={3}>Unknown</MenuItem>
                                                    <MenuItem value={6}>Not applicable</MenuItem>
                                                </Select>
                                                </FormControl>
                                    }
                            </Stack>
                            <Grid container direction="row" columnGap={4} sx={{padding: 2}}>
                                <Grid container item xs direction="column" rowGap={1}>

                                    <TextField label="MPID Version Date/Number" variant="outlined"
                                            onChange={handleChange('D_10_8_r_2a_MPIDVersion', index)}
                                            value = {item['D_10_8_r_2a_MPIDVersion'].value}/>

                                    <TextField label="Medicinal Product Identifier" variant="outlined"
                                            onChange={handleChange('D_10_8_r_2b_MPID', index)}
                                            value = {item['D_10_8_r_2b_MPID'].value}/>

                                    <TextField label="PhPID Version Date/Number" variant="outlined"
                                            onChange={handleChange('D_10_8_r_3a_PhPIDVersion', index)}
                                            value = {item['D_10_8_r_3a_PhPIDVersion'].value}/>

                                    <TextField label="Pharmaceutical Product Identifier" variant="outlined"
                                            onChange={handleChange('D_10_8_r_3b_PhPID', index)}
                                            value = {item['D_10_8_r_3b_PhPID'].value}/>
                                </Grid>

                                <Grid container item xs direction="column" rowGap={1}>
                                    <TextField label="MedDRA Version for Indication" variant="outlined"
                                            onChange={handleChange('D_10_8_r_6a_MedDRAVersionIndication', index)}
                                            value = {item['D_10_8_r_6a_MedDRAVersionIndication'].value}/>

                                    <TextField label="Indication (MedDRA code)" variant="outlined"
                                            onChange={handleChange('D_10_8_r_6b_IndicationMedDRACode', index)}
                                            value = {item['D_10_8_r_6b_IndicationMedDRACode'].value}/>

                                    <TextField label="MedDRA Version for Reaction" variant="outlined"
                                            onChange={handleChange('D_10_8_r_7a_MedDRAVersionReaction', index)}
                                            value = {item['D_10_8_r_7a_MedDRAVersionReaction'].value}/>

                                    <TextField label="Reaction (MedDRA code)" variant="outlined"
                                            onChange={handleChange('D_10_8_r_7b_ReactionsMedDRACode', index)}
                                            value = {item['D_10_8_r_7b_ReactionsMedDRACode'].value}/>
                                </Grid>
                            </Grid>
                            <Stack direction="row" spacing={2} justifyContent="flex-start">
                                <Stack direction="row" spacing={2} justifyContent="flex-start"> 
                                            <Box className="text-small" style={{ padding: 0 }}>
                                                <FormControlLabel
                                                control={<Checkbox
                                                            checked = {item['D_10_8_r_4_StartDate'].nullFlavor !== null}
                                                            onChange={setUnknown('D_10_8_r_4_StartDate', index)}
                                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                                            style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                                                            />}
                                                        label="No Info"/>
                                            </Box>
                                            {parentDrugHistory[index]['D_10_8_r_4_StartDate']['nullFlavor'] === null ? 
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <DateTimePicker
                                                                value = {item['D_10_8_r_4_StartDate'].value}
                                                                renderInput={(props) => <TextField  {...props} />}
                                                                label="Start Date"
                                                                onChange={handleChange('D_10_8_r_4_StartDate', index)}
                                                                />
                                                    </LocalizationProvider>
                                                    : <FormControl sx={{ width: '70%' }}>
                                                        <InputLabel>Null Flavor</InputLabel>
                                                        <Select
                                                            defaultValue = {0}
                                                            value = {item['D_10_8_r_4_StartDate'].nullFlavor}
                                                            onChange={setNullFlavor('D_10_8_r_4_StartDate', index)}
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
                                                            checked = {item['D_10_8_r_5_EndDate'].nullFlavor !== null}
                                                            onChange={setUnknown('D_10_8_r_5_EndDate', index)}
                                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                                            style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                                                            />}
                                                        label="No Info"/>
                                            </Box>
                                            {parentDrugHistory[index]['D_10_8_r_5_EndDate']['nullFlavor'] === null ? 
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <DateTimePicker
                                                                value = {item['D_10_8_r_5_EndDate'].value}
                                                                renderInput={(props) => <TextField  {...props} />}
                                                                label="End Date"
                                                                onChange={handleChange('D_10_8_r_5_EndDate', index)}
                                                                />
                                                    </LocalizationProvider>
                                                    : <FormControl sx={{ width: '70%' }}>
                                                        <InputLabel>Null Flavor</InputLabel>
                                                        <Select
                                                            defaultValue = {0}
                                                            value = {item['D_10_8_r_5_EndDate'].nullFlavor}
                                                            onChange={setNullFlavor('D_10_8_r_5_EndDate', index)}
                                                        >
                                                            <MenuItem value={0}>Masked</MenuItem>
                                                            <MenuItem value={1}>Asked, but not known</MenuItem>
                                                            <MenuItem value={2}>Not asked</MenuItem>
                                                        </Select>
                                                        </FormControl>
                                            }
                                    </Stack>
                            </Stack>
                            {index === parentDrugHistory.length - 1 ?
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
        let parentDrugHistoryCopy = JSON.parse(JSON.stringify(parentDrugHistory));
        let parentDrugHistoryNew = new ParentDrugHistory();
        parentDrugHistoryCopy.push(parentDrugHistoryNew);
        dispatch(setParentDrugHistory(parentDrugHistoryCopy));
    }

    return(
        <div>
            {formList()}
        </div>
    )
}