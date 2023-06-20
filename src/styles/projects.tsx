import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledProjectsContainer = styled(Container)(({ theme }) => ({
    paddingTop: 90,
    paddingBottom: 80,

    '.title': {
        display: 'flex',
        alignItems: 'center',
        fontSize: '4rem',

        svg: {
            color: theme.palette.secondary.main,
            fontSize: '3.6rem',
            margin: '4px 15px 0px -2px'
        }
    },

    '.content': {
        marginTop: 30,

        p: {
            fontSize: '1.4rem',

            span: {
                color: theme.palette.secondary.main,
            },
        },
    },

    [theme.breakpoints.down('sm')]: {
        paddingTop: 70,

        '.title': {
            fontSize: '2.8rem',

            svg: {
                fontSize: '2.5rem',
            }
        },
    }
}));

export default StyledProjectsContainer;