
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Stack, Card, CardContent, IconButton} from '@mui/material';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { identificationSelector, setOtherIdentifiers } from '@src/features/identification/slice';
import { OtherIdentifiers } from '@src/features/identification/identification';


export const OtherIdentifiersComp = () => {
	const dispatch = useDispatch();
    const {otherIdentifiers} = useSelector(identificationSelector);

    useEffect(() => {
        console.log("STATE");
        console.log(otherIdentifiers);
    });

    const handleChange = (fieldName, index) => (event) => {
        let otherIdentifiersCopy = JSON.parse(JSON.stringify(otherIdentifiers));
        otherIdentifiersCopy[index][fieldName].value = event.target.value;
        dispatch(setOtherIdentifiers(otherIdentifiersCopy));
    };

    const formList = () => {
        let list = [];
        Object.values(otherIdentifiers).forEach((item, index) => {
            list.push(
                <Card sx={{border: "3px solid #094B8C",
                padding: "10px",
                boxShadow: "5px 5px #356BA0",
                marginBottom: 5}}>
                    <CardContent>
                        <Stack direction="column" spacing={2} justifyContent="flex-start">
                            <TextField label="Source(s) of the Case Identifier" variant="outlined"
                                sx={{ width: '100%' }}
                                onChange={handleChange('C_1_9_1_r_1_SourceCaseId', index)}
                                value = {item['C_1_9_1_r_1_SourceCaseId'].value}
                                multiline
                                rows={5}/>
                            <TextField label="Case Identifier(s)" variant="outlined"
                                sx={{ width: '100%' }}
                                onChange={handleChange('C_1_9_1_r_2_CaseId', index)}
                                value = {item['C_1_9_1_r_2_CaseId'].value}
                                multiline
                                rows={5}/>

                            {index === otherIdentifiers.length - 1 ?
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
        let otherIdentifiersCopy = JSON.parse(JSON.stringify(otherIdentifiers));
        let otherIdentifiersNew = new OtherIdentifiers();
        otherIdentifiersCopy.push(otherIdentifiersNew);
        dispatch(setOtherIdentifiers(otherIdentifiersCopy));
    }

    return(
        <div>
            {formList()}
        </div>
    )
}