import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Select, MenuItem, FormControl, InputLabel, Grid} from '@mui/material';
import TextField from '@mui/material/TextField';
import { infoSenderSelector, setInfoSenderData } from '@src/features/info-sender/slice';

var snakecaseKeys = require('snakecase-keys')

export const InfoSenderComp = () => {
	const dispatch = useDispatch();
    const {infoSenderData} = useSelector(infoSenderSelector);

    useEffect(() => {
        console.log("STATE");
        console.log(snakecaseKeys(infoSenderData));
    });

    const handleChange = (fieldName) => (event) => {
        let infoSenderDataCopy = JSON.parse(JSON.stringify(infoSenderData));
        infoSenderDataCopy[fieldName].value = event.target.value;
        dispatch(setInfoSenderData(infoSenderDataCopy));
    };

	return (   
                    <Grid container direction="row" columnGap={4}>
                        <Grid container item xs direction="column" rowGap={1}>   
                            <FormControl sx={{ width: '100%' }}>
                                <InputLabel>Test Result Code</InputLabel>
                                <Select
                                    label="Sender Type"
                                    onChange={handleChange('C_3_1_SenderType')}
                                    value = {infoSenderData['C_3_1_SenderType'].value}
                                    >
                                    <MenuItem value={1}>1 = Pharmaceutical Company</MenuItem>
                                    <MenuItem value={2}>2 = Regulatory Authority</MenuItem>
                                    <MenuItem value={3}>3 = Health Professional</MenuItem>
                                    <MenuItem value={4}>4 = Regional Pharmacovigilance Centre</MenuItem>
                                    <MenuItem value={5}>5 = WHO collaborating centres for international drug monitoring</MenuItem>
                                    <MenuItem value={6}>6 = Other (e.g. distributor or other organisation)</MenuItem>
                                    <MenuItem value={7}>7 = Patient / Consumer</MenuItem>

                                    </Select>
                            </FormControl>

                            <TextField label="Sender’s Organisation" variant="outlined"
                                sx={{ width: '100%' }}
                                onChange={handleChange('C_3_2_SenderOrganisation')}
                                value = {infoSenderData['C_3_2_SenderOrganisation'].value}
                                multiline
                                inputProps={{ maxLength: 100}}
                                rows={3}/>

                            <TextField label="Sender’s Department" variant="outlined"
                                sx={{ width: '100%' }}
                                onChange={handleChange('C_3_3_1_SenderDepartment')}
                                value = {infoSenderData['C_3_3_1_SenderDepartment'].value}
                                multiline
                                inputProps={{ maxLength: 60}}
                                rows={2}/>
                            <TextField label="Sender’s Title" variant="outlined"
                                sx={{ width: '100%' }}
                                onChange={handleChange('C_3_3_2_SenderTitle')}
                                value = {infoSenderData['C_3_3_2_SenderTitle'].value}
                                multiline
                                inputProps={{ maxLength: 50}}
                                rows={2}/>
                            <TextField label="Sender’s Given Name" variant="outlined"
                                sx={{ width: '100%' }}
                                onChange={handleChange('C_3_3_3_SenderGivenName')}
                                value = {infoSenderData['C_3_3_3_SenderGivenName'].value}
                                multiline
                                inputProps={{ maxLength: 60}}
                                rows={2}/>
                        </Grid>
                        <Grid container item xs direction="column" rowGap={1}>   
                            <TextField label="Sender’s Middle Name" variant="outlined"
                                sx={{ width: '100%' }}
                                onChange={handleChange('C_3_3_4_SenderMiddleName')}
                                value = {infoSenderData['C_3_3_4_SenderMiddleName'].value}
                                multiline
                                inputProps={{ maxLength: 60}}
                                rows={2}/>
                            <TextField label="Sender’s Family Name" variant="outlined"
                                sx={{ width: '100%' }}
                                onChange={handleChange('C_3_3_5_SenderFamilyName')}
                                value = {infoSenderData['C_3_3_5_SenderFamilyName'].value}
                                multiline
                                inputProps={{ maxLength: 60}}
                                rows={2}/>
                            <TextField label="Sender’s Street Address" variant="outlined"
                                sx={{ width: '100%' }}
                                onChange={handleChange('C_3_4_1_SenderStreetAddress')}
                                value = {infoSenderData['C_3_4_1_SenderStreetAddress'].value}
                                multiline
                                inputProps={{ maxLength: 100}}
                                rows={3}/>
                            <TextField label="Sender’s City" variant="outlined"
                                sx={{ width: '100%' }}
                                onChange={handleChange('C_3_4_2_SenderCity')}
                                value = {infoSenderData['C_3_4_2_SenderCity'].value}
                                multiline
                                inputProps={{ maxLength: 35}}
                                rows={2}/>
                            <TextField label="Sender’s State or Province" variant="outlined"
                                sx={{ width: '100%' }}
                                onChange={handleChange('C_3_4_3_SenderStateProvince')}
                                value = {infoSenderData['C_3_4_3_SenderStateProvince'].value}
                                multiline
                                inputProps={{ maxLength: 40}}
                                rows={2}/>
                        </Grid>
                        <Grid container item xs direction="column" rowGap={1}>   
                            <TextField label="Sender’s Postcode" variant="outlined"
                                sx={{ width: '100%' }}
                                onChange={handleChange('C_3_4_4_SenderPostcode')}
                                value = {infoSenderData['C_3_4_4_SenderPostcode'].value}
                                multiline
                                inputProps={{ maxLength: 15}}
                                rows={2}/>
                            <TextField label="Sender’s Country Code" variant="outlined"
                                sx={{ width: '100%' }}
                                inputProps={{ maxLength: 2}}
                                onChange={handleChange('C_3_4_5_SenderCountryCode')}
                                value = {infoSenderData['C_3_4_5_SenderCountryCode'].value}/>
                            <TextField label="Sender’s Telephone" variant="outlined"
                                sx={{ width: '100%' }}
                                inputProps={{ maxLength: 33}}
                                onChange={handleChange('C_3_4_6_SenderTelephone')}
                                value = {infoSenderData['C_3_4_6_SenderTelephone'].value}/>
                            <TextField label="Sender’s Fax" variant="outlined"
                                sx={{ width: '100%' }}
                                inputProps={{ maxLength: 33}}
                                onChange={handleChange('C_3_4_7_SenderFax')}
                                value = {infoSenderData['C_3_4_7_SenderFax'].value}
                                multiline
                                rows={2}/>
                            <TextField label="Sender’s E-mail Address" variant="outlined"
                                sx={{ width: '100%' }}
                                inputProps={{ maxLength: 100}}
                                onChange={handleChange('C_3_4_8_SenderEmail')}
                                value = {infoSenderData['C_3_4_8_SenderEmail'].value}
                                multiline
                                rows={2}/>
                        </Grid>
                    </Grid>     
	);
}