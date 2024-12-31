import React, { useEffect, useRef, useState } from 'react';

interface MenuItem {
    label?: string;
    icon?: string;
    command?: () => void;
    items?: MenuItem[];
    separator?: boolean;
}

interface ContextMenuProps {
    model: MenuItem[];
    target?: string;
    breakpoint?: string;
}

export interface ContextMenuRef {
    setVisible: (visible: boolean) => void;
}

export const ContextMenu = React.forwardRef<ContextMenuRef, ContextMenuProps>(({ model, target }, ref) => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const menuRef = useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => ({
        setVisible,
    }));

    useEffect(() => {
        const targetElement = target ? document.querySelector(target) : document;

        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            setVisible(true);
            setPosition({ x: e.pageX, y: e.pageY });
        };

        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setVisible(false);
            }
        };

        targetElement?.addEventListener('contextmenu', handleContextMenu as EventListener);
        document.addEventListener('click', handleClickOutside as EventListener);

        return () => {
            targetElement?.removeEventListener('contextmenu', handleContextMenu as EventListener);
            document.removeEventListener('click', handleClickOutside as EventListener);
        };
    }, [target]);

    if (!visible) return null;

    return (
        <div ref={menuRef} className="contextmenu" style={{ left: position.x, top: position.y }}>
            <ul className="contextmenu__list">
                {model.map((item, index) =>
                    item.separator ? (
                        <li key={index} className="contextmenu__separator" />
                    ) : (
                        <li
                            key={index}
                            className="contextmenu__item"
                            onClick={() => {
                                item.command?.();
                                setVisible(false);
                            }}
                        >
                            {item.icon && <i className={`contextmenu__icon ${item.icon}`} />}
                            <span className="contextmenu__label">{item.label}</span>
                        </li>
                    )
                )}
            </ul>
        </div>
    );
});

ContextMenu.displayName = 'ContextMenu';
