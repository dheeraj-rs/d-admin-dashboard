import { FC } from 'react';

interface ToggleButtonProps {
    checked?: boolean;
    onChange?: (e: { value: boolean }) => void;
    onLabel?: string;
    offLabel?: string;
    onIcon?: string;
    offIcon?: string;
    disabled?: boolean;
    style?: React.CSSProperties;
}

const ToggleButton: FC<ToggleButtonProps> = ({ checked = false, onChange, onLabel = 'On', offLabel = 'Off', onIcon, offIcon, disabled = false, style }) => {
    const handleClick = () => {
        if (!disabled) {
            onChange?.({ value: !checked });
        }
    };

    return (
        <button
            className={`toggleButton ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''}`}
            onClick={handleClick}
            disabled={disabled}
            type="button"
            role="switch"
            aria-checked={checked}
            style={style}
        >
            {(checked ? onIcon : offIcon) && <span className="icon">{checked ? onIcon : offIcon}</span>}
            <span className="label">{checked ? onLabel : offLabel}</span>
        </button>
    );
};

export default ToggleButton;
