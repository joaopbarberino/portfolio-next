import { Redis } from '@upstash/redis';
import { v4 as getGuid } from 'uuid';

export const connectRedis = () => {
    return new Redis({
        url: process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_URL as string,
        token: process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_TOKEN as string
    });
};

export const createRedisRecord = async (key: string, record: Record<string, any>) => {
    const redis = connectRedis();
    const recordId = getGuid();

    const recordJSON = JSON.stringify(record);
    
    await redis.hsetnx(key, recordId, recordJSON)
        .then(() => console.log('Record created successfully', record))
        .catch((e) => console.error('Failed to create record', e));
};

export const getAllRecordsByKey = async (key: string) => {
    const redis = connectRedis();

    const registros = await redis.hgetall(key).catch((e) => console.error(`Failed to retrieve record from key: ${key}`, e));

    if (!registros) return [];

    const registrosArray: Array<{ id: string;[key: string]: any }> = Object.entries(registros).map(
        ([registroId, registroJSON]) => ({ id: registroId, ...registroJSON as Object })
    );

    return registrosArray;
};