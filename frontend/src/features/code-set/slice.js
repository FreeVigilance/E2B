import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@src/api';

export const postCodeSet = createAsyncThunk(
    'codeSet/postCodeSet', ({ codeset, data }) => {
        console.log('getCodeSets');
        return api.postCodeSet(codeset, data);
    });
