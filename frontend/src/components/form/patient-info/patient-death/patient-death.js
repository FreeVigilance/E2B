import { FormLabel, Grid } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect } from 'react';
import { Autopsy } from './autopsy';
import { CausesOfDeath } from './cause-of-death';

export const PatientDeath = () => {

    return (
        <Stack direction={'row'} columnGap={4}>
            <Grid container item xs direction="column" rowGap={1}>
                <FormLabel sx={{ fontSize: 30, marginLeft: '35%', color: 'black' }}>Causes Of Death</FormLabel>
                <CausesOfDeath></CausesOfDeath>
            </Grid>
            <Grid container item xs direction="column" rowGap={1}>
                <FormLabel sx={{ fontSize: 27, marginLeft: '30%', color: 'black' }}>Autopsy-determined Cause of Deat</FormLabel>
                <Autopsy></Autopsy>
            </Grid>
        </Stack>
    );
}