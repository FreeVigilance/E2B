import { clientER } from './clients';

export const api = {

    auth: (username: any, password: any) => {
        return clientER.get('', { data: { username, password } });
    },
    save: (data: any) => {
        return clientER.post('/icsr', { data });
    },
    getData: (id: any) => {
        return clientER.get(`/icsr/${id}`);
    },
};
