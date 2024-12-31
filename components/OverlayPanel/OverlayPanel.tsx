import React, { useRef, useState } from 'react';
interface OverlayPanelProps {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    appendTo?: HTMLElement | null;
    showCloseIcon?: boolean;
    id?: string;
}

export const OverlayPanel = React.forwardRef<any, OverlayPanelProps>((props, ref) => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const panelRef = useRef<HTMLDivElement>(null);

    const show = (event: any) => {
        const target = event.currentTarget;
        const rect = target.getBoundingClientRect();
        setPosition({
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX,
        });
        setVisible(true);
    };

    const hide = () => {
        setVisible(false);
    };

    React.useImperativeHandle(ref, () => ({
        show,
        hide,
    }));

    return visible ? (
        <div ref={panelRef} className="overlay-panel" style={{ ...position, ...props.style }}>
            {props.showCloseIcon && (
                <button className="overlay-panel-close" onClick={hide}>
                    ×
                </button>
            )}
            {props.children}
        </div>
    ) : null;
});

OverlayPanel.displayName = 'OverlayPanel';
