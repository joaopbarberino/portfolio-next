// https://github.com/mui/material-ui/tree/master/examples/material-next-ts/
import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { AnimatePresence } from 'framer-motion'
import { Box } from '@mui/material';
import AppBar from '@/components/AppBar';
import Footer from '@/components/Footer';
import theme from '@/themes';

import AppContext from '@/services/AppContext';
import createEmotionCache from '@/services/createEmotionCache';
import '@/styles/globals.css';
import { useRouter } from 'next/router';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
    const { pathname } = useRouter();

    const [language, setLanguage] = React.useState<'en' | 'ptBr'>('en');
    const [customTheme, setCustomTheme] = React.useState(theme);

    return (
        <CacheProvider value={emotionCache}>
            <AppContext.Provider value={{ language, setLanguage, customTheme, setCustomTheme }}>
                <Head>
                    <meta name='viewport' content='initial-scale=1, width=device-width' />
                </Head>
                <ThemeProvider theme={customTheme}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    <AppBar />
                    <Box
                        sx={{
                            background: `linear-gradient(${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                            minHeight: '100vh',
                        }}
                    >
                        <AnimatePresence
                            mode='wait'
                            initial={false}
                            onExitComplete={() => window.scrollTo(0, 0)}
                        >
                            <Component {...pageProps} key={pathname} />
                        </AnimatePresence>
                    </Box>
                    <Footer />
                </ThemeProvider>
            </AppContext.Provider>
        </CacheProvider>
    );
}