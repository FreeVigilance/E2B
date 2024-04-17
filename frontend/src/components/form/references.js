
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Stack, FormControlLabel, Select, MenuItem, FormControl, InputLabel, IconButton, Grid} from '@mui/material';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/system';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { referencesSelector, setReferencesData } from '@src/features/references/slice';
import { Reference } from '@src/features/references/references';
import DeleteIcon from '@mui/icons-material/Delete';
import {makeStyles} from '@mui/styles';
import { ReferencesFieldLabel } from '../field-labels/references-label';

const useStyles = makeStyles({
    margin: {
      marginTop: '10px',
      marginLeft: '10px',
      marginBottom: '5px'
    },
    textXshort: {
        marginLeft: 1,
        marginRight: 1,
        width: '35%',
    },
    textShort: {
      marginLeft: 1,
      marginRight: 1,
      width: '70%',
    },
    textMedium: {
        marginLeft: 1,
        marginRight: 1,
        width: '90%',
    },
    textLong: {
        marginLeft: 1,
        marginRight: 1,
        width: '100%',
    },
    label: {
        color: 'black'
    },
    checkbox: {
        paddingTop: '15px',
        paddingRight: '10px',
    }
})

var snakecaseKeys = require('snakecase-keys')

export const ReferencesComp = () => {
    const classes = useStyles();

	const dispatch = useDispatch();
    const {referencesData} = useSelector(referencesSelector);

    const handleChange = (fieldName, index) => (event) => {
        let value = event.target.value;
        if (value === '') {
            value = null;
        };
        let referencesDataCopy = JSON.parse(JSON.stringify(referencesData));
        if (fieldName === 'C_2_r_5_PrimarySourceRegulatoryPurposes') {
            referencesDataCopy[index][fieldName].value = event.target.checked;
        } else {
            referencesDataCopy[index][fieldName].value = value;
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
                    <Grid container spacing={2}>
                        <Grid item xs={1}>
                            <ReferencesFieldLabel label="Literature Reference(s)"
                            field = 'C_4_r_1_LiteratureReference' index={index}></ReferencesFieldLabel>
                        </Grid>
                        <Grid item xs={11}>  
                            <Stack direction="row" flexItem spacing={2}>
                                <Box className="text-small">
                                    <FormControlLabel
                                    control={<Checkbox
                                        checked = {item['C_4_r_1_LiteratureReference'].nullFlavor !== null}
                                        onChange={setUnknown('C_4_r_1_LiteratureReference', index)}
                                        />}
                                    label="No Info"/>
                                </Box>
                                {referencesData[index]['C_4_r_1_LiteratureReference']['nullFlavor'] === null ? 
                                    <TextField variant="outlined"
                                        className={classes.textMedium}
                                        onChange={handleChange('C_4_r_1_LiteratureReference', index)}
                                        value = {item['C_4_r_1_LiteratureReference'].value}
                                        inputProps={{ maxLength: 500}}
                                        multiline
                                        rows={5}/>
                                : <FormControl className={classes.textXshort}>
                                    <InputLabel>Null Flavor</InputLabel>
                                    <Select
                                        value = {item['C_4_r_1_LiteratureReference'].nullFlavor}
                                        onChange={setNullFlavor('C_4_r_1_LiteratureReference', index)}
                                    >
                                        <MenuItem value={1}>Asked, but not known</MenuItem>
                                        <MenuItem value={2}>Not asked</MenuItem>
                                    </Select>
                                    </FormControl>
                                }
                            </Stack>
                        </Grid>
                    </Grid>
                     
                    
                    {index === referencesData.length - 1 ?
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