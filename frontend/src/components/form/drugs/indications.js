import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Stack, FormControlLabel, Box, Select, MenuItem, FormControl, InputLabel, Card, CardContent, IconButton} from '@mui/material';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import AddIcon from '@mui/icons-material/Add';
import { drugsSelector, setIndications } from '@src/features/drugs/slice';
import { IndicationForUse } from '@src/features/drugs/drugs';
import DeleteIcon from '@mui/icons-material/Delete';


export const Indications = ({drugIndex}) => {
	const dispatch = useDispatch();
    const {indications} = useSelector(drugsSelector);

    useEffect(() => {
        console.log("STATE");
        console.log(indications);
    });

    const handleChange = (fieldName, index) => (event) => {
        let indicationsCopy = JSON.parse(JSON.stringify(indications));
        indicationsCopy[drugIndex][index][fieldName].value = event.target.value;
        dispatch(setIndications(indicationsCopy));
    };

    const setNullFlavor = (fieldName, index) => (event) => {
        let indicationsCopy = JSON.parse(JSON.stringify(indications));
        indicationsCopy[drugIndex][index][fieldName].nullFlavor = event.target.value;
        dispatch(setIndications(indicationsCopy));
    };

    const setUnknown = (fieldName, index) => (event) => {
        let indicationsCopy = JSON.parse(JSON.stringify(indications));
        if (event.target.checked) {
            indicationsCopy[drugIndex][index][fieldName].nullFlavor = -1;
        } else {
            indicationsCopy[drugIndex][index][fieldName].nullFlavor = null;
        }
        dispatch(setIndications(indicationsCopy));
    };

    const formList = () => {
        let list = [];
        if (indications[drugIndex].length === 0) {
            return ( <span>
                <IconButton size='large' style= {{ top: '10px'}}
                sx={{ color: "white", backgroundColor: "#1976d2"}}
                            onClick={addForm}><AddIcon/></IconButton>
            </span>);
        }
        Object.values(indications[drugIndex]).forEach((item, index) => {
            list.push(
                <Card sx={{border: "3px solid #094B8C",
                padding: "10px",
                boxShadow: "5px 5px #356BA0",
                marginBottom: 5}}>
                    <CardContent>
                        <Stack direction="column" spacing={1} justifyContent="flex-start">  

                        <Stack direction="row" spacing={2} justifyContent="flex-start"> 
                                    <Box className="text-small" style={{ padding: 0 }}>
                                        <FormControlLabel
                                        control={<Checkbox
                                                    value = {item['G_k_7_r_1_IndicationPrimarySource'].nullFlavor === -1}
                                                    onChange={setUnknown('G_k_7_r_1_IndicationPrimarySource', index)}
                                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                                    style={{padding: 1, marginLeft: 5, marginTop: 2 }}
                                                    />}
                                                label="No Info"/>
                                    </Box>
                                    {indications[drugIndex][index]['G_k_7_r_1_IndicationPrimarySource']['nullFlavor'] !== -1 ? 
                                            <TextField label="Indication as Reported by the Primary Source" variant="outlined"
                                                onChange={handleChange('G_k_7_r_1_IndicationPrimarySource', index)}
                                                value = {item['G_k_7_r_1_IndicationPrimarySource'].value}
                                                sx={{ width: '100%' }}
                                                multiline
                                                rows={5}/>
                                            : <FormControl sx={{ width: '100%' }}>
                                                <InputLabel>Null Flavor</InputLabel>
                                                <Select
                                                    defaultValue = {0}
                                                    value = {item['G_k_7_r_1_IndicationPrimarySource'].nullFlavor}
                                                    onChange={setNullFlavor('G_k_7_r_1_IndicationPrimarySource', index)}
                                                >
                                                    <MenuItem value={1}>Asked, but not known</MenuItem>
                                                    <MenuItem value={2}>Not asked</MenuItem>
                                                    <MenuItem value={3}>Unknown</MenuItem>
                                                </Select>
                                                </FormControl>
                                    }
                            </Stack>

                            <TextField label="MedDRA Version for Indication" variant="outlined"
                                    onChange={handleChange('G_k_7_r_2a_MedDRAVersionIndication', index)}
                                    value = {item['G_k_7_r_2a_MedDRAVersionIndication'].value}/>

                            <TextField label="Indication (MedDRA code)" variant="outlined"
                                    onChange={handleChange('G_k_7_r_2b_IndicationMedDRACode', index)}
                                    value = {item['G_k_7_r_2b_IndicationMedDRACode'].value}/>
                        
                        <Stack direction="row" justifyContent="flex-start">  
                                    <span>
                                        <IconButton size='large' style= {{ top: '10px', right: '10px'}}
                                        sx={{ color: "white", backgroundColor: "#1976d2"}}
                                                onClick={() => removeForm(index)}><DeleteIcon/>
                                        </IconButton>
                                    </span>  
                            {index === indications[drugIndex].length - 1 ?
                                <span>
                                    <IconButton size='large' style= {{ top: '10px'}}
                                    sx={{ color: "white", backgroundColor: "#1976d2"}}
                                                onClick={addForm}><AddIcon/></IconButton>
                                </span> : null}
                        </Stack>
                        </Stack>
                </CardContent>
            </Card>);
        });
        return list;
    }

    const addForm = () => {
        let indicationsCopy = JSON.parse(JSON.stringify(indications));
        let indicationNew = new IndicationForUse();
        indicationsCopy[drugIndex].push(indicationNew);
        dispatch(setIndications(indicationsCopy));
    }

    const removeForm = (index) => {
        let indicationsCopy = JSON.parse(JSON.stringify(indications));
        indicationsCopy[drugIndex].splice(index, 1);
        dispatch(setIndications(indicationsCopy));
    }

    return(
        <div>
            {formList()}
        </div>
    )
}