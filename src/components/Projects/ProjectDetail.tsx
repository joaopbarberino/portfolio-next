import { CardContent, Typography } from '@mui/material';

import { IProject } from '@/types/projects';
import { StyledProjectCardDetail } from './styles';

interface IProjectDetailProps {
    project: IProject;
    onClose: () => void;
};

const ProjectDetail: React.FC<IProjectDetailProps> = ({ project, onClose }) => {
    const { name, text } = project;

    return (
        <StyledProjectCardDetail>
            <CardContent>
                <Typography variant='h5'>
                    {name}
                </Typography>
                <Typography dangerouslySetInnerHTML={{ __html: text }} />
            </CardContent>
        </StyledProjectCardDetail>
    );
};

export default ProjectDetail;