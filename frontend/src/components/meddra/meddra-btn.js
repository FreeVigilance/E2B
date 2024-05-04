import React, { Fragment, useEffect, useState } from 'react';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import {
    Autocomplete,
    Box,
    Button,
    FormLabel,
    IconButton,
    Modal,
    Paper,
    Popper,
    Select,
    Stack,
    TextField,
    Tooltip,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
    getIdOfMeddraVersion,
    getMeddraCode,
    getMeddraReleases,
    getTerms,
    meddraSelector,
    prepareData,
    reset,
    setHLGT,
    setHLGTvalue,
    setHLT,
    setHLTvalue,
    setLanguage,
    setLLT,
    setLLTvalue,
    setMeddraVersion,
    setPT,
    setPTvalue,
    setSOC,
    setSOCvalue,
    setVersion,
} from '@src/features/meddra/slice';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles({
    select: {
        marginLeft: 1,
        marginRight: 1,
        width: '800px',
    },
    versionSelect: {
        marginLeft: 1,
        marginRight: 1,
        width: '300px',
    },
    label: {
        color: 'black',
        fontSize: 22,
        fontWeight: 600,
    },
    root: {
        "& .MuiAutocomplete-listbox": {
          "& li:nth-child(even)": { backgroundColor: "#EEEFF9" },
          "& li:nth-child(odd)": { backgroundColor: "#FFF" }
        },
        // '& + .MuiAutocomplete-popper .MuiAutocomplete-option:hover': {
        //     backgroundColor: "#FF8787",
        // },
        zIndex: 10000,
      }
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    px: 4,
    pb: 4,
    pt: 1,
};

const CustomPopper = function (props) {
    const classes = useStyles();
    return <Popper {...props} className={classes.root} placement="bottom" />;
 };

export const MedDRABtn = ({ field, index, handleChange, lastValue }) => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const [show, setShow] = useState(false);
    const {
        SOC,
        HLGT,
        HLT,
        PT,
        LLT,
        SOCvalue,
        HLGTvalue,
        HLTvalue,
        PTvalue,
        LLTvalue,
        meddraOptions,
        meddraVersion,
    } = useSelector(meddraSelector);

    useEffect(() => {
        dispatch(getMeddraReleases());
    }, []);


    useEffect(() => {
        if (meddraVersion) {
            if (SOCvalue !== '') {
                console.log("NEW SOC")
                let dataHLGT = dispatch(prepareData('HLGT'));
                let dataHLT = dispatch(prepareData('HLT'));
                // let dataPT = dispatch(prepareData('PT'));
                // let dataLLT = dispatch(prepareData('LLT'));

                const meddraId = dispatch(getIdOfMeddraVersion());

                dispatch(getTerms({id: meddraId, data: dataHLGT}));
                dispatch(getTerms({id: meddraId, data: dataHLT}));
                // dispatch(getTerms({id: meddraId, data: dataPT}));
                // dispatch(getTerms({id: meddraId, data: dataLLT}));
            }
        }
    }, [SOCvalue]);

    useEffect(() => {
        if (meddraVersion) {
            if (HLGTvalue !== '') {
                let dataHLT = dispatch(prepareData('HLT'));
                let dataPT = dispatch(prepareData('PT'));
                // let dataLLT = dispatch(prepareData('LLT'));

                const meddraId = dispatch(getIdOfMeddraVersion());

                dispatch(getTerms({id: meddraId, data: dataHLT}));
                dispatch(getTerms({id: meddraId, data: dataPT}));
                // dispatch(getTerms({id: meddraId, data: dataLLT}));
            }
        }
    }, [HLGTvalue]);

    useEffect(() => {
        if (meddraVersion) {
            if (HLTvalue !== '') {
                let dataPT = dispatch(prepareData('PT'));
                let dataLLT = dispatch(prepareData('LLT'));

                const meddraId = dispatch(getIdOfMeddraVersion());

                dispatch(getTerms({id: meddraId, data: dataPT}));
                dispatch(getTerms({id: meddraId, data: dataLLT}));
            }
        }
    }, [HLTvalue]);

    useEffect(() => {
        if (meddraVersion) {
            if (PTvalue !== '') {

                let dataLLT = dispatch(prepareData('LLT'));

                const meddraId = dispatch(getIdOfMeddraVersion());

                dispatch(getTerms({id: meddraId, data: dataLLT}));
            }
        }
    }, [PTvalue]);

    const onShow = () => {
        if (!show) {
            setShow(true);
        }
    };

    const onHide = () => {
        setShow(false);
    };

    const onSave = () => {
        if (LLTvalue === '') {
            enqueueSnackbar(`No LLT value present`,{ variant: 'error' });
        } else {
            handleChange(getMeddraCode(LLTvalue), field, index);
            setShow(false);
        }
    }

    const dropAll = (fromLevel) => {
        console.log('dropallkjpkjpijij')
        if (fromLevel === 0) {
            dispatch(setHLT([]));
            dispatch(setHLTvalue(''));

            dispatch(setHLGT([]));
            dispatch(setHLGTvalue(''));

            dispatch(setPT([]));
            dispatch(setPTvalue(''));

            dispatch(setLLT([]));
            dispatch(setLLTvalue(''));
        }
        if (fromLevel === 1) {
            dispatch(setHLGT([]));
            dispatch(setHLGTvalue(''));

            dispatch(setPT([]));
            dispatch(setPTvalue(''));

            dispatch(setLLT([]));
            dispatch(setLLTvalue(''));
        }
        if (fromLevel === 2) {
            dispatch(setPT([]));
            dispatch(setPTvalue(''));

            dispatch(setLLT([]));
            dispatch(setLLTvalue(''));
        }
        if (fromLevel === 3) {
            dispatch(setLLT([]));
            dispatch(setLLTvalue(''));
        }
    }

    const onChange = (level, value) => {
        if (meddraVersion) {
            console.log(level);
            console.log(value);
            if (value === null) {
                value = '';
            }

            if (level === 0) {
                dispatch(setSOCvalue(value));

                dispatch(setHLGTvalue(''));
                dispatch(setHLTvalue(''));
                dispatch(setPTvalue(''));
                dispatch(setLLTvalue(''));

                if (value === '') {
                    const data = dispatch(prepareData('SOC', value));
                    const meddraId = dispatch(getIdOfMeddraVersion());
                    dispatch(getTerms({id: meddraId, data: data}));
                    dropAll(0);
                }
            }
            if (level === 1) {
                dispatch(setHLGTvalue(value));

                dispatch(setHLTvalue(''));
                dispatch(setPTvalue(''));
                dispatch(setLLTvalue(''));
                if (value === '') {
                    const data = dispatch(prepareData('HLGT', value));
                    const meddraId = dispatch(getIdOfMeddraVersion());
                    dispatch(getTerms({id: meddraId, data: data}));
                    dropAll(1);
                }
            }
            if (level === 2) {
                dispatch(setHLTvalue(value));

                dispatch(setPTvalue(''));
                dispatch(setLLTvalue(''));
                if (value === '') {
                    const data = dispatch(prepareData('HLT', value));
                    const meddraId = dispatch(getIdOfMeddraVersion());
                    dispatch(getTerms({id: meddraId, data: data}));
                    dropAll(2);
                }
            }
            if (level === 3) {
                dispatch(setPTvalue(value));

                dispatch(setLLTvalue(''));
                if (value === '') {
                    const data = dispatch(prepareData('PT', value));
                    const meddraId = dispatch(getIdOfMeddraVersion());
                    dispatch(getTerms({id: meddraId, data: data}));
                    dropAll(3);
                }
            }
            if (level === 4) {
                dispatch(setLLTvalue(value));
                if (value === '') {
                    const data = dispatch(prepareData('LLT', value));
                    const meddraId = dispatch(getIdOfMeddraVersion());
                    dispatch(getTerms({id: meddraId, data: data}));
                }
            }
        }
    };

    const handleKeyPress = (level) => (event) => {
        if (meddraVersion) {
            console.log('key press');
            console.log(event.target.value);
            let data;
            if (level === 0) {
                data = dispatch(prepareData('SOC', event.target.value));
            }
            if (level === 1) {
                data = dispatch(prepareData('HLGT', event.target.value));

            }
            if (level === 2) {
                data = dispatch(prepareData('HLT', event.target.value));
            }
            if (level === 3) {
                data = dispatch(prepareData('PT', event.target.value));
            }
            if (level === 4) {
                data = dispatch(prepareData('LLT', event.target.value));
            }

            const meddraId = dispatch(getIdOfMeddraVersion());
            dispatch(getTerms({id: meddraId, data: data}));
        }
    };

    const onVersionChange = (val) => {
        console.log(val);
        if (val) {
            const meddraId = meddraOptions.find(x => x.version === val.split(' ')[0] && x.language === val.split(' ')[1]).id;
            console.log(meddraId);
            let dataSOC = dispatch(prepareData('SOC'));
            console.log(dataSOC);
            dispatch(getTerms({id: meddraId, data: dataSOC}));
        }

        dispatch(setMeddraVersion(val));
    };

    return (
        <>
            <Tooltip title="MedDRA">
                <span>
                    <IconButton color="primary" onClick={onShow}>
                        <MedicalInformationIcon />
                    </IconButton>
                </span>
            </Tooltip>

            <Modal open={show} onClose={onHide}>
                <Box sx={style}>
                    {/* <TextField onChange={handleChange(field, index)}></TextField> */}
                    <Stack direction={'column'} gap={3}>
                        <Stack direction={'row'} gap={2}>
                            <Stack direction={'column'} gap={0}>
                                <FormLabel>MedDRA version</FormLabel>
                                <Autocomplete
                                    className={classes.versionSelect}
                                    options={meddraOptions.map(
                                        (option) =>
                                            `${option.version} ${option.language}`,
                                    )}
                                    value={meddraVersion}
                                    onChange={(e, newValue) => {
                                        onVersionChange(newValue);
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                ></Autocomplete>

                            </Stack>
                        </Stack>

                        <Stack
                            direction={'column'}
                            gap={0}
                            style={{ paddingLeft: '0%' }}
                        >
                            <FormLabel className={classes.label}>SOC</FormLabel>
                            <FormLabel>System Organ Class</FormLabel>

                            <Autocomplete
                                className={classes.select}
                                options={SOC.map(
                                    (option) => `${option.name} : ${option.code}`,
                                )}
                                value={SOCvalue}
                                onChange={(e, newValue) => {
                                    onChange(0, newValue);
                                }}
                                // PopperComponent={CustomPopper}
                                renderInput={(params) => (
                                    <TextField
                                        onChange={handleKeyPress(0)}
                                        {...params}
                                    />
                                )}
                            ></Autocomplete>
                        </Stack>

                        <Stack
                            direction={'column'}
                            gap={0}
                            style={{ paddingLeft: '5%' }}
                        >
                            <FormLabel className={classes.label}>
                                HLGT
                            </FormLabel>
                            <FormLabel>High Level Group Term</FormLabel>

                            <Autocomplete
                                className={classes.select}
                                value={HLGTvalue}
                                onChange={(e, newValue) => {
                                    onChange(1, newValue);
                                }}
                                options={HLGT.map(
                                    (option) => `${option.name}: ${option.code}`,
                                )}
                                // PopperComponent={CustomPopper}
                                renderInput={(params) => (
                                    <TextField
                                        onChange={handleKeyPress(1)}
                                        {...params}
                                    />
                                )}
                            />
                        </Stack>

                        <Stack
                            direction={'column'}
                            gap={0}
                            style={{ paddingLeft: '10%' }}
                        >
                            <FormLabel className={classes.label}>HLT</FormLabel>
                            <FormLabel>High Level Term</FormLabel>

                            <Autocomplete
                                className={classes.select}
                                value={HLTvalue}
                                onChange={(e, newValue) => {
                                    onChange(2, newValue);
                                }}
                                options={HLT.map(
                                    (option) => `${option.name} : ${option.code}`,
                                )}
                                // PopperComponent={CustomPopper}
                                renderInput={(params) => (
                                    <TextField
                                        onChange={handleKeyPress(2)}
                                        {...params}
                                    />
                                )}
                            ></Autocomplete>
                        </Stack>

                        <Stack
                            direction={'column'}
                            gap={0}
                            style={{ paddingLeft: '15%' }}
                        >
                            <FormLabel className={classes.label}>PT</FormLabel>
                            <FormLabel>Preferred Term</FormLabel>

                            <Autocomplete
                                className={classes.select}
                                value={PTvalue}
                                onChange={(e, newValue) => {
                                    onChange(3, newValue);
                                }}
                                // PopperComponent={CustomPopper}
                                options={PT.map(
                                    (option) => `${option.name} : ${option.code}`,
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        onChange={handleKeyPress(3)}
                                        {...params}
                                    />
                                )}
                            ></Autocomplete>
                        </Stack>

                        <Stack
                            direction={'column'}
                            gap={0}
                            style={{ paddingLeft: '20%' }}
                        >
                            <FormLabel className={classes.label}>LLT</FormLabel>
                            <FormLabel>Low Level Term</FormLabel>

                            <Autocomplete
                                className={classes.select}
                                value={LLTvalue}
                                onChange={(e, newValue) => {
                                    onChange(4, newValue);
                                }}
                                options={LLT.map(
                                    (option) => `${option.name} : ${option.code}`,
                                )}
                                // PopperComponent={CustomPopper}
                                renderInput={(params) => (
                                    <TextField
                                        onChange={handleKeyPress(4)}
                                        {...params}
                                    />
                                )}
                            ></Autocomplete>
                        </Stack>

                        <Stack
                            direction={'row'}
                            gap={2}
                            justifyContent="flex-end"
                            style={{ marginTop: '30px' }}
                        >
                            <Button variant="contained" onClick={onSave}>Save</Button>
                            <Button variant="outlined" onClick={onHide}>
                                Cancel
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Modal>
        </>
    );
};
