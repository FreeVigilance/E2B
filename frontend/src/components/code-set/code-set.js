import React, { useState } from 'react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';
import { TextField, Button, Box, FormLabel, Stack, MenuItem, InputLabel, Select } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useDispatch } from 'react-redux';
import { postCodeSet } from '@src/features/code-set/slice';
import Typography from '@mui/material/Typography';

registerAllModules();

export const CodeSet = () => {
    const dispatch = useDispatch();

    const [codeset, setCodeset] = useState('');
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = (e) => {
        console.log(e, file, codeset);
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        dispatch(postCodeSet({ codeset, data: formData }));
    };

    return (
        <>
            <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={2}
            >
                <Typography variant="h3">
                    Add Code Set
                </Typography>
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                >
                    <InputLabel id="codeset-select-label">Choose Code Set:</InputLabel>
                    <Select
                        variant="standard"
                        labelId="codeset-select-label"
                        value={codeset}
                        onChange={(e) => setCodeset(e.target.value)}
                    >
                        <MenuItem value={'ucum'}>UCUM</MenuItem>
                        <MenuItem value={'roa'}>Routes of Administration</MenuItem>
                        <MenuItem value={'df'}>Dosage Forms</MenuItem>
                        <MenuItem value={'sub'}>Substance TermIDs</MenuItem>
                        <MenuItem value={'country'}>Country Codes</MenuItem>
                        <MenuItem value={'language'}>Language Codes</MenuItem>
                    </Select>
                </Stack>
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                >
                    <Button
                        component="label"
                        startIcon={<UploadFileIcon />}
                    >
                        Choose CSV
                        <input type="file" name="file" accept=".csv" hidden onChange={handleFileChange} />
                    </Button>
                    <FormLabel>{file?.name ?? ''}</FormLabel>
                </Stack>
                {file && codeset &&
                    <Button
                        variant="contained"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Add code set
                    </Button>
                }
            </Stack>
        </>
    );
};
