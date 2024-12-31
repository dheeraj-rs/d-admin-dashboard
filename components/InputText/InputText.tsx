import React from 'react';
interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    tooltip?: string;
    tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
}

export const InputText: React.FC<InputTextProps> = ({ className, tooltip, tooltipPosition = 'bottom', ...props }) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [showTooltip, setShowTooltip] = React.useState(false);

    return (
        <div className="input-text-wrapper" style={{ position: 'relative' }}>
            <input
                ref={inputRef}
                type="text"
                className={`input-text ${className || ''}`}
                onMouseEnter={() => tooltip && setShowTooltip(true)}
                onMouseLeave={() => tooltip && setShowTooltip(false)}
                {...props}
            />
            {tooltip && showTooltip && <div className={`tooltip tooltip-${tooltipPosition}`}>{tooltip}</div>}
        </div>
    );
};
