
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Stack, FormControlLabel, Box, Select, MenuItem, FormControl, InputLabel, Grid, Card, CardContent, IconButton} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { patientSelector, setDrugHistory } from '@src/features/patient/slice';
import AddIcon from '@mui/icons-material/Add';
import { DrugHistory } from '@src/features/patient/patient';
import DeleteIcon from '@mui/icons-material/Delete';


export const DrugsHistory = () => {
	const dispatch = useDispatch();
    const {drugHistory} = useSelector(patientSelector);

    useEffect(() => {
        console.log("STATE");
        console.log(drugHistory);
    });

    const handleChange = (fieldName, index) => (event) => {
        let drugHistoryCopy = JSON.parse(JSON.stringify(drugHistory));
        drugHistoryCopy[index][fieldName].value = event.target.value;
        dispatch(setDrugHistory(drugHistoryCopy));
    };

    const setNullFlavor = (fieldName, index) => (event) => {
        let drugHistoryCopy = JSON.parse(JSON.stringify(drugHistory));
        drugHistoryCopy[index][fieldName].nullFlavor = event.target.value;
        dispatch(setDrugHistory(drugHistoryCopy));
    };

    const setUnknown = (fieldName, index) => (event) => {
        console.log(event.target.checked);
        let drugHistoryCopy = JSON.parse(JSON.stringify(drugHistory));
        if (event.target.checked) {
            drugHistoryCopy[index][fieldName].nullFlavor = -1;
        } else {
            drugHistoryCopy[index][fieldName].nullFlavor = null;
        }
        dispatch(setDrugHistory(drugHistoryCopy));
    };

    const formList = () => {
        let list = [];
        if (drugHistory.length === 0) {
            return ( <span>
                <IconButton size='large' style= {{ top: '10px'}}
                sx={{ color: "white", backgroundColor: "#1976d2"}}
                            onClick={addForm}><AddIcon/></IconButton>
            </span>);
        }
        Object.values(drugHistory).forEach((item, index) => {
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
                                                    checked = {item['D_8_r_1_NameDrug'].nullFlavor !== null}
                                                    onChange={setUnknown('D_8_r_1_NameDrug', index)}
                                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                                    style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                                                    />}
                                                label="No Info"/>
                                    </Box>
                                    {drugHistory[index]['D_8_r_1_NameDrug']['nullFlavor'] === null ? 
                                            <TextField label="Name of Drug" variant="outlined"
                                            onChange={handleChange('D_8_r_1_NameDrug', index)}
                                            value = {item['D_8_r_1_NameDrug'].value}
                                            multiline
                                            rows={3}
                                            sx={{ width: '100%' }}/>
                                            : <FormControl sx={{ width: '100%' }}>
                                                <InputLabel>Null Flavor</InputLabel>
                                                <Select
                                                    defaultValue = {0}
                                                    value = {item['D_8_r_1_NameDrug'].nullFlavor}
                                                    onChange={setNullFlavor('D_8_r_1_NameDrug', index)}
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
                                            onChange={handleChange('D_8_r_2a_MPIDVersion', index)}
                                            value = {item['D_8_r_2a_MPIDVersion'].value}/>

                                    <TextField label="Medicinal Product Identifier" variant="outlined"
                                            onChange={handleChange('D_8_r_2b_MPID', index)}
                                            value = {item['D_8_r_2b_MPID'].value}/>

                                    <TextField label="PhPID Version Date/Number" variant="outlined"
                                            onChange={handleChange('D_8_r_3a_PhPIDVersion', index)}
                                            value = {item['D_8_r_3a_PhPIDVersion'].value}/>

                                    <TextField label="Pharmaceutical Product Identifier" variant="outlined"
                                            onChange={handleChange('D_8_r_3b_PhPID', index)}
                                            value = {item['D_8_r_3b_PhPID'].value}/>
                                </Grid>

                                <Grid container item xs direction="column" rowGap={1}>
                                    <TextField label="MedDRA Version for Indication" variant="outlined"
                                            onChange={handleChange('D_8_r_6a_MedDRAVersionIndication', index)}
                                            value = {item['D_8_r_6a_MedDRAVersionIndication'].value}/>

                                    <TextField label="Indication (MedDRA code)" variant="outlined"
                                            onChange={handleChange('D_8_r_6b_IndicationMedDRACode', index)}
                                            value = {item['D_8_r_6b_IndicationMedDRACode'].value}/>

                                    <TextField label="MedDRA Version for Reaction" variant="outlined"
                                            onChange={handleChange('D_8_r_7a_MedDRAVersionReaction', index)}
                                            value = {item['D_8_r_7a_MedDRAVersionReaction'].value}/>

                                    <TextField label="Reaction (MedDRA code)" variant="outlined"
                                            onChange={handleChange('D_8_r_7b_ReactionMedDRACode', index)}
                                            value = {item['D_8_r_7b_ReactionMedDRACode'].value}/>
                                </Grid>
                            </Grid>
                            <Stack direction="row" spacing={2} justifyContent="flex-start">
                                <Stack direction="row" spacing={2} justifyContent="flex-start"> 
                                            <Box className="text-small" style={{ padding: 0 }}>
                                                <FormControlLabel
                                                control={<Checkbox
                                                            checked = {item['D_8_r_4_StartDate'].nullFlavor !== null}
                                                            onChange={setUnknown('D_8_r_4_StartDate', index)}
                                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                                            style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                                                            />}
                                                        label="No Info"/>
                                            </Box>
                                            {drugHistory[index]['D_8_r_4_StartDate']['nullFlavor'] === null ? 
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <DateTimePicker
                                                                value = {item['D_8_r_4_StartDate'].value}
                                                                renderInput={(props) => <TextField  {...props} />}
                                                                label="Start Date"
                                                                onChange={handleChange('D_8_r_4_StartDate', index)}
                                                                />
                                                    </LocalizationProvider>
                                                    : <FormControl sx={{ width: '70%' }}>
                                                        <InputLabel>Null Flavor</InputLabel>
                                                        <Select
                                                            defaultValue = {0}
                                                            value = {item['D_8_r_4_StartDate'].nullFlavor}
                                                            onChange={setNullFlavor('D_8_r_4_StartDate', index)}
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
                                                            checked = {item['D_8_r_5_EndDate'].nullFlavor !== null}
                                                            onChange={setUnknown('D_8_r_5_EndDate', index)}
                                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                                            style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                                                            />}
                                                        label="No Info"/>
                                            </Box>
                                            {drugHistory[index]['D_8_r_5_EndDate']['nullFlavor'] === null ? 
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <DateTimePicker
                                                                value = {item['D_8_r_5_EndDate'].value}
                                                                renderInput={(props) => <TextField  {...props} />}
                                                                label="End Date"
                                                                onChange={handleChange('D_8_r_5_EndDate', index)}
                                                                />
                                                    </LocalizationProvider>
                                                    : <FormControl sx={{ width: '70%' }}>
                                                        <InputLabel>Null Flavor</InputLabel>
                                                        <Select
                                                            defaultValue = {0}
                                                            value = {item['D_8_r_5_EndDate'].nullFlavor}
                                                            onChange={setNullFlavor('D_8_r_5_EndDate', index)}
                                                        >
                                                            <MenuItem value={0}>Masked</MenuItem>
                                                            <MenuItem value={1}>Asked, but not known</MenuItem>
                                                            <MenuItem value={2}>Not asked</MenuItem>
                                                        </Select>
                                                        </FormControl>
                                            }
                                    </Stack>
                            </Stack>
                            <span>
                                <IconButton size='large' style= {{ top: '10px', right: '10px'}}
                                sx={{ color: "white", backgroundColor: "#1976d2"}}
                                        onClick={() => removeForm(index)}><DeleteIcon/>
                                </IconButton>
                            </span>
                            {index === drugHistory.length - 1 ?
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
        let drugHistoryCopy = JSON.parse(JSON.stringify(drugHistory));
        let drugHistoryNew = new DrugHistory();
        drugHistoryCopy.push(drugHistoryNew);
        dispatch(setDrugHistory(drugHistoryCopy));
    }

    const removeForm = (index) => {
        let drugHistoryCopy = JSON.parse(JSON.stringify(drugHistory));
        drugHistoryCopy.splice(index, 1);
        dispatch(setDrugHistory(drugHistoryCopy));
    }

    return(
        <div>
            {formList()}
        </div>
    )
}