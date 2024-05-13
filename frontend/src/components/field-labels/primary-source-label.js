import { FormLabel, IconButton, Stack, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { displaySelector } from '@src/features/display/slice';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import InfoIcon from '@mui/icons-material/Info';

export const PrimarySourceFieldLabel = ({ label, field, index }) => {
    const useStyles = makeStyles({
        label: {
            color: '#333366',
            fontSize: 20,
            paddingTop: '15px',
            paddingRight: '10px',
        },
        error: {
            color: '#CC0000',
            fontSize: 20,
            paddingTop: '15px',
            paddingRight: '10px',
            fontWeight: 600,
        },
        businessError: {
            color: '#FFCC00',
            fontSize: 20,
            paddingTop: '15px',
            paddingRight: '10px',
            fontWeight: 600,
        },
    });

    const classes = useStyles();
    const { errors } = useSelector(displaySelector);

    const getErrorText = (obj) => {
        if (!obj) return null;
        for (const [key, value] of Object.entries(obj)) {
            console.log(key);
            console.log('field', field)
            if (key === field) {
                console.log(1)
                console.log(value)
                // return value['value']['_Self'];
                if (value['value']) {
                    return value['value']['_Self'];
                } else if (value['nullFlavor']) {
                    return value['nullFlavor']['_Self'];
                }
                return value['_Self'];
            } else {
                console.log(2)
                if (key === '_Self') {
                    console.log(3)
                    return null;
                }
                return getErrorText(value);
            }
        }
        return null;
    };

    const createLabel = () => {
        if (errors['C_2_r_PrimarySourceInformation']) {
            console.log("C_2_r_PrimarySourceInformation!!!!");

            const errorText = getErrorText(
                errors['C_2_r_PrimarySourceInformation'][index],
            );
            console.log("c2 errorText", errorText)
            if (errorText === null || !errorText) {
                return <FormLabel className={classes.label}>{label}</FormLabel>;
            }
            if (errorText['parsing'] && errorText['business']) {
                return (
                    <Stack direction={'row'}>
                        <FormLabel className={classes.error}>{label}</FormLabel>
                        <Tooltip title={<h2>{errorText['parsing']}</h2>} arrow>
                            <IconButton>
                                <InfoIcon style={{ color: '#CC0000' }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={<h2>{errorText['business']}</h2>} arrow>
                            <IconButton>
                                <InfoIcon style={{ color: '#FFCC00' }} />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                );
            }
            if (errorText['parsing']) {
                return (
                    <Stack direction={'row'}>
                        <FormLabel className={classes.error}>{label}</FormLabel>
                        <Tooltip title={<h2>{errorText['parsing']}</h2>} arrow>
                            <IconButton>
                                <InfoIcon style={{ color: '#CC0000' }} />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                );
            }
            if (errorText['business']) {
                return (
                    <Stack direction={'row'}>
                        <FormLabel className={classes.businessError}>
                            {label}
                        </FormLabel>
                        <Tooltip title={<h2>{errorText['business']}</h2>} arrow>
                            <IconButton>
                                <InfoIcon style={{ color: '#FFCC00' }} />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                );
            }
            return null;
        } else {
            return <FormLabel className={classes.label}>{label}</FormLabel>;
        }
    };

    return createLabel();
};
