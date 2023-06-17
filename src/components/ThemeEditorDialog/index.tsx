import { useContext, useState, useEffect } from 'react';

import { createTheme } from '@mui/material/styles';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, TextField, Button, FormControlLabel, Switch } from '@mui/material';
import PaletteIcon from '@mui/icons-material/Palette';
import defaultTheme from '@/themes';

import AppContext from '@/services/AppContext';

export interface IThemeEditorDialogProps {
    open: boolean;
    onClose: () => void;
}

const ThemeEditorDialog = (props: IThemeEditorDialogProps) => {
    const { onClose, open } = props;
    const { language, customTheme, setCustomTheme } = useContext(AppContext);

    const [light, setLight] = useState(customTheme.palette.secondary.light);
    const [main, setMain] = useState(customTheme.palette.secondary.main);
    const [dark, setDark] = useState(customTheme.palette.secondary.dark);

    const [defineOnlyMain, setDefineOnlyMain] = useState(true);

    const handleClose = () => {
        onClose();
    };

    const updateTheme = () => {
        const updatedTheme = createTheme({
            ...customTheme,
            palette: {
                primary: customTheme.palette.primary,
                ...(
                    defineOnlyMain ?
                        {
                            secondary: {
                                main,
                            }
                        }
                        : {
                            secondary: {
                                light, main, dark
                            }
                        }
                ),
            }
        });

        setCustomTheme(updatedTheme);
    };

    useEffect(() => {
        if (customTheme !== defaultTheme) {
            setLight(customTheme.palette.secondary.light);
            setDark(customTheme.palette.secondary.dark);
        };
    }, [customTheme]);

    return (
        <Dialog onClose={handleClose} open={open} disableScrollLock fullWidth>
            <DialogTitle sx={{ fontSize: '2rem' }}>
                <PaletteIcon sx={{ mr: 2, mb: '-5px', fontSize: '2rem', color: customTheme.palette.secondary.main }} />
                {language === 'ptBr' ? 'Editor de tema' : 'Theme Editor'}
            </DialogTitle>

            <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography>{language === 'en' ? 'Play with the site colors!' : 'Brinque com as cores do site!'} 😄</Typography>
                <TextField
                    label='Light'
                    variant='outlined'
                    color='secondary'
                    InputLabelProps={{ sx: { color: customTheme.palette.secondary.light } }}
                    value={light}
                    onChange={(e) => setLight(e.target.value)}
                    disabled={defineOnlyMain}
                    sx={{ mt: 2 }}
                />
                <TextField
                    label='Main'
                    variant='outlined'
                    color='secondary'
                    InputLabelProps={{ sx: { color: customTheme.palette.secondary.light } }}
                    value={main}
                    onChange={(e) => setMain(e.target.value)}
                    sx={{ my: 2 }}
                />
                <TextField
                    label='Dark'
                    variant='outlined'
                    color='secondary'
                    InputLabelProps={{ sx: { color: customTheme.palette.secondary.light } }}
                    value={dark}
                    onChange={(e) => setDark(e.target.value)}
                    disabled={defineOnlyMain}
                />
                <FormControlLabel
                    control={
                        <Switch checked={defineOnlyMain} onChange={() => setDefineOnlyMain(!defineOnlyMain)} color='secondary' />
                    }
                    label={language === 'en' ? 'Define light and dark automaticaly' : 'Definir light e dark automaticamente'}
                    sx={{ color: 'white', my: 2, mx: 0, border: '1px solid white', borderRadius: '4px' }}
                />
            </DialogContent>

            <DialogActions sx={{ padding: 3, justifyContent: 'space-around' }}>
                <Button variant='contained' color='secondary' onClick={updateTheme}>
                    {language === 'en' ? 'Change theme!' : 'Trocar tema!'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ThemeEditorDialog;