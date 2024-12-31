import React from 'react';
interface MenuItem {
    label?: string;
    icon?: string;
    items?: MenuItem[];
    command?: () => void;
    separator?: boolean;
}

interface TieredMenuProps {
    model: MenuItem[];
    popup?: boolean;
}

export const TieredMenu: React.FC<TieredMenuProps> = ({ model, popup }) => {
    const renderMenuItem = (item: MenuItem, level: number = 0) => {
        return (
            <li className="tieredmenu__item">
                <div className="tieredmenu__link" onClick={item.command}>
                    {item.icon && <i className={`tieredmenu__icon ${item.icon}`} />}
                    <span className="tieredmenu__label">{item.label}</span>
                    {item.items && <i className="tieredmenu__submenu-icon pi pi-angle-right" />}
                </div>
                {item.items && <ul className="tieredmenu__submenu">{item.items.map((subItem) => renderMenuItem(subItem, level + 1))}</ul>}
            </li>
        );
    };

    return (
        <div className={`tieredmenu ${popup ? 'tieredmenu--popup' : ''}`}>
            <ul className="tieredmenu__list">{model.map((item, index) => renderMenuItem(item))}</ul>
        </div>
    );
};
