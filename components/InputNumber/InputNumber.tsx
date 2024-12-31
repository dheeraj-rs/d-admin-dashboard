import { ChangeEvent, useState } from 'react';

// Add this type definition
export type InputNumberChangeEvent = ChangeEvent<HTMLInputElement>;

interface InputNumberProps {
    id?: string;
    value: number | null | undefined;
    onValueChange?: (value: number | null) => void;
    onChange?: (value: number | null) => void;
    min?: number;
    max?: number;
    step?: number;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    showButtons?: boolean;
    mode?: 'decimal' | 'currency';
    currency?: string;
    locale?: string;
}

const InputNumber = ({
    id,
    value,
    onValueChange,
    onChange,
    min,
    max,
    step = 1,
    placeholder,
    disabled,
    className,
    showButtons = true,
    mode = 'decimal',
    currency,
    locale = 'en-US',
}: InputNumberProps) => {
    const formatValue = (val: number | null | undefined): string => {
        if (val === null || val === undefined) return '';
        if (mode === 'currency' && currency) {
            return new Intl.NumberFormat(locale, {
                style: 'currency',
                currency: currency,
            }).format(val);
        }
        return val.toString();
    };

    const [inputValue, setInputValue] = useState<string>(formatValue(value));

    const handleChange = (e: InputNumberChangeEvent) => {
        const newValue = e.target.value;
        setInputValue(newValue);

        if (newValue === '') {
            onValueChange?.(null);
            onChange?.(null);
            return;
        }

        const numValue = parseFloat(newValue);
        if (!isNaN(numValue)) {
            if (min !== undefined && numValue < min) return;
            if (max !== undefined && numValue > max) return;
            onValueChange?.(numValue);
            onChange?.(numValue);
        }
    };

    const handleIncrement = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (disabled || (max !== undefined && value !== null && value !== undefined && value >= max)) return;
        onValueChange?.((value ?? 0) + step);
        onChange?.((value ?? 0) + step);
    };

    const handleDecrement = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (disabled || (min !== undefined && value !== null && value !== undefined && value <= min)) return;
        onValueChange?.((value ?? 0) - step);
        onChange?.((value ?? 0) - step);
    };

    return (
        <div className={`inputNumber ${className}`}>
            <input
                id={id}
                type="number"
                value={inputValue}
                onChange={handleChange}
                min={min}
                max={max}
                step={step}
                placeholder={placeholder}
                disabled={disabled}
                className="inputNumber__input"
            />
            {showButtons && (
                <div className="inputNumber__buttons">
                    <button
                        className="inputNumber__button"
                        onClick={handleIncrement}
                        disabled={disabled || (max !== undefined && value !== null && value !== undefined && value >= max)}
                    >
                        ▲
                    </button>
                    <button
                        className="inputNumber__button"
                        onClick={handleDecrement}
                        disabled={disabled || (min !== undefined && value !== null && value !== undefined && value <= min)}
                    >
                        ▼
                    </button>
                </div>
            )}
        </div>
    );
};

export default InputNumber;
