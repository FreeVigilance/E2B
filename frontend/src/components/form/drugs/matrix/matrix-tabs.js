import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { FormLabel, Tab } from '@mui/material';
import { drugsSelector } from '@src/features/drugs/slice';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { DrugReactionsMatrix } from './drug-reaction-matrix';

export const MatrixTabs = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState(0);
    const { drugs, drugReactionMatrix } = useSelector(drugsSelector);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        console.log('STATE');
        console.log(drugs);
        console.log(drugReactionMatrix);
    });

    const formTabsList = () => {
        let list = [];
        Object.values(drugs).forEach((item, index) => {
            list.push(
                <Tab
                    sx={{ color: 'white', fontWeight: 600, fontSize: '22px' }}
                    value={index}
                    label={`drug ${index}`}
                />,
            );
        });
        return list;
    };

    const formTabPanels = () => {
        let list = [];
        Object.values(drugs).forEach((item, index) => {
            list.push(
                <TabPanel value={index}>
                    <DrugReactionsMatrix
                        drugIndex={index}
                    ></DrugReactionsMatrix>
                </TabPanel>,
            );
        });

        return list;
    };

    if (drugs.length === 0) {
        return (
            <FormLabel sx={{ fontSize: 40, color: 'black' }}>
                {' '}
                Add drug first
            </FormLabel>
        );
    } else {
        return (
            <Box sx={{ width: '100%' }}>
                <TabContext value={value}>
                    <TabList
                        indicatorColor="primary"
                        variant="fullWidth"
                        sx={{ backgroundColor: '#B8B8CE' }}
                        TabIndicatorProps={{
                            sx: {
                                height: '5px !important',
                            },
                        }}
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
};
