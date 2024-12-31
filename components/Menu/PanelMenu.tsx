import React, { useState } from 'react';
interface PanelMenuItem {
    label: string;
    icon?: string;
    items?: PanelMenuItem[];
    command?: () => void;
}

interface PanelMenuProps {
    model: PanelMenuItem[];
}

export const PanelMenu: React.FC<PanelMenuProps> = ({ model }) => {
    const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

    const toggleItem = (index: number) => {
        const newExpanded = new Set(expandedItems);
        if (newExpanded.has(index)) {
            newExpanded.delete(index);
        } else {
            newExpanded.add(index);
        }
        setExpandedItems(newExpanded);
    };

    const renderItems = (items: PanelMenuItem[], level: number = 0) => {
        return items.map((item, index) => (
            <div key={index} className={`panelmenu__item panelmenu__item--level-${level}`}>
                <div className="panelmenu__header" onClick={() => (item.items ? toggleItem(index) : item.command?.())}>
                    {item.icon && <i className={`panelmenu__icon ${item.icon}`} />}
                    <span className="panelmenu__label">{item.label}</span>
                    {item.items && <i className={`panelmenu__submenu-icon ${expandedItems.has(index) ? 'pi pi-chevron-down' : 'pi pi-chevron-right'}`} />}
                </div>
                {item.items && expandedItems.has(index) && <div className="panelmenu__content">{renderItems(item.items, level + 1)}</div>}
            </div>
        ));
    };

    return <div className="panelmenu">{renderItems(model)}</div>;
};
