import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Stack, FormControlLabel, Box, Select, MenuItem, FormControl, InputLabel, Card, CardContent, IconButton} from '@mui/material';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import AddIcon from '@mui/icons-material/Add';
import { setStudyRegistration, studyIdentificationSelector } from '@src/features/study-identification/slice';
import { StudyRegistration } from '@src/features/study-identification/study-identification';
import DeleteIcon from '@mui/icons-material/Delete';
import { narrativeSelector, setDiagnosis, setSummaryComments } from '@src/features/narrative/slice';
import { Diagnosis, SummaryComments } from '@src/features/narrative/narrative';


export const SummaryCommentsComp = () => {
	const dispatch = useDispatch();
    const {summaryComments} = useSelector(narrativeSelector);

    useEffect(() => {
        console.log("STATE");
        console.log(summaryComments);
    });

    const handleChange = (fieldName, index) => (event) => {
        let summaryCommentsCopy = JSON.parse(JSON.stringify(summaryComments));
        summaryCommentsCopy[index][fieldName].value = event.target.value;
        dispatch(setSummaryComments(summaryCommentsCopy));
    };

    const formList = () => {
        let list = [];
        if (summaryComments.length === 0) {
            return ( <span>
                <IconButton size='large' style= {{ top: '10px'}}
                sx={{ color: "white", backgroundColor: "#1976d2"}}
                            onClick={addForm}><AddIcon/></IconButton>
            </span>);
        }
        Object.values(summaryComments).forEach((item, index) => {
            list.push(
                <Card sx={{border: "3px solid #094B8C",
                padding: "10px",
                boxShadow: "5px 5px #356BA0",
                marginBottom: 5}}>
                    <CardContent>
                        <Stack direction="column" spacing={2} justifyContent="flex-start">

                            <TextField label="Case Summary and Reporter’s Comments Language" variant="outlined"
                                sx={{ width: '80%' }}
                                inputProps={{ maxLength: 3}}
                                onChange={handleChange('H_5_r_1b_CaseSummaryReporterCommentsLanguage', index)}
                                value = {item['H_5_r_1b_CaseSummaryReporterCommentsLanguage'].value}/>
                            
                            <TextField label="Case Summary and Reporter’s Comments" variant="outlined"
                                sx={{ width: '80%' }}
                                inputProps={{ maxLength: 100000}}
                                onChange={handleChange('H_5_r_1a_CaseSummaryReporterCommentsText', index)}
                                value = {item['H_5_r_1a_CaseSummaryReporterCommentsText'].value}/>

                        <Stack direction="row" justifyContent="flex-start">
                            <span>
                                <IconButton size='large' style= {{ top: '10px', right: '10px'}}
                                sx={{ color: "white", backgroundColor: "#1976d2"}}
                                        onClick={() => removeForm(index)}><DeleteIcon/>
                                </IconButton>
                            </span>

                            {index === summaryComments.length - 1 ?
                                <span>
                                    <IconButton size='large' style= {{ top: '10px'}}
                                    sx={{ color: "white", backgroundColor: "#1976d2"}}
                                                onClick={addForm}><AddIcon/></IconButton>
                                </span> : null}
                            </Stack>
                        </Stack>
                </CardContent>
            </Card>
            );
        });
        return list;
    }

    const addForm = () => {
        let summaryCommentsCopy = JSON.parse(JSON.stringify(summaryComments));
        let summaryCommentsNew = new SummaryComments();
        summaryCommentsCopy.push(summaryCommentsNew);
        dispatch(setSummaryComments(summaryCommentsCopy));
    }

    const removeForm = (index) => {
        let summaryCommentsCopy = JSON.parse(JSON.stringify(summaryComments));
        summaryCommentsCopy.splice(index, 1);
        dispatch(setSummaryComments(summaryCommentsCopy));
    }

    return(
        <div>
            {formList()}
        </div>
    )
}