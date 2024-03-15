import { clientER } from './clients';

export const api = {

    auth: (username: any, password: any) => {
        return clientER.get('', { data: { username, password } });
    },
    save: (id: any, data: any) => {
        return clientER.put(`/icsr/${id}`, { data });
    },
    getData: (id: any) => {
        return clientER.get(`/icsr/${id}`);
    },
};
