import React from 'react';
// Export the interface
export interface MegaMenuItem {
    label: string;
    icon?: string;
    items?: Array<{
        label: string;
        items: Array<{
            label: string;
            icon?: string;
            command?: () => void;
        }>;
    }>;
}

interface MegaMenuProps {
    model: MegaMenuItem[];
    orientation?: 'horizontal' | 'vertical';
    breakpoint?: string;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ model, orientation = 'horizontal' }) => {
    return (
        <nav className={`megamenu megamenu--${orientation}`}>
            <ul className="megamenu__list">
                {model.map((item, index) => (
                    <li key={index} className="megamenu__item">
                        <div className="megamenu__link">
                            {item.icon && <i className={`megamenu__icon ${item.icon}`} />}
                            <span className="megamenu__label">{item.label}</span>
                        </div>
                        {item.items && (
                            <div className="megamenu__panel">
                                <div className="megamenu__grid">
                                    {item.items.map((submenu, subIndex) => (
                                        <div key={subIndex} className="megamenu__column">
                                            <h3 className="megamenu__subtitle">{submenu.label}</h3>
                                            <ul className="megamenu__submenu">
                                                {submenu.items?.map((subItem, itemIndex) => (
                                                    <li key={itemIndex} className="megamenu__submenu-item" onClick={subItem.command}>
                                                        {subItem.icon && <i className={`megamenu__submenu-icon ${subItem.icon}`} />}
                                                        <span>{subItem.label}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
};
