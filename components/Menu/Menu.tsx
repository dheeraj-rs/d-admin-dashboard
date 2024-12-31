import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

interface MenuItem {
    label?: string;
    icon?: string;
    command?: () => void;
    separator?: boolean;
}

interface MenuProps {
    model: MenuItem[];
    popup?: boolean;
}

export interface MenuRef {
    toggle: (event: React.MouseEvent) => void;
    hide: () => void;
}

type MenuComponent = React.ForwardRefExoticComponent<MenuProps & React.RefAttributes<MenuRef>>;

const Menu: MenuComponent = forwardRef<MenuRef, MenuProps>(({ model, popup }, ref) => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const menuRef = React.useRef<HTMLDivElement>(null);

    const calculatePosition = (event: React.MouseEvent) => {
        const rect = (event.target as HTMLElement).getBoundingClientRect();
        const menuWidth = menuRef.current?.offsetWidth || 0;
        const menuHeight = menuRef.current?.offsetHeight || 0;

        let x = rect.left;
        let y = rect.bottom;

        // Check right boundary
        if (x + menuWidth > window.innerWidth) {
            x = window.innerWidth - menuWidth - 10;
        }

        // Check bottom boundary
        if (y + menuHeight > window.innerHeight) {
            y = rect.top - menuHeight;
        }

        // Check left boundary
        if (x < 0) {
            x = 10;
        }

        // Check top boundary
        if (y < 0) {
            y = 10;
        }

        return { x, y };
    };

    useImperativeHandle(ref, () => ({
        toggle: (event: React.MouseEvent) => {
            event.stopPropagation();
            if (popup) {
                const newPosition = calculatePosition(event);
                setPosition(newPosition);
            }
            setVisible(!visible);
        },
        hide: () => {
            setVisible(false);
        },
    }));

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.custom-menu')) {
                setVisible(false);
            }
        };

        const handleResize = () => {
            setVisible(false);
        };

        if (visible) {
            document.addEventListener('click', handleClickOutside);
            window.addEventListener('resize', handleResize);
            window.addEventListener('scroll', handleResize);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleResize);
        };
    }, [visible]);

    if (!visible) return null;

    return (
        <div
            ref={menuRef}
            className={`custom-menu ${popup ? 'popup' : ''}`}
            style={
                popup
                    ? {
                          position: 'fixed',
                          left: `${position.x}px`,
                          top: `${position.y}px`,
                      }
                    : {}
            }
        >
            <ul className="menu-list">
                {model.map((item, index) =>
                    item.separator ? (
                        <li key={index} className="menu-separator" />
                    ) : (
                        <li
                            key={index}
                            className="menu-item"
                            onClick={() => {
                                if (item.command) {
                                    item.command();
                                }
                                setVisible(false);
                            }}
                        >
                            {item.icon && <i className={`menu-icon ${item.icon}`} />}
                            <span className="menu-label">{item.label}</span>
                        </li>
                    )
                )}
            </ul>
        </div>
    );
});

Menu.displayName = 'Menu';

export { Menu };
