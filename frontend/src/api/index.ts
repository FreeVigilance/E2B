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
        return clientER.get(`/codeset/country/search?q=${data}`);
    },
    getLanguageCodes: (data: any) => {
        return clientER.get(`/codeset/language/search?q=${data}`);
    },
    getUCUMCodes: (data: any) => {
        return clientER.get(`/codeset/ucum/search?q=${data}`);
    },
    getDoseCodes: (data: any) => {
        return clientER.get(`/codeset/ucum/search?q=${data}&property=strength_dose`);
    },
    getStrengthCodes: (data: any) => {
        return clientER.get(`/codeset/ucum/search?q=${data}&property=strength_dose`);
    },
    getRouteOfAdministrationCodes: (data: any) => {
        return clientER.get(`/codeset/roa/search?q=${data}`);
    },
    getDosageFormCodes: (data: any) => {
        return clientER.get(`/codeset/df/search?q=${data}`);
    },
    postCodeSet: (codeset: any, data: any) => {
        return clientER.post(`/codeset/${codeset}`, { data: data });
    },
};
