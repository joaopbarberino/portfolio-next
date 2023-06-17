import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledSkillsContainer = styled(Container)(({ theme }) => ({
    paddingTop: 90,
    paddingBottom: 80,

    '.title': {
        display: 'flex',
        alignItems: 'center',
        fontSize: '4rem',

        svg: {
            color: theme.palette.secondary.main,
            fontSize: '4rem',
            marginTop: 4,
            marginLeft: -20,
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

        '.skills': {
            '.skill': {
                marginTop: 20,

                h5: {
                    marginBottom: 10,
                },

                // Animation adapted from https://6-4-0--reactstrap.netlify.app/components/progress/
                '.progress-container': {
                    marginTop: 5,
                    border: `3px solid ${theme.palette.secondary.dark}`,
                    position: 'relative',
                    padding: 4,

                    '.progress-bar': {
                        height: 35,
                        backgroundColor: theme.palette.secondary.light,
                        transition: 'all 1.5s',
                        animation: 'progress-bar-stripes 1s linear infinite',
                        backgroundImage: `linear-gradient(
                            45deg,
                            hsla(0, 0%, 100%, .15) 25%,
                            transparent 0,
                            transparent 50%,
                            hsla(0, 0%, 100%, .15) 0,
                            hsla(0, 0%, 100%, .15) 75%,
                            transparent 0,
                            transparent
                        )`,
                        backgroundSize: '1.2em 1.2em',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        color: 'white',
                        textAlign: 'center',
                        whiteSpace: 'nowrap',
                    },

                    '@keyframes progress-bar-stripes': {
                        '0%': {
                            backgroundPosition: '1.2rem 0',
                        },

                        '100%': {
                            backgroundPosition: '0 0',
                        }
                    },

                    '.progress-bar-animated': {
                    },

                    '.progress-bar-striped': {
                    },
                }
            }
        }
    },

    [theme.breakpoints.down('sm')]: {
        paddingTop: 70,

        '.title': {
            fontSize: '2.8rem',

            svg: {
                fontSize: '2.8rem',
                marginLeft: -10
            }
        }
    }
}));

export default StyledSkillsContainer;