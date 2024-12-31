import { FC, useEffect, useState } from 'react';

export interface DropdownChangeEvent {
    originalEvent: React.MouseEvent;
    value: any;
}
interface DropdownProps {
    id?: string;
    value: any;
    options: Array<{ [key: string]: any }>;
    onChange: (e: { originalEvent: React.MouseEvent; value: any }) => void;
    optionLabel?: string;
    placeholder?: string;
    className?: string;
    itemTemplate?: (option: any) => React.ReactNode;
    showClear?: boolean;
    filter?: boolean;
}

export const Dropdown: FC<DropdownProps> = ({
    id,
    value,
    options,
    onChange,
    optionLabel = 'label',
    placeholder,
    className,
    itemTemplate,
    showClear = false,
    filter = false,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [filterValue, setFilterValue] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);

    useEffect(() => {
        const filteredOpts = options.filter((option) => !value || option[optionLabel] !== value[optionLabel]);
        setFilteredOptions(filteredOpts);
    }, [options, value, optionLabel]);

    const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchText = e.target.value;
        setFilterValue(searchText);

        if (searchText.trim() === '') {
            setFilteredOptions(options.filter((option) => !value || option[optionLabel] !== value[optionLabel]));
        } else {
            const filtered = options.filter(
                (option) => option[optionLabel].toLowerCase().includes(searchText.toLowerCase()) && (!value || option[optionLabel] !== value[optionLabel])
            );
            setFilteredOptions(filtered);
        }
    };

    const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target.closest('.custom-dropdown')) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`custom-dropdown ${className || ''}`}>
            <div className="dropdown-header" onClick={toggleDropdown}>
                <span>{value ? value[optionLabel] : placeholder}</span>
                {showClear && value && (
                    <span
                        className="clear-icon"
                        onClick={(e) => {
                            e.stopPropagation();
                            onChange({ originalEvent: e, value: null });
                            setIsOpen(false);
                        }}
                    >
                        ×
                    </span>
                )}
                <span className="arrow">▼</span>
            </div>
            {isOpen && (
                <div className="dropdown-panel">
                    {filter && (
                        <div className="dropdown-filter">
                            <input type="text" value={filterValue} onChange={handleFilter} placeholder="Search..." onClick={(e) => e.stopPropagation()} />
                        </div>
                    )}
                    <ul className="dropdown-list">
                        {filteredOptions.map((option, index) => (
                            <li
                                key={index}
                                onClick={(event) => {
                                    onChange({
                                        originalEvent: event,
                                        value: option,
                                    });
                                    setIsOpen(false);
                                    setFilterValue('');
                                }}
                            >
                                {itemTemplate ? itemTemplate(option) : option[optionLabel]}
                            </li>
                        ))}
                        {filteredOptions.length === 0 && <li className="dropdown-empty-message">No results found</li>}
                    </ul>
                </div>
            )}
        </div>
    );
};
