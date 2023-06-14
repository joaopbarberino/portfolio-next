import Layout from '@/components/Layout';
import StyledWhoContainer from '@/styles/who';
import { Box, Container, Typography } from '@mui/material';
import data from '@/helpers/data.json';
import { useContext } from 'react';
import AppContext from '@/services/AppContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Who = () => {
    const { language } = useContext(AppContext);

    return (
        <Layout>
            <StyledWhoContainer maxWidth='xl'>
                <Typography variant='h1' className='title'><AccountCircleIcon /> {data[language].who.title}</Typography>

                <div className='content'>
                    {
                        data[language].who.text.map(
                            text =>
                                <Typography variant='body1' key={text} dangerouslySetInnerHTML={{ __html: text }} />
                        )
                    }
                </div>
            </StyledWhoContainer>
        </Layout>
    )
};

export default Who;