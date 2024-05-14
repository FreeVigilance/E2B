import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Fade from '@mui/material/Fade';
import { useSnackbar } from 'notistack';
import { setPassword, authSelector, setShow, setLoading, postAuth } from '../../features/auth/slice';
import { setUserName, setToken } from "../../features/auth/slice";

export const AuthComponent = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const {username, password, token, remember, show, loading} = useSelector(authSelector);
    useEffect(() => {
        dispatch(setShow(true));
        dispatch(setLoading(false));
        dispatch(setUserName((localStorage.getItem("auth_remember") ?? false) === true ? (localStorage.getItem("auth_username") ?? "") : ""));
        dispatch(setPassword((localStorage.getItem("auth_remember") ?? false) === true ? (localStorage.getItem("auth_password") ?? "") : ""));
    }, []);

    useEffect(() => {
        if (token !== null && token.length <= 0) {
            enqueueSnackbar(`Неудачная попытка входа. Проверьте введенные данные.`,{ variant: 'error' });
            dispatch(setToken(null));
        }
    }, [token]);

    const TcpAuth = async () => {
        if (username === "" || password === "") {
            enqueueSnackbar(`Сначала введите данные для авторизации.`,{ variant: 'error' });
            return;
        }
        dispatch(setLoading(true));
        try {
            dispatch(postAuth({username: username, password: password}));
        } catch (e) {
            enqueueSnackbar(`Произошла ошибка при авторизации. Попробуйте позже. ${e}`,{ variant: 'error' });
        }
        dispatch(setLoading(false));
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        TcpAuth();
    };

    return (
        <Fade in={show}>
            <Box id="auth-container" sx={{ display: 'flex' }}>
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" sx={{textAlign: "center"}}>
                            Войти
                        </Typography>
                        <Box component="form" 
                        onSubmit={handleSubmit} 
                        noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="auth-username"
                                label="Логин"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                disabled={loading}
                                value={username}
                                onChange={(e) => dispatch(setUserName(e.currentTarget.value))}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Пароль"
                                type="password"
                                id="auth-password"
                                autoComplete="current-password"
                                disabled={loading}
                                value={password}
                                onChange={(e) => dispatch(setPassword(e.currentTarget.value))}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={loading}
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Войти
                            </Button>
                            {loading ?
                                <Box sx={{ display: 'flex', justifyContent: "center" }}>
                                    <CircularProgress />
                                </Box>
                                : ""
                            }
                        </Box>
                    </Box>
                </Container>
            </Box>
        </Fade>
    );
}