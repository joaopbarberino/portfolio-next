import Typography from '@mui/material/Typography';
import CodeIcon from '@mui/icons-material/Code';
import { StyledLogo } from './styles';

const Logo = () => {
    return (
        <StyledLogo>
            <CodeIcon color='secondary' />
            <hr />
            <div className='name'>
                <Typography className='up'>JOÃO PEDRO</Typography>
                <Typography className='down'>BARBERINO</Typography>
            </div>
        </StyledLogo>
    )
};

export default Logo;