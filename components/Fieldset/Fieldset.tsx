import React, { useState } from 'react';
interface FieldsetProps {
    legend?: React.ReactNode;
    toggleable?: boolean;
    children?: React.ReactNode;
}

export const Fieldset: React.FC<FieldsetProps> = ({ legend, toggleable = false, children }) => {
    const [expanded, setExpanded] = useState(true);

    const handleToggle = () => {
        if (toggleable) {
            setExpanded(!expanded);
        }
    };

    return (
        <fieldset className="fieldset">
            <legend className={`fieldset-legend ${toggleable ? 'toggleable' : ''}`} onClick={handleToggle}>
                <span className="fieldset-legend-text">{legend}</span>
                {toggleable && <span className={`fieldset-toggle-icon ${expanded ? 'expanded' : ''}`}>▼</span>}
            </legend>
            {expanded && <div className="fieldset-content">{children}</div>}
        </fieldset>
    );
};
