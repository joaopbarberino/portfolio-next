import Layout from '@/components/Layout';
import StyledSkillsContainer from '@/styles/skills';
import data from '@/helpers/data.json';
import StyledWhoContainer from '@/styles/who';
import { Box, Container, Typography, LinearProgress } from '@mui/material';
import { useContext } from 'react';
import AppContext from '@/services/AppContext';
import BoltIcon from '@mui/icons-material/Bolt';

const Who = () => {
    const { language } = useContext(AppContext);

    return (
        <Layout>
            <StyledSkillsContainer maxWidth='xl'>
                <Typography variant='h1' className='title'><BoltIcon />{data[language].skills.title}</Typography>
                <div className='content'>
                    <Typography dangerouslySetInnerHTML={{ __html: data[language].skills.text }} />

                    <div className='skills'>
                        {
                            data[language].skills.strengths.map(skill =>
                                <div className='skill' key={skill.name}>
                                    <Typography variant='h5' dangerouslySetInnerHTML={{ __html: skill.name }} />
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
                            )
                        }
                    </div>
                </div>

            </StyledSkillsContainer>
        </Layout>
    )
};

export default Who;