import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Stack, Card, CardContent, IconButton} from '@mui/material';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { drugsSelector, setRelatedness } from '@src/features/drugs/slice';
import { Relatedness } from '@src/features/drugs/drugs';
import DeleteIcon from '@mui/icons-material/Delete';
import { RelatednessFieldLabel } from '@src/components/field-labels/drugs/matrix/relatedness-label';

export const Relatednesses = ({drugIndex, matrixIndex}) => {
	const dispatch = useDispatch();
    const {relatedness} = useSelector(drugsSelector);

    const handleChange = (fieldName, index) => (event) => {
        let value = event.target.value;
        if (value === '') {
            value = null;
        };
        let relatednessCopy = JSON.parse(JSON.stringify(relatedness));
        relatednessCopy[drugIndex][matrixIndex][index][fieldName].value = value;
        dispatch(setRelatedness(relatednessCopy));
    };

    const formList = () => {
        let list = [];
        console.log("AAAAAAAA");
        console.log(relatedness);
        if (relatedness[drugIndex][matrixIndex].length === 0) {
            return ( <span>
                <IconButton size='large' style= {{ top: '10px'}}
                sx={{ color: "white", backgroundColor: "#1976d2"}}
                            onClick={addForm}><AddIcon/></IconButton>
            </span>);
        }
        Object.values(relatedness[drugIndex][matrixIndex]).forEach((item, index) => {
            list.push(
                <Card sx={{border: "3px solid #094B8C",
                padding: "10px",
                boxShadow: "5px 5px #356BA0",
                marginBottom: 5}}>
                    <CardContent>
                        <Stack direction="column" spacing={1} justifyContent="flex-start">  
                        
                        <RelatednessFieldLabel label="Source of Assessment"
                            field = 'G_k_9_i_2_r_1_SourceAssessment' drugIndex={drugIndex} matrixIndex={matrixIndex} index={index}></RelatednessFieldLabel>

                            <TextField variant="outlined"
                                        onChange={handleChange('G_k_9_i_2_r_1_SourceAssessment', index)}
                                        value = {item['G_k_9_i_2_r_1_SourceAssessment'].value}
                                        inputProps={{ maxLength: 60}}/>

                        <RelatednessFieldLabel label="Method of Assessment"
                            field = 'G_k_9_i_2_r_2_MethodAssessment' drugIndex={drugIndex} matrixIndex={matrixIndex} index={index}></RelatednessFieldLabel>
                            
                            <TextField  variant="outlined"
                                        onChange={handleChange('G_k_9_i_2_r_2_MethodAssessment', index)}
                                        value = {item['G_k_9_i_2_r_2_MethodAssessment'].value}
                                        inputProps={{ maxLength: 60}}/>
                        
                        <RelatednessFieldLabel label="Result of Assessment"
                            field = 'G_k_9_i_2_r_3_ResultAssessment' drugIndex={drugIndex} matrixIndex={matrixIndex} index={index}></RelatednessFieldLabel>
                            <TextField variant="outlined"
                                        onChange={handleChange('G_k_9_i_2_r_3_ResultAssessment', index)}
                                        value = {item['G_k_9_i_2_r_3_ResultAssessment'].value}
                                        inputProps={{ maxLength: 60}}/>
                        </Stack>

                            {index === relatedness[drugIndex][matrixIndex].length - 1 ?
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
        let relatednessCopy = JSON.parse(JSON.stringify(relatedness));
        let relatednessNew = new Relatedness();
        relatednessCopy[drugIndex][matrixIndex].push(relatednessNew);
        dispatch(setRelatedness(relatednessCopy));
    }

    const removeForm = (index) => {
        let relatednessCopy = JSON.parse(JSON.stringify(relatedness));
        relatednessCopy[drugIndex][matrixIndex].splice(index, 1);
        dispatch(setRelatedness(relatednessCopy));
    }

    return(
        <div>
            {formList()}
        </div>
    )
}