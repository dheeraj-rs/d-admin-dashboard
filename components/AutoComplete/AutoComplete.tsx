import { FC, useState } from 'react';

interface AutoCompleteProps {
    id?: string;
    value: any;
    suggestions: any[];
    field?: string;
    placeholder?: string;
    completeMethod: (e: AutoCompleteCompleteEvent) => void;
    onChange: (e: { value: any }) => void;
    dropdown?: boolean;
    multiple?: boolean;
    className?: string;
}

export interface AutoCompleteCompleteEvent {
    originalEvent: React.SyntheticEvent;
    query: string;
}

export const AutoComplete: FC<AutoCompleteProps> = ({ id, value, onChange, suggestions, completeMethod, field, placeholder }) => {
    const [query, setQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setQuery(query);
        completeMethod({ originalEvent: e, query });
        setShowSuggestions(true);
    };

    return (
        <div className="custom-autocomplete">
            <input
                id={id}
                type="text"
                placeholder={placeholder}
                value={field ? value?.[field] : value || query}
                onChange={handleInputChange}
                onFocus={() => setShowSuggestions(true)}
            />
            {showSuggestions && suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => {
                                onChange({ value: item });
                                setShowSuggestions(false);
                            }}
                        >
                            {field ? item[field] : item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
