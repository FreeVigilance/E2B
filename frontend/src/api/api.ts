/* eslint-disable consistent-return */
import cookie from 'react-cookies';
import { METHOD, API_BASE_PATH, MESSAGES, AUTH_URL } from './api.consts';

type HeadersType = {
    [key: string]: string;
};

type OptionsType = {
    method: METHOD;
    data?: any;
    headers?: HeadersType;
    responseFormat?: 'json' | 'text';
};

type OptionsWithoutMethodType = Omit<OptionsType, 'method'>;

export interface ResponseProps<T> extends Omit<XMLHttpRequest, 'response'> {
    response: T;
}

export function queryStringify<T extends object>(data: T): string {
    if (!data) return '';

    const queryArr = Object.entries(data).map(
        ([key, value]) => `${key}=${value}`,
    );

    return `?${queryArr.join('&')}`;
}

export class HTTP {
    _path: string = API_BASE_PATH;
    _authPath: string = AUTH_URL;

    constructor(path = '') {
        this._path += path;
    }

    get<T>(url: string, options: OptionsWithoutMethodType = {}): Promise<T> {
        return this.request<T>(url, { ...options, method: METHOD.GET });
    }

    post<T>(url: string, options: OptionsWithoutMethodType = {}): Promise<T> {
        return this.request<T>(url, { ...options, method: METHOD.POST });
    }

    put<T>(url: string, options: OptionsWithoutMethodType = {}): Promise<T> {
        return this.request<T>(url, { ...options, method: METHOD.PUT });
    }

    getXml<T>(url: string, options: OptionsWithoutMethodType = {}): Promise<T> {
        return this.requestXml<T>(url, { ...options, method: METHOD.POST });
    }

    getJson<T>(url: string, options: OptionsWithoutMethodType = {}): Promise<T> {
        return this.requestJson<T>(url, { ...options, method: METHOD.POST });
    }


    delete<T>(
        url: string,
        options: OptionsWithoutMethodType = {},
    ): Promise<T> {
        return this.request<T>(url, { ...options, method: METHOD.DELETE });
    }

    request<T>(
        url: string,
        options: OptionsType = { method: METHOD.GET },
    ): Promise<T> {
        function serializeBody(method: METHOD, data: T): string | undefined | FormData {
            if (method === METHOD.GET) {
                return;
            }
            if (data instanceof FormData) {
                return data;
            }
            return JSON.stringify(data);
        }

        function serializeHeader(method: METHOD, data: T) {
            const username = cookie.load('username');
            const password = cookie.load('password');

            const header = { authorization: `Basic ${btoa(username+':'+password)}` };

            // if (method === METHOD.GET || method === METHOD.DELETE) {
            //     return header;
            // }
            if (data instanceof FormData) {
                return header;
            }  
            return { ...header, "Content-Type": "application/json" };
        }

        const { method, data, responseFormat = 'json' } = options;

        const defaultReject = (response: Response | TypeError | any) => {
            if (response.status === 401) {
                console.log('AAA');
                console.log({
                    type: 'error',
                    msg: MESSAGES.FAIL_AUTH,
                });
                return Promise.reject(response);
            }

            if (!response?.code) {
                console.log({
                    type: 'error',
                    msg: MESSAGES.FAIL_MESSAGE_DEFAULT,
                });
            }

            return Promise.reject(response);
        };

        const responceWrapper = (response: any) => {
            if (response.code === 401) {
                console.log({
                    type: 'error',
                    msg: response.msg,
                });
                return Promise.reject(response);
            }

            if (response.code && response.code !== 200) {
                // eslint-disable-next-line max-len
                console.log({
                    type: 'warning',
                    msg: response.msg,
                });
                return Promise.reject(response);
            }

            if (response?.result) {
                return Promise.resolve(response.result);
            }

            return Promise.resolve(response);
        };

        const basePath = `${this._path}${url}`;
        const path = method === METHOD.GET
            ? `${basePath}${queryStringify(data)}`
            : basePath;

        return fetch(path, {
            method,
            body: serializeBody(method, data),
            headers: serializeHeader(method, data),
        })
            .then((response) => {
                console.log(response);
                // if (!response.ok) {
                //     return Promise.reject(response);
                // }

                return response[responseFormat]();
            })
            .then((resData) => responceWrapper(resData))
            .catch(defaultReject);
    }

