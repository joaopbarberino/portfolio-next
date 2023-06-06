import React, { useContext } from 'react';

import Image from 'next/image';
import Grid from '@mui/material/Unstable_Grid2';
import { Container, Typography } from '@mui/material/';

import { HomeContainer } from '@/styles/home';

import AppContext from '@/services/AppContext';
import data from '@/helpers/data.json';
import HomeButton from '@/components/HomeButton';

const Home = () => {
    const { language } = useContext(AppContext);

    return (
        <HomeContainer>
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
                            data[language].home.text.map(text => <Typography variant='h4' key={text} dangerouslySetInnerHTML={{ __html: text }} />)
                        }
                        <HomeButton text={data[language].home.button} />
                    </Grid>
                </Grid>
            </Container>

            <div className='slice'></div>
        </HomeContainer>
    );
};

export default Home;