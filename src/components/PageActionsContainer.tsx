import { ReactNode } from 'react';
import { Box } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import defaultTheme from '@/themes';

interface IPageActionsContainerProps {
    children: ReactNode;
};

const styles: SxProps<Theme> = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 15,

    [defaultTheme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
    }
}

const PageActionsContainer: React.FC<IPageActionsContainerProps> = ({ children }) => {
    return (
        <Box sx={styles}>
            {children}
        </Box>
    );
};

export default PageActionsContainer;