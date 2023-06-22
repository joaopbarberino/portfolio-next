import React, { useContext, useState, useEffect } from 'react';
import Image from 'next/image';

import AppContext from '@/services/AppContext';
import data from '@/helpers/data.json';
import { IRecord } from '@/services/api/record/types';
import { getAllRecords } from '@/services/api/record';

import { Container, Typography, Skeleton } from '@mui/material/';
import Grid from '@mui/material/Unstable_Grid2';
import StyledHomeContainer from '@/styles/home';
import PageChangeButton from '@/components/PageChangeButton';
import Layout from '@/components/Layout';
import { isAxiosError } from 'axios';

const PAGE_KEY = 'home';

const Home = () => {
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
            <StyledHomeContainer>
                <Container maxWidth='xl'>
                    <Grid container>
                        <Grid xs={12} md={6} lg={4} className='photo'>
                            <div>
                                <Image
                                    src='/img/foto2.jpg'
                                    width={345}
                                    height={384}
                                    alt={data[language].home.imgTitle}
                                    title={data[language].home.imgTitle}
                                    priority
                                />
                            </div>
                        </Grid>

                        <Grid xs={12} md={6} lg={8} className='intro'>
                            {
                                records ?
                                    records.map(record =>
                                        record.values.map(value =>
                                            <Typography variant='h4' key={value[language]} dangerouslySetInnerHTML={{ __html: value[language] }} />
                                        ))
                                    :
                                    <>
                                        <Skeleton width={500}/>
                                        <Skeleton width={400}/>
                                        <Skeleton width={400}/>
                                        <Skeleton width={400}/>
                                    </>
                            }
                            <PageChangeButton text={data[language].home.button} href='/who' />
                        </Grid>
                    </Grid>
                </Container>

                <div className='slice'></div>
            </StyledHomeContainer>
        </Layout>
    );
};

export default Home;