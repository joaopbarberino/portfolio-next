import React, { useContext, useState, useEffect } from 'react';
import { isAxiosError } from 'axios';

import data from '@/helpers/data.json';
import AppContext from '@/services/AppContext';
import { getAllRecords } from '@/services/api/record';
import { IRecord } from '@/services/api/record/types';

import { Typography, CircularProgress } from '@mui/material';
import Layout from '@/components/Layout';
import StyledSkillsContainer from '@/styles/skills';
import PageActionsContainer from '@/components/PageActionsContainer';
import PageChangeButton from '@/components/PageChangeButton';

import BoltIcon from '@mui/icons-material/Bolt';

interface ILabelPhrases {
    cap: number,
    'en': string;
    'ptBr': string
};

const LABEL_PHRASES: ILabelPhrases[] = [
    {
        cap: 25,
        'en': 'Familiar',
        'ptBr': 'Familiar'
    },
    {
        cap: 50,
        'en': 'Intermediate',
        'ptBr': 'Intermediário'
    },
    {
        cap: 75,
        'en': 'Proficient',
        'ptBr': 'Proficiente'
    },
    {
        cap: 100,
        'en': 'Expert',
        'ptBr': 'Expert'
    }
];

const PAGE_KEY = 'skills';

const Skills = () => {
    const { language } = useContext(AppContext);

    const [records, setRecords] = useState<IRecord[]>();

    useEffect(() => {
        const loadPage = async () => {
            const response = await getAllRecords(PAGE_KEY);

            if (isAxiosError(response)) {

            } else {
                setRecords(response);
                console.log(response);
            }
        };

        loadPage();
    }, []);

    return (
        <Layout>
            <StyledSkillsContainer maxWidth='xl'>
                <Typography variant='h1' className='title'><BoltIcon />{data[language].skills.title}</Typography>
                <div className='content'>
                    <Typography dangerouslySetInnerHTML={{ __html: data[language].skills.text }} />

                    <div className='skills'>
                        {
                            records ?
                                records.map(record => {
                                    const skill = {
                                        name: record.values[0][language],
                                        value: parseInt(record.values[1][language]),
                                    }

                                    return <div className='skill' key={record.id}>
                                        <Typography variant='h5' dangerouslySetInnerHTML={{ __html: skill.name }} />
                                        <Typography className={`label-phrase`}>
                                            {LABEL_PHRASES.filter(label => skill.value <= label.cap)[0][language]}
                                        </Typography>
                                        <div className='progress-container'>
                                            <div
                                                className='progress-bar'
                                                role='progressbar'
                                                aria-valuemax={100}
                                                aria-valuemin={0}
                                                aria-valuenow={skill.value}
                                                style={{ width: `${skill.value}%` }}
                                            />
                                        </div>
                                    </div>
                                })
                                : <CircularProgress color='secondary' sx={{ my: 10, mx: 'auto', display: 'flex' }} />
                        }
                    </div>
                </div>

                <PageActionsContainer>
                    <PageChangeButton href={data[language].header[1].link} text={data[language].header[1].text} type='prev' />
                    <PageChangeButton href={data[language].header[3].link} text={data[language].header[3].text} />
                </PageActionsContainer>

            </StyledSkillsContainer>
        </Layout>
    )
};

export default Skills;