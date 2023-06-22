import { Redis } from '@upstash/redis';
import { v4 as getGuid } from 'uuid';
import { IRecord } from '../api/record/types';

export const connectRedis = () => {
    return new Redis({
        url: process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_URL as string,
        token: process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_TOKEN as string
    });
};

// CREATE
export const redisCreateRecord = async (key: string, record: Omit<IRecord, 'id'>) => {
    const redis = connectRedis();
    const recordId = getGuid();

    const recordJSON = JSON.stringify(record);

    const response = await redis.hsetnx(key, recordId, recordJSON)
        .then((response) => {
            if (response === 1) {
                console.log('Record created successfully', response);
                return {
                    ...record,
                    id: recordId
                };
            } else {
                console.error('Failed to create record, Id already exists', response);
            }
        })
        .catch((e) => {
            console.error('Failed to create record', e)
            return e;
        });

    return response;
};

// READ
export const redisGetAllRecords = async (key: string) => {
    const redis = connectRedis();

    const records = await redis.hgetall(key)
        .catch((e) => console.error(`Failed to retrieve record from key: ${key}`, e));


    if (!records) return [];

    const recordsArray: IRecord[] = Object.entries(records).map(
        ([recordId, recordJSON]) => ({ 
            ...recordJSON as IRecord,
            id: recordId
        })
    );

    return recordsArray;
};

export const redisGetRecordById = async (key: string, id: string) => {
    const redis = connectRedis();

    const record = await redis.hget<IRecord>(key, id)
        .catch((e) => console.error(`Failed to retrieve record: ${id} from key: ${key}`));

    if (!record) return undefined;

    return record;
};

// UPDATE
export const redisUpdateRecord = async (key: string, id: string, record: Omit<IRecord, 'id'>) => {
    const redis = connectRedis();
    const recordJSON = JSON.stringify(record);

    const response = await redis.hset(key, { [id]: recordJSON })
        .then((response) => {
            console.log(`Record updated successfully, response: ${response}`);
            return {
                ...record,
                id
            };
        })
        .catch((e) => {
            console.error('Failed to create record', e)
            return e;
        });

    return response;
};

// DESTROY
export const redisDeleteRecord = async (key: string, id: string) => {
    const redis = connectRedis();

    return await redis.hdel(key, id, 'id')
        .then(response => {
            console.log(response);
            if (response === 0) {
                console.error(`Failed to delete, key: ${key} not found`);
                return 0;
            } else {
                console.log('Record deleted');
                return 1;
            }
        })
        .catch((e) => {
            console.error('Failed to delete record', e)
            return e;
        });;
};
