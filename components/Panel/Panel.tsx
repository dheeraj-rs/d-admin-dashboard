import React, { useState } from 'react';
interface PanelProps {
    header?: React.ReactNode;
    toggleable?: boolean;
    children?: React.ReactNode;
    className?: string;
}

export const Panel: React.FC<PanelProps> = ({ header, toggleable = false, children, className }) => {
    const [expanded, setExpanded] = useState(true);

    const handleToggle = () => {
        if (toggleable) {
            setExpanded(!expanded);
        }
    };

    return (
        <div className={`panel ${className}`}>
            <div className={`panel-header ${toggleable ? 'toggleable' : ''}`} onClick={handleToggle}>
                {header}
                {toggleable && <span className={`panel-toggle-icon ${expanded ? 'expanded' : ''}`}>▼</span>}
            </div>
            {expanded && <div className="panel-content">{children}</div>}
        </div>
    );
};
