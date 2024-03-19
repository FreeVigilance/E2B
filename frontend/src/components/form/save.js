import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import SaveIcon from "@mui/icons-material/Save";
import { IconButton } from '@mui/material';
import { getResults } from '@src/features/results/slice';
import { getReaction } from '@src/features/reactions/slice';
import { getPatient } from '@src/features/patient/slice';
import { getDrug } from '@src/features/drugs/slice';
import { changeData, displaySelector, saveData } from '@src/features/display/slice';
import { getReferences } from '@src/features/references/slice';
import { getStudyIdentification } from '@src/features/study-identification/slice';
import { getPrimarySources } from '@src/features/primary-source/slice';
import { getInfoSender } from '@src/features/info-sender/slice';
import { getIdentification } from '@src/features/identification/slice';
import { getNarrative } from '@src/features/narrative/slice';

export const Save = () => {
    const dispatch = useDispatch();

    const {currentId} = useSelector(displaySelector);

    const save = () => {
        const results = dispatch(getResults());
        const grugs = dispatch(getDrug());
        const patient = dispatch(getPatient());
        const reactions = dispatch(getReaction());
        const reference = dispatch(getReferences());
        const studyIdent = dispatch(getStudyIdentification());
        const primarySource = dispatch(getPrimarySources());
        const infoSender = dispatch(getInfoSender());
        const identification = dispatch(getIdentification());
        const narrative = dispatch(getNarrative());

        let data = {
            'id': currentId,
            'F_r_ResultsTestsProceduresInvestigationPatient': results,
            'G_k_DrugInformation': grugs,
            'D_PatientCharacteristics': patient['D_PatientCharacteristics'],
            'E_i_ReactionEvent': reactions,
            'C_4_r_LiteratureReference': reference,
            'C_5_StudyIdentification': studyIdent,
            'C_2_r_PrimarySourceInformation': primarySource,
            'C_3_InformationSenderCaseSafetyReport': infoSender,
            'C_1_IdentificationCaseSafetyReport': identification['C_1_IdentificationCaseSafetyReport'],
            'H_NarrativeCaseSummary': narrative,
        }
        
        var snakecaseKeys = require('snakecase-keys');
        data = snakecaseKeys(data);
        console.log(data);
        if (currentId !== null) {
            dispatch(changeData(data));
        } else {
            dispatch(saveData(data));
        }
        
    }

    return(
        <IconButton color = 'primary'
				sx={{ position: "fixed", top: 10, right: 30 }}
                onClick = {save}>
					<SaveIcon sx={{fontSize: 40}}></SaveIcon>
			</IconButton>
    );
}