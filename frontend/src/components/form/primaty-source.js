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
    IconButton,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/system';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {
    primarySourceSelector,
    setPrimarySourceData,
} from '@src/features/primary-source/slice';
import { PrimarySource } from '@src/features/primary-source/primary-source';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@mui/styles';
import { PrimarySourceFieldLabel } from '../field-labels/primary-source-label';

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

var snakecaseKeys = require('snakecase-keys');

export const PrimarySourceComp = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const { primarySourceData } = useSelector(primarySourceSelector);

    const handleChange = (fieldName, index) => (event) => {
        let value = event.target.value;
        if (value === '') {
            value = null;
        }
        let primarySourceDataCopy = JSON.parse(
            JSON.stringify(primarySourceData),
        );
        if (fieldName === 'C_2_r_5_PrimarySourceRegulatoryPurposes') {
            primarySourceDataCopy[index][fieldName].value =
                event.target.checked;
        } else {
            primarySourceDataCopy[index][fieldName].value = value;
        }
        dispatch(setPrimarySourceData(primarySourceDataCopy));
    };

    const setNullFlavor = (fieldName, index) => (event) => {
        let primarySourceDataCopy = JSON.parse(
            JSON.stringify(primarySourceData),
        );
        primarySourceDataCopy[index][fieldName].nullFlavor = event.target.value;
        dispatch(setPrimarySourceData(primarySourceDataCopy));
    };

    const setUnknown = (fieldName, index) => (event) => {
        console.log(event.target.checked);
        let primarySourceDataCopy = JSON.parse(
            JSON.stringify(primarySourceData),
        );
        if (event.target.checked) {
            primarySourceDataCopy[index][fieldName].nullFlavor = -1;
        } else {
            primarySourceDataCopy[index][fieldName].nullFlavor = null;
        }
        dispatch(setPrimarySourceData(primarySourceDataCopy));
    };

    const formList = () => {
        let list = [];
        if (primarySourceData.length === 0) {
            return (
                <span>
                    <IconButton
                        size="large"
                        style={{ top: '10px' }}
                        sx={{ color: 'white', backgroundColor: '#1976d2' }}
                        onClick={addForm}
                    >
                        <AddIcon />
                    </IconButton>
                </span>
            );
        }
        Object.values(primarySourceData).forEach((item, index) => {
            list.push(
                <Card
                    sx={{
                        border: '3px solid #094B8C',
                        padding: '10px',
                        boxShadow: '5px 5px #356BA0',
                        marginBottom: 5,
                    }}
                >
                    <CardContent>
                        <Stack direction={'row'} gap={2}>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <PrimarySourceFieldLabel
                                        label="Reporter’s Title"
                                        field="C_2_r_1_1_ReporterTitle"
                                        index={index}
                                    ></PrimarySourceFieldLabel>
                                </Grid>
                                <Grid item xs={9}>
                                    <Stack direction="row" flexItem spacing={2}>
                                        <Box className="text-small">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={
                                                            item[
                                                                'C_2_r_1_1_ReporterTitle'
                                                            ].nullFlavor !==
                                                            null
                                                        }
                                                        onChange={setUnknown(
                                                            'C_2_r_1_1_ReporterTitle',
                                                            index,
                                                        )}
                                                    />
                                                }
                                                label="No Info"
                                            />
                                        </Box>
                                        {primarySourceData[index][
                                            'C_2_r_1_1_ReporterTitle'
                                        ]['nullFlavor'] === null ? (
                                            <TextField
                                                variant="outlined"
                                                className={classes.textMedium}
                                                onChange={handleChange(
                                                    'C_2_r_1_1_ReporterTitle',
                                                    index,
                                                )}
                                                value={
                                                    item[
                                                        'C_2_r_1_1_ReporterTitle'
                                                    ].value
                                                }
                                            />
                                        ) : (
                                            <FormControl
                                                className={classes.textXshort}
                                            >
                                                <InputLabel>
                                                    Null Flavor
                                                </InputLabel>
                                                <Select
                                                    value={
                                                        item[
                                                            'C_2_r_1_1_ReporterTitle'
                                                        ].nullFlavor
                                                    }
                                                    onChange={setNullFlavor(
                                                        'C_2_r_1_1_ReporterTitle',
                                                        index,
                                                    )}
                                                >
                                                    <MenuItem value={0}>
                                                        Masked
                                                    </MenuItem>
                                                    <MenuItem value={1}>
                                                        Asked, but not known
                                                    </MenuItem>
                                                    <MenuItem value={2}>
                                                        Not asked
                                                    </MenuItem>
                                                    <MenuItem value={3}>
                                                        Unknown
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        )}
                                    </Stack>
                                </Grid>

                                <Grid item xs={3}>
                                    <PrimarySourceFieldLabel
                                        label="Reporter’s Given Name"
                                        field="C_2_r_1_2_ReporterGivenName"
                                        index={index}
                                    ></PrimarySourceFieldLabel>
                                </Grid>
                                <Grid item xs={9}>
                                    <Stack direction="row" flexItem spacing={2}>
                                        <Box className="text-small">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={
                                                            item[
                                                                'C_2_r_1_2_ReporterGivenName'
                                                            ].nullFlavor !==
                                                            null
                                                        }
                                                        onChange={setUnknown(
                                                            'C_2_r_1_2_ReporterGivenName',
                                                            index,
                                                        )}
                                                    />
                                                }
                                                label="No Info"
                                            />
                                        </Box>
                                        {primarySourceData[index][
                                            'C_2_r_1_2_ReporterGivenName'
                                        ]['nullFlavor'] === null ? (
                                            <TextField
                                                variant="outlined"
                                                className={classes.textMedium}
                                                onChange={handleChange(
                                                    'C_2_r_1_2_ReporterGivenName',
                                                    index,
                                                )}
                                                value={
                                                    item[
                                                        'C_2_r_1_2_ReporterGivenName'
                                                    ].value
                                                }
                                            />
                                        ) : (
                                            <FormControl
                                                className={classes.textXshort}
                                            >
                                                <InputLabel>
                                                    Null Flavor
                                                </InputLabel>
                                                <Select
                                                    value={
                                                        item[
                                                            'C_2_r_1_2_ReporterGivenName'
                                                        ].nullFlavor
                                                    }
                                                    onChange={setNullFlavor(
                                                        'C_2_r_1_2_ReporterGivenName',
                                                        index,
                                                    )}
                                                >
                                                    <MenuItem value={0}>
                                                        Masked
                                                    </MenuItem>
                                                    <MenuItem value={1}>
                                                        Asked, but not known
                                                    </MenuItem>
                                                    <MenuItem value={2}>
                                                        Not asked
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        )}
                                    </Stack>
                                </Grid>

                                <Grid item xs={3}>
                                    <PrimarySourceFieldLabel
                                        label="Reporter’s Middle Name"
                                        field="C_2_r_1_3_ReporterMiddleName"
                                        index={index}
                                    ></PrimarySourceFieldLabel>
                                </Grid>
                                <Grid item xs={9}>
                                    <Stack direction="row" flexItem spacing={2}>
                                        <Box className="text-small">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={
                                                            item[
                                                                'C_2_r_1_3_ReporterMiddleName'
                                                            ].nullFlavor !==
                                                            null
                                                        }
                                                        onChange={setUnknown(
                                                            'C_2_r_1_3_ReporterMiddleName',
                                                            index,
                                                        )}
                                                    />
                                                }
                                                label="No Info"
                                            />
                                        </Box>
                                        {primarySourceData[index][
                                            'C_2_r_1_3_ReporterMiddleName'
                                        ]['nullFlavor'] === null ? (
                                            <TextField
                                                variant="outlined"
                                                onChange={handleChange(
                                                    'C_2_r_1_3_ReporterMiddleName',
                                                    index,
                                                )}
                                                value={
                                                    item[
                                                        'C_2_r_1_3_ReporterMiddleName'
                                                    ].value
                                                }
                                                className={classes.textMedium}
                                            />
                                        ) : (
                                            <FormControl
                                                className={classes.textXshort}
                                            >
                                                <InputLabel>
                                                    Null Flavor
                                                </InputLabel>
                                                <Select
                                                    value={
                                                        item[
                                                            'C_2_r_1_3_ReporterMiddleName'
                                                        ].nullFlavor
                                                    }
                                                    onChange={setNullFlavor(
                                                        'C_2_r_1_3_ReporterMiddleName',
                                                        index,
                                                    )}
                                                >
                                                    <MenuItem value={0}>
                                                        Masked
                                                    </MenuItem>
                                                    <MenuItem value={1}>
                                                        Asked, but not known
                                                    </MenuItem>
                                                    <MenuItem value={2}>
                                                        Not asked
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        )}
                                    </Stack>
                                </Grid>

                                <Grid item xs={3}>
                                    <PrimarySourceFieldLabel
                                        label="Reporter’s Family Name"
                                        field="C_2_r_1_4_ReporterFamilyName"
                                        index={index}
                                    ></PrimarySourceFieldLabel>
                                </Grid>
                                <Grid item xs={9}>
                                    <Stack direction="row" flexItem spacing={2}>
                                        <Box className="text-small">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={
                                                            item[
                                                                'C_2_r_1_4_ReporterFamilyName'
                                                            ].nullFlavor !==
                                                            null
                                                        }
                                                        onChange={setUnknown(
                                                            'C_2_r_1_4_ReporterFamilyName',
                                                            index,
                                                        )}
                                                    />
                                                }
                                                label="No Info"
                                            />
                                        </Box>
                                        {primarySourceData[index][
                                            'C_2_r_1_4_ReporterFamilyName'
                                        ]['nullFlavor'] === null ? (
                                            <TextField
                                                variant="outlined"
                                                onChange={handleChange(
                                                    'C_2_r_1_4_ReporterFamilyName',
                                                    index,
                                                )}
                                                value={
                                                    item[
                                                        'C_2_r_1_4_ReporterFamilyName'
                                                    ].value
                                                }
                                                className={classes.textMedium}
                                            />
                                        ) : (
                                            <FormControl
                                                className={classes.textXshort}
                                            >
                                                <InputLabel>
                                                    Null Flavor
                                                </InputLabel>
                                                <Select
                                                    value={
                                                        item[
                                                            'C_2_r_1_4_ReporterFamilyName'
                                                        ].nullFlavor
                                                    }
                                                    onChange={setNullFlavor(
                                                        'C_2_r_1_4_ReporterFamilyName',
                                                        index,
                                                    )}
                                                >
                                                    <MenuItem value={0}>
                                                        Masked
                                                    </MenuItem>
                                                    <MenuItem value={1}>
                                                        Asked, but not known
                                                    </MenuItem>
                                                    <MenuItem value={2}>
                                                        Not asked
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        )}
                                    </Stack>
                                </Grid>

                                <Grid item xs={3}>
                                    <PrimarySourceFieldLabel
                                        label="Reporter’s Organisation"
                                        field="C_2_r_2_1_ReporterOrganisation"
                                        index={index}
                                    ></PrimarySourceFieldLabel>
                                </Grid>
                                <Grid item xs={9}>
                                    <Stack direction="row" flexItem spacing={2}>
                                        <Box className="text-small">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={
                                                            item[
                                                                'C_2_r_2_1_ReporterOrganisation'
                                                            ].nullFlavor !==
                                                            null
                                                        }
                                                        onChange={setUnknown(
                                                            'C_2_r_2_1_ReporterOrganisation',
                                                            index,
                                                        )}
                                                    />
                                                }
                                                label="No Info"
                                            />
                                        </Box>
                                        {primarySourceData[index][
                                            'C_2_r_2_1_ReporterOrganisation'
                                        ]['nullFlavor'] === null ? (
                                            <TextField
                                                variant="outlined"
                                                onChange={handleChange(
                                                    'C_2_r_2_1_ReporterOrganisation',
                                                    index,
                                                )}
                                                value={
                                                    item[
                                                        'C_2_r_2_1_ReporterOrganisation'
                                                    ].value
                                                }
                                                className={classes.textMedium}
                                            />
                                        ) : (
                                            <FormControl
                                                className={classes.textXshort}
                                            >
                                                <InputLabel>
                                                    Null Flavor
                                                </InputLabel>
                                                <Select
                                                    value={
                                                        item[
                                                            'C_2_r_2_1_ReporterOrganisation'
                                                        ].nullFlavor
                                                    }
                                                    onChange={setNullFlavor(
                                                        'C_2_r_2_1_ReporterOrganisation',
                                                        index,
                                                    )}
                                                >
                                                    <MenuItem value={0}>
                                                        Masked
                                                    </MenuItem>
                                                    <MenuItem value={1}>
                                                        Asked, but not known
                                                    </MenuItem>
                                                    <MenuItem value={2}>
                                                        Not asked
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        )}
                                    </Stack>
                                </Grid>

                                <Grid item xs={3}>
                                    <PrimarySourceFieldLabel
                                        label="Reporter’s Department"
                                        field="C_2_r_2_2_ReporterDepartment"
                                        index={index}
                                    ></PrimarySourceFieldLabel>
                                </Grid>
                                <Grid item xs={9}>
                                    <Stack direction="row" flexItem spacing={2}>
                                        <Box className="text-small">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={
                                                            item[
                                                                'C_2_r_2_2_ReporterDepartment'
                                                            ].nullFlavor !==
                                                            null
                                                        }
                                                        onChange={setUnknown(
                                                            'C_2_r_2_2_ReporterDepartment',
                                                            index,
                                                        )}
                                                    />
                                                }
                                                label="No Info"
                                            />
                                        </Box>
                                        {primarySourceData[index][
                                            'C_2_r_2_2_ReporterDepartment'
                                        ]['nullFlavor'] === null ? (
                                            <TextField
                                                variant="outlined"
                                                onChange={handleChange(
                                                    'C_2_r_2_2_ReporterDepartment',
                                                    index,
                                                )}
                                                value={
                                                    item[
                                                        'C_2_r_2_2_ReporterDepartment'
                                                    ].value
                                                }
                                                className={classes.textMedium}
                                            />
                                        ) : (
                                            <FormControl
                                                className={classes.textXshort}
                                            >
                                                <InputLabel>
                                                    Null Flavor
                                                </InputLabel>
                                                <Select
                                                    value={
                                                        item[
                                                            'C_2_r_2_2_ReporterDepartment'
                                                        ].nullFlavor
                                                    }
                                                    onChange={setNullFlavor(
                                                        'C_2_r_2_2_ReporterDepartment',
                                                        index,
                                                    )}
                                                >
                                                    <MenuItem value={0}>
                                                        Masked
                                                    </MenuItem>
                                                    <MenuItem value={1}>
                                                        Asked, but not known
                                                    </MenuItem>
                                                    <MenuItem value={2}>
                                                        Not asked
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        )}
                                    </Stack>
                                </Grid>

                                <Grid item xs={3}>
                                    <PrimarySourceFieldLabel
                                        label="Reporter’s Street"
                                        field="C_2_r_2_3_ReporterStreet"
                                        index={index}
                                    ></PrimarySourceFieldLabel>
                                </Grid>
                                <Grid item xs={9}>
                                    <Stack direction="row" flexItem spacing={2}>
                                        <Box className="text-small">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={
                                                            item[
                                                                'C_2_r_2_3_ReporterStreet'
                                                            ].nullFlavor !==
                                                            null
                                                        }
                                                        onChange={setUnknown(
                                                            'C_2_r_2_3_ReporterStreet',
                                                            index,
                                                        )}
                                                    />
                                                }
                                                label="No Info"
                                            />
                                        </Box>
                                        {primarySourceData[index][
                                            'C_2_r_2_3_ReporterStreet'
                                        ]['nullFlavor'] === null ? (
                                            <TextField
                                                variant="outlined"
                                                onChange={handleChange(
                                                    'C_2_r_2_3_ReporterStreet',
                                                    index,
                                                )}
                                                value={
                                                    item[
                                                        'C_2_r_2_3_ReporterStreet'
                                                    ].value
                                                }
                                                className={classes.textMedium}
                                                multiline
                                                rows={2}
                                            />
                                        ) : (
                                            <FormControl
                                                className={classes.textXshort}
                                            >
                                                <InputLabel>
                                                    Null Flavor
                                                </InputLabel>
                                                <Select
                                                    value={
                                                        item[
                                                            'C_2_r_2_3_ReporterStreet'
                                                        ].nullFlavor
                                                    }
                                                    onChange={setNullFlavor(
                                                        'C_2_r_2_3_ReporterStreet',
                                                        index,
                                                    )}
                                                >
                                                    <MenuItem value={0}>
                                                        Masked
                                                    </MenuItem>
                                                    <MenuItem value={1}>
                                                        Asked, but not known
                                                    </MenuItem>
                                                    <MenuItem value={2}>
                                                        Not asked
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        )}
                                    </Stack>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <PrimarySourceFieldLabel
                                        label="Reporter’s City"
                                        field="C_2_r_2_4_ReporterCity"
                                        index={index}
                                    ></PrimarySourceFieldLabel>
                                </Grid>
                                <Grid item xs={9}>
                                    <Stack direction="row" flexItem spacing={2}>
                                        <Box className="text-small">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={
                                                            item[
                                                                'C_2_r_2_4_ReporterCity'
                                                            ].nullFlavor !==
                                                            null
                                                        }
                                                        onChange={setUnknown(
                                                            'C_2_r_2_4_ReporterCity',
                                                            index,
                                                        )}
                                                    />
                                                }
                                                label="No Info"
                                            />
                                        </Box>
                                        {primarySourceData[index][
                                            'C_2_r_2_4_ReporterCity'
                                        ]['nullFlavor'] === null ? (
                                            <TextField
                                                variant="outlined"
                                                onChange={handleChange(
                                                    'C_2_r_2_4_ReporterCity',
                                                    index,
                                                )}
                                                value={
                                                    item[
                                                        'C_2_r_2_4_ReporterCity'
                                                    ].value
                                                }
                                                className={classes.textShort}
                                            />
                                        ) : (
                                            <FormControl
                                                className={classes.textXshort}
                                            >
                                                <InputLabel>
                                                    Null Flavor
                                                </InputLabel>
                                                <Select
                                                    value={
                                                        item[
                                                            'C_2_r_2_4_ReporterCity'
                                                        ].nullFlavor
                                                    }
                                                    onChange={setNullFlavor(
                                                        'C_2_r_2_4_ReporterCity',
                                                        index,
                                                    )}
                                                >
                                                    <MenuItem value={0}>
                                                        Masked
                                                    </MenuItem>
                                                    <MenuItem value={1}>
                                                        Asked, but not known
                                                    </MenuItem>
                                                    <MenuItem value={2}>
                                                        Not asked
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        )}
                                    </Stack>
                                </Grid>

                                <Grid item xs={3}>
                                    <PrimarySourceFieldLabel
                                        label="Reporter’s State or Province"
                                        field="C_2_r_2_5_ReporterStateProvince"
                                        index={index}
                                    ></PrimarySourceFieldLabel>
                                </Grid>
                                <Grid item xs={9}>
                                    <Stack direction="row" flexItem spacing={2}>
                                        <Box className="text-small">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={
                                                            item[
                                                                'C_2_r_2_5_ReporterStateProvince'
                                                            ].nullFlavor !==
                                                            null
                                                        }
                                                        onChange={setUnknown(
                                                            'C_2_r_2_5_ReporterStateProvince',
                                                            index,
                                                        )}
                                                    />
                                                }
                                                label="No Info"
                                            />
                                        </Box>
                                        {primarySourceData[index][
                                            'C_2_r_2_5_ReporterStateProvince'
                                        ]['nullFlavor'] === null ? (
                                            <TextField
                                                variant="outlined"
                                                onChange={handleChange(
                                                    'C_2_r_2_5_ReporterStateProvince',
                                                    index,
                                                )}
                                                value={
                                                    item[
                                                        'C_2_r_2_5_ReporterStateProvince'
                                                    ].value
                                                }
                                                className={classes.textMedium}
                                            />
                                        ) : (
                                            <FormControl
                                                className={classes.textXshort}
                                            >
                                                <InputLabel>
                                                    Null Flavor
                                                </InputLabel>
                                                <Select
                                                    value={
                                                        item[
                                                            'C_2_r_2_5_ReporterStateProvince'
                                                        ].nullFlavor
                                                    }
                                                    onChange={setNullFlavor(
                                                        'C_2_r_2_5_ReporterStateProvince',
                                                        index,
                                                    )}
                                                >
                                                    <MenuItem value={0}>
                                                        Masked
                                                    </MenuItem>
                                                    <MenuItem value={1}>
                                                        Asked, but not known
                                                    </MenuItem>
                                                    <MenuItem value={2}>
                                                        Not asked
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        )}
                                    </Stack>
                                </Grid>

                                <Grid item xs={3}>
                                    <PrimarySourceFieldLabel
                                        label="Reporter’s Telephone"
                                        field="C_2_r_2_7_ReporterTelephone"
                                        index={index}
                                    ></PrimarySourceFieldLabel>
                                </Grid>
                                <Grid item xs={9}>
                                    <Stack direction="row" flexItem spacing={2}>
                                        <Box className="text-small">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={
                                                            item[
                                                                'C_2_r_2_7_ReporterTelephone'
                                                            ].nullFlavor !==
                                                            null
                                                        }
                                                        onChange={setUnknown(
                                                            'C_2_r_2_7_ReporterTelephone',
                                                            index,
                                                        )}
                                                    />
                                                }
                                                label="No Info"
                                            />
                                        </Box>
                                        {primarySourceData[index][
                                            'C_2_r_2_7_ReporterTelephone'
                                        ]['nullFlavor'] === null ? (
                                            <TextField
                                                variant="outlined"
                                                onChange={handleChange(
                                                    'C_2_r_2_7_ReporterTelephone',
                                                    index,
                                                )}
                                                value={
                                                    item[
                                                        'C_2_r_2_7_ReporterTelephone'
                                                    ].value
                                                }
                                                className={classes.textShort}
                                            />
                                        ) : (
                                            <FormControl
                                                className={classes.textXshort}
                                            >
                                                <InputLabel>
                                                    Null Flavor
                                                </InputLabel>
                                                <Select
                                                    value={
                                                        item[
                                                            'C_2_r_2_7_ReporterTelephone'
                                                        ].nullFlavor
                                                    }
                                                    onChange={setNullFlavor(
                                                        'C_2_r_2_7_ReporterTelephone',
                                                        index,
                                                    )}
                                                >
                                                    <MenuItem value={0}>
                                                        Masked
                                                    </MenuItem>
                                                    <MenuItem value={1}>
                                                        Asked, but not known
                                                    </MenuItem>
                                                    <MenuItem value={2}>
                                                        Not asked
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        )}
                                    </Stack>
                                </Grid>

                                <Grid item xs={3}>
                                    <PrimarySourceFieldLabel
                                        label="Reporter’s Postcode"
                                        field="C_2_r_2_6_ReporterPostcode"
                                        index={index}
                                    ></PrimarySourceFieldLabel>
                                </Grid>
                                <Grid item xs={9}>
                                    <Stack direction="row" flexItem spacing={2}>
                                        <Box className="text-small">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={
                                                            item[
                                                                'C_2_r_2_6_ReporterPostcode'
                                                            ].nullFlavor !==
                                                            null
                                                        }
                                                        onChange={setUnknown(
                                                            'C_2_r_2_6_ReporterPostcode',
                                                            index,
                                                        )}
                                                    />
                                                }
                                                label="No Info"
                                            />
                                        </Box>
                                        {primarySourceData[index][
                                            'C_2_r_2_6_ReporterPostcode'
                                        ]['nullFlavor'] === null ? (
                                            <TextField
                                                variant="outlined"
                                                onChange={handleChange(
                                                    'C_2_r_2_6_ReporterPostcode',
                                                    index,
                                                )}
                                                value={
                                                    item[
                                                        'C_2_r_2_6_ReporterPostcode'
                                                    ].value
                                                }
                                                className={classes.textXshort}
                                            />
                                        ) : (
                                            <FormControl
                                                className={classes.textXshort}
                                            >
                                                <InputLabel>
                                                    Null Flavor
                                                </InputLabel>
                                                <Select
                                                    value={
                                                        item[
                                                            'C_2_r_2_6_ReporterPostcode'
                                                        ].nullFlavor
                                                    }
                                                    onChange={setNullFlavor(
                                                        'C_2_r_2_6_ReporterPostcode',
                                                        index,
                                                    )}
                                                >
                                                    <MenuItem value={0}>
                                                        Masked
                                                    </MenuItem>
                                                    <MenuItem value={1}>
                                                        Asked, but not known
                                                    </MenuItem>
                                                    <MenuItem value={2}>
                                                        Not asked
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        )}
                                    </Stack>
                                </Grid>

                                <Grid item xs={3}>
                                    <PrimarySourceFieldLabel
                                        label="Reporter’s Country Code"
                                        field="C_2_r_3_ReporterCountryCode"
                                        index={index}
                                    ></PrimarySourceFieldLabel>
                                </Grid>
                                <Grid item xs={9}>
                                    <TextField
                                        variant="outlined"
                                        className={classes.textXshort}
                                        onChange={handleChange(
                                            'C_2_r_3_ReporterCountryCode',
                                            index,
                                        )}
                                        value={
                                            item['C_2_r_3_ReporterCountryCode']
                                                .value
                                        }
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <PrimarySourceFieldLabel
                                        label="Qualification"
                                        field="C_2_r_4_Qualification"
                                        index={index}
                                    ></PrimarySourceFieldLabel>
                                </Grid>
                                <Grid item xs={9}>
                                    <Stack direction="row" flexItem spacing={2}>
                                        <Box className="text-small">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={
                                                            item[
                                                                'C_2_r_4_Qualification'
                                                            ].nullFlavor !==
                                                            null
                                                        }
                                                        onChange={setUnknown(
                                                            'C_2_r_4_Qualification',
                                                            index,
                                                        )}
                                                    />
                                                }
                                                label="No Info"
                                            />
                                        </Box>
                                        {primarySourceData[index][
                                            'C_2_r_4_Qualification'
                                        ]['nullFlavor'] === null ? (
                                            <Select
                                                className={classes.textShort}
                                                label="Qualification"
                                                defaultValue={0}
                                                onChange={handleChange(
                                                    'C_2_r_4_Qualification',
                                                    index,
                                                )}
                                                value={
                                                    item[
                                                        'C_2_r_4_Qualification'
                                                    ].value
                                                }
                                            >
                                                <MenuItem value={1}>
                                                    1 = Physician
                                                </MenuItem>
                                                <MenuItem value={2}>
                                                    2 = Pharmacist
                                                </MenuItem>
                                                <MenuItem value={3}>
                                                    3 = Other health
                                                    professional
                                                </MenuItem>
                                                <MenuItem value={4}>
                                                    4 = Lawyer
                                                </MenuItem>
                                                <MenuItem value={5}>
                                                    5 = Consumer or other non
                                                    health professional
                                                </MenuItem>
                                            </Select>
                                        ) : null}
                                    </Stack>
                                </Grid>

                                <Grid item xs={3}>
                                    <PrimarySourceFieldLabel
                                        label="Primary Source for Regulatory Purposes"
                                        field="C_2_r_5_PrimarySourceRegulatoryPurposes"
                                        index={index}
                                    ></PrimarySourceFieldLabel>
                                </Grid>
                                <Grid item xs={9}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={
                                                    item[
                                                        'C_2_r_5_PrimarySourceRegulatoryPurposes'
                                                    ].value
                                                }
                                                onChange={handleChange(
                                                    'C_2_r_5_PrimarySourceRegulatoryPurposes',
                                                    index,
                                                )}
                                            />
                                        }
                                    />
                                </Grid>
                            </Grid>
                        </Stack>

                        {index === primarySourceData.length - 1 ? (
                            <span>
                                <IconButton
                                    size="large"
                                    style={{ top: '10px', right: '10px' }}
                                    sx={{
                                        color: 'white',
                                        backgroundColor: '#1976d2',
                                    }}
                                    onClick={addForm}
                                >
                                    <AddIcon />
                                </IconButton>
                            </span>
                        ) : null}

                        <span>
                            <IconButton
                                size="large"
                                style={{ top: '10px' }}
                                sx={{
                                    color: 'white',
                                    backgroundColor: '#000066',
                                }}
                                onClick={() => removeForm(index)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </span>
                    </CardContent>
                </Card>,
            );
        });

        return list;
    };

    const addForm = () => {
        let primarySourceDataCopy = JSON.parse(
            JSON.stringify(primarySourceData),
        );
        let primarySourceDataNew = new PrimarySource();
        primarySourceDataCopy.push(primarySourceDataNew);
        dispatch(setPrimarySourceData(primarySourceDataCopy));
    };

    const removeForm = (index) => {
        let primarySourceDataCopy = JSON.parse(
            JSON.stringify(primarySourceData),
        );
        primarySourceDataCopy.splice(index, 1);
        dispatch(setPrimarySourceData(primarySourceDataCopy));
    };

    return <div>{formList()}</div>;
};
