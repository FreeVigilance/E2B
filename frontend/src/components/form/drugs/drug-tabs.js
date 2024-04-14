import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Box from '@mui/material/Box';
import { IconButton, Tab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Drugs } from './drugs';
import { AdditionalInfo, Dosage, Drug, DrugReactionMatrix, IndicationForUse, Relatedness, Substance } from '@src/features/drugs/drugs';
import { drugsSelector, setAdditionalInfo, setDosages, setDrugReactionMatrix, setDrugs, setIndications, setRelatedness, setSubstances } from '@src/features/drugs/slice';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DeleteIcon from '@mui/icons-material/Delete';

export const DrugTabs = () => {
	const dispatch = useDispatch();
    const [value, setValue] = useState(0);
    const {drugs, substances, dosages, indications, drugReactionMatrix, relatedness, additionalInfo} = useSelector(drugsSelector);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        console.log("STATE");
        console.log(drugs);
        console.log(substances);
        console.log(dosages);
        console.log(indications);
        console.log(drugReactionMatrix);
        console.log(relatedness);
        console.log(additionalInfo);
    });

    const createNewDrug = () => {
        const drugsCopy = JSON.parse(JSON.stringify(drugs));
        const substancesCopy = JSON.parse(JSON.stringify(substances));
        const dosagesCopy = JSON.parse(JSON.stringify(dosages));
        const indicationsCopy = JSON.parse(JSON.stringify(indications));
        const drugReactionMatrixCopy = JSON.parse(JSON.stringify(drugReactionMatrix));
        const relatednessCopy = JSON.parse(JSON.stringify(relatedness));
        const additionalInfoCopy = JSON.parse(JSON.stringify(additionalInfo));

        const newInd = drugs.length;
        drugsCopy.push(new Drug());
        substancesCopy[newInd]= [];
        console.log('substancesCopy', substancesCopy);
        dosagesCopy[newInd] = [];
        indicationsCopy[newInd] = [];
        drugReactionMatrixCopy[newInd] = [];
        additionalInfoCopy[newInd] = [];

        dispatch(setDrugs(drugsCopy));
        dispatch(setSubstances(substancesCopy));
        dispatch(setDosages(dosagesCopy));
        dispatch(setIndications(indicationsCopy));
        dispatch(setDrugReactionMatrix(drugReactionMatrixCopy));
        dispatch(setAdditionalInfo(additionalInfoCopy));
    }

    const deleteDrug = (index) => {
        let answer = window.confirm(`Are you sure you want to remove drug ${index}?`);
        if (!answer) return;
        
        const drugsCopy = JSON.parse(JSON.stringify(drugs));
        const substancesCopy = JSON.parse(JSON.stringify(substances));
        const dosagesCopy = JSON.parse(JSON.stringify(dosages));
        const indicationsCopy = JSON.parse(JSON.stringify(indications));
        const drugReactionMatrixCopy = JSON.parse(JSON.stringify(drugReactionMatrix));
        const additionalInfoCopy = JSON.parse(JSON.stringify(additionalInfo));

        drugsCopy.splice(index, 1);
        delete substancesCopy[index];
        delete dosagesCopy[index];
        delete indicationsCopy[index];
        delete additionalInfoCopy[index];

        dispatch(setDrugs(drugsCopy));
        dispatch(setSubstances(substancesCopy));
        dispatch(setDosages(dosagesCopy));
        dispatch(setIndications(indicationsCopy));
        dispatch(setDrugReactionMatrix(drugReactionMatrixCopy));
        dispatch(setAdditionalInfo(additionalInfoCopy));
    }

    const formTabsList = () => {
        let list = [];
        Object.values(drugs).forEach((item, index) => {
            list.push(<Tab label={
                <span>
                          {`drug ${index}`}
                          <IconButton sx={{ color: "#1976d2", marginLeft: 1}}
                          onClick = {() => deleteDrug(index)}>
                            <DeleteIcon />
                          </IconButton>
                        </span>
              } />);
        });
        console.log("AAAAAAAA")
        console.log(list);
        return list;
    }

    const formTabPanels = () => {
        let list = [];
        Object.values(drugs).forEach((item, index) => {
            list.push(  <TabPanel value={index}>
                            <Drugs index = {index}></Drugs>
                        </TabPanel>);
        });
        console.log("AAAAAAAA")
        console.log(list);
        return list;
    }

	return (
            <Box sx={{ width: '100%'}}>
                <TabContext value={value}>
                <TabList indicatorColor="primary"
                variant="fullWidth"
                    onChange={handleChange}
                    aria-label="Drugs"
                >
                    {formTabsList()}
                    
                </TabList>
                <IconButton size='large' style= {{ top: '10px'}}
                        sx={{ color: "white", backgroundColor: "#1976d2"}}
                        onClick={createNewDrug}><AddIcon/></IconButton>
                {formTabPanels()}
                </TabContext>
            </Box>
	);
}