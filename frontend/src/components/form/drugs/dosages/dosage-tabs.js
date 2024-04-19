import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import Box from '@mui/material/Box';
import { FormControl, FormLabel, Tab } from '@mui/material';
import { drugsSelector } from '@src/features/drugs/slice';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Dosages } from './dosage';

export const DosageTabs = () => {
    const [value, setValue] = useState(0);
    const {drugs, dosages} = useSelector(drugsSelector);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        console.log("STATE");
        console.log(drugs);
        console.log(dosages);
    });

    const formTabsList = () => {
        let list = [];
        Object.values(drugs).forEach((item, index) => {
            list.push(<Tab 
                sx={{color: 'white', fontWeight: 600, fontSize: '22px'}}
                value={index} label={`drug ${index}`}/>);
        });
        return list;
    }

    const formTabPanels = () => {
        let list = [];
        Object.values(drugs).forEach((item, index) => {
            list.push(  <TabPanel value={index}>
                            <Dosages drugIndex={index}></Dosages>
                        </TabPanel>);
        });

        return list;
    }

    if (drugs.length === 0) {
        return ( <FormLabel sx={{ fontSize: 40, color: 'black' }}> Add drug first</FormLabel>);
    } else {
        return (
                <Box sx={{ width: '100%' }}>
                    <TabContext value={value}>
                    <TabList
                        indicatorColor="primary"
                        variant="fullWidth"
                        sx={{backgroundColor: '#B8B8CE'}}
                        TabIndicatorProps={{
                            sx: {
                              height: "5px !important",
                            },
                        }}  
                        onChange={handleChange}
                        aria-label="Dosages"
                    >
                        {formTabsList()}
                        
                    </TabList>
                    {formTabPanels()}
                    </TabContext>
                </Box>
        );
    }
}