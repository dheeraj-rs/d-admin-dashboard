import { RefObject, useEffect, useRef, useState } from 'react';

export const useIsMobileWithSSR = (breakpoint: number = 991): boolean => {
    const isClient = typeof window !== 'undefined';
    const [isMobile, setIsMobile] = useState<boolean>(() => {
        return isClient ? window.innerWidth < breakpoint : false;
    });
    useEffect(() => {
        if (!isClient) return;
        const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [breakpoint, isClient]);
    return isMobile;
};

export const useOutsideAlerter = <T extends HTMLElement>(ref: RefObject<T>, setOpen: (isOpen: boolean) => void): void => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [ref, setOpen]);
};

type EventListenerHookResult = [(node?: HTMLElement) => void, () => void];

interface UseEventListenerProps {
    type: keyof WindowEventMap;
    listener: (event: Event) => void;
    options?: AddEventListenerOptions;
}

export const useEventListener = ({ type, listener, options = {} }: UseEventListenerProps): EventListenerHookResult => {
    const savedListener = useRef(listener);

    useEffect(() => {
        savedListener.current = listener;
    }, [listener]);

    const bind = (node?: HTMLElement) => {
        const targetNode = node || document;
        targetNode.addEventListener(type, savedListener.current, options);
    };

    const unbind = () => {
        document.removeEventListener(type, savedListener.current);
    };

    return [bind, unbind];
};

export const useUnmountEffect = (fn: () => void) => {
    useEffect(() => {
        return () => {
            fn();
        };
    }, [fn]);
};
