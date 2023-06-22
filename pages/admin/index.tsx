import { useState, useEffect, useCallback } from 'react';
import { isAxiosError } from 'axios';

import { deleteRecord, getAllRecords } from '@/services/api/record';
import { IRecord } from '@/services/api/record/types';

import { Typography, Stack, Card, CardContent, CardActions, Button, Autocomplete, Select, MenuItem, TextField } from '@mui/material';
import { StyledAdminContainer } from '@/styles/admin';
import EditForm from '@/components/Admin/EditForm';

interface IFormConfig {
    [key: string]: string[];
};

const DEFAULT_KEY = 'home';
const RECORD_KEYS = [
    'home',
    'who',
    'skills',
    'projects'
];

const FORM_FIELDS: IFormConfig = {
    home: ['text'],
    who: ['text'],
    skills: ['name', 'value'],
    projects: ['name', 'img', 'text', 'tech', 'type'],
};

const Admin = () => {
    const [records, setRecords] = useState<IRecord[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<IRecord>();
    const [selectedKey, setSelectedKey] = useState(DEFAULT_KEY);

    const loadRecords = useCallback(async () => {
        const response = await getAllRecords(selectedKey);

        if (isAxiosError(response)) {
            // Fail to get records
        } else {
            console.log(response);
            setRecords(response);
        }
    }, [selectedKey]);

    const handleDialogClose = () => {
        setDialogOpen(false);
        loadRecords();
    };

    const handleSelectRecord = (record?: IRecord) => {
        setSelectedRecord(record);
        setDialogOpen(true);
    };

    const handleDeleteRecord = async (record: IRecord) => {
        if (confirm('Are you sure?')) {
            const response = await deleteRecord(selectedKey, record.id);

            if (isAxiosError(response)) {
                alert('Failed to delete record.')
            } else {
                loadRecords();
            }
        }
    };

    useEffect(() => {
        loadRecords();
    }, [selectedKey, loadRecords]);

    return (
        <StyledAdminContainer maxWidth='xl'>
            <EditForm
                open={dialogOpen}
                handleClose={handleDialogClose}
                recordKey={selectedKey}
                record={selectedRecord}
                fields={FORM_FIELDS[selectedKey]}
            />

            <Stack spacing={2} direction={'row'} className='title'>
                <Typography variant='h2'>{selectedKey.toUpperCase()}</Typography>
                <Button
                    variant='contained'
                    color='success'
                    onClick={() => handleSelectRecord(undefined)}
                >
                    Create
                </Button>
            </Stack>

            <Stack direction={'row'} className='select'>
                <Autocomplete
                    disablePortal
                    options={RECORD_KEYS}
                    value={selectedKey}
                    onChange={(e, newValue) => setSelectedKey(newValue ?? DEFAULT_KEY)}
                    renderInput={(params) => <TextField color='secondary' {...params} label='Page' />}
                    color='secondary'
                />
            </Stack>

            <Stack spacing={2}>
                {
                    records.map(record =>
                        <Card key={record.id} className='record-card'>
                            <CardContent>
                                <Stack>
                                    <Typography>Id: {record.id}</Typography>
                                    <Typography>Order: {record.order}</Typography>
                                </Stack>
                                {
                                    record.values.map(value =>
                                        <Stack key={`${record.id}-${value.name}`} sx={{ mt: 2 }}>
                                            <Typography>Field: {value.name.toUpperCase()}</Typography>
                                            <Typography>EN: {value.en}</Typography>
                                            <Typography>PTBR: {value.ptBr}</Typography>
                                        </Stack>
                                    )
                                }
                            </CardContent>
                            <CardActions>
                                <Button
                                    variant='contained'
                                    color='info'
                                    onClick={() => handleSelectRecord(record)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant='contained'
                                    color='error'
                                    onClick={() => handleDeleteRecord(record)}
                                >
                                    Delete
                                </Button>
                            </CardActions>
                        </Card>
                    )
                }
            </Stack>

        </StyledAdminContainer>
    );
};

export default Admin;