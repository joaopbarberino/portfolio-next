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
        <Link href={href}>
            <StyledButton role='button'>
                <span>{text}</span>

                <div className='icon'>
                    <ArrowForwardIcon />
                </div>
            </StyledButton>
        </Link>
    )
}

export default HomeButton;