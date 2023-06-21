import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';

const StyledProjectCard = styled(Card)(({ theme }) => ({
    height: '100%',
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.primary.light,
    borderRadius: 0,
    position: 'relative',
    overflow: 'unset',

    '.MuiCardMedia-root': {
        height: 200,
    },

    '.MuiCardContent-root': {
        p: {
            fontSize: '1.2rem !important'
        },
    },

    '.MuiCardActions-root': {
        flexDirection: 'column',
        marginTop: 'auto',
        alignItems: 'flex-start',
        padding: 16,

        '.MuiChip-root': {
            color: theme.palette.secondary.light,
            borderColor: theme.palette.secondary.light,
            border: '1px solid',
            borderRadius: 4,
        },

        '.buttons': {
            margin: '15px 0 0',
        },
    },

    '.connector': {
        height: 35,
        width: '100%',
        bottom: -32,
        backgroundColor: theme.palette.primary.light,
        position: 'absolute',
        transition: 'transform .2s',
        transformOrigin: '100% 0',
        transform: 'scaleY(1)',

        '&.false': {
            transform: 'scaleY(0)',
            transitionDelay: '.25s',
        }
    }
}));

const StyledProjectCardDetail = styled(Card)(({ theme }) => ({
    maxWidth: '100%',
    backgroundColor: theme.palette.primary.light,
    borderRadius: 0,

    h5: {
        color: 'white',
        margin: '-16px -16px 20px',
        padding: '20px 16px 20px',
        borderBottom: '1px solid',
        borderColor: theme.palette.secondary.light,
        backgroundColor: theme.palette.secondary.light
    }
}));

export { StyledProjectCard, StyledProjectCardDetail };