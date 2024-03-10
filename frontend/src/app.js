import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authSelector } from './features/auth/slice';
import { Box, Menu, Stack } from '@mui/material';
import { AuthComponent } from './components/auth/auth-component';
import Toolbar from '@mui/material/Toolbar/Toolbar';
import AppBar from '@mui/material/AppBar/AppBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CasesList } from './components/cases-list/list';
import { SideMenu } from './components/menu/side-menu';
import { displaySelector } from './features/display/slice';
import { FormTabs } from './components/form/form-tabs';

export const App = () => {
    const dispatch = useDispatch();
    const { isAuth, token } = useSelector(authSelector);
    const { showCasesList, openNewReport } = useSelector(displaySelector);

    const checkAuth = () => {
        return isAuth && token.length > 0;
    };

    if (!checkAuth()) {
        return (
            <Box>
                <AuthComponent/>
            </Box>
        );
    } else {
        return (
            <Stack direction="row" spacing={1} justifyContent="flex-start">
                <SideMenu></SideMenu>
                {showCasesList ? <CasesList></CasesList> : null}
                {openNewReport ? <FormTabs></FormTabs> : null}
            </Stack>
        );
    }
};
