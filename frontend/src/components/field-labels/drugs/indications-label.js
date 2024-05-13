import { FormLabel, IconButton, Stack, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { displaySelector } from '@src/features/display/slice';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import InfoIcon from '@mui/icons-material/Info';

export const IndicationsFieldLabel = ({ label, field, drugIndex, index }) => {
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
            if (key === field) {
                if (value['value']) {
                    return value['value']['_Self'];
                } else if (value['nullFlavor']) {
                    return value['nullFlavor']['_Self'];
                }
                return value['_Self'];
            } else {
                continue;
            }
        }
        return null;
    };

    const createLabel = () => {
        if (
            errors['G_k_DrugInformation'] &&
            errors['G_k_DrugInformation'][drugIndex] &&
            errors['G_k_DrugInformation'][drugIndex][
                'G_k_7_r_IndicationUseCase'
            ]
        ) {
            const errorText = getErrorText(
                errors['G_k_DrugInformation'][drugIndex][
                    'G_k_7_r_IndicationUseCase'
                ][index],
            );
            if (errorText === null) {
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
