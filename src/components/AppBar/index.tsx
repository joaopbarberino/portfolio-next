// Adapted https://mui.com/material-ui/react-app-bar/#app-bar-with-responsive-menu

import React, { useState, useContext } from 'react';

import { useScroll, useSpring } from 'framer-motion';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, MenuItem, Container, Button, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import TranslateIcon from '@mui/icons-material/Translate';
import PaletteIcon from '@mui/icons-material/Palette';
import Logo from './logo';
import Link from '@/components/Link';

import data from '@/helpers/data.json';
import AppContext from '@/services/AppContext';
import { useRouter } from 'next/router';
import ThemeEditorDialog from '../ThemeEditorDialog';
import { StyledProgressBar } from './styles';

const settings: { title: string, value: 'en' | 'ptBr' }[] = [
    {
        title: 'English',
        value: 'en'
    },
    {
        title: 'Português',
        value: 'ptBr'
    }
];

const ResponsiveAppBar = () => {
    const { language, setLanguage, customTheme } = useContext(AppContext);
    const { pathname } = useRouter();
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 20,
        restDelta: 0.001
    });

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElSettings, setAnchorElSettings] = useState<null | HTMLElement>(null);
    const [openThemeEditorDialog, setOpenThemeEditorDialog] = useState(false);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenSettingsMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElSettings(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseSettingsMenu = () => {
        setAnchorElSettings(null);
    };

    const handleChangeLanguage = (newLanguage: 'en' | 'ptBr') => {
        setLanguage(newLanguage);
        handleCloseSettingsMenu();
    };

    return (
        <AppBar position='fixed'>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    <Typography
                        variant='h6'
                        noWrap
                        component={Link}
                        href='/'
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        <Logo />
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size='large'
                            aria-label='site links'
                            aria-controls='menu-appbar'
                            aria-haspopup='true'
                            onClick={handleOpenNavMenu}
                            color='inherit'
                            sx={{ p: 0 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id='menu-appbar'
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {data[language].header.map((item) => (
                                <MenuItem key={item.text} onClick={handleCloseNavMenu}>
                                    <Typography
                                        textAlign='center'
                                        component={Link}
                                        href={item.link}
                                        color='white'
                                        borderBottom={pathname === item.link ? `2px solid ${customTheme.palette.secondary.light}` : 'none'}
                                    >
                                        {item.text}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Typography
                        variant='h5'
                        noWrap
                        component={Link}
                        href='/'
                        sx={{
                            mr: 1,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                        }}
                    >
                        <Logo />
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {
                            data[language].header.map((item) => (
                                <Button
                                    key={item.text}
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        textAlign: 'center',
                                        color: 'white',
                                        display: 'block',
                                        borderBottom: pathname === item.link ? `2px solid ${customTheme.palette.secondary.light}` : 'none',
                                        borderRadius: 0
                                    }}
                                    LinkComponent={Link}
                                    href={item.link}
                                >
                                    {item.text}
                                </Button>
                            ))
                        }
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title={language === 'en' ? 'Theme editor' : 'Editor de temas'} arrow>
                            <IconButton sx={{ p: 0 }} onClick={() => setOpenThemeEditorDialog(true)}>
                                <PaletteIcon color='secondary' />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={language === 'en' ? 'Change language' : 'Trocar idioma'} arrow>
                            <IconButton sx={{ p: 0, ml: 1.5 }} onClick={handleOpenSettingsMenu}>
                                <TranslateIcon color='secondary' />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id='menu-appbar'
                            anchorEl={anchorElSettings}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            disableScrollLock
                            open={Boolean(anchorElSettings)}
                            onClose={handleCloseSettingsMenu}
                            color='primary'
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting.value} onClick={() => handleChangeLanguage(setting.value)}>
                                    <Typography textAlign='center'>{setting.title}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>

                <ThemeEditorDialog
                    open={openThemeEditorDialog}
                    onClose={() => setOpenThemeEditorDialog(false)}
                />
            </Container>
            {
                pathname !== '/' &&
                <StyledProgressBar style={{ scaleX: scaleX }} />
            }
        </AppBar>
    );
}
export default ResponsiveAppBar;
