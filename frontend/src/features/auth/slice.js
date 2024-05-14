import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api';
import cookie from "react-cookies";


export const postAuth = createAsyncThunk(
    '',
    (params) => {
        return "token_test";
    },
);

export const authSelector = (state) => state.auth;

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,
        token: null,
        username: "",
        password: "",
        show: false,
        loading: true,
    },
    reducers: {
        setIsAuth: (state, action) => { state.isAuth = action.payload },
        setToken: (state, action) => { state.token = action.payload },
        setUserName: (state, action) => { state.username = action.payload; 
            cookie.save("username", action.payload);},
        setPassword: (state, action) => { state.password = action.payload;
            cookie.save("password", action.payload); },
        setShow: (state, action) => { state.show = action.payload },
        setLoading: (state, action) => { state.loading = action.payload },
        getIsAuth: (state) => { return state.isAuth },
    },
    extraReducers: (builder) => {
        builder.addCase(postAuth.fulfilled, (state, action) => {
            state.token = action.payload;
            state.isAuth = true;
            state.show = false;
            state.loading = false;             
        });
        builder.addCase(postAuth.rejected, (state, action) => {
            state.isAuth = false;
            state.show = true;
            state.loading = false;   
            state.token = '';          
        });
    },
})


export default authSlice.reducer;
export const {
    setIsAuth,
    setToken,
    setUserName,
    setPassword,
    setShow,
    setLoading,
    getIsAuth,
} = authSlice.actions;
