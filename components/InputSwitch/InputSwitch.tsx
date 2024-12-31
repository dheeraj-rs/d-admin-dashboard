import React from 'react';
interface InputSwitchProps {
    checked: boolean;
    value?: boolean;
    onChange: (e: { value: boolean }) => void;
}

const InputSwitch: React.FC<InputSwitchProps> = ({ checked, onChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({ value: e.target.checked });
    };

    return (
        <label className="input-switch">
            <input type="checkbox" checked={checked} onChange={handleChange} className="input-switch__input" />
            <span className="input-switch__slider"></span>
        </label>
    );
};

export default InputSwitch;
