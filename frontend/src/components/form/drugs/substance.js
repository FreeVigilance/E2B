import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Autocomplete, Card, CardContent, IconButton, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { drugsSelector, setSubstances, getStrengthCodes, getSubstanceCodes } from '@src/features/drugs/slice';
import { Substance } from '@src/features/drugs/drugs';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@mui/styles';
import { SubstanceFieldLabel } from '@src/components/field-labels/drugs/substance-label';
import { matchSorter } from 'match-sorter';
import { VariableSizeList } from 'react-window';

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

export const Substances = ({ drugIndex }) => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const { substances, substanceCodes, strengthCodes } = useSelector(drugsSelector);

    const handleChange =
        (fieldName, index, isNumber = false, length = 1) =>
            (event) => {
                let value = event.target.value;
                if (isNumber) {
                    if (value.length > length) value = value.slice(0, length);
                }
                if (value === '') {
                    value = null;
                }
                let substancesCopy = JSON.parse(JSON.stringify(substances));
                substancesCopy[drugIndex][index][fieldName].value = value;
                dispatch(setSubstances(substancesCopy));
            };

    const handleAutocompleteChange = (fieldName, index) => (_, value) => {
        let substancesCopy = JSON.parse(JSON.stringify(substances));
        substancesCopy[drugIndex][index][fieldName].value = value?.code ?? value;
        dispatch(setSubstances(substancesCopy));
    };

    const getStrengthByCode = (code) => strengthCodes.find(strength => strength.code === code);
    const getSubstanceByCode = (code) => substanceCodes.find(substance => substance.code === code);

    useEffect(() => {dispatch(getStrengthCodes({ data: '' }));}, []);
    useEffect(() => {dispatch(getSubstanceCodes({ data: '' }));}, []);

    const renderRow = ({ data, index, style }) => {
        return React.cloneElement(data[index], {
            ...style,
            top: style.top + 8,
        });
    };

    const useResetCache = (data) => {
        const ref = React.useRef(null);
        React.useEffect(() => {
            if (ref.current !== null) {
                ref.current.resetAfterIndex(0, true);
            }
        }, [data]);
        return ref;
    };

    const OuterElementContext = React.createContext({});

    const OuterElementType = React.forwardRef((props, ref) => {
        const outerProps = React.useContext(OuterElementContext);
        return <div ref={ref} {...props} {...outerProps} />;
    });

    const VirtualizedList = React.forwardRef((props, ref) => {
        const { children } = props;

        const itemCount = children.length;
        const gridRef = useResetCache(itemCount);
        const outerProps = { ...props };
        delete outerProps.children;
        return (
            <div ref={ref}>
                <OuterElementContext.Provider value={outerProps}>
                    <VariableSizeList
                        ref={gridRef}
                        outerElementType={OuterElementType}
                        height={itemCount * 36}
                        width="100%"
                        itemCount={itemCount}
                        itemSize={() => 36}
                        overscanCount={5}
                        itemData={{ ...children }}
                    >
                        {renderRow}
                    </VariableSizeList>
                </OuterElementContext.Provider>
            </div>
        );
    });

    const formList = () => {
        let list = [];
        if (substances[drugIndex].length === 0) {
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
        Object.values(substances[drugIndex]).forEach((item, index) => {
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
                            <Grid item xs={3}>
                                <SubstanceFieldLabel
                                    label="Substance Name"
                                    field="G_k_2_3_r_1_SubstanceName"
                                    drugIndex={drugIndex}
                                    index={index}
                                ></SubstanceFieldLabel>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField
                                    variant="outlined"
                                    className={classes.textLong}
                                    onChange={handleChange(
                                        'G_k_2_3_r_1_SubstanceName',
                                        index,
                                    )}
                                    value={
                                        item['G_k_2_3_r_1_SubstanceName'].value
                                    }
                                    multiline
                                    rows={4}
                                />
                            </Grid>

                            <Grid item xs={3}>
                                <SubstanceFieldLabel
                                    label="Substance TermID Version Date/Number"
                                    field="G_k_2_3_r_2a_SubstanceTermIDVersion"
                                    drugIndex={drugIndex}
                                    index={index}
                                ></SubstanceFieldLabel>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField
                                    variant="outlined"
                                    className={classes.textShort}
                                    onChange={handleChange(
                                        'G_k_2_3_r_2a_SubstanceTermIDVersion',
                                        index,
                                    )}
                                    value={
                                        item[
                                            'G_k_2_3_r_2a_SubstanceTermIDVersion'
                                            ].value
                                    }
                                />
                            </Grid>

                            <Grid item xs={3}>
                                <SubstanceFieldLabel
                                    label="Substance TermID"
                                    field="G_k_2_3_r_2b_SubstanceTermID"
                                    drugIndex={drugIndex}
                                    index={index}
                                ></SubstanceFieldLabel>
                            </Grid>
                            <Grid item xs={9}>
                                {substanceCodes.length === 0 && <TextField
                                    variant="outlined"
                                    className={classes.textLong}
                                    onChange={handleChange(
                                        'G_k_2_3_r_2b_SubstanceTermID',
                                        index,
                                    )}
                                    value={
                                        item['G_k_2_3_r_2b_SubstanceTermID'].value
                                    }
                                />}
                                {substanceCodes.length > 0 && <Autocomplete
                                    className={classes.textLong}
                                    autoHighlight
                                    ListboxComponent={VirtualizedList}
                                    options={substanceCodes}
                                    getOptionLabel={(option) => option.name ?? ''}
                                    value={getSubstanceByCode(item['G_k_2_3_r_2b_SubstanceTermID'].value) ?? ''}
                                    onChange={handleAutocompleteChange('G_k_2_3_r_2b_SubstanceTermID', index)}
                                    filterOptions={(options, { inputValue }) =>
                                        matchSorter(options, inputValue, {
                                            keys: ['code', 'name'],
                                            threshold: matchSorter.rankings.CONTAINS,
                                        }).slice(0, 10)
                                    }
                                    renderOption={(props2, option) => {
                                        return (
                                            <li {...props2} key={props2.key}>
                                                {`${option.code} ${option.name}`}
                                            </li>
                                        );
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            label="EDQM Substance TermID code"
                                            {...params}
                                        />
                                    )}
                                ></Autocomplete>}
                            </Grid>

                            <Grid item xs={3}>
                                <SubstanceFieldLabel
                                    label="Strength"
                                    field="G_k_2_3_r_3a_StrengthNum"
                                    drugIndex={drugIndex}
                                    index={index}
                                ></SubstanceFieldLabel>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField
                                    variant="outlined"
                                    type="number"
                                    className={classes.textXshort}
                                    onKeyDown={(evt) =>
                                        (evt.key === '-' ||
                                            evt.key === '+' ||
                                            evt.key === 'e' ||
                                            evt.key === ',' ||
                                            evt.key === '.') &&
                                        evt.preventDefault()
                                    }
                                    onChange={handleChange(
                                        'G_k_2_3_r_3a_StrengthNum',
                                        index,
                                        true,
                                        10,
                                    )}
                                    value={
                                        item['G_k_2_3_r_3a_StrengthNum'].value
                                    }
                                />
                            </Grid>

                            <Grid item xs={3}>
                                <SubstanceFieldLabel
                                    label="Strength (unit)"
                                    field="G_k_2_3_r_3b_StrengthUnit"
                                    drugIndex={drugIndex}
                                    index={index}
                                ></SubstanceFieldLabel>
                            </Grid>
                            <Grid item xs={9}>
                                {strengthCodes.length === 0 && <TextField
                                    variant="outlined"
                                    className={classes.textLong}
                                    onChange={handleChange(
                                        'G_k_2_3_r_3b_StrengthUnit',
                                        index,
                                    )}
                                    value={
                                        item['G_k_2_3_r_3b_StrengthUnit'].value
                                    }
                                />}
                                {strengthCodes.length > 0 && <Autocomplete
                                    className={classes.textLong}
                                    freeSolo
                                    autoSelect
                                    options={strengthCodes}
                                    getOptionLabel={(option) => option?.code ?? option}
                                    value={getStrengthByCode(item['G_k_2_3_r_3b_StrengthUnit'].value) ?? item['G_k_2_3_r_3b_StrengthUnit'].value}
                                    onChange={handleAutocompleteChange('G_k_2_3_r_3b_StrengthUnit', index)}
                                    filterOptions={(options, { inputValue }) =>
                                        matchSorter(options, inputValue, { keys: ['code', 'name'], threshold: matchSorter.rankings.CONTAINS })}
                                    renderOption={(props2, option) => {
                                        return (
                                            <li {...props2} key={props2.key}>
                                                {`${option.code}, ${option.name}`}
                                            </li>
                                        );
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            label="UCUM code"
                                            {...params}
                                        />
                                    )}
                                ></Autocomplete>}
                            </Grid>
                        </Grid>

                        {index === substances[drugIndex].length - 1 ? (
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
        let substancesCopy = JSON.parse(JSON.stringify(substances));
        let substanceNew = new Substance();
        substancesCopy[drugIndex].push(substanceNew);
        dispatch(setSubstances(substancesCopy));
    };

    const removeForm = (index) => {
        let substancesCopy = JSON.parse(JSON.stringify(substances));
        substancesCopy[drugIndex].splice(index, 1);
        dispatch(setSubstances(substancesCopy));
    };

    return <div>{formList()}</div>;
};
