import { FC } from 'react';
interface ListBoxOption {
    name: string;
    code: string;
}

interface ListBoxProps {
    value?: ListBoxOption | ListBoxOption[] | null;
    options: ListBoxOption[];
    onChange?: (e: { value: ListBoxOption | ListBoxOption[] }) => void;
    multiple?: boolean;
    optionLabel?: string;
    filter?: boolean;
}

const ListBox: FC<ListBoxProps> = ({ value, options, onChange, multiple = false, optionLabel = 'name' }) => {
    const handleSelect = (option: ListBoxOption) => {
        if (multiple) {
            const currentValue = Array.isArray(value) ? value : [];
            const newValue = currentValue.includes(option) ? currentValue.filter((item) => item !== option) : [...currentValue, option];
            onChange?.({ value: newValue });
        } else {
            onChange?.({ value: option });
        }
    };

    return (
        <div className="listBox">
            {options.map((option) => (
                <div
                    key={option.code}
                    className={`option ${multiple ? ((value as ListBoxOption[])?.includes(option) ? 'selected' : '') : value === option ? 'selected' : ''}`}
                    onClick={() => handleSelect(option)}
                >
                    {option[optionLabel as keyof ListBoxOption]}
                </div>
            ))}
        </div>
    );
};

export default ListBox;
