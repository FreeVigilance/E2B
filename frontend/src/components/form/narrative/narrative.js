import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Divider, FormLabel, Grid, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import { narrativeSelector, setNarrativeCaseSummary } from '@src/features/narrative/slice';
import { DiagnosisComp } from './diagnosis';
import { SummaryCommentsComp } from './summaryComments';

var snakecaseKeys = require('snakecase-keys')

export const NarrativeComp = () => {
	const dispatch = useDispatch();
    const {narrativeCaseSummary} = useSelector(narrativeSelector);

    useEffect(() => {
        console.log("STATE");
        console.log(snakecaseKeys(narrativeCaseSummary));
    });

    const handleChange = (fieldName) => (event) => {
        let narrativeCaseSummaryCopy = JSON.parse(JSON.stringify(narrativeCaseSummary));
        narrativeCaseSummaryCopy[fieldName].value = event.target.value;
        dispatch(setNarrativeCaseSummary(narrativeCaseSummaryCopy));
    };    

	return (
        <>
        <Stack direction="row" spacing={2} justifyContent="flex-start">
            
            <TextField label="Case Narrative Including Clinical Course, Therapeutic Measures, Outcome and 
            Additional Relevant Information" variant="outlined"
                sx={{ width: '100%' }}
                inputProps={{ maxLength: 100000}}
                onChange={handleChange('H_1_CaseNarrative')}
                value = {narrativeCaseSummary['H_1_CaseNarrative'].value}
                multiline
                rows={10}/>

            <TextField label="Reporter's Comments" variant="outlined"
                sx={{ width: '100%' }}
                inputProps={{ maxLength: 20000}}
                onChange={handleChange('H_2_ReporterComments')}
                value = {narrativeCaseSummary['H_2_ReporterComments'].value}
                multiline
                rows={10}/>

            <TextField label="Sender's Comments" variant="outlined"
                sx={{ width: '100%' }}
                inputProps={{ maxLength: 20000}}
                onChange={handleChange('H_4_SenderComments')}
                value = {narrativeCaseSummary['H_4_SenderComments'].value}
                multiline
                rows={10}/>

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