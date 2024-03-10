import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { displaySelector, setCurrentTab } from '@src/features/display/slice';
import { Results } from './results';
import { Reactions } from './reactions';
import { IconButton } from '@mui/material';
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

export const FormTabs = () => {
    const dispatch = useDispatch();
    const { currentTab } = useSelector(displaySelector);

    const handleChange = (event, newValue) => {
        dispatch(setCurrentTab(newValue));
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={currentTab}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Results" value="0" />
                        <Tab label="Reactions/Events" value="1" />
                        <Tab label="Patient" value="2" />
                        <Tab label="Parent-child" value="3" />
                        <Tab label="Drugs" value="4" />
                        <Tab label="Dosages" value="5" />
                        <Tab label="Drug Reaction Matrix" value="6" />
                        <Tab label="Primary Source" value="7" />
                        <Tab label="Sender Information" value="8" />
                        <Tab label="Literature References" value="9" />
                        <Tab label="Identification of report" value="10" />
                        <Tab label="Study Identification" value="11" />

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
                <TabPanel value="6">
                    <MatrixTabs></MatrixTabs>
                </TabPanel>
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

                <Save></Save>

                <IconButton color = 'primary'
                    sx={{ position: 'fixed', top: 5, right: 80, zIndex: 10000 }}>
                    <VerifiedUserIcon size='large'></VerifiedUserIcon>
                </IconButton>
            </TabContext>
        </Box>
    );
};
