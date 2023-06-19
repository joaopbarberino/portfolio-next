import Layout from '@/components/Layout';
import StyledWhoContainer from '@/styles/who';
import { Typography } from '@mui/material';
import data from '@/helpers/data.json';
import { useContext } from 'react';
import AppContext from '@/services/AppContext';
import MoodIcon from '@mui/icons-material/Mood';
import BusinessIcon from '@mui/icons-material/Business';
import SchoolIcon from '@mui/icons-material/School';
import PageChangeButton from '@/components/PageChangeButton';
import PageActionsContainer from '@/components/PageActionsContainer';

const Who = () => {
    const { language } = useContext(AppContext);

    return (
        <Layout>
            <StyledWhoContainer maxWidth='xl'>
                <Typography variant='h1' className='title'>{data[language].who.title}</Typography>

                <Typography variant='h2' className='subtitle'><MoodIcon /> {language == 'en' ? 'Summary' : 'Resumo'}</Typography>
                <div className='content'>
                    {
                        data[language].who.text.map(
                            text =>
                                <Typography variant='body1' key={text} dangerouslySetInnerHTML={{ __html: text }} />
                        )
                    }
                </div>

                <Typography variant='h2' className='subtitle'><BusinessIcon /> {language == 'en' ? 'Experiences' : 'Experiências'}</Typography>
                <div className='content'>
                    {
                        data[language].who.text.map(
                            text =>
                                <Typography variant='body1' key={text} dangerouslySetInnerHTML={{ __html: text }} />
                        )
                    }
                </div>

                <Typography variant='h2' className='subtitle'><SchoolIcon /> {language == 'en' ? 'Education' : 'Formação'}</Typography>
                <div className='content'>
                    {
                        data[language].who.text.map(
                            text =>
                                <Typography variant='body1' key={text} dangerouslySetInnerHTML={{ __html: text }} />
                        )
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