
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Stack, FormControlLabel, Select, MenuItem, FormControl, InputLabel, IconButton} from '@mui/material';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/system';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { referencesSelector, setReferencesData } from '@src/features/references/slice';
import { Reference } from '@src/features/references/references';
import DeleteIcon from '@mui/icons-material/Delete';

var snakecaseKeys = require('snakecase-keys')

export const ReferencesComp = () => {
	const dispatch = useDispatch();
    const {referencesData} = useSelector(referencesSelector);

    useEffect(() => {
        console.log("STATE");
        console.log(snakecaseKeys(referencesData));
    });

    const handleChange = (fieldName, index) => (event) => {
        let referencesDataCopy = JSON.parse(JSON.stringify(referencesData));
        if (fieldName === 'C_2_r_5_PrimarySourceRegulatoryPurposes') {
            referencesDataCopy[index][fieldName].value = event.target.checked;
        } else {
            referencesDataCopy[index][fieldName].value = event.target.value;
        }
        dispatch(setReferencesData(referencesDataCopy));
    };

    const setNullFlavor = (fieldName, index) => (event) => {
        let referencesDataCopy = JSON.parse(JSON.stringify(referencesData));
        referencesDataCopy[index][fieldName].nullFlavor = event.target.value;
        dispatch(setReferencesData(referencesDataCopy));
    };

    const setUnknown = (fieldName, index) => (event) => {
        console.log(event.target.checked);
        let referencesDataCopy = JSON.parse(JSON.stringify(referencesData));
        if (event.target.checked) {
            referencesDataCopy[index][fieldName].nullFlavor = -1;
        } else {
            referencesDataCopy[index][fieldName].nullFlavor = null;
        }
        dispatch(setReferencesData(referencesDataCopy));
    };


    const formList = () => {
        let list = [];
        if (referencesData.length === 0) {
            return ( <span>
                <IconButton size='large' style= {{ top: '10px'}}
                sx={{ color: "white", backgroundColor: "#1976d2"}}
                            onClick={addForm}><AddIcon/></IconButton>
            </span>);
        }
        Object.values(referencesData).forEach((item, index) => {
            list.push(
                <Card sx={{border: "3px solid #094B8C",
                padding: "10px",
                boxShadow: "5px 5px #356BA0",
                marginBottom: 5}}>
                    <CardContent>     
                    
                            <Stack direction="row" flexItem spacing={2}>
                                <Box className="text-small" style={{ padding: 0 }}>
                                    <FormControlLabel
                                    control={<Checkbox
                                        checked = {item['C_4_r_1_LiteratureReference'].nullFlavor !== null}
                                        onChange={setUnknown('C_4_r_1_LiteratureReference', index)}
                                        sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                        style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                                        />}
                                    label="No Info"/>
                                </Box>
                                {referencesData[index]['C_4_r_1_LiteratureReference']['nullFlavor'] === null ? 
                                    <TextField label="Literature Reference(s)" variant="outlined"
                                        onChange={handleChange('C_4_r_1_LiteratureReference', index)}
                                        value = {item['C_4_r_1_LiteratureReference'].value}
                                        sx={{ width: '80%' }}
                                        multiline
                                        rows={7}/>
                                : <FormControl sx={{ width: '20%' }}>
                                    <InputLabel>Null Flavor</InputLabel>
                                    <Select
                                        defaultValue = {0}
                                        value = {item['C_4_r_1_LiteratureReference'].nullFlavor}
                                        onChange={setNullFlavor('C_4_r_1_LiteratureReference', index)}
                                    >
                                        <MenuItem value={1}>Asked, but not known</MenuItem>
                                        <MenuItem value={2}>Not asked</MenuItem>
                                    </Select>
                                    </FormControl>
                                }
                            </Stack>
                    <span>
                            <IconButton size='large' style= {{ top: '10px', right: '10px'}}
                            sx={{ color: "white", backgroundColor: "#1976d2"}}
                                    onClick={() => removeForm(index)}><DeleteIcon/>
                            </IconButton>
                    </span>  
                    
                    {index === referencesData.length - 1 ?
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
        let referencesDataCopy = JSON.parse(JSON.stringify(referencesData));
        let referencesDataNew = new Reference();
        referencesDataCopy.push(referencesDataNew);
        dispatch(setReferencesData(referencesDataCopy));
    }
    
    const removeForm = (index) => {
        let referencesDataCopy = JSON.parse(JSON.stringify(referencesData));
        referencesDataCopy.splice(index, 1);
        dispatch(setReferencesData(referencesDataCopy));
    }

	return (
        <div >
            {formList()}
        </div>
	);
}