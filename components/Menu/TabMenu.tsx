import React, { useState } from 'react';
interface TabMenuItem {
    label: string;
    icon?: string;
    command?: () => void;
}

interface TabMenuProps {
    model: TabMenuItem[];
    activeIndex?: number;
    onTabChange?: (index: number) => void;
}

export const TabMenu: React.FC<TabMenuProps> = ({ model, activeIndex: propActiveIndex, onTabChange }) => {
    const [activeIndex, setActiveIndex] = useState(propActiveIndex || 0);

    const handleClick = (index: number, item: TabMenuItem) => {
        setActiveIndex(index);
        onTabChange?.(index);
        item.command?.();
    };

    return (
        <div className="tabmenu">
            {model.map((item, index) => (
                <div key={index} className={`tabmenu__item ${index === activeIndex ? 'tabmenu__item--active' : ''}`} onClick={() => handleClick(index, item)}>
                    {item.icon && <i className={`tabmenu__icon ${item.icon}`} />}
                    <span className="tabmenu__label">{item.label}</span>
                </div>
            ))}
        </div>
    );
};
