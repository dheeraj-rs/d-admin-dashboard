import React from 'react';
interface DialogProps {
    visible: boolean;
    onHide: () => void;
    header?: string;
    footer?: React.ReactNode;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    modal?: boolean;
    className?: string;
    breakpoints?: { [key: string]: string };
}

const getBreakpointStyles = (breakpoints?: { [key: string]: string }) => {
    if (!breakpoints) return {};
    return Object.entries(breakpoints).reduce((acc, [key, value]) => ({
        ...acc,
        [`@media screen and (max-width: ${key})`]: value
    }), {});
};

export const Dialog: React.FC<DialogProps> = ({ visible, onHide, header, footer, children, style, modal, breakpoints }) => {
    if (!visible) return null;

    return (
        <div className="dialog-wrapper">
            <div className="dialog-overlay" onClick={onHide} />
            <div className="dialog" style={{ ...style, ...getBreakpointStyles(breakpoints) }}>
                {header && <div className="dialog__header">{header}</div>}
                <div className="dialog__content">{children}</div>
                {footer && <div className="dialog__footer">{footer}</div>}
            </div>
        </div>
    );
};
