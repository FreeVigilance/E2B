
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Stack, FormControlLabel, Select, MenuItem, FormControl, InputLabel, Grid, IconButton} from '@mui/material';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/system';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { primarySourceSelector, setPrimarySourceData } from '@src/features/primary-source/slice';
import { PrimarySource } from '@src/features/primary-source/primary-source';

var snakecaseKeys = require('snakecase-keys')

export const PrimarySourceComp = () => {
	const dispatch = useDispatch();
    const {primarySourceData} = useSelector(primarySourceSelector);

    useEffect(() => {
        console.log("STATE");
        console.log(snakecaseKeys(primarySourceData));
    });

    const handleChange = (fieldName, index) => (event) => {
        let primarySourceDataCopy = JSON.parse(JSON.stringify(primarySourceData));
        if (fieldName === 'C_2_r_5_PrimarySourceRegulatoryPurposes') {
            primarySourceDataCopy[index][fieldName].value = event.target.checked;
        } else {
            primarySourceDataCopy[index][fieldName].value = event.target.value;
        }
        dispatch(setPrimarySourceData(primarySourceDataCopy));
    };

    const setNullFlavor = (fieldName, index) => (event) => {
        let primarySourceDataCopy = JSON.parse(JSON.stringify(primarySourceData));
        primarySourceDataCopy[index][fieldName].nullFlavor = event.target.value;
        dispatch(setPrimarySourceData(primarySourceDataCopy));
    };

    const setUnknown = (fieldName, index) => (event) => {
        console.log(event.target.checked);
        let primarySourceDataCopy = JSON.parse(JSON.stringify(primarySourceData));
        if (event.target.checked) {
            primarySourceDataCopy[index][fieldName].nullFlavor = -1;
        } else {
            primarySourceDataCopy[index][fieldName].nullFlavor = null;
        }
        dispatch(setPrimarySourceData(primarySourceDataCopy));
    };


    const formList = () => {
        let list = [];
        Object.values(primarySourceData).forEach((item, index) => {
            list.push(
                <Card sx={{border: "3px solid #094B8C",
                padding: "10px",
                boxShadow: "5px 5px #356BA0",
                marginBottom: 5}}>
                    <CardContent>     
                    <Grid container direction="row" columnGap={4}>
                        <Grid container item xs direction="column" rowGap={1}>          
                            <Stack direction="row" flexItem spacing={2}>
                                <Box className="text-small" style={{ padding: 0 }}>
                                    <FormControlLabel
                                    control={<Checkbox
                                        checked = {item['C_2_r_1_1_ReporterTitle'].nullFlavor !== null}
                                        onChange={setUnknown('C_2_r_1_1_ReporterTitle', index)}
                                        sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                        style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                                        />}
                                    label="No Info"/>
                                </Box>
                                {primarySourceData[index]['C_2_r_1_1_ReporterTitle']['nullFlavor'] === null ? 
                                    <TextField label="Reporter’s Title" variant="outlined"
                                        onChange={handleChange('C_2_r_1_1_ReporterTitle', index)}
                                        value = {item['C_2_r_1_1_ReporterTitle'].value}
                                        sx={{ width: '100%' }}
                                        multiline
                                        rows={2}/>
                                : <FormControl sx={{ width: '100%' }}>
                                    <InputLabel>Null Flavor</InputLabel>
                                    <Select
                                        defaultValue = {0}
                                        value = {item['C_2_r_1_1_ReporterTitle'].nullFlavor}
                                        onChange={setNullFlavor('C_2_r_1_1_ReporterTitle', index)}
                                    >
                                        <MenuItem value={0}>Masked</MenuItem>
                                        <MenuItem value={1}>Asked, but not known</MenuItem>
                                        <MenuItem value={2}>Not asked</MenuItem>
                                        <MenuItem value={3}>Unknown</MenuItem>
                                    </Select>
                                    </FormControl>
                                }
                            </Stack>

                            <Stack direction="row" flexItem spacing={2}>
                                <Box className="text-small" style={{ padding: 0 }}>
                                    <FormControlLabel
                                    control={<Checkbox
                                        checked = {item['C_2_r_1_2_ReporterGivenName'].nullFlavor !== null}
                                        onChange={setUnknown('C_2_r_1_2_ReporterGivenName', index)}
                                        sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                        style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                                        />}
                                    label="No Info"/>
                                </Box>
                                {primarySourceData[index]['C_2_r_1_2_ReporterGivenName']['nullFlavor'] === null ? 
                                    <TextField label="Reporter’s Given Name" variant="outlined"
                                        onChange={handleChange('C_2_r_1_2_ReporterGivenName', index)}
                                        value = {item['C_2_r_1_2_ReporterGivenName'].value}
                                        sx={{ width: '100%' }}
                                        multiline
                                        rows={2}/>
                                : <FormControl sx={{ width: '100%' }}>
                                    <InputLabel>Null Flavor</InputLabel>
                                    <Select
                                        defaultValue = {0}
                                        value = {item['C_2_r_1_2_ReporterGivenName'].nullFlavor}
                                        onChange={setNullFlavor('C_2_r_1_2_ReporterGivenName', index)}
                                    >
                                        <MenuItem value={0}>Masked</MenuItem>
                                        <MenuItem value={1}>Asked, but not known</MenuItem>
                                        <MenuItem value={2}>Not asked</MenuItem>
                                    </Select>
                                    </FormControl>
                                }
                            </Stack>

                            <Stack direction="row" flexItem spacing={2}>
                                <Box className="text-small" style={{ padding: 0 }}>
                                    <FormControlLabel
                                    control={<Checkbox
                                        checked = {item['C_2_r_1_3_ReporterMiddleName'].nullFlavor !== null}
                                        onChange={setUnknown('C_2_r_1_3_ReporterMiddleName', index)}
                                        sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                        style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                                        />}
                                    label="No Info"/>
                                </Box>
                                {primarySourceData[index]['C_2_r_1_3_ReporterMiddleName']['nullFlavor'] === null ? 
                                    <TextField label="Reporter’s Middle Name" variant="outlined"
                                        onChange={handleChange('C_2_r_1_3_ReporterMiddleName', index)}
                                        value = {item['C_2_r_1_3_ReporterMiddleName'].value}
                                        sx={{ width: '100%' }}
                                        multiline
                                        rows={2}/>
                                : <FormControl sx={{ width: '100%' }}>
                                    <InputLabel>Null Flavor</InputLabel>
                                    <Select
                                        defaultValue = {0}
                                        value = {item['C_2_r_1_3_ReporterMiddleName'].nullFlavor}
                                        onChange={setNullFlavor('C_2_r_1_3_ReporterMiddleName', index)}
                                    >
                                        <MenuItem value={0}>Masked</MenuItem>
                                        <MenuItem value={1}>Asked, but not known</MenuItem>
                                        <MenuItem value={2}>Not asked</MenuItem>
                                    </Select>
                                    </FormControl>
                                }
                            </Stack>

                            <Stack direction="row" flexItem spacing={2}>
                                <Box className="text-small" style={{ padding: 0 }}>
                                    <FormControlLabel
                                    control={<Checkbox
                                        checked = {item['C_2_r_1_4_ReporterFamilyName'].nullFlavor !== null}
                                        onChange={setUnknown('C_2_r_1_4_ReporterFamilyName', index)}
                                        sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                        style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                                        />}
                                    label="No Info"/>
                                </Box>
                                {primarySourceData[index]['C_2_r_1_4_ReporterFamilyName']['nullFlavor'] === null ? 
                                    <TextField label="Reporter’s Family Name" variant="outlined"
                                        onChange={handleChange('C_2_r_1_4_ReporterFamilyName', index)}
                                        value = {item['C_2_r_1_4_ReporterFamilyName'].value}
                                        sx={{ width: '100%' }}
                                        multiline
                                        rows={2}/>
                                : <FormControl sx={{ width: '100%' }}>
                                    <InputLabel>Null Flavor</InputLabel>
                                    <Select
                                        defaultValue = {0}
                                        value = {item['C_2_r_1_4_ReporterFamilyName'].nullFlavor}
                                        onChange={setNullFlavor('C_2_r_1_4_ReporterFamilyName', index)}
                                    >
                                        <MenuItem value={0}>Masked</MenuItem>
                                        <MenuItem value={1}>Asked, but not known</MenuItem>
                                        <MenuItem value={2}>Not asked</MenuItem>
                                    </Select>
                                    </FormControl>
                                }
                            </Stack>
                               
                            <Stack direction="row" flexItem spacing={2}>
                                <Box className="text-small" style={{ padding: 0 }}>
                                    <FormControlLabel
                                    control={<Checkbox
                                        checked = {item['C_2_r_2_1_ReporterOrganisation'].nullFlavor !== null}
                                        onChange={setUnknown('C_2_r_2_1_ReporterOrganisation', index)}
                                        sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                        style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                                        />}
                                    label="No Info"/>
                                </Box>
                                {primarySourceData[index]['C_2_r_2_1_ReporterOrganisation']['nullFlavor'] === null ? 
                                    <TextField label="Reporter’s Organisation" variant="outlined"
                                        onChange={handleChange('C_2_r_2_1_ReporterOrganisation', index)}
                                        value = {item['C_2_r_2_1_ReporterOrganisation'].value}
                                        sx={{ width: '100%' }}
                                        multiline
                                        rows={2}/>
                                : <FormControl sx={{ width: '100%' }}>
                                    <InputLabel>Null Flavor</InputLabel>
                                    <Select
                                        defaultValue = {0}
                                        value = {item['C_2_r_2_1_ReporterOrganisation'].nullFlavor}
                                        onChange={setNullFlavor('C_2_r_2_1_ReporterOrganisation', index)}
                                    >
                                        <MenuItem value={0}>Masked</MenuItem>
                                        <MenuItem value={1}>Asked, but not known</MenuItem>
                                        <MenuItem value={2}>Not asked</MenuItem>
                                    </Select>
                                    </FormControl>
                                }
                            </Stack> 
                        </Grid>
                        <Grid container item xs direction="column" rowGap={1}>      
                            <Stack direction="row" flexItem spacing={2}>
                                <Box className="text-small" style={{ padding: 0 }}>
                                    <FormControlLabel
                                    control={<Checkbox
                                        checked = {item['C_2_r_2_2_ReporterDepartment'].nullFlavor !== null}
                                        onChange={setUnknown('C_2_r_2_2_ReporterDepartment', index)}
                                        sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                        style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                                        />}
                                    label="No Info"/>
                                </Box>
                                {primarySourceData[index]['C_2_r_2_2_ReporterDepartment']['nullFlavor'] === null ? 
                                    <TextField label="Reporter’s Department" variant="outlined"
                                        onChange={handleChange('C_2_r_2_2_ReporterDepartment', index)}
                                        value = {item['C_2_r_2_2_ReporterDepartment'].value}
                                        sx={{ width: '100%' }}
                                        multiline
                                        rows={2}/>
                                : <FormControl sx={{ width: '100%' }}>
                                    <InputLabel>Null Flavor</InputLabel>
                                    <Select
                                        defaultValue = {0}
                                        value = {item['C_2_r_2_2_ReporterDepartment'].nullFlavor}
                                        onChange={setNullFlavor('C_2_r_2_2_ReporterDepartment', index)}
                                    >
                                        <MenuItem value={0}>Masked</MenuItem>
                                        <MenuItem value={1}>Asked, but not known</MenuItem>
                                        <MenuItem value={2}>Not asked</MenuItem>
                                    </Select>
                                    </FormControl>
                                }
                            </Stack>  

                            <Stack direction="row" flexItem spacing={2}>
                                <Box className="text-small" style={{ padding: 0 }}>
                                    <FormControlLabel
                                    control={<Checkbox
                                        checked = {item['C_2_r_2_3_ReporterStreet'].nullFlavor !== null}
                                        onChange={setUnknown('C_2_r_2_3_ReporterStreet', index)}
                                        sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                        style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                                        />}
                                    label="No Info"/>
                                </Box>
                                {primarySourceData[index]['C_2_r_2_3_ReporterStreet']['nullFlavor'] === null ? 
                                    <TextField label="Reporter’s Street" variant="outlined"
                                        onChange={handleChange('C_2_r_2_3_ReporterStreet', index)}
                                        value = {item['C_2_r_2_3_ReporterStreet'].value}
                                        sx={{ width: '100%' }}
                                        multiline
                                        rows={2}/>
                                : <FormControl sx={{ width: '100%' }}>
                                    <InputLabel>Null Flavor</InputLabel>
                                    <Select
                                        defaultValue = {0}
                                        value = {item['C_2_r_2_3_ReporterStreet'].nullFlavor}
                                        onChange={setNullFlavor('C_2_r_2_3_ReporterStreet', index)}
                                    >
                                        <MenuItem value={0}>Masked</MenuItem>
                                        <MenuItem value={1}>Asked, but not known</MenuItem>
                                        <MenuItem value={2}>Not asked</MenuItem>
                                    </Select>
                                    </FormControl>
                                }
                            </Stack>  

                            <Stack direction="row" flexItem spacing={2}>
                                <Box className="text-small" style={{ padding: 0 }}>
                                    <FormControlLabel
                                    control={<Checkbox
                                        checked = {item['C_2_r_2_4_ReporterCity'].nullFlavor !== null}
                                        onChange={setUnknown('C_2_r_2_4_ReporterCity', index)}
                                        sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                        style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                                        />}
                                    label="No Info"/>
                                </Box>
                                {primarySourceData[index]['C_2_r_2_4_ReporterCity']['nullFlavor'] === null ? 
                                    <TextField label="Reporter’s City" variant="outlined"
                                        onChange={handleChange('C_2_r_2_4_ReporterCity', index)}
                                        value = {item['C_2_r_2_4_ReporterCity'].value}
                                        sx={{ width: '100%' }}
                                        multiline
                                        rows={2}/>
                                : <FormControl sx={{ width: '100%' }}>
                                    <InputLabel>Null Flavor</InputLabel>
                                    <Select
                                        defaultValue = {0}
                                        value = {item['C_2_r_2_4_ReporterCity'].nullFlavor}
                                        onChange={setNullFlavor('C_2_r_2_4_ReporterCity', index)}
                                    >
                                        <MenuItem value={0}>Masked</MenuItem>
                                        <MenuItem value={1}>Asked, but not known</MenuItem>
                                        <MenuItem value={2}>Not asked</MenuItem>
                                    </Select>
                                    </FormControl>
                                }
                            </Stack>    

                            <Stack direction="row" flexItem spacing={2}>
                                <Box className="text-small" style={{ padding: 0 }}>
                                    <FormControlLabel
                                    control={<Checkbox
                                        checked = {item['C_2_r_2_5_ReporterStateProvince'].nullFlavor !== null}
                                        onChange={setUnknown('C_2_r_2_5_ReporterStateProvince', index)}
                                        sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                        style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                                        />}
                                    label="No Info"/>
                                </Box>
                                {primarySourceData[index]['C_2_r_2_5_ReporterStateProvince']['nullFlavor'] === null ? 
                                    <TextField label="Reporter’s State or Province" variant="outlined"
                                        onChange={handleChange('C_2_r_2_5_ReporterStateProvince', index)}
                                        value = {item['C_2_r_2_5_ReporterStateProvince'].value}
                                        sx={{ width: '100%' }}
                                        multiline
                                        rows={2}/>
                                : <FormControl sx={{ width: '100%' }}>
                                    <InputLabel>Null Flavor</InputLabel>
                                    <Select
                                        defaultValue = {0}
                                        value = {item['C_2_r_2_5_ReporterStateProvince'].nullFlavor}
                                        onChange={setNullFlavor('C_2_r_2_5_ReporterStateProvince', index)}
                                    >
                                        <MenuItem value={0}>Masked</MenuItem>
                                        <MenuItem value={1}>Asked, but not known</MenuItem>
                                        <MenuItem value={2}>Not asked</MenuItem>
                                    </Select>
                                    </FormControl>
                                }
                            </Stack>  

                            <Stack direction="row" flexItem spacing={2}>
                                <Box className="text-small" style={{ padding: 0 }}>
                                    <FormControlLabel
                                    control={<Checkbox
                                        checked = {item['C_2_r_2_7_ReporterTelephone'].nullFlavor !== null}
                                        onChange={setUnknown('C_2_r_2_7_ReporterTelephone', index)}
                                        sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                        style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                                        />}
                                    label="No Info"/>
                                </Box>
                                {primarySourceData[index]['C_2_r_2_7_ReporterTelephone']['nullFlavor'] === null ? 
                                    <TextField label="Reporter’s Telephone" variant="outlined"
                                        onChange={handleChange('C_2_r_2_7_ReporterTelephone', index)}
                                        value = {item['C_2_r_2_7_ReporterTelephone'].value}
                                        sx={{ width: '100%' }}
                                        multiline
                                        rows={2}/>
                                : <FormControl sx={{ width: '100%' }}>
                                    <InputLabel>Null Flavor</InputLabel>
                                    <Select
                                        defaultValue = {0}
                                        value = {item['C_2_r_2_7_ReporterTelephone'].nullFlavor}
                                        onChange={setNullFlavor('C_2_r_2_7_ReporterTelephone', index)}
                                    >
                                        <MenuItem value={0}>Masked</MenuItem>
                                        <MenuItem value={1}>Asked, but not known</MenuItem>
                                        <MenuItem value={2}>Not asked</MenuItem>
                                    </Select>
                                    </FormControl>
                                }
                            </Stack>
                        </Grid>
                        <Grid container item xs direction="column" rowGap={1}>    
                            <Stack direction="row" flexItem spacing={2}>
                                <Box className="text-small" style={{ padding: 0 }}>
                                    <FormControlLabel
                                    control={<Checkbox
                                        checked = {item['C_2_r_2_6_ReporterPostcode'].nullFlavor !== null}
                                        onChange={setUnknown('C_2_r_2_6_ReporterPostcode', index)}
                                        sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                        style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                                        />}
                                    label="No Info"/>
                                </Box>
                                {primarySourceData[index]['C_2_r_2_6_ReporterPostcode']['nullFlavor'] === null ? 
                                    <TextField label="Reporter’s Postcode" variant="outlined"
                                        onChange={handleChange('C_2_r_2_6_ReporterPostcode', index)}
                                        value = {item['C_2_r_2_6_ReporterPostcode'].value}
                                        sx={{ width: '100%' }}
                                        multiline
                                        rows={2}/>
                                : <FormControl sx={{ width: '100%' }}>
                                    <InputLabel>Null Flavor</InputLabel>
                                    <Select
                                        defaultValue = {0}
                                        value = {item['C_2_r_2_6_ReporterPostcode'].nullFlavor}
                                        onChange={setNullFlavor('C_2_r_2_6_ReporterPostcode', index)}
                                    >
                                        <MenuItem value={0}>Masked</MenuItem>
                                        <MenuItem value={1}>Asked, but not known</MenuItem>
                                        <MenuItem value={2}>Not asked</MenuItem>
                                    </Select>
                                    </FormControl>
                                }
                            </Stack>

                            <TextField label="Reporter’s Country Code" variant="outlined"
                                onChange={handleChange('C_2_r_3_ReporterCountryCode', index)}
                                value = {item['C_2_r_3_ReporterCountryCode'].value}/>

                            <Stack direction="row" flexItem spacing={2}>
                                <Box className="text-small" style={{ padding: 0 }}>
                                    <FormControlLabel
                                    control={<Checkbox
                                        checked = {item['C_2_r_4_Qualification'].nullFlavor !== null}
                                        onChange={setUnknown('C_2_r_4_Qualification', index)}
                                        sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                        style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                                        />}
                                    label="No Info"/>
                                </Box>
                                {primarySourceData[index]['C_2_r_4_Qualification']['nullFlavor'] === null ? 
                                    <FormControl sx={{ width: '100%' }}>
                                    <InputLabel>Test Result Code</InputLabel>
                                    <Select
                                        label="Qualification"
                                        defaultValue={0}
                                        onChange={handleChange('C_2_r_4_Qualification', index)}
                                        value = {item['C_2_r_4_Qualification'].value}
                                        >
                                        <MenuItem value={1}>1 = Physician</MenuItem>
                                        <MenuItem value={2}>2 = Pharmacist</MenuItem>
                                        <MenuItem value={3}>3 = Other health professional</MenuItem>
                                        <MenuItem value={4}>4 = Lawyer</MenuItem>
                                        <MenuItem value={5}>5 = Consumer or other non health professional</MenuItem>
                                    </Select>
                                    </FormControl>
                                : null}
                            </Stack>

                            <FormControlLabel
                                control={<Checkbox
                                        checked = {item['C_2_r_5_PrimarySourceRegulatoryPurposes'].value}
                                        onChange={handleChange('C_2_r_5_PrimarySourceRegulatoryPurposes', index)}
                                        sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                        style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                                        />}
                                label="Primary Source for Regulatory Purposes"/>
                        </Grid>
                    </Grid>
                    {index === primarySourceData.length - 1 ?
                        <span>
                            <IconButton size='large' style= {{ top: '10px'}}
                            sx={{ color: "white", backgroundColor: "#1976d2"}}
                                        onClick={addForm}><AddIcon/></IconButton>
                        </span> : null}
                    </CardContent>
        </Card>);
        });

        return list;
    }

    const addForm = () => {
        let primarySourceDataCopy = JSON.parse(JSON.stringify(primarySourceData));
        let primarySourceDataNew = new PrimarySource();
        primarySourceDataCopy.push(primarySourceDataNew);
        dispatch(setPrimarySourceData(primarySourceDataCopy));
    }

	return (
        <div >
            {formList()}
        </div>
	);
}