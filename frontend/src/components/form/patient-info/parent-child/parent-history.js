import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Stack, Grid, FormLabel, Card, CardContent } from '@mui/material';
import TextField from '@mui/material/TextField';
import {
    patientSelector,
    setParentHistoryData,
} from '@src/features/patient/slice';
import { ParentInfo } from './parent-info';
import { makeStyles } from '@mui/styles';
import { ParentHistoryFieldLabel } from '@src/components/field-labels/patient/parent-child/parent-history';

const useStyles = makeStyles({
    margin: {
        marginTop: '10px',
        marginLeft: '10px',
        marginBottom: '5px',
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
        color: 'black',
    },
    checkbox: {
        paddingTop: '15px',
        paddingRight: '10px',
    },
});

export const ParentHistory = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { parentHistoryData, parentData } = useSelector(patientSelector);

    const handleChange = (fieldName) => (event) => {
        let value = event.target.value;
        if (value === '') {
            value = null;
        }
        let parentHistoryDataCopy = JSON.parse(
            JSON.stringify(parentHistoryData),
        );
        parentHistoryDataCopy[fieldName].value = value;
        dispatch(setParentHistoryData(parentHistoryDataCopy));
    };

    const formList = () => {
        return (
            <Grid container spacing={2}>
                <ParentHistoryFieldLabel
                    label="Text for Relevant Medical History and Concurrent Conditions of Parent"
                    field="D_10_7_2_TextMedicalHistoryParent"
                ></ParentHistoryFieldLabel>
                <TextField
                    variant="outlined"
                    sx={{ width: '100%' }}
                    onChange={handleChange('D_10_7_2_TextMedicalHistoryParent')}
                    value={
                        parentHistoryData['D_10_7_2_TextMedicalHistoryParent']
                            .value
                    }
                    multiline
                    rows={15}
                />

                <Grid container item xs direction="column" rowGap={1}>
                    <FormLabel
                        sx={{ fontSize: 30, color: 'black', marginLeft: '25%' }}
                    >
                        Structured Information of Parent
                    </FormLabel>
                    <ParentInfo></ParentInfo>
                </Grid>
            </Grid>
        );
    };

    return <div>{formList()}</div>;
};
