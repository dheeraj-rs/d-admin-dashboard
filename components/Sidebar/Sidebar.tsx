import React from 'react';
interface SidebarProps {
    visible: boolean;
    onHide: () => void;
    position?: 'left' | 'right' | 'top' | 'bottom' | 'full';
    className?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    baseZIndex?: number;
    fullScreen?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ visible, onHide, position = 'right', className, children, style, baseZIndex = 1000, fullScreen = false }) => {
    if (!visible) return null;

    return (
        <div className="sidebar-wrapper">
            <div className="sidebar-overlay" onClick={onHide} />
            <div className={`sidebar sidebar--${position} ${visible ? 'sidebar--visible' : ''} ${className || ''}`} style={style}>
                {children}
            </div>
        </div>
    );
};
