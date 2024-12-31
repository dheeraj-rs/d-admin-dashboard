import React from 'react';
interface DividerProps {
    className?: string;
    children?: React.ReactNode;
    layout?: string;
    align?: string;
}

export const Divider: React.FC<DividerProps> = ({ className, children, layout, align }) => {
    return <div className={`divider ${layout || ''} ${align || ''} ${className || ''}`}>{children}</div>;
};
