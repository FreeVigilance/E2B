import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { displaySelector, getXmlFromJson, setCurrentSaved, setCurrentTab } from '@src/features/display/slice';
import { Results } from './results';
import { Reactions } from './reactions';
import { FormLabel, IconButton, Tooltip } from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { Patient } from './patient-info/patient';
import { ParentChild } from './patient-info/parent-child/parent-child';
import { DrugTabs } from './drugs/drug-tabs';
import { DosageTabs } from './drugs/dosages/dosage-tabs';
import { MatrixTabs } from './drugs/matrix/matrix-tabs';
import { Save } from './save';
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

export const FormTabs = () => {
    const dispatch = useDispatch();
    const { currentTab, currentSaved, currentId } = useSelector(displaySelector);

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (currentSaved === 1) {
            enqueueSnackbar(`Успешно сохранено`,{ variant: 'success' });
            dispatch(setCurrentSaved(0));
        } else if (currentSaved === 2) {
            enqueueSnackbar(`Ошибка сохранения`,{ variant: 'error' });
            dispatch(setCurrentSaved(0));
        }
    }, [currentSaved]);

    const handleChange = (event, newValue) => {
        dispatch(setCurrentTab(newValue));
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
                        <Tab label="Parent-child" value="3" />
                        <Tab label="Drugs" value="4" />
                        <Tab label="Dosages" value="5" />
                        {/* <Tab label="Drug Reaction Matrix" value="6" /> */}
                        <Tab label="Primary Source" value="7" />
                        <Tab label="Sender Information" value="8" />
                        <Tab label="Literature References" value="9" />
                        <Tab label="Identification of report" value="10" />
                        <Tab label="Study Identification" value="11" />
                        <Tab label="Narrative Case Summary" value="12" />

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
                    <ParentChild></ParentChild>
                </TabPanel>
                <TabPanel value="4">
                    <DrugTabs></DrugTabs>
                </TabPanel>
                <TabPanel value="5">
                    <DosageTabs></DosageTabs>
                </TabPanel>
                {/* <TabPanel value="6">
                    <MatrixTabs></MatrixTabs>
                </TabPanel> */}
                <TabPanel value="7">
                    <PrimarySourceComp></PrimarySourceComp>
                </TabPanel>
                <TabPanel value="8">
                    <InfoSenderComp></InfoSenderComp>
                </TabPanel>
                <TabPanel value="9">
                    <ReferencesComp></ReferencesComp>
                </TabPanel>
                <TabPanel value="10">
                    <IdentificationComp></IdentificationComp>
                </TabPanel>
                <TabPanel value="11">
                    <StudyIdentificationComp></StudyIdentificationComp>
                </TabPanel>
                <TabPanel value="12">
                    <NarrativeComp></NarrativeComp>
                </TabPanel>

                <Save></Save>
                <FormLabel sx={{ position: 'fixed', bottom: '2%', right: '2%',
                zIndex: 10000, fontSize: 25,  color: 'black'}}>Report id: {currentId}</FormLabel>

                <Tooltip title="Get XML">
                    <IconButton color = 'primary' onClick={getXml}
                        sx={{ position: "fixed", top: 50, right: 30 }}>
                        <DownloadIcon sx={{fontSize: 40}}></DownloadIcon>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Make CIOMS form pdf">
                    <IconButton color = 'primary' onClick={() => { window.open(`/api/api/cioms/${currentId}`); }}
                        sx={{ position: "fixed", top: 100, right: 30 }}>
                        CIOMS
                    </IconButton>
                </Tooltip>

            </TabContext>
        </Box>
    );
};
