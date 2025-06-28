import { useState, useEffect } from 'react';

export function useIsMobile(breakpoint: number = 768) {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [isClient, setIsClient] = useState<boolean>(false);

    useEffect(() => {
        setIsClient(true);

        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < breakpoint);
        };

        checkIsMobile();

        window.addEventListener('resize', checkIsMobile);

        return () => window.removeEventListener('resize', checkIsMobile);
    }, [breakpoint]);

    return isClient ? isMobile : false;
} 