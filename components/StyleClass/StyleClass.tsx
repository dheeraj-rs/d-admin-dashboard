import React, { useEffect, useRef } from 'react';
interface StyleClassProps {
    nodeRef: React.RefObject<HTMLElement>;
    selector?: string;
    enterClassName?: string;
    leaveToClassName?: string;
    hideOnOutsideClick?: boolean;
    children: React.ReactNode;
}

export const StyleClass: React.FC<StyleClassProps> = ({ nodeRef, selector, enterClassName, leaveToClassName, hideOnOutsideClick, children }) => {
    const targetRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (selector) {
            const element = document.querySelector(selector);
            if (element instanceof HTMLElement) {
                targetRef.current = element;
            }
        }
    }, [selector]);

    useEffect(() => {
        if (hideOnOutsideClick) {
            const handleOutsideClick = (event: MouseEvent) => {
                if (nodeRef.current && !nodeRef.current.contains(event.target as Node)) {
                    if (targetRef.current) {
                        targetRef.current.classList.add(leaveToClassName || '');
                        targetRef.current.classList.remove(enterClassName || '');
                    }
                }
            };

            document.addEventListener('click', handleOutsideClick);
            return () => document.removeEventListener('click', handleOutsideClick);
        }
    }, [hideOnOutsideClick, nodeRef, enterClassName, leaveToClassName]);

    const toggle = () => {
        if (targetRef.current) {
            if (targetRef.current.classList.contains(enterClassName || '')) {
                targetRef.current.classList.remove(enterClassName || '');
                targetRef.current.classList.add(leaveToClassName || '');
            } else {
                targetRef.current.classList.add(enterClassName || '');
                targetRef.current.classList.remove(leaveToClassName || '');
            }
        }
    };

    return <div onClick={toggle}>{children}</div>;
};
