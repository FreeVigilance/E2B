import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { displaySelector, getData, revertAll, setCurrentId, setOpenNewReport, setShowCasesList, setShowSideMenu, setShowUpload } from '@src/features/display/slice';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Fab, ListItemIcon } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { reactionsSelector, setReactionsData } from '@src/features/reactions/slice';
import { resultsSelector, setResultsData } from '@src/features/results/slice';
import { Reaction } from '@src/features/reactions/reaction';
import { Result } from '@src/features/results/result';
import { AutopsyData, CauseOfDeath, DrugHistory, MedHistory, ParentDrugHistory } from '@src/features/patient/patient';
import { patientSelector, setAutopsy, setCauseOfDeath, setDrugHistory, setMedicalHistory, setParentDrugHistory } from '@src/features/patient/slice';
import { getCasesList } from '@src/features/cases-list/slice';
import { UploadXml } from './upload-xml';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const drawerWidth = 240;

export const SideMenu = () => {
    const dispatch = useDispatch();

    const { showSideMenu, openNewReport, showUpload } = useSelector(displaySelector);
    const { reactionsData } = useSelector(reactionsSelector);
    const { resultsData } = useSelector(resultsSelector);
    const { medicalHistory, drugHistory, causeOfDeath, parentHistoryData, parentDrugHistory, autopsy } = useSelector(patientSelector);

    useEffect(() => {
        dispatch(setShowSideMenu(true));
    }, []);

    const handleCaseListShow = () => {
        if (openNewReport) {
            let answer = window.confirm(`Are you shure? There may be unsaved data`);
            if (!answer) return;
        }
        dispatch(revertAll());
        dispatch(getCasesList());
        dispatch(setShowCasesList(true));
    };

    const handleNewReportClick = () => {
        dispatch(revertAll());
        dispatch(setCurrentId(null));
        dispatch(setOpenNewReport(true));
    };

    const handleUploadClick = () => {
        dispatch(revertAll());
        dispatch(setShowSideMenu(true));
        dispatch(setCurrentId(null));
        dispatch(setShowUpload(true))
    };

    const handleToggleMenuClick = () => {
        dispatch(setShowSideMenu(!showSideMenu));
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <SwipeableDrawer
                transitionDuration={500}
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open={showSideMenu}>
                
                <List>

                    <ListItem key={'toggle'}>
                        <ListItemIcon onClick={handleToggleMenuClick} style={{paddingLeft: '80%'}}>
                            <ArrowBackIosIcon fontSize='large'></ArrowBackIosIcon>
                        </ListItemIcon>
                    </ListItem>
                

                    <ListItem key={'New Report'} disablePadding>
                        <ListItemButton onClick={handleNewReportClick}>
                            <ListItemText primary={'New Report'} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem key={'Cases List'} disablePadding>
                        <ListItemButton
                            onClick={handleCaseListShow}>
                            <ListItemText primary={'Cases List'} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem key={'Import XML'} disablePadding>
                        <ListItemButton
                            onClick={handleUploadClick}>
                            <ListItemText primary={'Import XML'} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </SwipeableDrawer>


            {!showSideMenu && !openNewReport?
            <ArrowForwardIosIcon color='primary' fontSize='large' sx={{ position: 'fixed', top: '25px', left: '5px', zIndex: 10000 }}
                onClick={handleToggleMenuClick}></ArrowForwardIosIcon>
                : null }
            {/* <Fab variant="contained"
                sx={{ position: 'fixed', top: '10px', left: '0', zIndex: 10000 }}
                onClick={handleToggleMenuClick}>
                <ArrowForwardIosIcon></ArrowForwardIosIcon>
            </Fab> */}
            {showUpload ? <UploadXml></UploadXml> : null}
        </Box>
    );
};
