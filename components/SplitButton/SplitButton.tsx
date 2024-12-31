import { Button } from '@/components/Button/Button';
import React, { useRef, useState } from 'react';

interface SplitButtonItem {
    label: string;
    icon?: string;
    command?: () => void;
}

interface SplitButtonProps {
    label: string;
    icon?: string;
    model: SplitButtonItem[];
    severity?: 'secondary' | 'success' | 'info' | 'warning' | 'danger';
    className?: string;
    menuStyle?: React.CSSProperties;
}

export const SplitButton: React.FC<SplitButtonProps> = ({ label, icon, model, severity, className, menuStyle }) => {
    const [visible, setVisible] = useState(false);
    const buttonRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        setVisible(!visible);
    };

    const onItemClick = (item: SplitButtonItem) => {
        if (item.command) {
            item.command();
        }
        setVisible(false);
    };

    return (
        <div className="splitButton" ref={buttonRef}>
            <Button label={label} icon={icon} severity={severity} className={className} />
            <Button icon="pi pi-chevron-down" severity={severity} className="menuButton" onClick={toggleMenu} />
            {visible && (
                <ul className="menu" style={menuStyle}>
                    {model.map((item, index) => (
                        <li key={index} onClick={() => onItemClick(item)}>
                            {item.icon && <i className={item.icon}></i>}
                            <span>{item.label}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
