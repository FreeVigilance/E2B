import { clientER } from './clients';

export const api = {

    auth: (username: any, password: any) => {
        return clientER.get('', { data: { username: username, password: password } });
    },
    saveData: (data: any) => {
        return clientER.post('/icsr', { data: data });
    },
    getData: (id: any) => {
        return clientER.get(`/icsr/${id}`);
    },
    getCasesList: () => {
        console.log('getCasesList api')
        return clientER.get('/icsr');
    }
};
