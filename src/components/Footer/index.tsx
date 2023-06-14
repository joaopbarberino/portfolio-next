import { Container, Typography, IconButton } from '@mui/material';
import StyledFooterContainer from './styles';
import Logo from '../AppBar/logo';
import CodeIcon from '@mui/icons-material/Code';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Grid from '@mui/material/Unstable_Grid2';

const Footer = () => {
    return (
        <StyledFooterContainer>
            <Container maxWidth='xl'>
                <Grid container>
                    <Grid xs={0} lg={4}></Grid>

                    <Grid className='copyright' xs={12} sm={6} lg={4}>
                        <Typography variant='h5'>
                            <CodeIcon /> | <span>JOÃO PEDRO BARBERINO</span> © {(new Date()).getFullYear()}
                        </Typography>
                    </Grid>

                    <Grid className='socials' xs={12} sm={6} lg={4}>
                        <IconButton href='https://github.com/joaopbarberino' target='_blank'>
                            <GitHubIcon />
                        </IconButton>
                        <IconButton href='https://linkedin.com/in/joao-p-barberino' target='_blank'>
                            <LinkedInIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Container>
        </StyledFooterContainer>
    )
};

export default Footer;