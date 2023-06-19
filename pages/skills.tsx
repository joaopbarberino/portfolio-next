import Layout from '@/components/Layout';
import StyledSkillsContainer from '@/styles/skills';
import data from '@/helpers/data.json';
import StyledWhoContainer from '@/styles/who';
import { Box, Container, Typography, LinearProgress } from '@mui/material';
import { useContext } from 'react';
import AppContext from '@/services/AppContext';
import BoltIcon from '@mui/icons-material/Bolt';
import PageActionsContainer from '@/components/PageActionsContainer';
import PageChangeButton from '@/components/PageChangeButton';

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
                            )
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

export default Who;