    requestXml<T>(
        url: string,
        options: OptionsType = { method: METHOD.GET },
    ): Promise<T> {
        function serializeBody(method: METHOD, data: T): string | undefined | FormData {
            if (data instanceof FormData) {
                return data;
            }
            console.log('body');
            return JSON.stringify(data);
        }

        function serializeHeader(method: METHOD, data: T) {
            const username = cookie.load('username');
            const password = cookie.load('password');

            const header = { authorization: `Basic ${btoa(username+':'+password)}` };

            return { ...header, 'Content-Type': 'application/json' };
        }

        const { method, data, responseFormat = 'text' } = options;

        const defaultReject = (response: Response | TypeError | any) => {
            if (response.status === 401) {
                console.log({
                    type: 'error',
                    msg: MESSAGES.FAIL_AUTH,
                });
                return Promise.reject(response);
            }

            if (!response?.code) {
                console.log({
                    type: 'error',
                    msg: MESSAGES.FAIL_MESSAGE_DEFAULT,
                });
            }

            return Promise.reject(response);
        };

        const responceWrapper = (response: any) => {
            console.log(response);
            if (response.code === 401) {
                console.log({
                    type: 'error',
                    msg: response.msg,
                });
                return Promise.reject(response);
            }

            if (response.code && response.code !== 200) {
                // eslint-disable-next-line max-len
                console.log({
                    type: 'warning',
                    msg: response.msg,
                });
                return Promise.reject(response);
            }

            if (response?.result) {
                return Promise.resolve(response.result);
            }

            return Promise.resolve(response);
        };

        const basePath = `${this._path}${url}`;
        const path = basePath;

        console.log(path);
        console.log(fetch(path, {
            method,
            body: serializeBody(method, data),
            headers: serializeHeader(method, data),
        }));

        return fetch(path, {
            method,
            body: serializeBody(method, data),
            headers: serializeHeader(method, data),
        })
            .then((response) => {
                console.log(response);
                if (!response.ok) {
                    return Promise.reject(response);
                }

                return response[responseFormat]();
            })
            .then((resData) => responceWrapper(resData))
            .catch(defaultReject);
    }

    requestJson<T>(
        url: string,
        options: OptionsType = { method: METHOD.GET },
    ): Promise<T> {
        function serializeBody(method: METHOD, data: T): string | undefined | FormData {
            if (method === METHOD.GET) {
                return;
            }
            if (data instanceof FormData) {
                return data;
            }
            return JSON.stringify(data);
        }

        function serializeHeader(method: METHOD, data: T) {
            const username = cookie.load('username');
            const password = cookie.load('password');

            const header = { authorization: `Basic ${btoa(username+':'+password)}` };

            return { ...header, 'Content-Type': 'application/json' };
        }

        const { method, data, responseFormat = 'json' } = options;

        const defaultReject = (response: Response | TypeError | any) => {
            if (response.status === 401) {
                console.log({
                    type: 'error',
                    msg: MESSAGES.FAIL_AUTH,
                });
                return Promise.reject(response);
            }

            if (!response?.code) {
                console.log({
                    type: 'error',
                    msg: MESSAGES.FAIL_MESSAGE_DEFAULT,
                });
            }

            return Promise.reject(response);
        };

        const responceWrapper = (response: any) => {
            if (response.code === 401) {
                console.log({
                    type: 'error',
                    msg: response.msg,
                });
                return Promise.reject(response);
            }

            if (response.code && response.code !== 200) {
                // eslint-disable-next-line max-len
                console.log({
                    type: 'warning',
                    msg: response.msg,
                });
                return Promise.reject(response);
            }

            if (response?.result) {
                return Promise.resolve(response.result);
            }

            return Promise.resolve(response);
        };

        const basePath = `${this._path}${url}`;
        const path = method === METHOD.GET
            ? `${basePath}${queryStringify(data)}`
            : basePath;

        return fetch(path, {
            method,
            body: serializeBody(method, data),
            headers: serializeHeader(method, data),
        })
            .then((response) => {
                console.log(response);
                if (!response.ok) {
                    return Promise.reject(response);
                }

                return response[responseFormat]();
            })
            .then((resData) => responceWrapper(resData))
            .catch(defaultReject);
    }
}
