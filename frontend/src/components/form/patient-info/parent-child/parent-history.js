import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Stack, Grid, FormLabel, Card, CardContent} from '@mui/material';
import TextField from '@mui/material/TextField';
import { patientSelector, setParentHistoryData } from '@src/features/patient/slice';
import { ParentInfo } from './parent-info';

export const ParentHistory = () => {
	const dispatch = useDispatch();
    const {parentHistoryData, parentData} = useSelector(patientSelector);

    useEffect(() => {
        console.log("STATE");
        console.log('AAAAA');
        console.log(parentHistoryData);
    });

    const handleChange = (fieldName) => (event) => {
        let parentHistoryDataCopy = JSON.parse(JSON.stringify(parentHistoryData));
        parentHistoryDataCopy[fieldName].value = event.target.value;
        dispatch(setParentHistoryData(parentHistoryDataCopy));
    };

    const formList = () => {
        return <Card sx={{border: "3px solid #094B8C",
                padding: "10px",
                boxShadow: "5px 5px #356BA0",
                marginBottom: 5}}>
                    <Grid container direction="row" columnGap={4} sx={{padding: 2}}>
                        <Grid container item xs direction="column" rowGap={1}>
                            <CardContent>
                                <Stack direction="column" spacing={2} justifyContent="flex-start">
                                    <TextField label="Text for Relevant Medical History and Concurrent Conditions of Parent" variant="outlined"
                                        sx={{ width: '100%' }}
                                        onChange={handleChange('D_10_7_2_TextMedicalHistoryParent')}
                                        value = {parentHistoryData['D_10_7_2_TextMedicalHistoryParent'].value}
                                        multiline
                                        rows={15}/>
                                </Stack>
                            </CardContent>
                        </Grid>
                        <Grid container item xs direction="column" rowGap={1}>
                            <FormLabel sx={{ fontSize: 30, color: 'black' }}>Structured Information of Parent</FormLabel>
                            <ParentInfo></ParentInfo>
                        </Grid>
                    </Grid>
                </Card>
    }

	return (
        <div>
            {formList()}
        </div>
	);
}