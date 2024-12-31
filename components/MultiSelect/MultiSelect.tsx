import { FC, useState } from 'react';

interface MultiSelectProps {
    id?: string;
    value?: any[] | null;
    options: any[];
    onChange: (e: { value: any[] }) => void;
    optionLabel: string;
    placeholder?: string;
    itemTemplate?: (option: any) => React.ReactNode;
    filter?: boolean;
    className?: string;
    display?: string;
}

export const MultiSelect: FC<MultiSelectProps> = ({
    id,
    value = null,
    options,
    onChange,
    optionLabel,
    placeholder,
    itemTemplate,
    filter = false,
    className,
    display,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOption = (option: any) => {
        const currentValue = value || [];
        const index = currentValue.findIndex((item) => item[optionLabel] === option[optionLabel]);
        let newValue;
        if (index === -1) {
            newValue = [...currentValue, option];
        } else {
            newValue = currentValue.filter((_, i) => i !== index);
        }
        onChange({ value: newValue });
    };

    return (
        <div className={`custom-multiselect ${className || ''}`}>
            <div className="multiselect-header" onClick={() => setIsOpen(!isOpen)}>
                <div className="selected-options">
                    {value && Array.isArray(value) && value.length > 0 ? value.map((v) => v[optionLabel]).join(', ') : placeholder}
                </div>
                <span className="arrow">▼</span>
            </div>
            {isOpen && (
                <ul className="multiselect-list">
                    {options.map((option, index) => (
                        <li
                            key={index}
                            onClick={() => toggleOption(option)}
                            className={(value || []).some((v) => v[optionLabel] === option[optionLabel]) ? 'selected' : ''}
                        >
                            <input type="checkbox" checked={(value || []).some((v) => v[optionLabel] === option[optionLabel])} readOnly />
                            {itemTemplate ? itemTemplate(option) : option[optionLabel]}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
