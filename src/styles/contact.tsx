import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledContactContainer = styled(Container)(({ theme }) => ({
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

        '.MuiSnackbar-root': {
            width: '100%',

            '.MuiAlert-root': {
                width: '90%',
                maxWidth: 580,
                fontSize: '1.2rem',
                alignItems: 'center',
                background: theme.palette.secondary.light,
                color: 'white',

                svg: {
                    color: 'white',
                },

                '&.MuiAlert-standardError': {
                    background: theme.palette.error.dark,
                }
            }
        },

        '.form': {
            margin: '20px auto 0',
            backgroundColor: theme.palette.primary.light,
            borderRadius: 12,
            padding: 10,

            // https://codepen.io/ethicist/pen/xxZYGrL life saver
            'input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus,input:-webkit-autofill:active': {
                transition: 'background-color 9999s ease-in-out 0s, color 9999s ease-in-out 0s',
            },

            '.MuiFormControl-root': {
                '.MuiInputLabel-shrink': {
                    color: theme.palette.secondary.light
                },

                '&:hover': {
                    fieldset: {
                        borderColor: `${theme.palette.secondary.light} !important`,
                        color: 'white !important'
                    }
                }
            },

            button: {
                marginLeft: 'auto',
                maxWidth: '100%',
                height: 60,
                margin: 0,

                span: {
                    fontSize: '1.3rem',
                },

                '.MuiCircularProgress-root': {
                    width: '32px !important',
                    height: '32px !important',
                    marginLeft: 24,
                    marginTop: 12,
                    color: 'white',

                    '&::after': {
                        display: 'none'
                    },
                    svg: {
                        marginLeft: 0
                    }
                },

                svg: {
                    fontSize: '2rem',
                },

                '&.Mui-disabled': {
                    color: 'white',
                    backgroundColor: theme.palette.secondary.main,
                    opacity: .5,
                }
            }
        },

        '.socials': {
            marginTop: 40,

            '.icons': {
                marginTop: 20,
                padding: '20px 16px',
                borderRadius: 12,
                backgroundColor: theme.palette.primary.light,

                a: {
                    padding: 7,
                    transition: 'all .2s',
                    backgroundColor: theme.palette.secondary.light,
                    color: 'white',

                    svg: {
                        fontSize: '1.8rem',
                    },

                    '&:not(:first-of-type)':{
                        marginLeft: 20,
                    },

                    '&:hover': {
                        backgroundColor: theme.palette.secondary.main,
                        color: 'white'
                    }
                }
            }
        }
    },

    [theme.breakpoints.down('sm')]: {
        paddingTop: 70,

        '.title': {
            fontSize: '2.8rem',

            svg: {
                fontSize: '2.5rem',
            }
        },

        '.content': {
            '.MuiSnackbar-root': {
                left: 0,
                right: 0,
            },

            button: {
                width: '100%'
            }
        },
    }

}));

export default StyledContactContainer;