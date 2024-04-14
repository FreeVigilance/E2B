import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Divider, FormLabel, Grid, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import { narrativeSelector, setNarrativeCaseSummary } from '@src/features/narrative/slice';
import { DiagnosisComp } from './diagnosis';
import { SummaryCommentsComp } from './summaryComments';
import {makeStyles} from '@mui/styles';
import { NarrativeFieldLabel } from '@src/components/field-labels/narrative/narrative-label';

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

var snakecaseKeys = require('snakecase-keys')

export const NarrativeComp = () => {
    const classes = useStyles();

	const dispatch = useDispatch();
    const {narrativeCaseSummary} = useSelector(narrativeSelector);

    const handleChange = (fieldName) => (event) => {
        let narrativeCaseSummaryCopy = JSON.parse(JSON.stringify(narrativeCaseSummary));
        narrativeCaseSummaryCopy[fieldName].value = event.target.value;
        dispatch(setNarrativeCaseSummary(narrativeCaseSummaryCopy));
    };    

	return (
        <>
        <Stack direction="column" spacing={2} justifyContent="flex-start">
            
            <NarrativeFieldLabel label="Case Narrative Including Clinical Course, Therapeutic Measures, Outcome and 
            Additional Relevant Information"
            field = 'H_1_CaseNarrative'></NarrativeFieldLabel>
            <TextField variant="outlined"
                className={classes.textLong}
                inputProps={{ maxLength: 100000}}
                onChange={handleChange('H_1_CaseNarrative')}
                value = {narrativeCaseSummary['H_1_CaseNarrative'].value}
                multiline
                rows={15}/>

            <NarrativeFieldLabel label="Reporter's Comments"
            field = 'H_2_ReporterComments'></NarrativeFieldLabel>
            <TextField variant="outlined"
                className={classes.textLong}
                inputProps={{ maxLength: 20000}}
                onChange={handleChange('H_2_ReporterComments')}
                value = {narrativeCaseSummary['H_2_ReporterComments'].value}
                multiline
                rows={15}/>

            <NarrativeFieldLabel label="Sender's Comments"
            field = 'H_4_SenderComments'></NarrativeFieldLabel>
            <TextField variant="outlined"
                className={classes.textLong}
                inputProps={{ maxLength: 20000}}
                onChange={handleChange('H_4_SenderComments')}
                value = {narrativeCaseSummary['H_4_SenderComments'].value}
                multiline
                rows={15}/>

        </Stack>

        <Divider sx={{ borderBottomWidth: 5, padding: 2 }}/>

        <Grid container direction="row" columnGap={4}>
            <Grid container item xs direction="column" rowGap={1}>
                <FormLabel sx={{ fontSize: 30, marginLeft: '35%', color: 'black' }}>Sender’s Diagnosis</FormLabel>
                <DiagnosisComp></DiagnosisComp>
            </Grid>    
            <Grid container item xs direction="column" rowGap={1}>
                <FormLabel sx={{ fontSize: 30, marginLeft: '25%', color: 'black' }}>Case Summary and Reporter’s Comments</FormLabel>
                <SummaryCommentsComp></SummaryCommentsComp>
            </Grid>       
        </Grid>
    </>


	);
}