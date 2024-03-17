
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Stack, FormControlLabel, Select, MenuItem, FormControl, InputLabel, Grid, Divider, IconButton} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/system';
import { reactionsSelector, setReactionsData } from '@src/features/reactions/slice';
import { Reaction } from '@src/features/reactions/reaction';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';

var snakecaseKeys = require('snakecase-keys')

export const Reactions = () => {
	const dispatch = useDispatch();
    const {reactionsData} = useSelector(reactionsSelector);

    useEffect(() => {
        console.log("STATE");
        console.log(snakecaseKeys(reactionsData));
    });

    const handleChange = (fieldName, index) => (event) => {
        let reactionsDataCopy = JSON.parse(JSON.stringify(reactionsData));
        reactionsDataCopy[index][fieldName].value = event.target.value;
        dispatch(setReactionsData(reactionsDataCopy));
    };

    const setNullFlavor = (fieldName, index) => (event) => {
        let reactionsDataCopy = JSON.parse(JSON.stringify(reactionsData));
        reactionsDataCopy[index][fieldName].nullFlavor = event.target.value;
        dispatch(setReactionsData(reactionsDataCopy));
    };

    const setUnknown = (fieldName, index) => (event) => {
        console.log(event.target.checked);
        let reactionsDataCopy = JSON.parse(JSON.stringify(reactionsData));
        if (event.target.checked) {
            reactionsDataCopy[index][fieldName].nullFlavor = -1;
        } else {
            reactionsDataCopy[index][fieldName].nullFlavor = null;
        }
        dispatch(setReactionsData(reactionsDataCopy));
    };

    const formList = () => {
        let list = [];
        if (reactionsData.length === 0) {
            return ( <span>
                <IconButton size='large' style= {{ top: '10px'}}
                sx={{ color: "white", backgroundColor: "#1976d2"}}
                            onClick={addForm}><AddIcon/></IconButton>
            </span>);
        }
        Object.values(reactionsData).forEach((item, index) => {
            list.push(
                <Card sx={{border: "3px solid #094B8C",
                padding: "10px",
                boxShadow: "5px 5px #356BA0",
                marginBottom: 5}}>
                    <CardContent>
                <Stack direction="column" spacing={4} justifyContent="flex-start">
                    <Stack direction="row" spacing={2} maxWidth={true} justifyContent="center">
                        <TextField label="Reported by the Primary Source in Native Language" variant="outlined"
                            onChange={handleChange('E_i_1_1a_ReactionPrimarySourceNativeLanguage', index)}
                            value = {item['E_i_1_1a_ReactionPrimarySourceNativeLanguage'].value}
                            multiline
                            sx={{ width: '35%' }}
                            rows={4}/>
                        <TextField label="Reported by the Primary Source Language" variant="outlined"
                            onChange={handleChange('E_i_1_1b_ReactionPrimarySourceLanguage', index)}
                            value = {item['E_i_1_1b_ReactionPrimarySourceLanguage'].value}
                            multiline
                            sx={{ width: '35%' }}
                            rows={4}/>
                        <TextField label="Reported by the Primary Source for Translation" variant="outlined"
                            onChange={handleChange('E_i_1_2_ReactionPrimarySourceTranslation', index)}
                            value = {item['E_i_1_2_ReactionPrimarySourceTranslation'].value}
                            multiline
                            sx={{ width: '35%' }}
                            rows={4}/>
                    </Stack>

                    <Divider  orientation='horizontal' flexItem></Divider>

                    <Grid container direction="row" columnGap={4}>
                        <Grid container item xs direction="column" rowGap={1} >
                            <TextField
                                    autoComplete="off"
                                    label="MedDRA Version for Reaction"
                                    value = {item['E_i_2_1a_MedDRAVersionReaction'].value}
                                    onChange={handleChange('E_i_2_1a_MedDRAVersionReaction', index)}
                                />
                            <TextField
                                    onChange={handleChange('E_i_2_1b_ReactionMedDRACode', index)}
                                    value = {item['E_i_2_1b_ReactionMedDRACode'].value}
                                    autoComplete="off"
                                    label="Reaction / Event MedDRA Code"
                                />
                            <FormControl sx={{ width: '100%' }}>
                                <InputLabel>Term Highlighted by the Reporter</InputLabel>
                                <Select
                                    value = {item['E_i_3_1_TermHighlightedReporter'].value}
                                    label="Term Highlighted by the Reporter"
                                    onChange={handleChange('E_i_3_1_TermHighlightedReporter', index)}
                                >
                                    <MenuItem value={1}>1 = Yes, highlighted by the reporter, NOT serious</MenuItem>
                                    <MenuItem value={2}>2 = No, not highlighted by the reporter, NOT serious</MenuItem>
                                    <MenuItem value={3}>3 = Yes, highlighted by the reporter, SERIOUS</MenuItem>
                                    <MenuItem value={4}>4 = No, not highlighted by the reporter, SERIOUS</MenuItem>
                            </Select>
                            </FormControl>

                            <Divider sx={{ color: "white", margin: "14px 0" }}></Divider>

                            <FormControl sx={{ width: '100%' }}>
                                <InputLabel>Outcome of Reaction at the Time of Last Observation</InputLabel>
                            <Select
                                label="Outcome of Reaction at the Time of Last Observation"
                                defaultValue={0}
                                onChange={handleChange('E_i_7_OutcomeReactionLastObservation', index)}
                                value = {item['E_i_7_OutcomeReactionLastObservation'].value}
                                >
                                <MenuItem value={1}>1 = recovered/resolved</MenuItem>
                                <MenuItem value={2}>2 = recovering/resolving</MenuItem>
                                <MenuItem value={3}>3 = not recovered/not resolved/ongoing</MenuItem>
                                <MenuItem value={4}>4 = recovered/resolved with sequelae</MenuItem>
                                <MenuItem value={5}>5 = fatal</MenuItem>
                                <MenuItem value={0}>0 = unknown</MenuItem>
                            </Select>
                            </FormControl>

                            <FormControl sx={{ width: '100%' }}>
                                <InputLabel>Medical Confirmation by Healthcare Professional</InputLabel>
                            <Select
                                label="Medical Confirmation by Healthcare Professional"
                                onChange={handleChange('E_i_8_MedicalConfirmationHealthcareProfessional', index)}
                                value = {item['E_i_8_MedicalConfirmationHealthcareProfessional'].value}
                                defaultValue = {0}
                            >
                                <MenuItem value={1}>Confirmed</MenuItem>
                                <MenuItem value={0}>NOT confirmed</MenuItem>
                            </Select>
                            </FormControl>

                            <TextField
                                label="Identification of the Country Where the Reaction Occurred"
                                variant="outlined"
                                onChange={handleChange('E_i_9_IdentificationCountryReaction', index)}
                                value = {item['E_i_9_IdentificationCountryReaction'].value}
                                />

                        </Grid>
                        <Divider orientation='vertical' flexItem ></Divider>

                        <Grid container item xs direction="column" rowGap={2}>
                            <FormControl sx={{ width: '100%' }}>
                                <InputLabel >Results in Death</InputLabel>
                            <Select 
                                value = {item['E_i_3_2a_ResultsDeath'].value}
                                label="Results in Death"
                                defaultValue = {0}
                                onChange={handleChange('E_i_3_2a_ResultsDeath', index)}
                            >
                                <MenuItem value={true}>Yes</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                            </Select>
                            </FormControl>

                            <FormControl sx={{ width: '100%' }}>
                                <InputLabel >Life Threatening</InputLabel>
                            <Select 
                                value = {item['E_i_3_2b_LifeThreatening'].value}
                                label="Life Threatening"
                                defaultValue = {0}
                                onChange={handleChange('E_i_3_2b_LifeThreatening', index)}
                            >
                                <MenuItem value={true}>Yes</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                            </Select>
                            </FormControl>

                            <FormControl sx={{ width: '100%' }}>
                                <InputLabel>Caused / Prolonged Hospitalisation</InputLabel>
                            <Select
                                value = {item['E_i_3_2c_CausedProlongedHospitalisation'].value}
                                defaultValue = {0}
                                label="Caused / Prolonged Hospitalisation"
                                onChange={handleChange('E_i_3_2c_CausedProlongedHospitalisation', index)}
                            >
                                <MenuItem value={true}>Yes</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                            </Select>
                            </FormControl>

                            <FormControl sx={{ width: '100%' }}>
                                <InputLabel>Disabling / Incapacitating</InputLabel>
                            <Select
                                value = {item['E_i_3_2d_DisablingIncapacitating'].value}
                                defaultValue = {0}
                                label="Disabling / Incapacitating"
                                onChange={handleChange('E_i_3_2d_DisablingIncapacitating', index)}
                            >
                                <MenuItem value={true}>Yes</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                            </Select>
                            </FormControl>

                            <FormControl sx={{ width: '100%' }}>
                                <InputLabel>Congenital Anomaly / Birth Defect</InputLabel>
                            <Select
                                defaultValue = {0}
                                value = {item['E_i_3_2e_CongenitalAnomalyBirthDefect'].value}
                                label="Congenital Anomaly / Birth Defect"
                                onChange={handleChange('E_i_3_2e_CongenitalAnomalyBirthDefect', index)}
                            >
                                <MenuItem value={true}>Yes</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                            </Select>
                            </FormControl>

                            <FormControl sx={{ width: '100%' }}>
                                <InputLabel>Other Medically Important Condition</InputLabel>
                            <Select
                                defaultValue = {0}
                                value = {item['E_i_3_2f_OtherMedicallyImportantCondition'].value}
                                label="Other Medically Important Condition"
                                onChange={handleChange('E_i_3_2f_OtherMedicallyImportantCondition', index)}
                            >
                                <MenuItem value={true}>Yes</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                            </Select>
                            </FormControl>
                        </Grid>
                        
                        <Divider  orientation='vertical' flexItem sx={{ borderBottomWidth: 5 }}></Divider>


                        <Grid container item xs direction="column" rowGap={2}>
                            <Stack direction="row" flexItem spacing={2}>
                                <Box className="text-small" style={{ padding: 0 }}>
                                    <FormControlLabel
                                    control={<Checkbox
                                        checked = {item['E_i_4_DateStartReaction'].nullFlavor !== null}
                                        onChange={setUnknown('E_i_4_DateStartReaction', index)}
                                        sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                        style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                                        />}
                                    label="No Info"/>
                                </Box>
                                {reactionsData[index]['E_i_4_DateStartReaction']['nullFlavor'] === null ? 

                                <TextField
                                label="Start Date of Reaction"
                                variant="outlined"
                                value = {item['E_i_4_DateStartReaction'].value}
                                onChange={handleChange('E_i_4_DateStartReaction', index)}
                                />
                                : <FormControl sx={{ width: '100%' }}>
                                    <InputLabel>Null Flavor</InputLabel>
                                    <Select
                                        defaultValue = {0}
                                        value = {item['E_i_4_DateStartReaction'].nullFlavor}
                                        onChange={setNullFlavor('E_i_4_DateStartReaction', index)}
                                    >
                                        <MenuItem value={0}>Masked</MenuItem>
                                        <MenuItem value={1}>Asked, but not known</MenuItem>
                                        <MenuItem value={2}>Not asked</MenuItem>
                                    </Select>
                                    </FormControl>
                                }
                            </Stack>

                            <Stack direction="row" flexItem spacing={2}>
                                <Box className="text-small" style={{ padding: 0 }}>
                                    <FormControlLabel
                                    control={<Checkbox
                                        checked = {item['E_i_5_DateEndReaction'].nullFlavor !== null}
                                        onChange={setUnknown('E_i_5_DateEndReaction', index)}
                                        sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                        style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                                        />}
                                    label="No Info"/>
                                </Box>
                            {reactionsData[index]['E_i_5_DateEndReaction']['nullFlavor'] === null ? 
                                // <LocalizationProvider dateAdapter={AdapterDayjs}>
                                //         <DateTimePicker
                                //             value = {item['E_i_5_DateEndReaction'].value}
                                //             renderInput={(props) => <TextField  {...props} />}
                                //             label="End Date of Reaction"
                                //             onChange={handleChange('E_i_5_DateEndReaction', index)}
                                //             />
                                // </LocalizationProvider>
                                <TextField
                                label="End Date of Reaction"
                                variant="outlined"
                                value = {item['E_i_5_DateEndReaction'].value}
                                onChange={handleChange('E_i_5_DateEndReaction', index)}
                                />
                                : <FormControl sx={{ width: '100%' }}>
                                    <InputLabel>Null Flavor</InputLabel>
                                    <Select
                                        defaultValue = {0}
                                        value = {item['E_i_5_DateEndReaction'].nullFlavor}
                                        onChange={setNullFlavor('E_i_5_DateEndReaction', index)}
                                    >
                                        <MenuItem value={0}>Masked</MenuItem>
                                        <MenuItem value={1}>Asked, but not known</MenuItem>
                                        <MenuItem value={2}>Not asked</MenuItem>
                                    </Select>
                                    </FormControl>
                            }
                            </Stack>

                            <Divider sx={{ color: "white", margin: "5px 0" }}></Divider>

                            <TextField
                                    value = {item['E_i_6a_DurationReactionNum'].value}
                                    onChange={handleChange('E_i_6a_DurationReactionNum', index)}
                                    autoComplete="off"
                                    InputProps={{ inputProps: { min: 1, max: 4 } }}
                                    label="Duration of Reaction (number)"
                                />

                            <TextField 
                                value = {item['E_i_6b_DurationReactionUnit'].value}
                                label="Duration of Reaction (unit)"
                                variant="outlined"
                                onChange={handleChange('E_i_6b_DurationReactionUnit', index)}
                                />
                        </Grid>
                    </Grid>

                </Stack>
                <span>
                            <IconButton size='large' style= {{ top: '10px', right: '10px'}}
                            sx={{ color: "white", backgroundColor: "#1976d2"}}
                                    onClick={() => removeForm(index)}><DeleteIcon/>
                            </IconButton>
                </span>
                {index === reactionsData.length - 1 ?
                    <span>
                        <IconButton size='large' style= {{ top: '10px'}}
                        sx={{ color: "white", backgroundColor: "#1976d2"}}
                                    onClick={addForm}><AddIcon/></IconButton>
                    </span> : null}
            </CardContent>
        </Card>);
        });
        console.log('list');
        console.log(list);
        return list;
    }

    const addForm = () => {
        let reactionsDataCopy = JSON.parse(JSON.stringify(reactionsData));
        let reactionNew = new Reaction();
        reactionsDataCopy.push(reactionNew);
        dispatch(setReactionsData(reactionsDataCopy));
    }

    const removeForm = (index) => {
        let reactionsDataCopy = JSON.parse(JSON.stringify(reactionsData));
        reactionsDataCopy.splice(index, 1);
        dispatch(setReactionsData(reactionsDataCopy));
    }

	return (
        <div >
            {formList()}
        </div>
	);
}