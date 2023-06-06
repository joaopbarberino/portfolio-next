// https://github.com/mui/material-ui/tree/master/examples/material-next-ts/
import '@/styles/globals.css';
import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import AppContext from '@/services/AppContext';
import theme from '@/themes';
import createEmotionCache from '@/services/createEmotionCache';
import AppBar from '@/components/AppBar';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
    const [language, setLanguage] = React.useState<'en' | 'ptBr'>('ptBr');

    return (
        <CacheProvider value={emotionCache}>
            <AppContext.Provider value={{ language, setLanguage }}>
                <Head>
                    <meta name="viewport" content="initial-scale=1, width=device-width" />
                </Head>
                <ThemeProvider theme={theme}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    <AppBar />
                    <Component {...pageProps} />
                </ThemeProvider>
            </AppContext.Provider>
        </CacheProvider>
    );
}