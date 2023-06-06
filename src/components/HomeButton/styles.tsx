// Adapted from: https://codepen.io/Shtam3x/pen/Bevpxd

import { styled } from '@mui/material/styles';

const speed = '.3s';
const transition = `all ${speed} cubic-bezier(0.310, -0.105, 0.430, 1.400)`;

const StyledButton = styled('a')(({ theme }) => ({
    display: 'block',
    backgroundColor: theme.palette.secondary.dark,
    width: 300,
    height: 70,
    lineHeight: 70,
    margin: '75px auto',
    color: 'black',
    position: 'relative',
    inset: 0,
    cursor: 'pointer',
    overflow: 'hidden',
    transition: transition,

    'span, .icon': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        textAlign: 'center',
        position: 'absolute',
        top: 0,
    },

    span: {
        width: '72%',
        lineHeight: 'inherit',
        fontSize: 30,
        textTransform: 'uppercase',
        left: 0,
        transition: transition,
        color: 'white !important',

        '&:after': {
            content: '""',
            backgroundColor: theme.palette.secondary.light,
            width: 2,
            height: '70%',
            position: 'absolute',
            top: '15%',
            right: 0,
        }
    },

    '.icon': {
        width: '28%',
        right: 0,
        transition: transition,

        svg: {
            fontSize: 40,
            transition: `${transition}, height ${speed} ease`,
            color: 'white'
        }
    },

    '&:hover': {
        boxShadow: '0 0 20px 0 rgba(0,0,0,.3)',
        color: 'white',
        backgroundColor: theme.palette.secondary.main,

        span: {
            left: '-72%',
            opacity: 0,
        },

        '.icon': {
            width: '100%',

            svg: {
                fontSize: 50,
            }
        },

    },

    '&:active': {
        opacity: 1,
    },

    [theme.breakpoints.down('sm')]: {
        width: 260,
    }
}));

export default StyledButton;
