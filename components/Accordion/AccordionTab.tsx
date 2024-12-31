import React from 'react';

interface AccordionTabProps {
    header: React.ReactNode;
    children?: React.ReactNode;
    disabled?: boolean;
    isActive?: boolean;
    onToggle?: () => void;
}

export const AccordionTab: React.FC<AccordionTabProps> = ({ header, children, disabled = false, isActive = false, onToggle }) => {
    const handleClick = () => {
        if (!disabled && onToggle) {
            onToggle();
        }
    };

    return (
        <div className={`accordion-tab ${isActive ? 'active' : ''} ${disabled ? 'disabled' : ''}`}>
            <div className="accordion-tab-header" onClick={handleClick}>
                <span className="accordion-tab-header-text">{header}</span>
                <span className={`accordion-tab-header-icon ${isActive ? 'expanded' : ''}`}>▼</span>
            </div>
            <div className={`accordion-tab-content ${isActive ? 'active' : ''}`}>{children}</div>
        </div>
    );
};
