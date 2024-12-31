import React from 'react';
interface ColumnLayoutProps {
    children: React.ReactNode;
    gap?: number;
}

const ColumnLayout: React.FC<ColumnLayoutProps> = ({ children, gap = 16 }) => {
    return (
        <div className="column-layout" style={{ gap: `${gap}px` }}>
            {children}
        </div>
    );
};

export default ColumnLayout;
