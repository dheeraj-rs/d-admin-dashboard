import { FC } from 'react';
interface ChipsProps {
    inputId?: string;
    value: string[];
    onChange: (e: { value: string[] }) => void;
    className?: string;
}

export const Chips: FC<ChipsProps> = ({ inputId, value = [], onChange, className }) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && e.currentTarget.value) {
            const newValue = [...value, e.currentTarget.value];
            onChange({ value: newValue });
            e.currentTarget.value = '';
        }
    };

    const removeChip = (index: number) => {
        const newValue = value.filter((_, i) => i !== index);
        onChange({ value: newValue });
    };

    return (
        <div className={`custom-chips ${className || ''}`}>
            <div className="chips-container">
                {value.map((chip, index) => (
                    <span key={index} className="chip">
                        {chip}
                        <span className="remove" onClick={() => removeChip(index)}>
                            ×
                        </span>
                    </span>
                ))}
                <input id={inputId} type="text" onKeyDown={handleKeyDown} placeholder="Enter value..." />
            </div>
        </div>
    );
};
