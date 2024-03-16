import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Box, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { casesListSelector, getCasesList } from "@src/features/cases-list/slice";
import { getData, setOpenNewReport, setShowCasesList } from "@src/features/display/slice";

export const CasesList = () => {
    const dispatch = useDispatch();
    const {cases} = useSelector(casesListSelector);

    const openReport = (id) => {
        dispatch(getData(id));
        dispatch(setOpenNewReport(true));
        dispatch(setShowCasesList(false));
    }

    const generateList = () => {
        console.log("show");
        let items = [];
        for (let i = 0; i < cases.length; i+=1 ) {
            items.push(
            <ListItem key={i}>
                <ListItemButton onClick={() => openReport(cases[i])}>
                  <ListItemText primary={cases[i]} />
              </ListItemButton>
            </ListItem>)
        }
        return items;
    }


    return (
        <Box sx={{ minHeight: 180, flexGrow: 1, maxWidth: 300 }}>
          <List
            aria-label="cases-list"
          >
            {generateList()}
          </List>
        </Box>
    );
}