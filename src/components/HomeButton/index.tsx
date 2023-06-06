// Adapted from: https://codepen.io/Shtam3x/pen/Bevpxd

import React from 'react';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StyledButton from './styles';

interface IHomeButtonProps {
    text: string;
}

const HomeButton: React.FC<IHomeButtonProps> = ({ text }) => {
    return (
        <StyledButton href='#who' role='button'>
            <span>{text}</span>
            
            <div className='icon'>
                <ArrowForwardIcon />
            </div>
        </StyledButton>
    )
}

export default HomeButton;