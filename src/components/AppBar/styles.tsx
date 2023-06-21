import { styled } from '@mui/material/styles';
import { motion, useScroll } from 'framer-motion'

const StyledLogo = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    svg: {
        marginRight: 7,
    },

    hr: {
        height: '70%'
    },

    '.name': {
        paddingLeft: 10,
        height: '100%',

        p: {
            lineHeight: 1,
            fontWeight: 700,
            letterSpacing: '0rem',
            color: 'inherit',
            textDecoration: 'none',
        },

        '.up': {
            fontWeight: '100'
        },

        '.down': {
            fontSize: '1.12rem',
            color: theme.palette.secondary.light
        }
    }
}));

const StyledProgressBar = styled(motion.div)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.light,
    position: 'fixed',
    height: 4,
    top: 0,
    left: 0,
    right: 0,
    transformOrigin: '0%',
}));

export { StyledLogo, StyledProgressBar };