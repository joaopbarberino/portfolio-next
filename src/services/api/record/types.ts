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