import React, { ReactNode, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import data from '@/helpers/data.json';

interface ILayoutProps {
    children: ReactNode;
    title?: string;
    description?: string;
};

interface IRoute {
    pathname: string;
    weight: number;
}

const variantsToRight = {
    hidden: { opacity: 0, x: 0, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 100, y: 0 },
};

const variantsToLeft = {
    hidden: { opacity: 0, x: 0, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: -100, y: 0 },
};

const Layout: React.FC<ILayoutProps> = ({ children, title, description }) => {
    const router = useRouter();

    const [variants, setVariants] = useState(variantsToRight);

    const routes: IRoute[] = data.en.header.map((item, index) => { return { pathname: item.link, weight: index } });

    useEffect(() => {
        router.events.on('routeChangeStart', (url) => {
            const nextRoute: IRoute | undefined = routes.filter(route => route.pathname === url)[0];
            const currentRoute: IRoute | undefined = routes.filter(route => route.pathname === router.pathname)[0];
            
            if (nextRoute && currentRoute) {
                if (nextRoute.weight > currentRoute.weight) {
                    setVariants(variantsToLeft);
                } else {
                    setVariants(variantsToRight);
                }
            }; 
        });
    });

    return (
        <div>
            <motion.main
                initial='hidden'
                animate='enter'
                exit='exit'
                variants={variants}
                transition={{ type: 'linear' }}
            >
                {children}
            </motion.main>
        </div>
    );
};

export default Layout;