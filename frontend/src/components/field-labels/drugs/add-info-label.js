
import { FormLabel, IconButton, Stack, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { displaySelector } from '@src/features/display/slice';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import InfoIcon from '@mui/icons-material/Info';

export const AddInfoFieldLabel = ({label, field, drugIndex, index}) => {
    const useStyles = makeStyles({
        label: {
            color: '#333366',
            fontSize: 20,
            paddingTop: '15px',
            paddingRight: '10px',
        },
        error: {
            color: 'red',
            fontSize: 20,
            paddingTop: '15px',
            paddingRight: '10px',
            fontWeight: 600
        }
    })

    const classes = useStyles();
    const {errors} = useSelector(displaySelector);

    const getErrorText = (obj) => {
        if (!obj) return null;
        for (const [key, value] of Object.entries(obj)) {
            console.log(key);
            if (key === field) {
                if (value['value']) {
                    return value['value']['_Self'];
                } else if (value['nullFlavor']) {
                    return value['nullFlavor']['_Self'];
                }
                return value['_Self'];
            } else {
                if (key === '_Self') {
                    return null;
                }
                return getErrorText(value);
            }
        }
        return null;
    }

    const createLabel = () => {
        if (errors['G_k_DrugInformation'] && errors['G_k_DrugInformation'][drugIndex] &&
        errors['G_k_DrugInformation'][drugIndex]['G_k_10_r_AdditionalInformationDrug']) {
            const errorText = getErrorText(errors['G_k_DrugInformation'][drugIndex]['G_k_10_r_AdditionalInformationDrug'][index]);
            if (errorText === null) {
                return <FormLabel className={classes.label}>{label}</FormLabel>
            }
            return (
                <Stack direction={'row'}>
                    <FormLabel className={classes.error}>{label}</FormLabel>
                    <Tooltip title={<h2>{errorText}</h2> }arrow>
                        <IconButton>
                            <InfoIcon style={{color: 'red'}}/>
                        </IconButton>
                    </Tooltip>
                </Stack>
            );
        } else {
            return <FormLabel className={classes.label}>{label}</FormLabel>
        }
    }

    return (
        createLabel()
    );
}