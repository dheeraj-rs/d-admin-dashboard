import React from 'react';
interface StepItem {
    label: string;
    icon?: string;
}

interface StepsProps {
    model: StepItem[];
    activeIndex: number;
    onSelect?: (index: number) => void;
    readOnly?: boolean;
}

export const Steps: React.FC<StepsProps> = ({ model, activeIndex, onSelect, readOnly }) => {
    return (
        <div className="steps">
            {model.map((item, index) => (
                <div key={index} className={`steps__item ${index === activeIndex ? 'steps__item--active' : ''}`} onClick={() => !readOnly && onSelect?.(index)}>
                    <div className="steps__number">{index + 1}</div>
                    {item.icon && <i className={`steps__icon ${item.icon}`} />}
                    <span className="steps__label">{item.label}</span>
                </div>
            ))}
        </div>
    );
};
