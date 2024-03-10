import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './app';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
    <React.StrictMode>          
        <Provider store={store}>
            <SnackbarProvider autoHideDuration={3000} anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'}}>
                    <App/>
            </SnackbarProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);