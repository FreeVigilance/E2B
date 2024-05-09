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
    FormLabel,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { Box } from '@mui/system';
import {
    identificationSelector,
    setIdentification,
} from '@src/features/identification/slice';
import { DocumentsHeldBySenderComp } from './documents-held-by-sender';
import { OtherIdentifiersComp } from './other-identifiers';
import { IdentificationNumberComp } from './identification-number';
import { makeStyles } from '@mui/styles';
import { IdentificationFieldLabel } from '@src/components/field-labels/identification/identification-label';
import InputMask from 'react-input-mask';

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

const snakecaseKeys = require('snakecase-keys');

export const IdentificationComp = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const { identification } = useSelector(identificationSelector);

    const handleChange = (fieldName) => (event) => {
        let value = event.target.value;
        if (value === '') {
            value = null;
        }
        const identificationCopy = JSON.parse(JSON.stringify(identification));
        if (fieldName === 'C_1_9_1_OtherCaseIdsPreviousTransmissions') {
            identificationCopy[fieldName].value = event.target.checked;
        } else {
            identificationCopy[fieldName].value = value;
        }
        dispatch(setIdentification(identificationCopy));
    };

    const setUnknown = (fieldName) => (event) => {
        const identificationCopy = JSON.parse(JSON.stringify(identification));
        if (event.target.checked) {
            identificationCopy[fieldName].nullFlavor = -1;
        } else {
            identificationCopy[fieldName].nullFlavor = null;
        }
        dispatch(setIdentification(identificationCopy));
    };

    return (
        <>
            <Stack direction={'row'} gap={2}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <IdentificationFieldLabel
                            label="Sender’s (case) Safety Report Unique Identifier"
                            field="C_1_1_SenderSafetyReportUniqueId"
                        ></IdentificationFieldLabel>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            variant="outlined"
                            className={classes.textMedium}
                            onChange={handleChange(
                                'C_1_1_SenderSafetyReportUniqueId',
                            )}
                            value={
                                identification.C_1_1_SenderSafetyReportUniqueId
                                    .value
                            }
                            multiline
                            rows={2}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <IdentificationFieldLabel
                            label="Worldwide Unique Case Identification Number"
                            field="C_1_8_1_WorldwideUniqueCaseIdentificationNumber"
                        ></IdentificationFieldLabel>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            variant="outlined"
                            className={classes.textMedium}
                            onChange={handleChange(
                                'C_1_8_1_WorldwideUniqueCaseIdentificationNumber',
                            )}
                            value={
                                identification
                                    .C_1_8_1_WorldwideUniqueCaseIdentificationNumber
                                    .value
                            }
                            multiline
                            rows={2}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <IdentificationFieldLabel
                            label="Date of Creation"
                            field="C_1_2_DateCreation"
                        ></IdentificationFieldLabel>
                    </Grid>
                    <Grid item xs={9}>
                        <InputMask
                            mask="9999-99-99 99:99:99"
                            maskChar="_"
                            className={classes.textShort}
                            value={identification['C_1_2_DateCreation'].value}
                            onChange={handleChange('C_1_2_DateCreation')}
                        >
                            {(inputProps) => (
                                <TextField {...inputProps} variant="outlined" />
                            )}
                        </InputMask>
                    </Grid>

                    <Grid item xs={3}>
                        <IdentificationFieldLabel
                            label="Type of Report"
                            field="C_1_3_TypeReport"
                        ></IdentificationFieldLabel>
                    </Grid>
                    <Grid item xs={9}>
                        <Select
                            className={classes.textShort}
                            value={identification.C_1_3_TypeReport.value}
                            onChange={handleChange('C_1_3_TypeReport')}
                        >
                            <MenuItem value={1}>
                                1 = Spontaneous report
                            </MenuItem>
                            <MenuItem value={2}>2 = Report from study</MenuItem>
                            <MenuItem value={3}>3 = Other</MenuItem>
                            <MenuItem value={4}>
                                4 = Not available to sender (unknown)
                            </MenuItem>
                        </Select>
                    </Grid>

                    <Grid item xs={3}>
                        <IdentificationFieldLabel
                            label="Date Report Was First Received from Source"
                            field="C_1_4_DateReportFirstReceivedSource"
                        ></IdentificationFieldLabel>
                    </Grid>
                    <Grid item xs={9}>
                        <InputMask
                            mask="9999-99-99 99:99:99"
                            maskChar="_"
                            className={classes.textShort}
                            value={
                                identification[
                                    'C_1_4_DateReportFirstReceivedSource'
                                ].value
                            }
                            onChange={handleChange(
                                'C_1_4_DateReportFirstReceivedSource',
                            )}
                        >
                            {(inputProps) => (
                                <TextField {...inputProps} variant="outlined" />
                            )}
                        </InputMask>
                    </Grid>

                    <Grid item xs={3}>
                        <IdentificationFieldLabel
                            label="Date of Most Recent Information for This Report"
                            field="C_1_5_DateMostRecentInformation"
                        ></IdentificationFieldLabel>
                    </Grid>
                    <Grid item xs={9}>
                        <InputMask
                            mask="9999-99-99 99:99:99"
                            maskChar="_"
                            className={classes.textShort}
                            value={
                                identification[
                                    'C_1_5_DateMostRecentInformation'
                                ].value
                            }
                            onChange={handleChange(
                                'C_1_5_DateMostRecentInformation',
                            )}
                        >
                            {(inputProps) => (
                                <TextField {...inputProps} variant="outlined" />
                            )}
                        </InputMask>
                    </Grid>

                    <Grid item xs={3}>
                        <IdentificationFieldLabel
                            label="Are Additional Documents Available?"
                            field="C_1_6_1_AdditionalDocumentsAvailable"
                        ></IdentificationFieldLabel>
                    </Grid>
                    <Grid item xs={9}>
                        <Select
                            className={classes.textXshort}
                            value={
                                identification
                                    .C_1_6_1_AdditionalDocumentsAvailable.value
                            }
                            onChange={handleChange(
                                'C_1_6_1_AdditionalDocumentsAvailable',
                            )}
                        >
                            <MenuItem value={true}>Yes</MenuItem>
                            <MenuItem value={false}>No</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <IdentificationFieldLabel
                            label="First Sender of This Case"
                            field="C_1_8_2_FirstSender"
                        ></IdentificationFieldLabel>
                    </Grid>
                    <Grid item xs={9}>
                        <Select
                            className={classes.textXshort}
                            value={identification.C_1_8_2_FirstSender.value}
                            onChange={handleChange('C_1_8_2_FirstSender')}
                        >
                            <MenuItem value={1}>1 = Regulator</MenuItem>
                            <MenuItem value={2}>2 = Other</MenuItem>
                        </Select>
                    </Grid>

                    <Grid item xs={3}>
                        <IdentificationFieldLabel
                            label="Report Nullification / Amendment"
                            field="C_1_11_1_ReportNullificationAmendment"
                        ></IdentificationFieldLabel>
                    </Grid>
                    <Grid item xs={9}>
                        <Select
                            className={classes.textXshort}
                            value={
                                identification
                                    .C_1_11_1_ReportNullificationAmendment.value
                            }
                            onChange={handleChange(
                                'C_1_11_1_ReportNullificationAmendment',
                            )}
                        >
                            <MenuItem value={1}>1 = Nullification</MenuItem>
                            <MenuItem value={2}>2 = Amendment</MenuItem>
                        </Select>
                    </Grid>

                    <Grid item xs={3}>
                        <IdentificationFieldLabel
                            label="Does This Case Fulfil the Local Criteria for an Expedited Report?"
                            field="C_1_7_FulfilLocalCriteriaExpeditedReport"
                        ></IdentificationFieldLabel>
                    </Grid>
                    <Grid item xs={9}>
                        <Stack
                            direction="row"
                            spacing={2}
                            justifyContent="flex-start"
                        >
                            <Box className="text-small">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={
                                                identification
                                                    .C_1_7_FulfilLocalCriteriaExpeditedReport
                                                    .nullFlavor !== null
                                            }
                                            onChange={setUnknown(
                                                'C_1_7_FulfilLocalCriteriaExpeditedReport',
                                            )}
                                        />
                                    }
                                    label="No Info"
                                />
                            </Box>
                            {identification
                                .C_1_7_FulfilLocalCriteriaExpeditedReport
                                .nullFlavor === null ? (
                                <Select
                                    className={classes.textXshort}
                                    value={
                                        identification
                                            .C_1_7_FulfilLocalCriteriaExpeditedReport
                                            .value
                                    }
                                    onChange={handleChange(
                                        'C_1_7_FulfilLocalCriteriaExpeditedReport',
                                    )}
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                            ) : (
                                <FormLabel>
                                    No Information On Case Fulfilling the Local
                                    Criteria for an Expedited Report
                                </FormLabel>
                            )}
                        </Stack>
                    </Grid>

                    <Grid item xs={3}>
                        <IdentificationFieldLabel
                            label="Other Case Identifiers in Previous Transmissions"
                            field="C_1_9_1_OtherCaseIdsPreviousTransmissions"
                        ></IdentificationFieldLabel>
                    </Grid>
                    <Grid item xs={9}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={
                                        identification
                                            .C_1_9_1_OtherCaseIdsPreviousTransmissions
                                            .value
                                    }
                                    onChange={handleChange(
                                        'C_1_9_1_OtherCaseIdsPreviousTransmissions',
                                    )}
                                />
                            }
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <IdentificationFieldLabel
                            label="Reason for Nullification / Amendment"
                            field="C_1_11_2_ReasonNullificationAmendment"
                        ></IdentificationFieldLabel>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            variant="outlined"
                            className={classes.textLong}
                            onChange={handleChange(
                                'C_1_11_2_ReasonNullificationAmendment',
                            )}
                            value={
                                identification
                                    .C_1_11_2_ReasonNullificationAmendment.value
                            }
                            multiline
                            rows={10}
                        />
                    </Grid>
                </Grid>
            </Stack>

            <Divider sx={{ borderBottomWidth: 5, padding: 2 }} />

            <Grid container direction="row" columnGap={4}>
                <Grid container item xs direction="column" rowGap={1}>
                    <FormLabel
                        sx={{ fontSize: 30, marginLeft: '35%', color: 'black' }}
                    >
                        Documents Held by Sender
                    </FormLabel>
                    <DocumentsHeldBySenderComp></DocumentsHeldBySenderComp>
                </Grid>
                <Grid container item xs direction="column" rowGap={1}>
                    <FormLabel
                        sx={{ fontSize: 30, marginLeft: '35%', color: 'black' }}
                    >
                        Other Case Identifiers
                    </FormLabel>
                    <OtherIdentifiersComp></OtherIdentifiersComp>
                </Grid>
                <Grid container item xs direction="column" rowGap={1}>
                    <FormLabel
                        sx={{ fontSize: 30, marginLeft: '35%', color: 'black' }}
                    >
                        Identification Number
                    </FormLabel>
                    <IdentificationNumberComp></IdentificationNumberComp>
                </Grid>
            </Grid>
        </>
    );
};
