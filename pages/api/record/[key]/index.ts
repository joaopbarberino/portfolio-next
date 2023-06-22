import { IRecord } from '@/services/api/record/types';
import { redisCreateRecord } from '@/services/redis/';
import { redisGetAllRecords } from '@/services/redis/';
import { NextApiRequest, NextApiResponse } from 'next';

interface ICustomRequest extends NextApiRequest {
    query: {
        key: string,
    },
    body: Omit<IRecord, 'id'>
};

// Return all records by given key
const returnAllRecords = async (key: string, res: NextApiResponse<IRecord[] | { error: string }>) => {
    const records = await redisGetAllRecords(key);

    const sortedRecods = records.sort((a, b) => {
        if (a.order !== undefined && b.order !== undefined) 
            return a.order - b.order;
        return 0;
    });

    return res.status(200).json(sortedRecods);
}

// Create record on given key
const createRecord = async (key: string, params: Omit<IRecord, 'id'>, res: NextApiResponse<IRecord | { error: string }>) => {
    const record = await redisCreateRecord(key, params);

    if (!record) {
        return res.status(500).json({ error: 'Failed to create record.' });
    };

    return res.status(200).json(record);
}

export default function handler(req: ICustomRequest, res: NextApiResponse<IRecord[] | IRecord | { error: string }>) {
    const { key } = req.query;
    console.log(req.body)

    if (!key) {
        return res.status(400).json({ error: 'Key not received' });
    };

    console.log(req.method);

    switch (req.method) {
        case 'GET':
            console.log('GETTING ALL');
            return returnAllRecords(key, res);

        case 'POST':
            console.log('CREATING');
            return createRecord(key, req.body, res);
    };
};