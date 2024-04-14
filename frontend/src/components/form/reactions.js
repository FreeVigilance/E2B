
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Stack, FormControlLabel, Select, MenuItem, FormControl, InputLabel, Grid, Divider, IconButton, FormLabel} from '@mui/material';
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
import { drugsSelector, setDrugReactionMatrix, setRelatedness } from '@src/features/drugs/slice';
import { ReactionFieldLabel } from '../field-labels/reaction-field-label';
import InputMask from 'react-input-mask'


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
    },
    idLabel: {
        fontWeight: 600,
        color: 'white',
        paddingLeft: '10%',
    }
})

export const Reactions = () => {
    const classes = useStyles();
	const dispatch = useDispatch();
    const {reactionsData} = useSelector(reactionsSelector);
    const {drugReactionMatrix, relatedness} = useSelector(drugsSelector);

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
                    <Stack direction={'column'} spacing={3}>
                        <div style={{border: '2px solid', borderRadius: '5px', width: '30%', background: "#1976d2"}}>
                            {item['id'] !== null 
                                ? <FormLabel className={classes.idLabel}>Reaction id = {item['id']}</FormLabel>
                                : <FormLabel className={classes.idLabel}>Reaction id = {item['uuid']}</FormLabel>
                            }
                        </div>

                    <Grid container spacing={2}>
                        
                        <Grid item xs={3}>
                            <ReactionFieldLabel label="Reported by the Primary Source in Native Language"
                            field = 'E_i_1_1a_ReactionPrimarySourceNativeLanguage' index={index}></ReactionFieldLabel>
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
                            <ReactionFieldLabel label="Reported by the Primary Source Language" 
                            field = 'E_i_1_1b_ReactionPrimarySourceLanguage' index={index}></ReactionFieldLabel>
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
                            <ReactionFieldLabel label="Reported by the Primary Source for Translation"
                            field = 'E_i_1_2_ReactionPrimarySourceTranslation' index={index}></ReactionFieldLabel>
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
                            <ReactionFieldLabel label="MedDRA Version for Reaction"
                            field = 'E_i_2_1a_MedDRAVersionReaction' index={index}></ReactionFieldLabel>
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
                            <ReactionFieldLabel label="Reaction / Event MedDRA Code"
                            field = 'E_i_2_1b_ReactionMedDRACode' index={index}></ReactionFieldLabel>
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
                            <ReactionFieldLabel label="Term Highlighted by the Reporter"
                            field = 'E_i_3_1_TermHighlightedReporter' index={index}></ReactionFieldLabel>
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
                            <ReactionFieldLabel label='Outcome of Reaction at the Time of Last Observation'
                            field = 'E_i_7_OutcomeReactionLastObservation' index={index}></ReactionFieldLabel>
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
                            <ReactionFieldLabel label='Medical Confirmation by Healthcare Professional'
                            field = 'E_i_8_MedicalConfirmationHealthcareProfessional' index={index}></ReactionFieldLabel>
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
                            <ReactionFieldLabel label="Identification of the Country Where the Reaction Occurred"
                            field = 'E_i_9_IdentificationCountryReaction' index={index}></ReactionFieldLabel>
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
                            <ReactionFieldLabel label="Start Date of Reaction"
                            field = 'E_i_4_DateStartReaction' index={index}></ReactionFieldLabel>
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
                                <InputMask mask="9999-99-99 99:99:99" maskChar='_'
                                    className={classes.textShort}
                                    value = {item['E_i_4_DateStartReaction'].value}
                                    onChange={handleChange('E_i_4_DateStartReaction', index)}>
                                    {(inputProps) => <TextField  {...inputProps}
                                                        variant="outlined"/>}
                                </InputMask>

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
                            <ReactionFieldLabel label='End Date of Reaction'
                            field = 'E_i_5_DateEndReaction' index={index}></ReactionFieldLabel>
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
                                <InputMask mask="9999-99-99 99:99:99" maskChar='_'
                                    className={classes.textShort}
                                    value = {item['E_i_5_DateEndReaction'].value}
                                    onChange={handleChange('E_i_5_DateEndReaction', index)}>
                                    {(inputProps) => <TextField  {...inputProps}
                                                        variant="outlined"/>}
                                </InputMask>
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
                            <ReactionFieldLabel label='Results in Death'
                            field = 'E_i_3_2a_ResultsDeath' index={index}></ReactionFieldLabel>
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
                            <ReactionFieldLabel label='Life Threatening'
                            field = 'E_i_3_2b_LifeThreatening' index={index}></ReactionFieldLabel>
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
                            <ReactionFieldLabel label='Caused / Prolonged Hospitalisation'
                            field = 'E_i_3_2c_CausedProlongedHospitalisation' index={index}></ReactionFieldLabel>
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
                            <ReactionFieldLabel label='Disabling / Incapacitating'
                            field = 'E_i_3_2d_DisablingIncapacitating' index={index}></ReactionFieldLabel>
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
                            <ReactionFieldLabel label='Congenital Anomaly / Birth Defect'
                            field = 'E_i_3_2e_CongenitalAnomalyBirthDefect' index={index}></ReactionFieldLabel>
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
                            <ReactionFieldLabel label='Other Medically Important Condition'
                            field = 'E_i_3_2f_OtherMedicallyImportantCondition' index={index}></ReactionFieldLabel>
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
                            <ReactionFieldLabel label='Duration of Reaction (number)'
                            field = 'E_i_6a_DurationReactionNum' index={index}></ReactionFieldLabel>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                className={classes.textXshort}
                                value = {item['E_i_6a_DurationReactionNum'].value}
                                onChange={handleChange('E_i_6a_DurationReactionNum', index, true, 5)}
                                autoComplete="off"
                                InputProps={{ inputProps: { min: 1, max: 4 } }}
                                // type='number'
                                onKeyDown={(evt) =>
                                    (evt.key === "-" || evt.key === "+" || evt.key === "e" || evt.key === "," || evt.key === ".") &&
                                    evt.preventDefault()
                                }
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <ReactionFieldLabel label="Duration of Reaction (unit)"
                            field = 'E_i_6b_DurationReactionUnit' index={index}></ReactionFieldLabel>
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
        

        let drugReactionMatrixCopy = JSON.parse(JSON.stringify(drugReactionMatrix));
        let drugInd = null;
        let matrixInd = null;
        Object.values(drugReactionMatrixCopy).forEach((drug, drugIndex) => {
            drug.forEach((matrix, matrixIndex) => {
                if (matrix['G_k_9_i_1_ReactionAssessed'] === reactionsData[index]['id'] ||
                    matrix['G_k_9_i_1_ReactionAssessed'] === reactionsData[index]['uuid'] ) {
                        drugInd = drugIndex;
                        matrixInd = matrixIndex;
                        return;
                    }
            });
            if (drugInd !== null && matrixInd !== null) {
                return;
            }
        });

        if (drugInd !== null && matrixInd !== null) {
            drugReactionMatrixCopy[drugInd].splice(matrixInd, 1);

            let relatednessCopy = JSON.parse(JSON.stringify(relatedness));
            for (let ind = matrixInd; ind <= Object.keys(relatedness[drugInd]).length; ind++) {
                relatednessCopy[drugInd][ind] = relatednessCopy[drugInd][ind + 1];
            }
            // relatednessCopy[drugInd].splice(relatednessCopy.length - 1, 1);

            
            dispatch(setDrugReactionMatrix(drugReactionMatrixCopy));
            dispatch(setRelatedness(relatednessCopy));
        }


        reactionsDataCopy.splice(index, 1);
        dispatch(setReactionsData(reactionsDataCopy));
    }

	return (
        <div >
            {formList()}
        </div>
	);
}