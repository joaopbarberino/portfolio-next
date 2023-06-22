import { useState, useEffect, useCallback } from 'react';
import { isAxiosError } from 'axios';

import { createRecord, updateRecord } from '@/services/api/record';
import { IRecord, IRecordValue } from '@/services/api/record/types';

import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Typography, TextField, Button, Stack
} from '@mui/material';


interface IEditFormProps {
    open: boolean;
    handleClose: () => void;
    fields: string[];
    recordKey: string;
    record?: IRecord;
};

const EditForm: React.FC<IEditFormProps> = ({ open, handleClose, fields, recordKey, record }) => {
    const [dynamicFields, setDynamicFields] = useState<IRecordValue[]>([]);
    const [order, setOrder] = useState(record?.order ?? 0);

    const initializeForm = useCallback(() => {
        setDynamicFields(
            fields.map(field => {
                const value = record?.values.filter(v => v.name === field)[0];

                let newField: IRecordValue = {
                    name: field,
                    en: value?.en ?? '',
                    ptBr: value?.ptBr ?? ''
                }
                console.log(newField);

                return newField;
            })
        );
        setOrder(record?.order ?? 0);

    }, [fields, record]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newRecord: Omit<IRecord, 'id'> = {
            name: recordKey,
            order: order,
            values: []
        };

        dynamicFields.map((field) => {
            newRecord.values.push(
                {
                    name: field.name,
                    order: field.order,
                    en: field.en,
                    ptBr: field.ptBr
                }
            )
        })

        console.log(newRecord);

        let response;

        // TODO: Change to auth method
        if (process.env.NODE_ENV === 'development') {
            if (record) {
                response = await updateRecord(recordKey, record.id, newRecord)
            } else {
                response = await createRecord(recordKey, newRecord);
            }
        }

        if (isAxiosError(response)) {
            // Fail to update or create record
            alert('Error');
            console.error(response);
        } else {
            initializeForm();
            handleClose();
        }
    };

    useEffect(() => {
        initializeForm();
    }, [fields, record, initializeForm]);

    const handleFormChange = (index: number, language: string, value: string) => {
        const updatedFormFields = [...dynamicFields];
        updatedFormFields[index][language] = value;
        setDynamicFields(updatedFormFields);
    };

    return (
        <Dialog onClose={handleClose} open={open} disableScrollLock fullWidth>
            <DialogTitle justifyContent={'space-between'} display={'flex'}>
                {record ? 'Edit Record' : 'Create Record'}
            </DialogTitle>

            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Stack spacing={2}>
                        <Typography>Key: {recordKey}</Typography>
                        {
                            record &&
                            <Typography>Record Id: {record.id}</Typography>
                        }
                    </Stack>

                    <Stack spacing={3}>
                        {
                            dynamicFields.map((input, index) => {
                                console.log(input);
                                return (
                                    <Stack key={index} spacing={2}>
                                        <Typography>Field: {input.name}</Typography>
                                        <TextField
                                            multiline
                                            type='text'
                                            label='EN'
                                            color='secondary'
                                            required
                                            name={`${input.name}-en`}
                                            value={input.en}
                                            onChange={(e) => handleFormChange(index, 'en', e.target.value)}
                                        />
                                        <TextField
                                            multiline
                                            type='text'
                                            label='PTBR'
                                            color='secondary'
                                            required
                                            name={`${input.name}-ptBr`}
                                            value={input.ptBr}
                                            onChange={(e) => handleFormChange(index, 'ptBr', e.target.value)}
                                        />
                                    </Stack>
                                );
                            })
                        }

                        <TextField
                            multiline
                            type='number'
                            label='ORDER'
                            color='secondary'
                            required
                            name={`order`}
                            value={order}
                            onChange={(e) => setOrder(parseInt(e.target.value))}
                        />
                    </Stack>

                </DialogContent>

                <DialogActions sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
                    <Button type='submit' variant='contained' color='success'>{record ? 'Save' : 'Create'}</Button>
                    <Button variant='contained' color='error' onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default EditForm;