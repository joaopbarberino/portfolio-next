import React, { useContext } from 'react';

import { CardMedia, CardContent, CardActions, Chip, Stack, Button, Typography, Collapse } from '@mui/material';
import { StyledProjectCard } from './styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import LinkIcon from '@mui/icons-material/Link';

import { IProject } from '@/types/projects';
import AppContext from '@/services/AppContext';

interface IProjectCardProps {
    project: IProject;
    isSelected: boolean;
    setSelectedProject: (project: React.SetStateAction<IProject | undefined>) => void;
};

interface ILabel {
    [key: string]: {
        en: string,
        ptBr: string
    }
};

const LABELS: ILabel = {
    expandButton: {
        en: 'Details',
        ptBr: 'Detalhes'
    },
    visitButton: {
        en: 'Open',
        ptBr: 'Abrir',
    },
    webDevButton: {
        en: 'As a Web Dev',
        ptBr: 'Como Web Dev',
    }
};

const ProjectCard: React.FC<IProjectCardProps> = ({ project, isSelected, setSelectedProject }) => {
    const { img, name, text, tech, link } = project;
    const { language } = useContext(AppContext)

    const handleSelectedProject = () => {
        if (isSelected) {
            setSelectedProject(undefined);
        } else {
            setSelectedProject(project);
        }
    };

    return (
        <StyledProjectCard>
            <CardMedia
                image={img}
                title={name}
            />
            <CardContent className={`${isSelected}`}>
                <Collapse in={!isSelected}>
                        <Typography variant='h5' color='secondary'>
                            {name}
                        </Typography>
                        {/* <Typography>
                            {text.replace(/<\/?[^>]+(>|$)/g, '').substring(0, 50).trim()}...
                        </Typography> */}
                        <Typography dangerouslySetInnerHTML={{ __html: text.substring(0, 110) + '...'}} />
                </Collapse>
            </CardContent>
            <CardActions>
                <Stack direction='row' spacing={1} useFlexGap flexWrap={'wrap'} >
                    {tech.map(t => <Chip key={t} label={t} />)}
                </Stack>
                <Stack className='buttons' direction='row' spacing={1} useFlexGap flexWrap={'wrap'} >
                    <Button
                        variant='contained'
                        color='secondary'
                        onClick={handleSelectedProject}
                        endIcon={isSelected ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    >
                        {LABELS['expandButton'][language]}
                    </Button>
                    <Button
                        variant='contained'
                        color='secondary'
                        endIcon={<LinkIcon />}
                        href={link}
                        target='_blank'
                    >
                        {LABELS['visitButton'][language]}
                    </Button>
                </Stack>
            </CardActions>
            <div className={`connector ${isSelected}`}></div>
        </StyledProjectCard>
    );
};

export default ProjectCard;