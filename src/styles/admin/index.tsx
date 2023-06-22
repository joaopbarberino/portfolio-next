import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledAdminContainer = styled(Container)(({ theme }) => ({
    paddingTop: 90,
    paddingBottom: 80,

    '.title': {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
        paddingBottom: 20,
        borderBottom: `1px solid ${theme.palette.primary.light}`,

        button: {
            height: 50
        }
    },

    '.select': {
        justifyContent: 'flex-end',
        marginBottom: 30,
        
        '.MuiAutocomplete-root': {
            width: 280,

            '.MuiFormControl-root': {
                '.MuiInputLabel-shrink': {
                    color: theme.palette.secondary.light
                },
                
                svg: {
                    color: 'white'
                },

                '&:hover': {
                    fieldset: {
                        borderColor: `${theme.palette.secondary.light} !important`,
                        color: 'white !important'
                    }
                }
            },
        }
    },

    '.MuiCard-root': {
        backgroundColor: theme.palette.primary.light,
    }
}));

export { StyledAdminContainer };