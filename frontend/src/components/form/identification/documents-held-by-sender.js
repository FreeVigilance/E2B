import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Stack, Card, CardContent, IconButton, Grid} from '@mui/material';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { identificationSelector, setDocumentsHeldBySender } from '@src/features/identification/slice';
import { DocumentsHeldBySender } from '@src/features/identification/identification';
import DeleteIcon from '@mui/icons-material/Delete';
import {makeStyles} from '@mui/styles';
import { DocumentsSenderFieldLabel } from '@src/components/field-labels/identification/documents-sender-label';

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

export const DocumentsHeldBySenderComp = () => {
    const classes = useStyles();

	const dispatch = useDispatch();
    const {documentsHeldBySender} = useSelector(identificationSelector);

    const handleChange = (fieldName, index) => (event) => {
        let documentsHeldBySenderCopy = JSON.parse(JSON.stringify(documentsHeldBySender));
        documentsHeldBySenderCopy[index][fieldName].value = event.target.value;
        dispatch(setDocumentsHeldBySender(documentsHeldBySenderCopy));
    };


    const formList = () => {
        let list = [];
        if (documentsHeldBySender.length === 0) {
            return ( <span>
                <IconButton size='large' style= {{ top: '10px'}}
                sx={{ color: "white", backgroundColor: "#1976d2"}}
                            onClick={addForm}><AddIcon/></IconButton>
            </span>);
        }
        Object.values(documentsHeldBySender).forEach((item, index) => {
            list.push(
                <Card sx={{border: "3px solid #094B8C",
                padding: "10px",
                boxShadow: "5px 5px #356BA0",
                marginBottom: 5}}>
                    <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <DocumentsSenderFieldLabel label="Documents Held by Sender"
                            field = 'C_1_6_1_r_1_DocumentsHeldSender' index={index}></DocumentsSenderFieldLabel>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField variant="outlined"
                                onChange={handleChange('C_1_6_1_r_1_DocumentsHeldSender', index)}
                                value = {item['C_1_6_1_r_1_DocumentsHeldSender'].value}
                                multiline
                                className={classes.textLong}
                                inputProps={{ maxLength: 2000}}
                                rows={10}/>
                        </Grid>

                        {index === documentsHeldBySender.length - 1 ?
                                <span>
                                    <IconButton size='large' style= {{ top: '10px', left: '10px'}}
                                    sx={{ color: "white", backgroundColor: "#1976d2"}}
                                                onClick={addForm}><AddIcon/></IconButton>
                                </span> : null}

                                <span>

                                        <IconButton size='large' style= {{ top: '10px', left: '20px'}}
                                        sx={{ color: "white", backgroundColor: "#000066"}}
                                                onClick={() => removeForm(index)}><DeleteIcon/>
                                        </IconButton>
                                </span>  
                                
                        </Grid>
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

    const removeForm = (index) => {
        let documentsHeldBySenderCopy = JSON.parse(JSON.stringify(documentsHeldBySender));
        documentsHeldBySenderCopy.splice(index, 1);
        dispatch(setDocumentsHeldBySender(documentsHeldBySenderCopy));
    }

    return(
        <div>
            {formList()}
        </div>
    )
}