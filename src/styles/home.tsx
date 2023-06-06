import { styled } from '@mui/material/styles';

const HomeContainer = styled('div')(({ theme }) => ({
    height: '100vh',
    background: `linear-gradient(${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
    display: 'flex',
    alignItems: 'center',

    '.photo': {
        zIndex: 1,
        background: `linear-gradient(${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
        borderRight: `12px solid ${theme.palette.secondary.light}`,
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        div: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 355,
            height: 404,
            marginLeft: 'auto',
            background: theme.palette.secondary.light,
            borderTopLeftRadius: 30,
            borderBottomLeftRadius: 30,

            img: {
                marginRight: -10,
                borderTopLeftRadius: 24,
                borderBottomLeftRadius: 24,
            },
        }
    },

    '.intro': {
        padding: 20,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',

        span: {
            color: theme.palette.secondary.main
        }
    },

    '.slice': {
        width: '33vw',
        height: '100vh',
        background: `linear-gradient(${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
        borderRight: `10px solid ${theme.palette.secondary.light}`,
        paddingRight: 10,
        position: 'absolute',
        top: 0,
        zIndex: 0,
    },

    [theme.breakpoints.down('md')]: {
        height: '100vh',

        '.photo': {
            height: 'auto',
            border: 'none',
            background: 'none',

            div: {
                margin: 'auto',
                borderRadius: '0',
                width: 0,

                img: {
                    margin: 0,
                    borderRadius: 22,
                    border: `6px solid ${theme.palette.secondary.light}`,
                    width: 290,
                    height: 'auto',
                }
            }
        },

        '.intro': {
            h4: {
                fontSize: '1.8rem'
            }
        },

        '.slice': {
            width: '100%',
            height: 250,
            borderRight: 0,
            borderBottom: `6px solid ${theme.palette.secondary.light}`,
        }
    },

    [theme.breakpoints.down('sm')]: {
        height: 'auto',

        div: {
            img: {
                margin: 0,
                borderRadius: 22,
                border: `6px solid ${theme.palette.secondary.light}`,
                width: '250px !important',
                height: 'auto',
            }
        }
    }
}));

export { HomeContainer };