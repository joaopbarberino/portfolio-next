import axios, { AxiosError } from 'axios';
import { IRecord } from './types';
import qs from 'qs';

const recordApi = axios.create({
    baseURL: '/api/record',
    paramsSerializer: {
        serialize: params => qs.stringify(params, { arrayFormat: 'indices' })
    }
});

// CREATE
export const createRecord = (key: string, params: Omit<IRecord, 'id'>) =>
    recordApi
        .post<IRecord>(`/${key}`, params)
        .then(response => response.data)
        .catch((e: AxiosError) => {
            console.error(e);
            return e;
        });

// READ
export const getAllRecords = (key: string) =>
    recordApi
        .get<IRecord[]>(`/${key}`)
        .then(response => response.data)
        .catch((e: AxiosError) => {
            console.error(e);
            return e;
        });

export const getRecordById = (key: string, id: string) =>
    recordApi
        .get<IRecord>(`/${key}/${id}`)
        .then(response => response.data)
        .catch((e: AxiosError) => {
            console.error(e);
            return e;
        });

// UPDATE
export const updateRecord = (key: string, id: string, params: Omit<IRecord, 'id'>) =>
    recordApi
        .put<IRecord>(`/${key}/${id}`, params)
        .then(response => response.data)
        .catch((e: AxiosError) => {
            console.error(e);
            return e;
        });

// DESTROY
export const deleteRecord = (key: string, id: string) =>
    recordApi
        .delete(`/${key}/${id}`)
        .then(response => response.data)
        .catch((e: AxiosError) => {
            console.error(e);
            return e;
        });