import { Grid, MenuItem, Select } from '@mui/material';
import {
    drugsSelector,
    setDrugReactionMatrix,
} from '@src/features/drugs/slice';
import { reactionsSelector } from '@src/features/reactions/slice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { MatrixFieldLabel } from '@src/components/field-labels/drugs/matrix/matrix-label';

const useStyles = makeStyles({
    textShort: {
        marginLeft: 1,
        marginRight: 1,
        width: '20%',
    },
    textMedium: {
        marginLeft: 1,
        marginRight: 1,
        width: '50%',
    },
});

export const ReactionSelect = ({ drugIndex, index }) => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const { drugReactionMatrix } = useSelector(drugsSelector);
    const { reactionsData } = useSelector(reactionsSelector);

    const handleChange = () => (event) => {
        let value = event.target.value;
        if (value === '') {
            value = null;
        }
        let drugReactionMatrixCopy = JSON.parse(
            JSON.stringify(drugReactionMatrix),
        );
        drugReactionMatrixCopy[drugIndex][index]['G_k_9_i_1_ReactionAssessed'] = value;
        dispatch(setDrugReactionMatrix(drugReactionMatrixCopy));
    };

    const formReactionsList = () => {
        let list = [];
        Object.values(reactionsData).forEach((item, index) => {
            let reactionIndex = item['E_i_1_1a_ReactionPrimarySourceNativeLanguage'].value;
            if (reactionIndex === null) {
                reactionIndex = item['uuid'];
            }
            list.push(
                <MenuItem value={reactionIndex}>
                    {reactionIndex}
                </MenuItem>,
            );
        });
        return list;
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <MatrixFieldLabel
                    label="Reaction Assessed"
                    field="G_k_9_i_1_ReactionAssessed"
                    drugIndex={drugIndex}
                    index={index}
                ></MatrixFieldLabel>
            </Grid>
            <Grid item xs={8}>
                <Select
                    className={classes.textMedium}
                    value={
                        drugReactionMatrix[drugIndex][index][
                            'G_k_9_i_1_ReactionAssessed'
                        ]
                    }
                    onChange={handleChange()}
                >
                    {formReactionsList()}
                </Select>
            </Grid>
        </Grid>
    );
};
