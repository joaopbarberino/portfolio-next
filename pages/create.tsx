import { createRedisRecord, getAllRecordsByKey } from "@/services/redis";
import { Typography } from "@mui/material";
import { useState, useEffect } from "react";

interface IUser {
    id: string;
    nome: string;
    idade: string;
}

export default function CreateJSON() {
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const [records, setRecords] = useState<IUser[]>([]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const registro = {
            nome,
            idade
        };

        await createRedisRecord('usuario', registro);
        getRecords();
    };

    const getRecords = async () => {
        const newRecords = await getAllRecordsByKey('usuario') as IUser[];
        setRecords(newRecords);
    };

    return (
        <div style={{paddingTop: 80}}>
            <form onSubmit={handleSubmit}>
                <label>
                    Nome:
                    <input type="text" value={nome} onChange={e => setNome(e.target.value)} />
                </label>
                <br />
                <label>
                    Idade:
                    <input type="text" value={idade} onChange={e => setIdade(e.target.value)} />
                </label>
                <br />
                <button type="submit">Criar Registro</button>
            </form>

            <button onClick={getRecords}>Obter Registro</button>

            {
                records.map(record => <Typography key={record.id} >{record.nome}, {record.idade}</Typography>)
            }
        </div>
    );
}
