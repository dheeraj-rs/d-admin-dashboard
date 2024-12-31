import { FC, useState } from 'react';
interface CalendarProps {
    inputId?: string;
    value: Date | null;
    onChange: (e: { value: Date | null }) => void;
    showIcon?: boolean;
    showButtonBar?: boolean;
    className?: string;
    dateFormat?: string;
    placeholder?: string;
    mask?: string;
}

export const Calendar: FC<CalendarProps> = ({ inputId, value, onChange, showIcon }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const date = new Date(e.target.value);
        onChange({ value: date });
    };

    return (
        <div className="custom-calendar">
            <input id={inputId} type="date" value={value ? value.toISOString().split('T')[0] : ''} onChange={handleDateChange} />
            {showIcon && (
                <i className="calendar-icon" onClick={() => setIsOpen(!isOpen)}>
                    📅
                </i>
            )}
        </div>
    );
};
