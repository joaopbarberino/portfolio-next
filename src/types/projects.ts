import { IRecordValue } from '@/services/api/record/types';

export interface IProject {
    id: string;
    name: IRecordValue;
    link: IRecordValue;
    img: IRecordValue;
    text: IRecordValue;
    type: IRecordValue;
    tech: IRecordValue;
};
