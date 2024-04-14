import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { casesListSelector, getCasesList, setCases } from "@src/features/cases-list/slice";
import { deleteReport, getData, revertAll, setOpenNewReport, setShowCasesList } from "@src/features/display/slice";
import DeleteIcon from '@mui/icons-material/Delete';

export const CasesList = () => {
    const dispatch = useDispatch();
    const {cases} = useSelector(casesListSelector);

    const openReport = (id) => {
        dispatch(getData(id));
        dispatch(setOpenNewReport(true));
        dispatch(setShowCasesList(false));
    }
    
    const removeReport = (id) => {
      let answer = window.confirm(`Are you sure you want to remove report ${id}?`);
      if (!answer) return;

      let casesCopy = JSON.parse(JSON.stringify(cases));
      casesCopy = casesCopy.filter((x) => x !== id);
      console.log('remove');
      console.log(casesCopy);
      dispatch(setCases(casesCopy));
      dispatch(deleteReport(id));
    }

    const generateList = () => {
        console.log("show");
        console.log(cases);
        let items = [];
        Object.values(cases).forEach((item, index) => {
          items.push(
            <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon onClick={() => removeReport(item)}/>
                  </IconButton>
                }
              >
                <ListItemButton onClick={() => openReport(item)}>
                <ListItemText primary={`Case id = ${item}`} />
                </ListItemButton>
              </ListItem>
          )
        });
        return items;
    }


    return (
        <Box sx={{ minHeight: 180, flexGrow: 1, maxWidth: 300, paddingLeft: '30px' }}>
          <List
            aria-label="cases-list"
          >
            {generateList()}
          </List>
        </Box>
    );
}