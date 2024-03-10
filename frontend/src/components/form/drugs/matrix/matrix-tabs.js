import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Box from '@mui/material/Box';
import { Tab } from '@mui/material';
import { drugsSelector } from '@src/features/drugs/slice';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { DrugReactionsMatrix } from './drug-reaction-matrix';

export const MatrixTabs = () => {
	const dispatch = useDispatch();
    const [value, setValue] = useState(0);
    const {drugs, drugReactionMatrix} = useSelector(drugsSelector);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        console.log("STATE");
        console.log(drugs);
        console.log(drugReactionMatrix);
    });

    const formTabsList = () => {
        let list = [];
        Object.values(drugs).forEach((item, index) => {
            list.push(<Tab value={index} label={index}/>);
        });
        return list;
    }

    const formTabPanels = () => {
        let list = [];
        Object.values(drugs).forEach((item, index) => {
            list.push(  <TabPanel value={index}>
                            <DrugReactionsMatrix drugIndex={index}></DrugReactionsMatrix>
                        </TabPanel>);
        });

        return list;
    }

	return (
            <Box sx={{ width: '100%' }}>
                <TabContext value={value}>
                <TabList
                    onChange={handleChange}
                    aria-label="Drug Reaction Matrix"
                >
                    {formTabsList()}
                    
                </TabList>
                {formTabPanels()}
                </TabContext>
            </Box>
	);
}