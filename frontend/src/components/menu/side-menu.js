import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { displaySelector, getData, revertAll, setOpenNewReport, setShowCasesList, setShowSideMenu } from '@src/features/display/slice';
import { useDispatch, useSelector } from 'react-redux';
import { Fab } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { reactionsSelector, setReactionsData } from '@src/features/reactions/slice';
import { resultsSelector, setResultsData } from '@src/features/results/slice';
import { Reaction } from '@src/features/reactions/reaction';
import { Result } from '@src/features/results/result';
import { AutopsyData, CauseOfDeath, DrugHistory, MedHistory, ParentDrugHistory } from '@src/features/patient/patient';
import { patientSelector, setAutopsy, setCauseOfDeath, setDrugHistory, setMedicalHistory, setParentDrugHistory } from '@src/features/patient/slice';

const drawerWidth = 240;

export const SideMenu = () => {
    const dispatch = useDispatch();

    const { showSideMenu } = useSelector(displaySelector);
    const { reactionsData } = useSelector(reactionsSelector);
    const { resultsData } = useSelector(resultsSelector);
    const { medicalHistory, drugHistory, causeOfDeath, parentHistoryData, parentDrugHistory, autopsy } = useSelector(patientSelector);

    useEffect(() => {
        dispatch(setShowSideMenu(true));
    }, []);

    const handleCaseListShow = () => {
        dispatch(revertAll());
        dispatch(setShowCasesList(true));
    };

    const handleNewReportClick = () => {
        dispatch(getData(2));

        dispatch(revertAll());

        const reactionsDataCopy = JSON.parse(JSON.stringify(reactionsData));
        const reactionNew = new Reaction();
        reactionsDataCopy.push(reactionNew);
        dispatch(setReactionsData(reactionsDataCopy));

        const resultsDataCopy = JSON.parse(JSON.stringify(resultsData));
        const resultNew = new Result();
        resultsDataCopy.push(resultNew);
        dispatch(setResultsData(resultsDataCopy));

        const medHistoryCopy = JSON.parse(JSON.stringify(medicalHistory));
        const medicalHistoryNew = new MedHistory();
        medHistoryCopy.push(medicalHistoryNew);
        dispatch(setMedicalHistory(medHistoryCopy));

        const drugHistoryCopy = JSON.parse(JSON.stringify(drugHistory));
        const drugHistoryNew = new DrugHistory();
        drugHistoryCopy.push(drugHistoryNew);
        dispatch(setDrugHistory(drugHistoryCopy));

        const causeOfDeathCopy = JSON.parse(JSON.stringify(causeOfDeath));
        const causeOfDeathNew = new CauseOfDeath();
        causeOfDeathCopy.push(causeOfDeathNew);
        dispatch(setCauseOfDeath(causeOfDeathCopy));

        const autopsyCopy = JSON.parse(JSON.stringify(autopsy));
        const autopsyNew = new AutopsyData();
        autopsyCopy.push(autopsyNew);
        dispatch(setAutopsy(autopsyCopy));

        const parentDrugHistoryCopy = JSON.parse(JSON.stringify(parentDrugHistory));
        const parentDrugHistoryNew = new ParentDrugHistory();
        parentDrugHistoryCopy.push(parentDrugHistoryNew);
        dispatch(setParentDrugHistory(parentDrugHistoryCopy));

        dispatch(setOpenNewReport(true));
    };

    const handleToggleMenuClick = () => {
        console.log(showSideMenu);
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
                        <ListItemButton>
                            <ListItemText primary={'Import XML'} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </SwipeableDrawer>
            <Fab variant="contained"
                sx={{ position: 'fixed', bottom: 10, left: 10, zIndex: 10000 }}
                onClick={handleToggleMenuClick}>
                <MenuIcon></MenuIcon>
            </Fab>
        </Box>
    );
};
