import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledWhoContainer = styled(Container)(({ theme }) => ({
    paddingTop: 120,

    span: {
        color: theme.palette.secondary.main
    },

    '.title': {
        fontSize: '4rem',
        display: 'flex',
        alignItems: 'center',

        svg: {
            fontSize: '4rem',
            marginRight: 16,
            color: theme.palette.secondary.main
        }
    },

    '.content': {
        marginTop: 30,
        paddingLeft: 20,
        borderLeft: `3px solid ${theme.palette.secondary.main}`,

        p: {
            fontSize: '1.4rem',
            marginTop: 20,
        }
    }

}));

export default StyledWhoContainer;