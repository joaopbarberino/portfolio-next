import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledWhoContainer = styled(Container)(({ theme }) => ({
    paddingTop: 90,
    paddingBottom: 80,

    span: {
        color: theme.palette.secondary.main
    },

    '.title, .subtitle': {
        display: 'flex',
        alignItems: 'center',

        svg: {
            color: theme.palette.secondary.main
        }
    },

    '.title': {
        fontSize: '4rem',
    },

    '.subtitle': {
        marginTop: 40,
        fontSize: '2rem',

        svg: {
            fontSize: '2rem',
            marginRight: 8,
        }
    },

    '.content': {
        marginTop: 30,
        paddingLeft: 20,
        borderLeft: `3px solid ${theme.palette.secondary.main}`,

        p: {
            fontSize: '1.4rem',
            marginTop: 20,
        },

        button: {
            marginTop: '40px important',
        }
    },

    [theme.breakpoints.down('sm')]: {
        paddingTop: 70,

        '.title': {
            fontSize: '3rem',
        },
    }
}));

export default StyledWhoContainer;