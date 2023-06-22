export interface IRecord1 {
    id: string;
    values: IRecordValue[];
};

interface IRecordValue1 {
    name: string,
    order: number,
    en: string,
    ptBr: string,
    [key: string]: string | number;
}

export interface IRecord {
    id: string;
    name?: string;
    order?: number;
    values: IRecordValue[];
};

export interface IRecordValue {
    name: string;
    en: string;
    ptBr: string
    [key: string]: string;
}