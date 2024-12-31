import React from 'react';
interface MenubarProps {
    model: any[];
    end?: () => React.ReactNode;
}

export const Menubar: React.FC<MenubarProps> = ({ model, end }) => {
    return (
        <nav className="menubar">
            <ul className="menubar__list">
                {model.map((item, index) => (
                    <li key={index} className="menubar__item">
                        <a href="#" className="menubar__link">
                            {item.icon && <i className={`menubar__icon ${item.icon}`} />}
                            <span className="menubar__label">{item.label}</span>
                        </a>
                        {item.items && (
                            <ul className="menubar__submenu">
                                {item.items.map((subItem: any, subIndex: number) => (
                                    <li key={subIndex} className="menubar__submenu-item">
                                        <a href="#" className="menubar__submenu-link">
                                            {subItem.icon && <i className={`menubar__submenu-icon ${subItem.icon}`} />}
                                            <span>{subItem.label}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
            {end && <div className="menubar__end">{end()}</div>}
        </nav>
    );
};
