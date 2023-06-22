import { useContext } from 'react';

import { IProject } from '@/types/projects';
import AppContext from '@/services/AppContext';

import { CardContent, Typography } from '@mui/material';
import { StyledProjectCardDetail } from './styles';

interface IProjectDetailProps {
    project: IProject;
    onClose: () => void;
};

const ProjectDetail: React.FC<IProjectDetailProps> = ({ project, onClose }) => {
    const { name, text } = project;
    const { language } = useContext(AppContext);

    return (
        <StyledProjectCardDetail>
            <CardContent>
                <Typography variant='h5'>
                    {name[language]}
                </Typography>
                <Typography dangerouslySetInnerHTML={{ __html: text[language] }} />
            </CardContent>
        </StyledProjectCardDetail>
    );
};

export default ProjectDetail;