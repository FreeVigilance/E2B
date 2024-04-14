import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { displaySelector, getJsonFromXml, getXmlFromJson, setCurrentSaved, setCurrentTab, setShowSideMenu } from '@src/features/display/slice';
import { Results } from './results';
import { Reactions } from './reactions';
import { Button, FormLabel, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip } from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { Patient } from './patient-info/patient';
import { ParentChild } from './patient-info/parent-child/parent-child';
import { DrugTabs } from './drugs/drug-tabs';
import { DosageTabs } from './drugs/dosages/dosage-tabs';
import { MatrixTabs } from './drugs/matrix/matrix-tabs';
import { Save } from '../save';
import { PrimarySourceComp } from './primaty-source';
import { InfoSenderComp } from './info-sender';
import { ReferencesComp } from './references';
import { IdentificationComp } from './identification/identification';
import { StudyIdentificationComp } from './study-identification/study-identification';
import { useSnackbar } from 'notistack';
import { NarrativeComp } from './narrative/narrative';
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
import { PatientDeath } from './patient-info/patient-death/patient-death';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


export const FormTabs = () => {
    const dispatch = useDispatch();
    const { currentTab, currentSaved, currentId, showSideMenu} = useSelector(displaySelector);

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
            enqueueSnackbar(`Успешно сохранено`,{ variant: 'success' });
            dispatch(setCurrentSaved(0));
        } else if (currentSaved === 2) {
            enqueueSnackbar(`Ошибка сохранения`,{ variant: 'error' });
            dispatch(setCurrentSaved(0));
        }
    }, [currentSaved]);

    // useEffect(() => {
    //     dispatch(getJsonFromXml(xml));
    // }, [xml]);

    const handleChange = (event, newValue) => {
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
            'id': currentId,
            'F_r_ResultsTestsProceduresInvestigationPatient': results,
            'G_k_DrugInformation': grugs,
            'D_PatientCharacteristics': patient['D_PatientCharacteristics'],
            'E_i_ReactionEvent': reactions,
            'C_4_r_LiteratureReference': reference,
            'C_5_StudyIdentification': studyIdent,
            'C_2_r_PrimarySourceInformation': primarySource,
            'C_3_InformationSenderCaseSafetyReport': infoSender,
            'C_1_IdentificationCaseSafetyReport': identification['C_1_IdentificationCaseSafetyReport'],
            'H_NarrativeCaseSummary': narrative,
        }
        
        var snakecaseKeys = require('snakecase-keys');
        data = snakecaseKeys(data);
        console.log(data);
        dispatch(getXmlFromJson(data));
    }

    return (
        <Box sx={{ width: '95%', typography: 'body1' }}>
            <TabContext value={currentTab}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example"
                    indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth">
                        <Tab label="Results" value="0" />
                        <Tab label="Reactions" value="1" />
                        <Tab label="Patient" value="2" />
                        <Tab label="Patient death" value="3" />
                        <Tab label="Parent-child" value="4" />
                        <Tab label="Drugs" value="5" />
                        <Tab label="Dosages" value="6" />
                        <Tab label="Drug Reaction Matrix" value="7" />
                        <Tab label="Primary Source" value="8" />
                        <Tab label="Sender Information" value="9" />
                        <Tab label="Literature References" value="10" />
                        <Tab label="Identification of report" value="11" />
                        <Tab label="Study Identification" value="12" />
                        <Tab label="Narrative Case Summary" value="13" />

                    </TabList>
                </Box>

                {!showSideMenu ?
            <ArrowForwardIosIcon color='primary' fontSize='large' sx={{ position: 'fixed', top: '25px', left: '5px', zIndex: 10000 }}
                onClick={handleToggleMenuClick}></ArrowForwardIosIcon>
                : null }

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

                <FormLabel sx={{ position: 'fixed', bottom: '2%', right: '2%',
                zIndex: 10000, fontSize: 25,  color: 'black', backgroundColor: 'white', padding: '5px'}}>Report id: {currentId}</FormLabel>

                <Box sx={{ position: "fixed", top: '2%', right: '2%' }} >
                    <IconButton edge="end">
                        <MenuIcon onClick={handleClick} fontSize='large' color='primary'/>
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
                        <MenuItem onClick={getXml}>
                            <ListItemIcon><DownloadIcon sx={{fontSize: 35}} color='primary'/></ListItemIcon>
                            <ListItemText>Get XML</ListItemText>
                        </MenuItem>
                        {currentId === null ?
                            <MenuItem disabled={true} onClick={() => { window.open(`/api/api/cioms/${currentId}`); }}>
                                <ListItemIcon><PictureAsPdfIcon sx={{fontSize: 35}} color='primary'/></ListItemIcon>
                                <ListItemText>Get CIOMS</ListItemText>
                            </MenuItem>
                        :   <MenuItem onClick={() => { window.open(`/api/api/cioms/${currentId}`); }}>
                                <ListItemIcon><PictureAsPdfIcon sx={{fontSize: 35}} color='primary'/></ListItemIcon>
                                <ListItemText>Get CIOMS</ListItemText>
                            </MenuItem>}

                        

                    </Menu>
                </Box>

            </TabContext>
        </Box>
    );
};
