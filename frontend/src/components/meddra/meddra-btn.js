import React, { useState } from 'react';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import { Autocomplete, Box, Button, FormLabel, IconButton, Modal, Select, Stack, TextField, Tooltip } from '@mui/material';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles({
    select: {
        marginLeft: 1,
        marginRight: 1,
        width: '300px',
    },
    label: {
        color: 'black',
        fontSize: 22,
        fontWeight: 600
    }

})

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
    height: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    px: 4,
    pb: 4,
    pt: 1
};

export const MedDRABtn = ({field, index, handleChange}) => {
    const classes = useStyles();

    const [show, setShow] = useState(false);

    const onShow = () => {
        if (!show) {
            setShow(true);
        }
    }

    const onHide = () => {
        setShow(false);
    };

    return (
        <>
            <Tooltip title="MedDRA">
                <span>
                    <IconButton color="primary"
                                onClick={onShow}><MedicalInformationIcon/></IconButton>
                </span>
            </Tooltip>

            <Modal
                open={show}
                onClose={onHide}
            >
                <Box sx={style}>
                    {/* <TextField onChange={handleChange(field, index)}></TextField> */}
                    <Stack direction={'column'} gap={3}>
                        <Stack direction={'row'} gap={2}>
                            <Stack direction={'column'} gap={0}>
                                <FormLabel>MedDRA version</FormLabel>
                                <Autocomplete
                                renderInput={(params) => <TextField {...params}/>}></Autocomplete>
                            </Stack>
                            <Stack direction={'column'} gap={0}>
                                <FormLabel>Language</FormLabel>
                                <Autocomplete
                                renderInput={(params) => <TextField {...params}/>}></Autocomplete>
                            </Stack>
                        </Stack>

                                {/* <Autocomplete
                                    options={[
                                        { label: "1 = Positive" },
                                        { label: "0 = unknown" },
                                      ].map((option) => option.label)}
                                    onChange={handleChange('F_r_3_1_TestResultCode', index)}
                                    value = {item['F_r_3_1_TestResultCode'].value}
                                    renderInput={(params) => <TextField {...params}/>}
                                /> */}

                        <Stack direction={'column'} gap={0} style={{paddingLeft: '0%'}}>
                                <FormLabel className={classes.label}>SOC</FormLabel>
                                <FormLabel>System Organ Class</FormLabel>
                                <Autocomplete className={classes.select}
                                renderInput={(params) => <TextField {...params}/>}></Autocomplete>
                        </Stack>

                        <Stack direction={'column'} gap={0} style={{paddingLeft: '5%'}}>
                                <FormLabel className={classes.label}>HLGT</FormLabel>
                                <FormLabel>High Level Group Term</FormLabel>
                                <Autocomplete className={classes.select}
                                renderInput={(params) => <TextField {...params}/>}></Autocomplete>
                        </Stack>

                        <Stack direction={'column'} gap={0} style={{paddingLeft: '10%'}}>
                                <FormLabel className={classes.label}>HLT</FormLabel>
                                <FormLabel>High Level Term</FormLabel>
                                <Autocomplete className={classes.select}
                                renderInput={(params) => <TextField {...params}/>}></Autocomplete>
                        </Stack>

                        <Stack direction={'column'} gap={0} style={{paddingLeft: '15%'}}>
                                <FormLabel className={classes.label}>PT</FormLabel>
                                <FormLabel>Preferred Term</FormLabel>
                                <Autocomplete className={classes.select}
                                renderInput={(params) => <TextField {...params}/>}></Autocomplete>
                        </Stack>

                        <Stack direction={'column'} gap={0} style={{paddingLeft: '20%'}}>
                                <FormLabel className={classes.label}>LLT</FormLabel>
                                <FormLabel>Low Level Term</FormLabel>
                                <Autocomplete className={classes.select}
                                renderInput={(params) => <TextField {...params}/>}></Autocomplete>
                        </Stack>


                        <Stack direction={'row'} gap={2} justifyContent='flex-end' style={{marginTop: '30px'}}>
                            <Button variant="contained">Save</Button>
                            <Button variant="outlined" onClick={onHide}>Cancel</Button>
                        </Stack>

                    </Stack>
                </Box>
            </Modal>
        </>
    );

}