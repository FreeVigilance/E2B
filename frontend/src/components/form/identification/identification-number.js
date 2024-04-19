
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Stack, Card, CardContent, IconButton, Grid} from '@mui/material';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { identificationSelector, setIdentificationNumber } from '@src/features/identification/slice';
import { IdentificationNumber } from '@src/features/identification/identification';
import DeleteIcon from '@mui/icons-material/Delete';
import {makeStyles} from '@mui/styles';
import { IdentificationNumberFieldLabel } from '@src/components/field-labels/identification/identification-number-label';

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

export const IdentificationNumberComp = () => {
    const classes = useStyles();

	const dispatch = useDispatch();
    const {identificationNumber} = useSelector(identificationSelector);

    const handleChange = (fieldName, index) => (event) => {
        let value = event.target.value;
        if (value === '') {
            value = null;
        };
        let identificationNumberCopy = JSON.parse(JSON.stringify(identificationNumber));
        identificationNumberCopy[index][fieldName].value = value;
        dispatch(setIdentificationNumber(identificationNumberCopy));
    };

    const formList = () => {
        let list = [];
        if (identificationNumber.length === 0) {
            return ( <span>
                <IconButton size='large' style= {{ top: '10px'}}
                sx={{ color: "white", backgroundColor: "#1976d2"}}
                            onClick={addForm}><AddIcon/></IconButton>
            </span>);
        }
        Object.values(identificationNumber).forEach((item, index) => {
            list.push(
                <Card sx={{border: "3px solid #094B8C",
                padding: "10px",
                boxShadow: "5px 5px #356BA0",
                marginBottom: 5}}>
                    <CardContent>
                    <Stack direction={'column'} gap={2}>
                        <IdentificationNumberFieldLabel label="Identification Number of the Report Which Is Linked to This Report"
                        field = 'C_1_10_r_IdentificationNumberReportLinked' index={index}></IdentificationNumberFieldLabel>
                        <TextField variant="outlined"
                            onChange={handleChange('C_1_10_r_IdentificationNumberReportLinked', index)}
                            value = {item['C_1_10_r_IdentificationNumberReportLinked'].value}
                            multiline
                            className={classes.textLong}
                            rows={2}/>
                    </Stack>

                    <Stack direction="row" justifyContent="flex-start">

                            {index === identificationNumber.length - 1 ?
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

    const removeForm = (index) => {
        let identificationNumberCopy = JSON.parse(JSON.stringify(identificationNumber));
        identificationNumberCopy.splice(index, 1);
        dispatch(setIdentificationNumber(identificationNumberCopy));
    }

    return(
        <div>
            {formList()}
        </div>
    )
}