import React from 'react';
export interface TriStateCheckboxProps {
    value?: boolean | null;
    onChange?: (e: { originalEvent: React.ChangeEvent<HTMLInputElement>; value: boolean | null }) => void;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

export const TriStateCheckbox: React.FC<TriStateCheckboxProps> = ({ value, onChange, disabled = false, className = '', style }) => {
    const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (disabled) {
            return;
        }

        let newValue: boolean | null;

        if (value === null) {
            newValue = true;
        } else if (value === true) {
            newValue = false;
        } else {
            newValue = null;
        }

        if (onChange) {
            onChange({
                originalEvent: event as any,
                value: newValue,
            });
        }
    };

    const getIconClass = () => {
        if (value === true) return 'pi-check';
        if (value === false) return 'pi-times';
        return '';
    };

    return (
        <div className={`custom-tristatecheckbox ${className} ${disabled ? 'disabled' : ''}`} onClick={onClick} style={style}>
            <div className="checkbox-box">
                <i className={`checkbox-icon ${getIconClass()}`} />
            </div>
        </div>
    );
};
