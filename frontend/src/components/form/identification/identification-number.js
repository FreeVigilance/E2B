
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Stack, Card, CardContent, IconButton} from '@mui/material';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { identificationSelector, setIdentificationNumber } from '@src/features/identification/slice';
import { IdentificationNumber } from '@src/features/identification/identification';


export const IdentificationNumberComp = () => {
	const dispatch = useDispatch();
    const {identificationNumber} = useSelector(identificationSelector);

    useEffect(() => {
        console.log("STATE");
        console.log(identificationNumber);
    });

    const handleChange = (fieldName, index) => (event) => {
        let identificationNumberCopy = JSON.parse(JSON.stringify(identificationNumber));
        identificationNumberCopy[index][fieldName].value = event.target.value;
        dispatch(setIdentificationNumber(identificationNumberCopy));
    };

    const formList = () => {
        let list = [];
        Object.values(identificationNumber).forEach((item, index) => {
            list.push(
                <Card sx={{border: "3px solid #094B8C",
                padding: "10px",
                boxShadow: "5px 5px #356BA0",
                marginBottom: 5}}>
                    <CardContent>
                        <Stack direction="column" spacing={2} justifyContent="flex-start">
                            <TextField label="Identification Number of the Report Which Is Linked to This Report" variant="outlined"
                                sx={{ width: '100%' }}
                                onChange={handleChange('C_1_10_r_IdentificationNumberReportLinked', index)}
                                value = {item['C_1_10_r_IdentificationNumberReportLinked'].value}
                                multiline
                                rows={3}/>

                            {index === identificationNumber.length - 1 ?
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
        let identificationNumberCopy = JSON.parse(JSON.stringify(identificationNumber));
        let identificationNumberNew = new IdentificationNumber();
        identificationNumberCopy.push(identificationNumberNew);
        dispatch(setIdentificationNumber(identificationNumberCopy));
    }

    return(
        <div>
            {formList()}
        </div>
    )
}