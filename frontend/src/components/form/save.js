import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import SaveIcon from "@mui/icons-material/Save";
import { IconButton } from '@mui/material';
import { getResults } from '@src/features/results/slice';
import { getReaction } from '@src/features/reactions/slice';
import { getPatient } from '@src/features/patient/slice';
import { getDrug } from '@src/features/drugs/slice';
import { displaySelector, saveData } from '@src/features/display/slice';

export const Save = () => {
    const dispatch = useDispatch();

    const {currentId} = useSelector(displaySelector);

    const save = () => {
        const results = dispatch(getResults());
        console.log(results);
        // const reactions = dispatch(getReaction());
        // console.log(reactions);
        // const patient = dispatch(getPatient());
        // console.log(patient);
        // const grugs = dispatch(getDrug());
        // console.log(grugs);
        let data = {
            'id': currentId,
            'F_r_ResultsTestsProceduresInvestigationPatient': results
        }
        
        var snakecaseKeys = require('snakecase-keys');
        data = snakecaseKeys(data);
        console.log(data);
        dispatch(saveData(data));
    }

    return(
        <IconButton color = 'primary'
				sx={{ position: "fixed", top: 10, right: 30, zIndex: 10000 }}
                onClick = {save}>
					<SaveIcon sx={{fontSize: 40}}></SaveIcon>
			</IconButton>
    );
}