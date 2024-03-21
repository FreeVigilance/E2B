import React, { useState } from "react";
import { displaySelector, getJsonFromXml, revertAll, setOpenNewReport, setShowUpload, setUploadedFile } from "@src/features/display/slice";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormLabel, Input, OutlinedInput, Stack } from "@mui/material";

export const UploadXml = () => {
    const dispatch = useDispatch();

    const { showUpload } = useSelector(displaySelector);
    const [file, setFile] = useState(null);

    const onHide = (event, reason) => {
        if (reason && reason === "backdropClick") 
            return;
        dispatch(setShowUpload(false));
    };

    const handleFileChange = (e) => {
        if (e.target.files) {
        setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (file) {
            var reader = new FileReader();
            let readXml=null;
            reader.onload = function(e) {
                readXml = e.target.result;
                dispatch(revertAll());
                dispatch(setUploadedFile(readXml));
                const data = {'value': readXml}
                dispatch(getJsonFromXml(data));
                dispatch(setShowUpload(false));
                dispatch(setOpenNewReport(true));
            }
            reader.readAsText(file);
        }
    };

    return (

        <Dialog
        open={showUpload}
        onClose={onHide}
        >
            <DialogTitle sx={{ fontSize: 30, color: 'black' }}>
            {"Upload XML file"}
            </DialogTitle>
            <DialogContent>
                <Stack direction="column" spacing={2} justifyContent="flex-start">
                    <form method="post" enctype="multipart/form-data">
                        <label class="input-file">
                            <input type="file" name="file" onChange={handleFileChange}></input>
                                <span className="input-file-btn" >
                                    Choose file
                                </span>
                        </label>
                    </form>

                    {file && 
                    <Stack direction="column" spacing={2} justifyContent="flex-start">
                        <FormLabel>{`File Name: ${file.name}`}</FormLabel>
                        <Button variant="contained" color="secondary" onClick={handleUpload}>Upload a file</Button>
                    </Stack>
                    }
                </Stack>
            </DialogContent>
            <DialogActions>
            <Button variant="outlined" onClick={onHide}>Закрыть</Button>
            </DialogActions>
        </Dialog>
    );
};
