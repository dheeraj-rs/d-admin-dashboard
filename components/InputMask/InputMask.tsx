import { FC } from 'react';
interface InputMaskProps {
    id?: string;
    value: string;
    onChange: (e: { value: string }) => void;
    mask: string;
    placeholder?: string;
    className?: string;
}

export const InputMask: FC<InputMaskProps> = ({ id, value, onChange, mask, placeholder, className }) => {
    const formatValue = (input: string, mask: string) => {
        let result = '';
        let inputIndex = 0;

        for (let i = 0; i < mask.length && inputIndex < input.length; i++) {
            if (mask[i] === '9') {
                if (/\d/.test(input[inputIndex])) {
                    result += input[inputIndex];
                    inputIndex++;
                }
            } else if (mask[i] === 'a') {
                if (/[a-zA-Z]/.test(input[inputIndex])) {
                    result += input[inputIndex];
                    inputIndex++;
                }
            } else {
                result += mask[i];
                if (input[inputIndex] === mask[i]) {
                    inputIndex++;
                }
            }
        }
        return result;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatValue(e.target.value.replace(/\D/g, ''), mask);
        onChange({ value: formatted });
    };

    return (
        <div className={`custom-inputmask ${className || ''}`}>
            <input id={id} type="text" value={value} onChange={handleChange} placeholder={placeholder} />
        </div>
    );
};
