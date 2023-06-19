// Adapted from: https://codepen.io/Shtam3x/pen/Bevpxd

import React from 'react';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StyledButton from './styles';
import Link from '@/components/Link';

interface IPageChangeButtonProps {
    text: string;
    href: string;
    type?: 'next' | 'prev';
}

const PageChangeButton: React.FC<IPageChangeButtonProps> = ({ text, href, type = 'next' }) => {
    return (
        <StyledButton role='button' className={type}>
            <Link href={href}>
                <span>{text}</span>

                <div className='icon'>
                    <ArrowForwardIcon />
                </div>
            </Link>
        </StyledButton>
    )
}

export default PageChangeButton;