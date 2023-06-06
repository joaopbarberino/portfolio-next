import React from 'react';

interface IAppContext {
    language: 'en' | 'ptBr';
    setLanguage: (language: 'en' | 'ptBr') => void;
};

const AppContext = React.createContext<IAppContext>({
    language: 'en',
    setLanguage: (language) => { }
});

export default AppContext;