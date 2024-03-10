
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Stack, Card, CardContent, IconButton} from '@mui/material';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { identificationSelector, setDocumentsHeldBySender } from '@src/features/identification/slice';
import { DocumentsHeldBySender } from '@src/features/identification/identification';


export const DocumentsHeldBySenderComp = () => {
	const dispatch = useDispatch();
    const {documentsHeldBySender} = useSelector(identificationSelector);

    useEffect(() => {
        console.log("STATE");
        console.log(documentsHeldBySender);
    });

    const handleChange = (fieldName, index) => (event) => {
        let documentsHeldBySenderCopy = JSON.parse(JSON.stringify(documentsHeldBySender));
        documentsHeldBySenderCopy[index][fieldName].value = event.target.value;
        dispatch(setDocumentsHeldBySender(documentsHeldBySenderCopy));
    };


    const formList = () => {
        let list = [];
        Object.values(documentsHeldBySender).forEach((item, index) => {
            list.push(
                <Card sx={{border: "3px solid #094B8C",
                padding: "10px",
                boxShadow: "5px 5px #356BA0",
                marginBottom: 5}}>
                    <CardContent>
                        <Stack direction="column" spacing={2} justifyContent="flex-start">
                            <TextField label="Documents Held by Sender" variant="outlined"
                                sx={{ width: '100%' }}
                                onChange={handleChange('C_1_6_1_r_1_DocumentsHeldSender', index)}
                                value = {item['C_1_6_1_r_1_DocumentsHeldSender'].value}
                                multiline
                                rows={5}/>

                            {index === documentsHeldBySender.length - 1 ?
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
        let documentsHeldBySenderCopy = JSON.parse(JSON.stringify(documentsHeldBySender));
        let documentsHeldBySenderNew = new DocumentsHeldBySender();
        documentsHeldBySenderCopy.push(documentsHeldBySenderNew);
        dispatch(setDocumentsHeldBySender(documentsHeldBySenderCopy));
    }

    return(
        <div>
            {formList()}
        </div>
    )
}