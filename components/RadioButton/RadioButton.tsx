import React from 'react';
interface RadioButtonProps {
    name: string;
    value: string | boolean;
    checked: boolean;
    onChange: (e: { value: string }) => void;
    inputId: string;
}

const RadioButton: React.FC<RadioButtonProps> = ({ name, value, checked, onChange, inputId }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({ value: e.target.value });
    };

    return (
        <div className="radio-button">
            <input type="radio" id={inputId} name={name} value={String(value)} checked={checked} onChange={handleChange} />
            <span className="radio-button__custom"></span>
        </div>
    );
};

export default RadioButton;
