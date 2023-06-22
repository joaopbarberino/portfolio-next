import React, { useContext, useState, useEffect } from 'react';
import { isAxiosError } from 'axios';

import data from '@/helpers/data.json';
import AppContext from '@/services/AppContext';
import { getAllRecords } from '@/services/api/record';
import { IRecord } from '@/services/api/record/types';

import { Typography, Skeleton } from '@mui/material';
import StyledWhoContainer from '@/styles/who';
import Layout from '@/components/Layout';
import PageActionsContainer from '@/components/PageActionsContainer';
import PageChangeButton from '@/components/PageChangeButton';

import MoodIcon from '@mui/icons-material/Mood';
import BusinessIcon from '@mui/icons-material/Business';
import SchoolIcon from '@mui/icons-material/School';

const PAGE_KEY = 'who';

const Skeletons = () => <>
    <Skeleton />
    <Skeleton />
    <Skeleton />
    <Skeleton />
    <Skeleton />
    <Skeleton />
    <Skeleton />
    <Skeleton />
    <Skeleton />
    <Skeleton />
    <Skeleton />
    <Skeleton />
    <Skeleton />
    <Skeleton />
    <Skeleton />
</>;

const Who = () => {
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
    }, [])

    return (
        <Layout>
            <StyledWhoContainer maxWidth='xl'>
                <Typography variant='h1' className='title'>{data[language].who.title}</Typography>

                <Typography variant='h2' className='subtitle'><MoodIcon /> {language == 'en' ? 'Summary' : 'Resumo'}</Typography>
                <div className='content'>
                    {
                        records ?
                            <Typography variant='body1' dangerouslySetInnerHTML={{ __html: records[0].values[0][language] }} />
                            : <Skeletons />
                    }
                </div>

                <Typography variant='h2' className='subtitle'><BusinessIcon /> {language == 'en' ? 'Experiences' : 'Experiências'}</Typography>
                <div className='content'>
                    {
                        records ?
                            <Typography variant='body1' dangerouslySetInnerHTML={{ __html: records[1].values[0][language] }} />
                            : <Skeletons />
                    }
                </div>

                <Typography variant='h2' className='subtitle'><SchoolIcon /> {language == 'en' ? 'Education' : 'Formação'}</Typography>
                <div className='content'>
                    {
                        records ?
                            <Typography variant='body1' dangerouslySetInnerHTML={{ __html: records[2].values[0][language] }} />
                            : <Skeletons />
                    }
                </div>

                <PageActionsContainer>
                    <PageChangeButton href={data[language].header[0].link} text={data[language].header[0].text} type='prev' />
                    <PageChangeButton href={data[language].header[2].link} text={data[language].header[2].text} />
                </PageActionsContainer>

            </StyledWhoContainer>
        </Layout>
    )
};

export default Who;