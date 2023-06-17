import React from 'react';
import { Theme } from '@mui/material/styles';
import defaultTheme from '@/themes';

interface IAppContext {
    language: 'en' | 'ptBr';
    setLanguage: (language: 'en' | 'ptBr') => void;
    customTheme: Theme;
    setCustomTheme: (theme: Theme) => void;
};

const AppContext = React.createContext<IAppContext>({
    language: 'en',
    setLanguage: (language) => { },
    customTheme: defaultTheme,
    setCustomTheme: (theme) => { }
});

export default AppContext;