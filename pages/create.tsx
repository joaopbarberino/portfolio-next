import { createRecord, deleteRecord, getAllRecords, getRecordById, updateRecord } from '@/services/api/record';
import { IRecord } from '@/services/api/record/types';
import { redisUpdateRecord } from '@/services/redis/';
import { Typography } from '@mui/material';
import { isAxiosError } from 'axios';
import { useState, useEffect } from 'react';

export default function CreateJSON() {
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const [records, setRecords] = useState<IRecord[]>([]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const registro = {
            nome,
            idade
        };

        const response = await createRecord('usuario', registro);
        console.log(response);
        getRecords();
    };

    const getRecords = async () => {
        const response = await getAllRecords('usuario');

        if (isAxiosError(response)) {
            // Fail to get records
        } else {
            console.log(response);
            setRecords(response);
        }
    };

    const deleteUser = async (id: string) => {
        const response = await deleteRecord('usuario', id);

        if (isAxiosError(response)) {
            // Fail to delete record
        } else {
            getRecords();
        }
    };

    const updateUser = async (id: string) => {
        const response = await updateRecord('usuario', id, {
            nome,
            idade,
        });

        if (isAxiosError(response)) {
            // Fail to update record
        } else {
            getRecords();
        }
    };

    return (
        <div style={{ paddingTop: 80 }}>
            <form onSubmit={handleSubmit}>
                <label style={{ color: 'white'}}>
                    Nome:
                    <input type='text' value={nome} onChange={e => setNome(e.target.value)} />
                </label>
                <br />
                <label style={{ color: 'white'}}>
                    Idade:
                    <input type='text' value={idade} onChange={e => setIdade(e.target.value)} />
                </label>
                <br />
                <button type='submit'>Criar Registro</button>
            </form>

            <button onClick={getRecords}>Obter Registros</button>

            {
                records &&
                records.map(record =>
                    <Typography key={record.id}>
                        {record.nome}, {record.idade}
                        <button onClick={() => deleteUser(record.id)}>
                            Delete
                        </button>
                        <button onClick={() => updateUser(record.id)}>
                            Update
                        </button>
                    </Typography>
                )
            }
        </div>
    );
}
