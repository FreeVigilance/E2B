import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Autocomplete,
    Stack,
    FormControlLabel,
    Box,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Card,
    CardContent,
    IconButton,
    Grid,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import AddIcon from '@mui/icons-material/Add';
import { StudyRegistration } from '@src/features/study-identification/study-identification';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    getLanguageCodes,
    narrativeSelector,
    setDiagnosis,
    setSummaryComments,
} from '@src/features/narrative/slice';
import { Diagnosis, SummaryComments } from '@src/features/narrative/narrative';
import { makeStyles } from '@mui/styles';
import { SummaryCommentsFieldLabel } from '@src/components/field-labels/narrative/summary-comments-label';
import { matchSorter } from 'match-sorter';

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

export const SummaryCommentsComp = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const { summaryComments, LC } = useSelector(narrativeSelector);

    const handleChange = (fieldName, index) => (event) => {
        let value = event.target.value;
        if (value === '') {
            value = null;
        }
        let summaryCommentsCopy = JSON.parse(JSON.stringify(summaryComments));
        summaryCommentsCopy[index][fieldName].value = value;
        dispatch(setSummaryComments(summaryCommentsCopy));
    };

    const handleAutocompleteChange = (fieldName, index) => (_, value) => {
        let summaryCommentsCopy = JSON.parse(JSON.stringify(summaryComments));
        summaryCommentsCopy[index][fieldName].value = value?.code ?? null;
        dispatch(setSummaryComments(summaryCommentsCopy));
    };

    const getLanguageByCode = (code) => LC.find(country => country.code === code);

    useEffect(() => {dispatch(getLanguageCodes({ data: '' }));}, []);

    const formList = () => {
        let list = [];
        if (summaryComments.length === 0) {
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
        Object.values(summaryComments).forEach((item, index) => {
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
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <SummaryCommentsFieldLabel
                                    label="Case Summary and Reporter’s Comments Language"
                                    field="H_5_r_1b_CaseSummaryReporterCommentsLanguage"
                                    index={index}
                                ></SummaryCommentsFieldLabel>
                            </Grid>
                            <Grid item xs={6}>
                                {LC.length === 0 && <TextField
                                    variant="outlined"
                                    className={classes.textLarge}
                                    onChange={handleChange(
                                        'H_5_r_1b_CaseSummaryReporterCommentsLanguage',
                                        index,
                                    )}
                                    value={
                                        item[
                                            'H_5_r_1b_CaseSummaryReporterCommentsLanguage'
                                            ].value
                                    }
                                />}
                                {LC.length > 0 && <Autocomplete
                                    className={classes.textLarge}
                                    autoHighlight
                                    autoSelect
                                    options={LC}
                                    getOptionLabel={(option) => option.code ?? ''}
                                    value={getLanguageByCode(item['H_5_r_1b_CaseSummaryReporterCommentsLanguage'].value) ?? ''}
                                    onChange={handleAutocompleteChange('H_5_r_1b_CaseSummaryReporterCommentsLanguage', index)}
                                    filterOptions={(options, { inputValue }) =>
                                        matchSorter(options, inputValue, { keys: ['code', 'name'], threshold: matchSorter.rankings.CONTAINS })}
                                    renderOption={(props2, option) => {
                                        return (
                                            <li {...props2} key={props2.key}>
                                                {`${option.code}\t${option.name}`}
                                            </li>
                                        );
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            label="3-alpha language code"
                                            {...params}
                                        />
                                    )}
                                ></Autocomplete>}
                            </Grid>
                        </Grid>

                        <Stack direction={'column'}>
                            <SummaryCommentsFieldLabel
                                label="Case Summary and Reporter’s Comments"
                                field="H_5_r_1a_CaseSummaryReporterCommentsText"
                                index={index}
                            ></SummaryCommentsFieldLabel>
                            <TextField
                                variant="outlined"
                                className={classes.textLong}
                                multiline
                                rows={20}
                                onChange={handleChange(
                                    'H_5_r_1a_CaseSummaryReporterCommentsText',
                                    index,
                                )}
                                value={
                                    item[
                                        'H_5_r_1a_CaseSummaryReporterCommentsText'
                                        ].value
                                }
                            />
                        </Stack>

                        <Stack direction="row" justifyContent="flex-start">
                            {index === summaryComments.length - 1 ? (
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
                        </Stack>
                    </CardContent>
                </Card>,
            );
        });
        return list;
    };

    const addForm = () => {
        let summaryCommentsCopy = JSON.parse(JSON.stringify(summaryComments));
        let summaryCommentsNew = new SummaryComments();
        summaryCommentsCopy.push(summaryCommentsNew);
        dispatch(setSummaryComments(summaryCommentsCopy));
    };

    const removeForm = (index) => {
        let summaryCommentsCopy = JSON.parse(JSON.stringify(summaryComments));
        summaryCommentsCopy.splice(index, 1);
        dispatch(setSummaryComments(summaryCommentsCopy));
    };

    return <div>{formList()}</div>;
};
