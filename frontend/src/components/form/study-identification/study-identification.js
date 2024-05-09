import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Stack,
    FormControlLabel,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Grid,
    Divider,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { FormLabel } from '@mui/material';
import { Box } from '@mui/system';
import {
    setStudyIdentification,
    studyIdentificationSelector,
} from '@src/features/study-identification/slice';
import { StudyRegistrationComp } from './study-registration';
import { makeStyles } from '@mui/styles';
import { StudyIdentificationFieldLabel } from '@src/components/field-labels/study-identification/study-identification-label';

const useStyles = makeStyles({
    margin: {
        marginTop: '10px',
        marginLeft: '10px',
        marginBottom: '5px',
    },
    textXshort: {
        marginLeft: 1,
        marginRight: 1,
        width: '25%',
    },
    textShort: {
        marginLeft: 1,
        marginRight: 1,
        width: '40%',
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

var snakecaseKeys = require('snakecase-keys');

export const StudyIdentificationComp = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const { studyIdentification } = useSelector(studyIdentificationSelector);

    const handleChange = (fieldName) => (event) => {
        let value = event.target.value;
        if (value === '') {
            value = null;
        }
        let studyIdentificationCopy = JSON.parse(
            JSON.stringify(studyIdentification),
        );
        studyIdentificationCopy[fieldName].value = value;
        dispatch(setStudyIdentification(studyIdentificationCopy));
    };

    const setNullFlavor = (fieldName) => (event) => {
        let studyIdentificationCopy = JSON.parse(
            JSON.stringify(studyIdentification),
        );
        studyIdentificationCopy[fieldName].nullFlavor = event.target.value;
        dispatch(setStudyIdentification(studyIdentificationCopy));
    };

    const setUnknown = (fieldName) => (event) => {
        let studyIdentificationCopy = JSON.parse(
            JSON.stringify(studyIdentification),
        );
        if (event.target.checked) {
            studyIdentificationCopy[fieldName].nullFlavor = -1;
        } else {
            studyIdentificationCopy[fieldName].nullFlavor = null;
        }
        dispatch(setStudyIdentification(studyIdentificationCopy));
    };

    return (
        <>
            <Stack direction="column" spacing={2} justifyContent="flex-start">
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <StudyIdentificationFieldLabel
                            label="Study Name"
                            field="C_5_2_StudyName"
                        ></StudyIdentificationFieldLabel>
                    </Grid>
                    <Grid item xs={9}>
                        <Stack direction={'row'}>
                            <Box className="text-small">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={
                                                studyIdentification[
                                                    'C_5_2_StudyName'
                                                ].nullFlavor !== null
                                            }
                                            onChange={setUnknown(
                                                'C_5_2_StudyName',
                                            )}
                                        />
                                    }
                                    label="No Info"
                                />
                            </Box>
                            {studyIdentification['C_5_2_StudyName'][
                                'nullFlavor'
                            ] === null ? (
                                <TextField
                                    variant="outlined"
                                    onChange={handleChange('C_5_2_StudyName')}
                                    value={
                                        studyIdentification['C_5_2_StudyName']
                                            .value
                                    }
                                    multiline
                                    className={classes.textLong}
                                    rows={5}
                                />
                            ) : (
                                <FormControl className={classes.textXshort}>
                                    <InputLabel>Null Flavor</InputLabel>
                                    <Select
                                        value={
                                            studyIdentification[
                                                'C_5_2_StudyName'
                                            ].nullFlavor
                                        }
                                        onChange={setNullFlavor(
                                            'C_5_2_StudyName',
                                        )}
                                    >
                                        <MenuItem value={1}>
                                            Asked, but not known
                                        </MenuItem>
                                        <MenuItem value={2}>Not asked</MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        </Stack>
                    </Grid>

                    <Grid item xs={3}>
                        <StudyIdentificationFieldLabel
                            label="Sponsor Study Number"
                            field="C_5_3_SponsorStudyNumber"
                        ></StudyIdentificationFieldLabel>
                    </Grid>
                    <Grid item xs={9}>
                        <Stack direction="row">
                            <Box className="text-small">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={
                                                studyIdentification[
                                                    'C_5_3_SponsorStudyNumber'
                                                ].nullFlavor !== null
                                            }
                                            onChange={setUnknown(
                                                'C_5_3_SponsorStudyNumber',
                                            )}
                                        />
                                    }
                                    label="No Info"
                                />
                            </Box>
                            {studyIdentification['C_5_3_SponsorStudyNumber'][
                                'nullFlavor'
                            ] === null ? (
                                <TextField
                                    variant="outlined"
                                    className={classes.textShort}
                                    onChange={handleChange(
                                        'C_5_3_SponsorStudyNumber',
                                    )}
                                    value={
                                        studyIdentification[
                                            'C_5_3_SponsorStudyNumber'
                                        ].value
                                    }
                                />
                            ) : (
                                <FormControl className={classes.textXshort}>
                                    <InputLabel>Null Flavor</InputLabel>
                                    <Select
                                        value={
                                            studyIdentification[
                                                'C_5_3_SponsorStudyNumber'
                                            ].nullFlavor
                                        }
                                        onChange={setNullFlavor(
                                            'C_5_3_SponsorStudyNumber',
                                        )}
                                    >
                                        <MenuItem value={1}>
                                            Asked, but not known
                                        </MenuItem>
                                        <MenuItem value={2}>Not asked</MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        </Stack>
                    </Grid>

                    <Grid item xs={3}>
                        <StudyIdentificationFieldLabel
                            label="Study Type Where Reaction(s) Were Observed"
                            field="C_5_4_StudyTypeReaction"
                        ></StudyIdentificationFieldLabel>
                    </Grid>
                    <Grid item xs={9}>
                        <Select
                            className={classes.textXshort}
                            value={
                                studyIdentification['C_5_4_StudyTypeReaction']
                                    .value
                            }
                            onChange={handleChange('C_5_4_StudyTypeReaction')}
                        >
                            <MenuItem value={1}>1 = Clinical trials</MenuItem>
                            <MenuItem value={2}>
                                2 = Individual patient use
                            </MenuItem>
                            <MenuItem value={3}>3 = Other studies</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
            </Stack>

            <Divider sx={{ borderBottomWidth: 5, padding: 2 }} />

            <Grid container direction="row" columnGap={4}>
                <Grid container item xs direction="column" rowGap={1}>
                    <FormLabel
                        sx={{ fontSize: 30, marginLeft: '35%', color: 'black' }}
                    >
                        Study Registration
                    </FormLabel>

                    <StudyRegistrationComp></StudyRegistrationComp>
                </Grid>
                <Grid container item xs direction="column" rowGap={1}></Grid>
            </Grid>
        </>
    );
};
