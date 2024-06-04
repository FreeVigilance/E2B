import { clientER } from './clients';

export const api = {
    auth: (username: any, password: any) => {
        return clientER.get('/icsr');
    },
    saveData: (data: any) => {
        return clientER.post('/icsr', { data: data });
    },
    changeData: (data: any) => {
        return clientER.put(`/icsr/${data['id']}`, { data: data });
    },
    getData: (id: any) => {
        return clientER.get(`/icsr/${id}`);
    },
    getCasesList: () => {
        console.log('getCasesList api');
        return clientER.get('/icsr');
    },
    deleteReport: (id: any) => {
        return clientER.delete(`/icsr/${id}`);
    },
    getXmlFromJson: (data: any) => {
        console.log(data);
        return clientER.getXml('/icsr/to-xml', { data: data });
    },
    getJsonFromXml: (data: any) => {
        console.log(data);
        return clientER.getJson('/icsr/from-xml', { data: data });
    },
    validateData: (data: any) => {
        return clientER.post('/icsr/validate', { data: data });
    },
    getTerms: (id: any, data: any) => {
        console.log(id);
        console.log(data);
        return clientER.post(`/meddra/release/${id}/search `, { data: data });
    },
    getReleases: () => {
        return clientER.get(`/meddra/release`);
    },
    // {
    //     "state": {"SOC": 10036585, "HLT": 10000232},
    //     "search": {
    //         "level": "PT",
    //         "input": "abortion"
    //     }
    // }
    getCountryCodes: (data: any) => {
        return clientER.get(`/codeset/country?q=${data}`);
    },
    getLanguageCodes: (data: any) => {
        return clientER.get(`/codeset/language?q=${data}`);
    },
    getUCUMCodes: (data: any) => {
        return clientER.get(`/codeset/ucum?q=${data}`);
    },
    getDoseCodes: (data: any) => {
        return clientER.get(`/codeset/ucum?q=${data}&property=dose`);
    },
    getStrengthCodes: (data: any) => {
        return clientER.get(`/codeset/ucum?q=${data}&property=dose`);
    },
    getRouteOfAdministrationCodes: (data: any) => {
        return clientER.get(`/codeset/roa?q=${data}`);
    },
    getDosageFormCodes: (data: any) => {
        return clientER.get(`/codeset/df?q=${data}`);
    },
    getSubstanceCodes: (data: any) => {
        return clientER.get(`/codeset/sub?q=${data}`);
    },
    postCodeSet: (codeset: any, data: any) => {
        return clientER.post(`/codeset/${codeset}`, { data: data });
    },
};
