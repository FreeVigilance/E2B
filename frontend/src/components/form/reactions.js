
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
import {makeStyles} from '@mui/styles';
import { FieldLabel } from './fieldLabel';


var snakecaseKeys = require('snakecase-keys')

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

export const Reactions = () => {
    const classes = useStyles();
	const dispatch = useDispatch();
    const {reactionsData} = useSelector(reactionsSelector);

    const handleChange = (fieldName, index, isNumber = false, length = 1) => (event) => {
        let value = event.target.value
        if (isNumber) {
            if (value.length > length)
                value = value.slice(0, length)
        }
        let reactionsDataCopy = JSON.parse(JSON.stringify(reactionsData));
        reactionsDataCopy[index][fieldName].value = value;
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
                    <Grid container spacing={2}>

                        <Grid item xs={3}>
                            <FieldLabel label="Reported by the Primary Source in Native Language"></FieldLabel>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField variant="outlined"
                                className={classes.textLong}
                                onChange={handleChange('E_i_1_1a_ReactionPrimarySourceNativeLanguage', index)}
                                value = {item['E_i_1_1a_ReactionPrimarySourceNativeLanguage'].value}
                                multiline
                                inputProps={{ maxLength: 250}}
                                rows={2}/>
                        </Grid>

                        <Grid item xs={3}>
                            <FieldLabel label="Reported by the Primary Source Language" ></FieldLabel>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField variant="outlined"
                                className={classes.textLong}
                                onChange={handleChange('E_i_1_1b_ReactionPrimarySourceLanguage', index)}
                                value = {item['E_i_1_1b_ReactionPrimarySourceLanguage'].value}
                                multiline
                                inputProps={{ maxLength: 250}}
                                rows={2}/>
                        </Grid>

                        <Grid item xs={3}>
                            <FieldLabel label="Reported by the Primary Source for Translation"></FieldLabel>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField variant="outlined"
                                className={classes.textLong}
                                onChange={handleChange('E_i_1_2_ReactionPrimarySourceTranslation', index)}
                                value = {item['E_i_1_2_ReactionPrimarySourceTranslation'].value}
                                multiline
                                inputProps={{ maxLength: 250}}
                                rows={2}/>
                        </Grid>
                    </Grid>

                    <Divider sx={{ borderWidth: 0, padding: 2 }}></Divider>

                    <Stack direction={'row'}>
                    <Grid container spacing={2}>

                        <Grid item xs={4}>
                            <FieldLabel label="MedDRA Version for Reaction"></FieldLabel>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                className={classes.textXshort}
                                autoComplete="off"
                                value = {item['E_i_2_1a_MedDRAVersionReaction'].value}
                                onChange={handleChange('E_i_2_1a_MedDRAVersionReaction', index, true, 4)}
                                type='number'
                                onKeyDown={(evt) =>
                                    (evt.key === "-" || evt.key === "+" || evt.key === "e" || evt.key === ",") &&
                                    evt.preventDefault()
                                }
                                />
                        </Grid>
                        <Grid item xs={4}>
                            <FieldLabel label="Reaction / Event MedDRA Code"></FieldLabel>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                className={classes.textXshort}
                                onChange={handleChange('E_i_2_1b_ReactionMedDRACode', index, true, 8)}
                                value = {item['E_i_2_1b_ReactionMedDRACode'].value}
                                autoComplete="off"
                                type='number'
                                onKeyDown={(evt) =>
                                    (evt.key === "-" || evt.key === "+" || evt.key === "e" || evt.key === "," || evt.key === ".") &&
                                    evt.preventDefault()
                                }
                                />
                        </Grid>
                        <Grid item xs={4}>
                            <FieldLabel label="Term Highlighted by the Reporter"></FieldLabel>
                        </Grid>
                        <Grid item xs={8}>
                            <Select
                                className={classes.textMedium}
                                value = {item['E_i_3_1_TermHighlightedReporter'].value}
                                onChange={handleChange('E_i_3_1_TermHighlightedReporter', index)}>
                                <MenuItem value={1}>1 = Yes, highlighted by the reporter, NOT serious</MenuItem>
                                <MenuItem value={2}>2 = No, not highlighted by the reporter, NOT serious</MenuItem>
                                <MenuItem value={3}>3 = Yes, highlighted by the reporter, SERIOUS</MenuItem>
                                <MenuItem value={4}>4 = No, not highlighted by the reporter, SERIOUS</MenuItem>
                            </Select>
                        </Grid>

                        <Grid item xs={4}>
                            <FieldLabel label='Outcome of Reaction at the Time of Last Observation'></FieldLabel>
                        </Grid>
                        <Grid item xs={8}>
                            <Select
                                className={classes.textMedium}
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
                        </Grid>

                        <Grid item xs={4}>
                            <FieldLabel label='Medical Confirmation by Healthcare Professional'></FieldLabel>
                        </Grid>
                        <Grid item xs={8}>
                            <Select
                                className={classes.textMedium}
                                onChange={handleChange('E_i_8_MedicalConfirmationHealthcareProfessional', index)}
                                value = {item['E_i_8_MedicalConfirmationHealthcareProfessional'].value}
                                defaultValue = {0}>
                                <MenuItem value={1}>Confirmed</MenuItem>
                                <MenuItem value={0}>NOT confirmed</MenuItem>
                            </Select>
                        </Grid>

                        <Grid item xs={4}>
                            <FieldLabel label="Identification of the Country Where the Reaction Occurred"></FieldLabel>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                className={classes.textXshort}
                                variant="outlined"
                                inputProps={{ maxLength: 2}}
                                onChange={handleChange('E_i_9_IdentificationCountryReaction', index)}
                                value = {item['E_i_9_IdentificationCountryReaction'].value}
                                />
                        </Grid>
                        
                        <Grid item xs={4}>
                            <FieldLabel label="Start Date of Reaction"></FieldLabel>
                        </Grid>
                        <Grid item xs={8}>  
                            <Stack direction={'row'}>
                                <Box className="text-small">
                                            <FormControlLabel
                                            control={<Checkbox
                                                checked = {item['E_i_4_DateStartReaction'].nullFlavor !== null}
                                                onChange={setUnknown('E_i_4_DateStartReaction', index)}
                                                />}
                                            label="No Info"/>
                                    </Box>
                                {reactionsData[index]['E_i_4_DateStartReaction']['nullFlavor'] === null ? 
                                    <TextField
                                    className={classes.textShort}
                                    variant="outlined"
                                    value = {item['E_i_4_DateStartReaction'].value}
                                    onChange={handleChange('E_i_4_DateStartReaction', index)}
                                    />
                                    :   
                                        <FormControl className={classes.textXshort}>
                                            <InputLabel>Null Flavor</InputLabel>
                                            <Select
                                                value = {item['E_i_4_DateStartReaction'].nullFlavor}
                                                onChange={setNullFlavor('E_i_4_DateStartReaction', index)}>
                                                <MenuItem value={0}>Masked</MenuItem>
                                                <MenuItem value={1}>Asked, but not known</MenuItem>
                                                <MenuItem value={2}>Not asked</MenuItem>
                                            </Select>
                                        </FormControl>
                                    }
                                </Stack> 
                        </Grid>

                        <Grid item xs={4}>
                            <FieldLabel label='End Date of Reaction'></FieldLabel>
                        </Grid>
                        <Grid item xs={8}>
                            <Stack direction={'row'}>
                                <Box className="text-small">
                                    <FormControlLabel
                                    control={<Checkbox
                                        checked = {item['E_i_5_DateEndReaction'].nullFlavor !== null}
                                        onChange={setUnknown('E_i_5_DateEndReaction', index)}
                                        />}
                                    label="No Info"/>
                                </Box>

                                {reactionsData[index]['E_i_5_DateEndReaction']['nullFlavor'] === null ? 
                                    <TextField
                                    className={classes.textShort}
                                    variant="outlined"
                                    value = {item['E_i_5_DateEndReaction'].value}
                                    onChange={handleChange('E_i_5_DateEndReaction', index)}
                                    />
                                    : <FormControl className={classes.textXshort}>
                                        <InputLabel>Null Flavor</InputLabel>
                                        <Select
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
                        </Grid>


                    </Grid>

                    <Grid container spacing={2}>


                        <Grid item xs={4}>
                            <FieldLabel label='Results in Death'></FieldLabel>
                        </Grid>
                        <Grid item xs={8}>
                            <Select 
                                className={classes.textXshort}
                                value = {item['E_i_3_2a_ResultsDeath'].value}
                                defaultValue = {false}
                                onChange={handleChange('E_i_3_2a_ResultsDeath', index)}>
                                <MenuItem value={true}>Yes</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                            </Select>
                        </Grid>

                        <Grid item xs={4}>
                            <FieldLabel label='Life Threatening'></FieldLabel>
                        </Grid>
                        <Grid item xs={8}>
                            <Select 
                                className={classes.textXshort}
                                value = {item['E_i_3_2b_LifeThreatening'].value}
                                defaultValue = {false}
                                onChange={handleChange('E_i_3_2b_LifeThreatening', index)}>
                                <MenuItem value={true}>Yes</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                            </Select>
                        </Grid>

                        <Grid item xs={4}>
                            <FieldLabel label='Caused / Prolonged Hospitalisation'></FieldLabel>
                        </Grid>
                        <Grid item xs={8}>
                            <Select
                                className={classes.textXshort}
                                value = {item['E_i_3_2c_CausedProlongedHospitalisation'].value}
                                defaultValue = {false}
                                onChange={handleChange('E_i_3_2c_CausedProlongedHospitalisation', index)}>
                                <MenuItem value={true}>Yes</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                            </Select>
                        </Grid>

                        <Grid item xs={4}>
                            <FieldLabel label='Disabling / Incapacitating'></FieldLabel>
                        </Grid>
                        <Grid item xs={8}>
                            <Select
                                className={classes.textXshort}
                                value = {item['E_i_3_2d_DisablingIncapacitating'].value}
                                defaultValue = {false}
                                onChange={handleChange('E_i_3_2d_DisablingIncapacitating', index)}>
                                <MenuItem value={true}>Yes</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                            </Select>
                        </Grid>

                        <Grid item xs={4}>
                            <FieldLabel label='Congenital Anomaly / Birth Defect'></FieldLabel>
                        </Grid>
                        <Grid item xs={8}>
                            <Select
                                className={classes.textXshort}
                                defaultValue = {false}
                                value = {item['E_i_3_2e_CongenitalAnomalyBirthDefect'].value}
                                onChange={handleChange('E_i_3_2e_CongenitalAnomalyBirthDefect', index)}>
                                <MenuItem value={true}>Yes</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                            </Select>
                        </Grid>

                        <Grid item xs={4}>
                            <FieldLabel label='Other Medically Important Condition'></FieldLabel>
                        </Grid>
                        <Grid item xs={8}>
                            <Select
                                className={classes.textXshort}
                                defaultValue = {false}
                                value = {item['E_i_3_2f_OtherMedicallyImportantCondition'].value}
                                onChange={handleChange('E_i_3_2f_OtherMedicallyImportantCondition', index)}>
                                <MenuItem value={true}>Yes</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                            </Select>
                        </Grid>

                        <Grid item xs={4}>
                            <FieldLabel label='Duration of Reaction (number)'></FieldLabel>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                className={classes.textXshort}
                                value = {item['E_i_6a_DurationReactionNum'].value}
                                onChange={handleChange('E_i_6a_DurationReactionNum', index, true, 5)}
                                autoComplete="off"
                                InputProps={{ inputProps: { min: 1, max: 4 } }}
                                type='number'
                                onKeyDown={(evt) =>
                                    (evt.key === "-" || evt.key === "+" || evt.key === "e" || evt.key === "," || evt.key === ".") &&
                                    evt.preventDefault()
                                }
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <FieldLabel label="Duration of Reaction (unit)"></FieldLabel>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField 
                                className={classes.textMedium}
                                value = {item['E_i_6b_DurationReactionUnit'].value}
                                variant="outlined"
                                inputProps={{ maxLength: 50}}
                                onChange={handleChange('E_i_6b_DurationReactionUnit', index)}
                                />
                        </Grid>
                    </Grid>
                    </Stack>

                {index === reactionsData.length - 1 ?
                    <span>
                        <IconButton size='large' style= {{ top: '10px', right: '10px'}}
                        sx={{ color: "white", backgroundColor: "#1976d2"}}
                                    onClick={addForm}><AddIcon/></IconButton>
                    </span> : null}
                <span>
                            <IconButton size='large' style= {{ top: '10px'}}
                            sx={{ color: "white", backgroundColor: "#000066"}}
                                    onClick={() => removeForm(index)}><DeleteIcon/>
                            </IconButton>
                </span>
            </CardContent>
        </Card>);
        });
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