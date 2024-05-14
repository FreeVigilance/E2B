import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {
    displaySelector,
    getJsonFromXml,
    getXmlFromJson,
    setCurrentSaved,
    setCurrentTab,
    setCurrentValidated,
    setShowSideMenu,
} from '@src/features/display/slice';
import { Results } from './form/results';
import { Reactions } from './form/reactions';
import {
    Button,
    ClickAwayListener,
    FormLabel,
    Grow,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Paper,
    Popper,
    Tooltip,
} from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { Patient } from './form/patient-info/patient';
import { ParentChild } from './form/patient-info/parent-child/parent-child';
import { DrugTabs } from './form/drugs/drug-tabs';
import { DosageTabs } from './form/drugs/dosages/dosage-tabs';
import { MatrixTabs } from './form/drugs/matrix/matrix-tabs';
import { Save } from './save';
import { PrimarySourceComp } from './form/primaty-source';
import { InfoSenderComp } from './form/info-sender';
import { ReferencesComp } from './form/references';
import { IdentificationComp } from './form/identification/identification';
import { StudyIdentificationComp } from './form/study-identification/study-identification';
import { useSnackbar } from 'notistack';
import { NarrativeComp } from './form/narrative/narrative';
import DownloadIcon from '@mui/icons-material/Download';
import { getResults } from '@src/features/results/slice';
import { getDrug } from '@src/features/drugs/slice';
import { getPatient } from '@src/features/patient/slice';
import { getReaction } from '@src/features/reactions/slice';
import { getReferences } from '@src/features/references/slice';
import { getStudyIdentification } from '@src/features/study-identification/slice';
import { getPrimarySources } from '@src/features/primary-source/slice';
import { getInfoSender } from '@src/features/info-sender/slice';
import { getIdentification } from '@src/features/identification/slice';
import { getNarrative } from '@src/features/narrative/slice';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import MenuIcon from '@mui/icons-material/Menu';
import { PatientDeath } from './form/patient-info/patient-death/patient-death';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Validate } from './validate';

