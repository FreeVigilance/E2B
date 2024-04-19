
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Stack, Card, CardContent, IconButton, Grid} from '@mui/material';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { identificationSelector, setOtherIdentifiers } from '@src/features/identification/slice';
import { OtherIdentifiers } from '@src/features/identification/identification';
import DeleteIcon from '@mui/icons-material/Delete';
import {makeStyles} from '@mui/styles';
import { OtherIdentifiersFieldLabel } from '@src/components/field-labels/identification/other-identifiers-label';

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

export const OtherIdentifiersComp = () => {
    const classes = useStyles();

	const dispatch = useDispatch();
    const {otherIdentifiers} = useSelector(identificationSelector);

    const handleChange = (fieldName, index) => (event) => {
        let value = event.target.value;
        if (value === '') {
            value = null;
        };
        let otherIdentifiersCopy = JSON.parse(JSON.stringify(otherIdentifiers));
        otherIdentifiersCopy[index][fieldName].value = value;
        dispatch(setOtherIdentifiers(otherIdentifiersCopy));
    };

    const formList = () => {
        let list = [];
        if (otherIdentifiers.length === 0) {
            return ( <span>
                <IconButton size='large' style= {{ top: '10px'}}
                sx={{ color: "white", backgroundColor: "#1976d2"}}
                            onClick={addForm}><AddIcon/></IconButton>
            </span>);
        }
        Object.values(otherIdentifiers).forEach((item, index) => {
            list.push(
                <Card sx={{border: "3px solid #094B8C",
                padding: "10px",
                boxShadow: "5px 5px #356BA0",
                marginBottom: 5}}>
                    <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <OtherIdentifiersFieldLabel label="Source(s) of the Case Identifier"
                            field = 'C_1_9_1_r_1_SourceCaseId' index={index}></OtherIdentifiersFieldLabel>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField variant="outlined"
                                onChange={handleChange('C_1_9_1_r_1_SourceCaseId', index)}
                                value = {item['C_1_9_1_r_1_SourceCaseId'].value}
                                multiline
                                className={classes.textLong}
                                rows={3}/>
                        </Grid>

                         <Grid item xs={3}>
                            <OtherIdentifiersFieldLabel label="Case Identifier(s)"
                            field = 'C_1_9_1_r_2_CaseId' index={index}></OtherIdentifiersFieldLabel>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField variant="outlined"
                                onChange={handleChange('C_1_9_1_r_2_CaseId', index)}
                                value = {item['C_1_9_1_r_2_CaseId'].value}
                                multiline
                                className={classes.textLong}
                                rows={3}/>
                        </Grid>
                    </Grid>
                            <Stack direction="row" justifyContent="flex-start">
                                
                            {index === otherIdentifiers.length - 1 ?
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
        let otherIdentifiersCopy = JSON.parse(JSON.stringify(otherIdentifiers));
        let otherIdentifiersNew = new OtherIdentifiers();
        otherIdentifiersCopy.push(otherIdentifiersNew);
        dispatch(setOtherIdentifiers(otherIdentifiersCopy));
    }

    const removeForm = (index) => {
        let otherIdentifiersCopy = JSON.parse(JSON.stringify(otherIdentifiers));
        otherIdentifiersCopy.splice(index, 1);
        dispatch(setOtherIdentifiers(otherIdentifiersCopy));
    }

    return(
        <div>
            {formList()}
        </div>
    )
}