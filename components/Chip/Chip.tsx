import React from 'react';
interface ChipProps {
    label: string;
    className?: string;
    removable?: boolean;
    icon?: string;
    image?: string;
    onRemove?: () => void;
}

const Chip: React.FC<ChipProps> = ({ label, className = '', removable, icon, image, onRemove }) => {
    return (
        <span className={`chip ${className}`}>
            {image && <img src={image} alt={label} className="chip-image" />}
            {icon && <i className={`${icon} chip-icon`} />}
            <span className="chip-text">{label}</span>
            {removable && (
                <span className="chip-remove" onClick={onRemove}>
                    ×
                </span>
            )}
        </span>
    );
};

export default Chip;
