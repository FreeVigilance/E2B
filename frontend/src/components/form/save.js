import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import SaveIcon from "@mui/icons-material/Save";
import { IconButton } from '@mui/material';
import { getResults } from '@src/features/results/slice';
import { getReaction } from '@src/features/reactions/slice';
import { getPatient } from '@src/features/patient/slice';
import { getDrug } from '@src/features/drugs/slice';

export const Save = () => {
    const dispatch = useDispatch();

    const saveData = () => {
        const results = dispatch(getResults());
        console.log(results);
        const reactions = dispatch(getReaction());
        console.log(reactions);
        const patient = dispatch(getPatient());
        console.log(patient);
        const grugs = dispatch(getDrug());
        console.log(grugs);
    }

    return(
        <IconButton color = 'primary'
				sx={{ position: "fixed", top: 5, right: 20, zIndex: 10000 }}
                onClick = {saveData}>
					<SaveIcon size='large'></SaveIcon>
			</IconButton>
    );
}