export const FormTabs = () => {
    const dispatch = useDispatch();
    const {
        currentTab,
        currentSaved,
        currentId,
        showSideMenu,
        errorTabs,
        currentValidated,
    } = useSelector(displaySelector);

    const { enqueueSnackbar } = useSnackbar();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        if (currentSaved === 1) {
            enqueueSnackbar(`Saved`, { variant: 'success' });
            dispatch(setCurrentSaved(0));
        } else if (currentSaved === 2) {
            enqueueSnackbar(`Saving error`, { variant: 'error' });
            dispatch(setCurrentSaved(0));
        }
    }, [currentSaved]);

    useEffect(() => {
        if (currentValidated === 1) {
            enqueueSnackbar(`Valid data`, { variant: 'success' });
            dispatch(setCurrentValidated(0));
        } else if (currentValidated === 2) {
            enqueueSnackbar(`Invalid data`, { variant: 'error' });
            dispatch(setCurrentValidated(0));
        }
    }, [currentValidated]);

    // useEffect(() => {
    //     dispatch(getJsonFromXml(xml));
    // }, [xml]);

    const handleChange = (event, newValue) => {
        console.log(newValue);
        dispatch(setCurrentTab(newValue));
    };

    const handleToggleMenuClick = () => {
        dispatch(setShowSideMenu(!showSideMenu));
    };

    const getXml = () => {
        const results = dispatch(getResults());
        const grugs = dispatch(getDrug());
        const patient = dispatch(getPatient());
        const reactions = dispatch(getReaction());
        const reference = dispatch(getReferences());
        const studyIdent = dispatch(getStudyIdentification());
        const primarySource = dispatch(getPrimarySources());
        const infoSender = dispatch(getInfoSender());
        const identification = dispatch(getIdentification());
        const narrative = dispatch(getNarrative());

        let data = {
            id: currentId,
            F_r_ResultsTestsProceduresInvestigationPatient: results,
            G_k_DrugInformation: grugs,
            D_PatientCharacteristics: patient['D_PatientCharacteristics'],
            E_i_ReactionEvent: reactions,
            C_4_r_LiteratureReference: reference,
            C_5_StudyIdentification: studyIdent,
            C_2_r_PrimarySourceInformation: primarySource,
            C_3_InformationSenderCaseSafetyReport: infoSender,
            C_1_IdentificationCaseSafetyReport:
                identification['C_1_IdentificationCaseSafetyReport'],
            H_NarrativeCaseSummary: narrative,
        };

        var snakecaseKeys = require('snakecase-keys');
        data = snakecaseKeys(data);
        console.log(data);
        dispatch(getXmlFromJson(data));
    };

    const [anchorElExtra, setAnchorElExtra] = useState(null);
    const openExtra = Boolean(anchorElExtra);
    const handleClickExtra = (event) => {
        console.log(event);
        setAnchorElExtra(event.currentTarget);
    };
    const handleCloseExtra = () => {
        setAnchorElExtra(null);
    };

    const handleKeyPress = useCallback((event) => {
        if (event.shiftKey && event.code === 'Digit1') {
            handleChange(null, '11');
        }
        if (event.shiftKey && event.code === 'Digit2') {
            handleChange(null, '8');
        }
        if (event.shiftKey && event.code === 'Digit3') {
            handleChange(null, '2');
        }
        if (event.shiftKey && event.code === 'Digit4') {
            handleChange(null, '1');
        }
        if (event.shiftKey && event.code === 'Digit5') {
            handleChange(null, '0');
        }
        if (event.shiftKey && event.code === 'Digit6') {
            handleChange(null, '5');
        }
        if (event.shiftKey && event.code === 'Digit7') {
            handleChange(null, '6');
        }
        if (event.shiftKey && event.code === 'Digit8') {
            handleChange(null, '7');
        }
        if (event.shiftKey && event.code === 'Digit9') {
            handleChange(null, '13');
        }
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);

    return (
        <Box sx={{ width: '95%' }}>
            <TabContext value={currentTab}>
                <Box
                    sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                        backgroundColor: '#122c44',
                        color: 'white',
                    }}
                >
                    <TabList
                        onChange={handleChange}
                        indicatorColor="primary"
                        TabIndicatorProps={{
                            sx: {
                                height: '6px !important',
                            },
                        }}
                        textColor="inherit"
                        variant="fullWidth"
                    >
                        {errorTabs[11].value ? (
                            <Tab
                                label="Identification of report"
                                value="11"
                                style={{ color: '#CC0000', fontWeight: 600 }}
                            />
                        ) : (
                            <Tab
                                label="Identification of report"
                                value="11"
                                style={{ fontWeight: 600 }}
                            />
                        )}

                        {errorTabs[8].value ? (
                            <Tab
                                label="Primary Source"
                                value="8"
                                style={{ color: '#CC0000', fontWeight: 600 }}
                            />
                        ) : (
                            <Tab
                                label="Primary Source"
                                value="8"
                                style={{ fontWeight: 600 }}
                            />
                        )}

                        {errorTabs[2].value ? (
                            <Tab
                                label="Patient"
                                value="2"
                                style={{ color: '#CC0000', fontWeight: 600 }}
                            />
                        ) : (
                            <Tab
                                label="Patient"
                                value="2"
                                style={{ fontWeight: 600 }}
                            />
                        )}

                        {errorTabs[1].value ? (
                            <Tab
                                label="Reactions"
                                value="1"
                                style={{ color: '#CC0000', fontWeight: 600 }}
                            />
                        ) : (
                            <Tab
                                label="Reactions"
                                value="1"
                                style={{ fontWeight: 600 }}
                            />
                        )}

                        {errorTabs[0].value ? (
                            <Tab
                                label="Results"
                                value="0"
                                style={{ color: '#CC0000', fontWeight: 600 }}
                            />
                        ) : (
                            <Tab
                                label="Results"
                                value="0"
                                style={{ fontWeight: 600 }}
                            />
                        )}

                        {errorTabs[5].value ? (
                            <Tab
                                label="Drugs"
                                value="5"
                                style={{ color: '#CC0000', fontWeight: 600 }}
                            />
                        ) : (
                            <Tab
                                label="Drugs"
                                value="5"
                                style={{ fontWeight: 600 }}
                            />
                        )}

                        {errorTabs[6].value ? (
                            <Tab
                                label="Dosages"
                                value="6"
                                style={{ color: '#CC0000', fontWeight: 600 }}
                            />
                        ) : (
                            <Tab
                                label="Dosages"
                                value="6"
                                style={{ fontWeight: 600 }}
                            />
                        )}

                        {errorTabs[7].value ? (
                            <Tab
                                label="Drug Reaction Matrix"
                                value="7"
                                style={{ color: '#CC0000', fontWeight: 600 }}
                            />
                        ) : (
                            <Tab
                                label="Drug Reaction Matrix"
                                value="7"
                                style={{ fontWeight: 600 }}
                            />
                        )}

                        {errorTabs[13].value ? (
                            <Tab
                                label="Narrative Case Summary"
                                value="13"
                                style={{ color: '#CC0000', fontWeight: 600 }}
                            />
                        ) : (
                            <Tab
                                label="Narrative Case Summary"
                                value="13"
                                style={{ fontWeight: 600 }}
                            />
                        )}

                        <div>
                            <Button
                                aria-controls={open ? 'long-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                aria-haspopup="true"
                                variant="outlined"
                                style={{
                                    height: '70px',
                                    color: 'white',
                                    borderColor: 'white',
                                    backgroundColor: '#122c44',
                                    borderWidth: '3px',
                                    marginRight: '5px',
                                    marginTop: '2px',
                                    marginBottom: '2px',
                                }}
                                onClick={handleClickExtra}
                            >
                                Extra Tabs
                            </Button>
                            <Menu
                                MenuListProps={{
                                    'aria-labelledby': 'long-button',
                                }}
                                anchorEl={anchorElExtra}
                                open={openExtra}
                                onClose={handleCloseExtra}
                                PaperProps={{
                                    style: {
                                        backgroundColor: '#122c44',
                                        color: 'white',
                                        marginTop: '5px',
                                    },
                                }}
                            >
                                <MenuItem onClick={handleCloseExtra}>
                                    <TabList
                                        onChange={handleChange}
                                        textColor="inherit"
                                        variant="fullWidth"
                                        indicatorColor="primary"
                                        TabIndicatorProps={{
                                            sx: {
                                                height: '6px !important',
                                            },
                                        }}
                                    >
                                        {errorTabs[9].value ? (
                                            <Tab
                                                label="Sender Information"
                                                value="9"
                                                style={{
                                                    color: '#CC0000',
                                                    fontWeight: 600,
                                                }}
                                            />
                                        ) : (
                                            <Tab
                                                label="Sender Information"
                                                value="9"
                                                style={{ fontWeight: 600 }}
                                            />
                                        )}
                                    </TabList>
                                </MenuItem>
                                <MenuItem onClick={handleCloseExtra}>
                                    <TabList
                                        onChange={handleChange}
                                        indicatorColor="primary"
                                        TabIndicatorProps={{
                                            sx: {
                                                height: '6px !important',
                                            },
                                        }}
                                        textColor="inherit"
                                        variant="fullWidth"
                                    >
                                        {errorTabs[3].value ? (
                                            <Tab
                                                label="Patient death"
                                                value="3"
                                                style={{
                                                    color: '#CC0000',
                                                    fontWeight: 600,
                                                }}
                                            />
                                        ) : (
                                            <Tab
                                                label="Patient death"
                                                value="3"
                                                style={{ fontWeight: 600 }}
                                            />
                                        )}
                                    </TabList>
                                </MenuItem>
                                <MenuItem onClick={handleCloseExtra}>
                                    <TabList
                                        onChange={handleChange}
                                        indicatorColor="primary"
                                        TabIndicatorProps={{
                                            sx: {
                                                height: '6px !important',
                                            },
                                        }}
                                        textColor="inherit"
                                        variant="fullWidth"
                                    >
                                        {errorTabs[4].value ? (
                                            <Tab
                                                label="Parent-child"
                                                value="4"
                                                style={{
                                                    color: '#CC0000',
                                                    fontWeight: 600,
                                                }}
                                            />
                                        ) : (
                                            <Tab
                                                label="Parent-child"
                                                value="4"
                                                style={{ fontWeight: 600 }}
                                            />
                                        )}
                                    </TabList>
                                </MenuItem>
                                <MenuItem onClick={handleCloseExtra}>
                                    <TabList
                                        onChange={handleChange}
                                        indicatorColor="primary"
                                        TabIndicatorProps={{
                                            sx: {
                                                height: '6px !important',
                                            },
                                        }}
                                        textColor="inherit"
                                        variant="fullWidth"
                                    >
                                        {errorTabs[10].value ? (
                                            <Tab
                                                label="Literature References"
                                                value="10"
                                                style={{
                                                    color: '#CC0000',
                                                    fontWeight: 600,
                                                }}
                                            />
                                        ) : (
                                            <Tab
                                                label="Literature References"
                                                value="10"
                                                style={{ fontWeight: 600 }}
                                            />
                                        )}
                                    </TabList>
                                </MenuItem>
                                <MenuItem onClick={handleCloseExtra}>
                                    <TabList
                                        onChange={handleChange}
                                        indicatorColor="primary"
                                        TabIndicatorProps={{
                                            sx: {
                                                height: '6px !important',
                                            },
                                        }}
                                        textColor="inherit"
                                        variant="fullWidth"
                                    >
                                        {errorTabs[12].value ? (
                                            <Tab
                                                label="Study Identification"
                                                value="12"
                                                style={{
                                                    color: '#CC0000',
                                                    fontWeight: 600,
                                                }}
                                            />
                                        ) : (
                                            <Tab
                                                label="Study Identification"
                                                value="12"
                                                style={{ fontWeight: 600 }}
                                            />
                                        )}
                                    </TabList>
                                </MenuItem>
                            </Menu>
                        </div>
                    </TabList>
                </Box>

                <TabPanel value="0">
                    <Results></Results>
                </TabPanel>
                <TabPanel value="1">
                    <Reactions></Reactions>
                </TabPanel>
                <TabPanel value="2">
                    <Patient></Patient>
                </TabPanel>
                <TabPanel value="3">
                    <PatientDeath></PatientDeath>
                </TabPanel>
                <TabPanel value="4">
                    <ParentChild></ParentChild>
                </TabPanel>
                <TabPanel value="5">
                    <DrugTabs></DrugTabs>
                </TabPanel>
                <TabPanel value="6">
                    <DosageTabs></DosageTabs>
                </TabPanel>
                <TabPanel value="7">
                    <MatrixTabs></MatrixTabs>
                </TabPanel>
                <TabPanel value="8">
                    <PrimarySourceComp></PrimarySourceComp>
                </TabPanel>
                <TabPanel value="9">
                    <InfoSenderComp></InfoSenderComp>
                </TabPanel>
                <TabPanel value="10">
                    <ReferencesComp></ReferencesComp>
                </TabPanel>
                <TabPanel value="11">
                    <IdentificationComp></IdentificationComp>
                </TabPanel>
                <TabPanel value="12">
                    <StudyIdentificationComp></StudyIdentificationComp>
                </TabPanel>
                <TabPanel value="13">
                    <NarrativeComp></NarrativeComp>
                </TabPanel>

                <FormLabel
                    sx={{
                        position: 'fixed',
                        bottom: '2%',
                        right: '2%',
                        zIndex: 10000,
                        fontSize: 25,
                        color: 'black',
                        backgroundColor: '#f1f1fb',
                        padding: '5px',
                    }}
                >
                   Report id: {currentId}
                </FormLabel>

                <Box sx={{ position: 'fixed', top: '15px', right: '2%' }}>
                    <IconButton
                        edge="end"
                        sx={{
                            border: '3px solid',
                            borderColor: '#122c44',
                            borderRadius: '100%',
                        }}
                    >
                        <MenuIcon
                            onClick={handleClick}
                            fontSize="large"
                            sx={{ color: '#122c44' }}
                        />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <Save></Save>
                        <Validate></Validate>
                        <MenuItem onClick={getXml}>
                            <ListItemIcon>
                                <DownloadIcon
                                    sx={{ fontSize: 35 }}
                                    color="primary"
                                />
                            </ListItemIcon>
                            <ListItemText>Get XML</ListItemText>
                        </MenuItem>
                        {currentId === null ? (
                            <MenuItem
                                disabled={true}
                                onClick={() => {
                                    window.open(`/api/api/cioms/${currentId}`);
                                }}
                            >
                                <ListItemIcon>
                                    <PictureAsPdfIcon
                                        sx={{ fontSize: 35 }}
                                        color="primary"
                                    />
                                </ListItemIcon>
                                <ListItemText>Get CIOMS</ListItemText>
                            </MenuItem>
                        ) : (
                            <MenuItem
                                onClick={() => {
                                    window.open(`/api/api/cioms/${currentId}`);
                                }}
                            >
                                <ListItemIcon>
                                    <PictureAsPdfIcon
                                        sx={{ fontSize: 35 }}
                                        color="primary"
                                    />
                                </ListItemIcon>
                                <ListItemText>Get CIOMS</ListItemText>
                            </MenuItem>
                        )}
                    </Menu>
                </Box>
            </TabContext>
            {!showSideMenu ? (
                <ArrowForwardIosIcon
                    fontSize="large"
                    sx={{
                        position: 'fixed',
                        bottom: '15px',
                        left: '0px',
                        zIndex: 10000,
                        color: '#122c44',
                    }}
                    onClick={handleToggleMenuClick}
                ></ArrowForwardIosIcon>
            ) : null}
        </Box>
    );
};
