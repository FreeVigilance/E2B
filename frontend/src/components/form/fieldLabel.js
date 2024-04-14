
import { FormLabel } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect } from 'react';


export const FieldLabel = ({label}) => {
    const useStyles = makeStyles({
        label: {
            color: '#333366',
            fontSize: 20,
            paddingTop: '15px',
            paddingRight: '10px',
        }
    })

    const classes = useStyles();

    return (
        <FormLabel className={classes.label}>{label}</FormLabel>
    )
}