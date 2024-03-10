import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Stack, Card, CardContent, IconButton} from '@mui/material';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { drugsSelector, setRelatedness } from '@src/features/drugs/slice';
import { Relatedness } from '@src/features/drugs/drugs';


export const Relatednesses = ({drugIndex, matrixIndex}) => {
	const dispatch = useDispatch();
    const {relatedness} = useSelector(drugsSelector);

    useEffect(() => {
        console.log("STATE");
        console.log(relatedness);
    });

    const handleChange = (fieldName, index) => (event) => {
        let relatednessCopy = JSON.parse(JSON.stringify(relatedness));
        relatednessCopy[drugIndex][matrixIndex][index][fieldName].value = event.target.value;
        dispatch(setRelatedness(relatednessCopy));
    };

    const formList = () => {
        let list = [];
        console.log("AAAAAAAA");
        console.log(relatedness[drugIndex]);
        Object.values(relatedness[drugIndex][matrixIndex]).forEach((item, index) => {
            list.push(
                <Card sx={{border: "3px solid #094B8C",
                padding: "10px",
                boxShadow: "5px 5px #356BA0",
                marginBottom: 5}}>
                    <CardContent>
                        <Stack direction="column" spacing={1} justifyContent="flex-start">  
                        
                            <TextField label="Source of Assessment" variant="outlined"
                                        onChange={handleChange('G_k_9_i_2_r_1_SourceAssessment', index)}
                                        value = {item['G_k_9_i_2_r_1_SourceAssessment'].value}
                                        multiline
                                        rows={2}/>
                            <TextField label="Method of Assessment" variant="outlined"
                                        onChange={handleChange('G_k_9_i_2_r_2_MethodAssessment', index)}
                                        value = {item['G_k_9_i_2_r_2_MethodAssessment'].value}
                                        multiline
                                        rows={2}/>
                            <TextField label="Result of Assessment" variant="outlined"
                                        onChange={handleChange('G_k_9_i_2_r_3_ResultAssessment', index)}
                                        value = {item['G_k_9_i_2_r_3_ResultAssessment'].value}
                                        multiline
                                        rows={2}/>

                            {index === relatedness[drugIndex][matrixIndex].length - 1 ?
                                <span>
                                    <IconButton size='large' style= {{ top: '10px'}}
                                    sx={{ color: "white", backgroundColor: "#1976d2"}}
                                                onClick={addForm}><AddIcon/></IconButton>
                                </span> : null}
                        </Stack>
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

    return(
        <div>
            {formList()}
        </div>
    )
}