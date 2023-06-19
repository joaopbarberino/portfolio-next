// Adapted from: https://codepen.io/Shtam3x/pen/Bevpxd

import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

const speed = '.3s';
const transition = `all ${speed} cubic-bezier(0.310, -0.105, 0.430, 1.400)`;

const StyledButton = styled(Button)(({ theme }) => ({
    display: 'block',
    backgroundColor: theme.palette.secondary.dark,
    width: 300,
    height: 70,
    lineHeight: 70,
    margin: '10px',
    color: 'black',
    position: 'relative',
    inset: 0,
    cursor: 'pointer',
    overflow: 'hidden',
    borderRadius: 0,

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
        fontSize: '1.6rem',
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

    '&.prev': {
        span: {
            left: 'unset',
            right: 0,

            '&:after': {
                right: 'unset',
                left: 0
            },
        },

        '.icon': {
            right: 'unset',
            left: 0,
            transform: 'rotate(180deg)'
        },

        '&:hover': {
            span: {
                right: '-72%',
            },
        },
    },

    [theme.breakpoints.down('sm')]: {
        width: 260,

        span: {
            fontSize: '1.4rem',
        }
    }
}));

export default StyledButton;
