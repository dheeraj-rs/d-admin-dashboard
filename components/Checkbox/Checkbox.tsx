import { ChangeEvent, FC } from 'react';
// Update the type to use the imported ChangeEvent
export type CheckboxChangeEvent = ChangeEvent<HTMLInputElement>;

interface CheckboxProps {
    id?: string;
    inputId?: string;
    name?: string;
    value?: string;
    checked: boolean;
    onChange: ((e: CheckboxChangeEvent) => void) | ((value: boolean) => void);
    className?: string;
}

// Update FC reference to use imported type
const Checkbox: FC<CheckboxProps> = ({ inputId, id, name, value, checked, onChange, className = '' }) => {
    const handleChange = (e: CheckboxChangeEvent): void => {
        if (onChange) {
            // Type guard to determine which function signature to use
            if (onChange.length === 1) {
                (onChange as (value: boolean) => void)(e.target.checked);
            } else {
                (onChange as (e: CheckboxChangeEvent) => void)(e);
            }
        }
    };

    return (
        <div className={`checkbox-wrapper ${className}`}>
            <input id={inputId || id} type="checkbox" name={name} value={value} checked={checked} onChange={handleChange} className="checkbox-input" />
            <span className="checkbox-custom"></span>
        </div>
    );
};

export default Checkbox;
