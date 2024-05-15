import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch, Provider } from 'react-redux';
import { authSelector } from './features/auth/slice';
import { Box, IconButton, Menu, Stack } from '@mui/material';
import { AuthComponent } from './components/auth/auth-component';
import Toolbar from '@mui/material/Toolbar/Toolbar';
import AppBar from '@mui/material/AppBar/AppBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CasesList } from './components/cases-list/list';
import { SideMenu } from './components/menu/side-menu';
import { displaySelector } from './features/display/slice';
import { FormTabs } from './components/form-tabs';
import { SnackbarProvider } from 'notistack';
import { store } from './store/store';
import { UploadXml } from './components/menu/upload-xml';
import { useSnackbar } from 'notistack';
import CloseIcon from '@mui/icons-material/Close';
import { getCasesList } from './features/cases-list/slice';
import { CodeSet } from '@src/components/code-set/code-set';

const SnackbarCloseButton = ({ snackbarKey }) => {
    const { closeSnackbar } = useSnackbar();

    return (
        <IconButton onClick={() => closeSnackbar(snackbarKey)}>
            <CloseIcon sx={{ color: 'white' }} />
        </IconButton>
    );
};

export const App = () => {
    const dispatch = useDispatch();
    const { isAuth } = useSelector(authSelector);
    const { showCasesList, openNewReport, showUpload, showUploadCodeSet } =
        useSelector(displaySelector);


    useEffect(() => {
        dispatch(getCasesList());
    }, []);

    const checkAuth = () => {
        return isAuth;
    };

    if (!checkAuth()) {
        return (
            <Box>
                <AuthComponent />
            </Box>
        );
    } else {
        return (
            <Provider store={store}>
                <SnackbarProvider
                    autoHideDuration={3000}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    action={(snackbarKey) => (
                        <SnackbarCloseButton snackbarKey={snackbarKey} />
                    )}
                >
                    <SideMenu></SideMenu>
                    {showCasesList ? <CasesList></CasesList> : null}
                    {openNewReport ? <FormTabs></FormTabs> : null}
                    {showUploadCodeSet ? <CodeSet></CodeSet> : null}
                </SnackbarProvider>
            </Provider>
        );
    }
};
