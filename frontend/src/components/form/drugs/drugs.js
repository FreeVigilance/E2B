import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Stack, FormControlLabel, Box, Select, MenuItem, FormControl, InputLabel, Grid, Divider, FormLabel } from '@mui/material';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { drugsSelector, setDrugs } from '@src/features/drugs/slice';
import { Substances } from './substance';
import { Indications } from './indications';
import { AddInfo } from './add-info';

export const Drugs = ({index}) => {
    const dispatch = useDispatch();
    const {drugs} = useSelector(drugsSelector);

    useEffect(() => {
        console.log("STATE");
        console.log(drugs);
    });

    const handleChange = (fieldName, index) => (event) => {
        let drugsDataCopy = JSON.parse(JSON.stringify(drugs));
        drugsDataCopy[index][fieldName].value = event.target.value;
        console.log(drugsDataCopy[index]);
        dispatch(setDrugs(drugsDataCopy));
    };

    const setNullFlavor = (fieldName, index) => (event) => {
        let drugsDataCopy = JSON.parse(JSON.stringify(drugs));
        drugsDataCopy[index][fieldName].nullFlavor = event.target.value;
        dispatch(setDrugs(drugsDataCopy));
    };

    const setUnknown = (fieldName, index) => (event) => {
        console.log(event.target.checked);
        let drugsDataCopy = JSON.parse(JSON.stringify(drugs));
        if (event.target.checked) {
            drugsDataCopy[index][fieldName].nullFlavor = -1;
        } else {
            drugsDataCopy[index][fieldName].nullFlavor = null;
        }
        dispatch(setDrugs(drugsDataCopy));
    };

    return (
        <>
            <Grid container direction="row" columnGap={4}>
                <Grid container item xs direction="column" rowGap={1}>
                    <FormControl>
                        <InputLabel>Characterisation of Drug Role</InputLabel>
                        <Select
                            defaultValue={0}
                            value={drugs[index]['G_k_1_CharacterisationDrugRole'].value}
                            onChange={handleChange('G_k_1_CharacterisationDrugRole', index)}
                        >
                            <MenuItem value={1}>1 = Suspect</MenuItem>
                            <MenuItem value={2}>2 = Concomitant</MenuItem>
                            <MenuItem value={3}>3 = Interacting</MenuItem>
                            <MenuItem value={4}>4 = Drug Not Administered</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField label="MPID Version Date / Number" variant="outlined"
                               onChange={handleChange('G_k_2_1_1a_MPIDVersion', index)}
                               value={drugs[index]['G_k_2_1_1a_MPIDVersion'].value}/>

                    <TextField label="Medicinal Product Identifier" variant="outlined"
                               onChange={handleChange('G_k_2_1_1b_MPID', index)}
                               value={drugs[index]['G_k_2_1_1b_MPID'].value}/>

                    <TextField label="PhPID Version Date/Number" variant="outlined"
                               onChange={handleChange('G_k_2_1_2a_PhPIDVersion', index)}
                               value={drugs[index]['G_k_2_1_2a_PhPIDVersion'].value}/>

                    <TextField label="Pharmaceutical Product Identifier" variant="outlined"
                               onChange={handleChange('G_k_2_1_2b_PhPID', index)}
                               value={drugs[index]['G_k_2_1_2b_PhPID'].value}/>

                    <TextField label="Medicinal Product Name as Reported by the Primary Source" variant="outlined"
                               onChange={handleChange('G_k_2_2_MedicinalProductNamePrimarySource', index)}
                               value={drugs[index]['G_k_2_2_MedicinalProductNamePrimarySource'].value}
                               multiline
                               inputProps={{maxLength: 250}}
                               rows={3}/>

                </Grid>
                <Grid container item xs direction="column" rowGap={1}>
                    <TextField label="Identification of the Country Where the Drug Was Obtained" variant="outlined"
                               onChange={handleChange('G_k_2_4_IdentificationCountryDrugObtained', index)}
                               inputProps={{maxLength: 2}}
                               value={drugs[index]['G_k_2_4_IdentificationCountryDrugObtained'].value}/>

                    <TextField label="Authorisation / Application Number" variant="outlined"
                               onChange={handleChange('G_k_3_1_AuthorisationApplicationNumber', index)}
                               inputProps={{maxLength: 35}}
                               value={drugs[index]['G_k_3_1_AuthorisationApplicationNumber'].value}
                               multiline
                               rows={2}/>

                    <TextField label="Country of Authorisation / Application" variant="outlined"
                               onChange={handleChange('G_k_3_2_CountryAuthorisationApplication', index)}
                               inputProps={{maxLength: 2}}
                               value={drugs[index]['G_k_3_2_CountryAuthorisationApplication'].value}/>

                    <TextField label="Name of Holder / Applicant" variant="outlined"
                               onChange={handleChange('G_k_3_3_NameHolderApplicant', index)}
                               inputProps={{maxLength: 60}}
                               value={drugs[index]['G_k_3_3_NameHolderApplicant'].value}
                               multiline
                               rows={3}/>
                </Grid>
                <Grid container item xs direction="column" rowGap={1}>
                    <TextField label="Cumulative Dose to First Reaction" variant="outlined"
                               onChange={handleChange('G_k_5a_CumulativeDoseFirstReactionNum', index)}
                               inputProps={{maxLength: 10}}
                               type="number"
                               onKeyDown={(evt) =>
                                   (evt.key === "-" || evt.key === "+" || evt.key === "e" || evt.key === "," || evt.key === ".") &&
                                   evt.preventDefault()
                               }
                               value={drugs[index]['G_k_5a_CumulativeDoseFirstReactionNum'].value}/>

                    <TextField label="Cumulative Dose to First Reaction (unit)" variant="outlined"
                               onChange={handleChange('G_k_5b_CumulativeDoseFirstReactionUnit', index)}
                               value={drugs[index]['G_k_5b_CumulativeDoseFirstReactionUnit'].value}
                               multiline
                               rows={2}/>

                    <TextField label="Gestation Period at Time of Exposure (number)" variant="outlined"
                               onChange={handleChange('G_k_6a_GestationPeriodExposureNum', index)}
                               inputProps={{maxLength: 3}}
                               type="number"
                               onKeyDown={(evt) =>
                                   (evt.key === "-" || evt.key === "+" || evt.key === "e" || evt.key === "," || evt.key === ".") &&
                                   evt.preventDefault()
                               }
                               value={drugs[index]['G_k_6a_GestationPeriodExposureNum'].value}/>

                    <TextField label="Gestation Period at Time of Exposure (unit)" variant="outlined"
                               onChange={handleChange('G_k_6b_GestationPeriodExposureUnit', index)}
                               value={drugs[index]['G_k_6b_GestationPeriodExposureUnit'].value}
                               multiline
                               rows={2}/>

                    <FormControl>
                        <InputLabel>Action(s) Taken with Drug</InputLabel>
                        <Select
                            defaultValue={0}
                            value={drugs[index]['G_k_8_ActionTakenDrug'].nullFlavor}
                            onChange={setNullFlavor('G_k_8_ActionTakenDrug', index)}
                        >
                            <MenuItem value={1}>1 = Drug withdrawn</MenuItem>
                            <MenuItem value={2}>2 = Dose reduced</MenuItem>
                            <MenuItem value={3}>3 = Dose increased</MenuItem>
                            <MenuItem value={4}>4 = Dose not changed</MenuItem>
                            <MenuItem value={0}>0 = Unknown</MenuItem>
                            <MenuItem value={9}>9 = Not applicable</MenuItem>

                        </Select>
                    </FormControl>

                    <Box className="text-small" style={{padding: 0}}>
                        <FormControlLabel
                            control={<Checkbox
                                checked={drugs[index]['G_k_2_5_InvestigationalProductBlinded'].nullFlavor !== null}
                                onChange={setUnknown('G_k_2_5_InvestigationalProductBlinded', index)}
                                sx={{'& .G_k_2_5_InvestigationalProductBlinded-root': {fontSize: 20}}}
                                style={{padding: 1, marginLeft: 5, marginTop: 2}}
                            />}
                            label="Investigational Product Blinded"/>
                    </Box>
                </Grid>
            </Grid>

            <Stack direction="column" spacing={2} justifyContent="flex-start">
                <TextField label="Additional Information on Drug" variant="outlined"
                           onChange={handleChange('G_k_11_AdditionalInformationDrug', index)}
                           value={drugs[index]['G_k_11_AdditionalInformationDrug'].value}
                           sx={{paddingTop: 2}}
                           multiline
                           inputProps={{maxLength: 2000}}
                           rows={5}/>
            </Stack>


            <Divider sx={{borderBottomWidth: 5, padding: 2}}/>

            <Grid container direction="row" columnGap={2}>
                <Grid container item xs direction="column" rowGap={1}>
                    <FormLabel sx={{fontSize: 30, marginLeft: '20%', color: 'black'}}>Substance Identifier and Strength</FormLabel>
                    <Substances drugIndex={index}></Substances>
                </Grid>
                <Grid container item xs direction="column" rowGap={1}>
                    <FormLabel sx={{fontSize: 30, marginLeft: '25%', color: 'black'}}>Indication for Use in Case</FormLabel>
                    <Indications drugIndex={index}></Indications>
                </Grid>
                <Grid container item xs direction="column" rowGap={1}>
                    <FormLabel sx={{fontSize: 30, marginLeft: '25%', color: 'black'}}>Additional Information on Drug</FormLabel>
                    <AddInfo drugIndex={index}></AddInfo>
                </Grid>
            </Grid>
        </>
    );
};
