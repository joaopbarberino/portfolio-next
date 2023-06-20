import { IRecord } from '@/services/api/record/types';
import { redisDeleteRecord, redisUpdateRecord } from '@/services/redis/';
import { redisGetRecordById } from '@/services/redis/';
import { NextApiRequest, NextApiResponse } from 'next';

interface ICustomRequest extends NextApiRequest {
    query: {
        key: string,
        id: string
    },
    body: Omit<IRecord, 'id'>
};

// Return single record by given key and id
const getRecord = async (key: string, id: string, res: NextApiResponse<IRecord | { error: string }>) => {
    const record = await redisGetRecordById(key, id);

    if (!record) {
        return res.status(400).json({ error: 'Record not found' });
    };

    return res.status(200).json(record);
};

// Update single record by give id
const updateRecord = async (key: string, id: string, params: Omit<IRecord, 'id'>, res: NextApiResponse<IRecord | { error: string }>) => {
    const record = await redisUpdateRecord(key, id, params);
    
    if (!record) {
        return res.status(500).json({ error: 'Failed to update record.' });
    };

    return res.status(200).json(record);
};

// Delete single record by given id
const deleteRecord = async (key: string, id: string, res: NextApiResponse<IRecord | { error: string } | { message: string }>) => {
    const response = await redisDeleteRecord(key, id);

    if (response === 1) {
        return res.status(200).json({ message: 'Success' });
    } else {
        return res.status(500).json({ error: 'Failed to delete record' });
    }
};

export default function handler(req: ICustomRequest, res: NextApiResponse<IRecord | { error: string } | { message: string }>) {
    const { key, id } = req.query;

    if (!key) {
        return res.status(400).json({ error: 'Key not received' });
    };

    if (!id) {
        return res.status(400).json({ error: 'Id not received' });
    };

    switch (req.method) {
        case 'GET':
            console.log('GETTING SINGLE');
            return getRecord(key, id, res);

        case 'PUT':
            console.log('UPDATING SINGLE');
            const { body } = req;

            if (body) {
                return updateRecord(key, id, body, res);
            }
            return res.status(400).json({ error: 'Body not received or empty' });

        case 'DELETE':
            console.log('DELETTING SINGLE');
            return deleteRecord(key, id, res);
    };
};