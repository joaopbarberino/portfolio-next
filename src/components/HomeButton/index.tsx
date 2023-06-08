// Adapted from: https://codepen.io/Shtam3x/pen/Bevpxd

import React from 'react';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StyledButton from './styles';
import Link from '@/components/Link';

interface IHomeButtonProps {
    text: string;
    href: string;
}

const HomeButton: React.FC<IHomeButtonProps> = ({ text, href }) => {
    return (
        <StyledButton role='button'>
            <Link href={href}>
                <span>{text}</span>

                <div className='icon'>
                    <ArrowForwardIcon />
                </div>
            </Link>
        </StyledButton>
    )
}

export default HomeButton;