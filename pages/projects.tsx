import { useContext, useState } from 'react';
import Layout from '@/components/Layout';
import StyledProjectsContainer from '@/styles/projects';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { Typography, TextField, Snackbar, Alert, CircularProgress, IconButton } from '@mui/material';
import data from '@/helpers/data.json';
import AppContext from '@/services/AppContext';

const Projects = () => {
    const { language } = useContext(AppContext);

    return (
        <Layout>
            <StyledProjectsContainer maxWidth='xl'>
                <Typography variant='h1' className='title'><AccountTreeIcon /> {data[language].projects.title}</Typography>

                <div className='content'>
                    <Typography dangerouslySetInnerHTML={{ __html: data[language].projects.text }} />
                </div>
            </StyledProjectsContainer>
        </Layout>
    )
};

export default Projects;