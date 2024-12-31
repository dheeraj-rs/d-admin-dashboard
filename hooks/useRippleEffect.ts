import { ThemeManager } from '@/lib/ThemeManager';
import { useEffect, useRef } from 'react';
export const useRippleEffect = () => {
    const elementRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (element && ThemeManager.ripple) {
            element.classList.add('p-ripple');
        }

        return () => {
            element?.classList.remove('p-ripple');
        };
    }, []);

    return elementRef;
};
