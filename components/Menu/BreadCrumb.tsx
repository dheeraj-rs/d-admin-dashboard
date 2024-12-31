import React from 'react';

interface BreadCrumbItem {
    label?: string;
    url?: string;
    icon?: string;
}

interface BreadCrumbProps {
    model: BreadCrumbItem[];
    home?: BreadCrumbItem;
}

export const BreadCrumb: React.FC<BreadCrumbProps> = ({ model, home }) => {
    return (
        <nav className="breadcrumb-container">
            <ul className="breadcrumb-container__list">
                {home && (
                    <li className="breadcrumb-container__item">
                        <a href={home.url} className="breadcrumb-container__link">
                            {home.icon && <i className={`breadcrumb-container__icon ${home.icon}`} />}
                            <span>{home.label}</span>
                        </a>
                        <span className="breadcrumb-container__separator">/</span>
                    </li>
                )}
                {model.map((item, index) => (
                    <li key={index} className="breadcrumb-container__item">
                        <a href={item.url} className="breadcrumb-container__link">
                            {item.icon && <i className={`breadcrumb-container__icon ${item.icon}`} />}
                            <span>{item.label}</span>
                        </a>
                        {index < model.length - 1 && <span className="breadcrumb-container__separator">/</span>}
                    </li>
                ))}
            </ul>
        </nav>
    );
};
