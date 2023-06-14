import { Container } from "@mui/material";
import { styled } from '@mui/material/styles';

const StyledFooterContainer = styled('footer')(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,

    '.MuiContainer-root': {
        textAlign: 'center',
        paddingTop: 15,
        paddingBottom: 15,

        '.copyright, .socials': {
            display: 'flex',
        },

        '.copyright': {
            justifyContent: 'center',
            alignItems: 'center',

            h5: {
                display: 'flex',
                whiteSpace: 'pre',
                fontSize: '1.1rem',
                width: 'fit-content',

                span: {
                    color: theme.palette.secondary.main,
                }
            }
        },

        '.socials': {
            justifyContent: 'right',

            a: {
                padding: 7,
                transition: 'all .2s',
                margin: '0 5px',
                color: theme.palette.secondary.main,

                svg: {
                    fontSize: '1.8rem',
                },

                '&:hover': {
                    backgroundColor: theme.palette.secondary.main,
                    color: 'white'
                }
            }
        }
    },

    [theme.breakpoints.down('lg')]: {
        '.copyright': {
            justifyContent: 'left',
        }
    },

    [theme.breakpoints.down('sm')]: {
        '.copyright, .socials': {
            justifyContent: 'center !important',
        },

        '.copyright': {
            h5: {
                fontSize: '1rem !important',

                svg: {
                    fontSize: '1.4rem !important',
                }
            }
        },

        '.socials': {
            marginTop: 20,
        }
    }
}));

export default StyledFooterContainer;