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

type TPageKey = 'home' | 'who' | 'skills' | 'projects';
type TProjectType = {
    label: 'Game Dev' | 'Web Dev',
    value: '0' | '1'
};

const DEFAULT_KEY: TPageKey = 'home';
const RECORD_KEYS: TPageKey[] = [
    'home',
    'who',
    'skills',
    'projects'
];


const DEFAULT_PROJECT_TYPE: TProjectType = { label: 'Game Dev', value: '0' };
const PROJECT_TYPES: TProjectType[] = [
    { label: 'Game Dev', value: '0' },
    { label: 'Web Dev', value: '1' }
]

const FORM_FIELDS: IFormConfig = {
    home: ['text'],
    who: ['text'],
    skills: ['name', 'value'],
    projects: ['name', 'link', 'img', 'text', 'type', 'tech'],
};

const Admin = () => {
    const [records, setRecords] = useState<IRecord[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<IRecord>();
    const [selectedKey, setSelectedKey] = useState<TPageKey>(DEFAULT_KEY);
    const [selectedProjectType, setSelectedProjectType] = useState<TProjectType>(DEFAULT_PROJECT_TYPE);

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
        // TODO: Change to auth method
        if (confirm('Are you sure?') && process.env.NODE_ENV === 'development') {
            const response = await deleteRecord(selectedKey, record.id);

            if (isAxiosError(response)) {
                alert('Failed to delete record.')
            } else {
                loadRecords();
            }
        }
    };

    const getRecordsToShow = () => {
        if (selectedKey === 'projects') {
            return records.filter(record => record.values.filter(value => value.name === 'type' ? value.en === selectedProjectType.value : false)[0] ?? false);
        }

        return records;
    }

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
                {
                    selectedKey === 'projects' &&
                    <Autocomplete
                        disablePortal
                        options={PROJECT_TYPES}
                        value={selectedProjectType}
                        onChange={(e, newValue) => setSelectedProjectType(newValue ?? DEFAULT_PROJECT_TYPE)}
                        renderInput={(params) => <TextField color='secondary' {...params} label='Project Type' />}
                        color='secondary'
                        sx={{ mr: 2}}
                    />
                }
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
                    getRecordsToShow().map(record =>
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