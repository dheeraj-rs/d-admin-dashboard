import React from 'react';
import { createRoot } from 'react-dom/client';
interface ConfirmPopupProps {
    visible: boolean;
    onHide: () => void;
    message: string;
    header?: string;
    icon?: string;
    accept: () => void;
    reject: () => void;
    position?: { x: number; y: number };
}

export const confirmPopup = (options: { target: HTMLElement; message: string; header?: string; icon?: string; accept?: () => void; reject?: () => void }) => {
    const popupRoot = document.createElement('div');
    document.body.appendChild(popupRoot);
    const root = createRoot(popupRoot);

    const handleAccept = () => {
        options.accept?.();
        cleanup();
    };

    const handleReject = () => {
        options.reject?.();
        cleanup();
    };

    const handleHide = () => {
        cleanup();
    };

    const cleanup = () => {
        root.unmount();
        document.body.removeChild(popupRoot);
    };

    const rect = options.target.getBoundingClientRect();
    const position = {
        x: rect.left,
        y: rect.bottom + 5,
    };

    const props: ConfirmPopupProps = {
        visible: true,
        onHide: handleHide,
        message: options.message,
        header: options.header,
        icon: options.icon,
        accept: handleAccept,
        reject: handleReject,
        position,
    };

    root.render(<ConfirmPopup {...props} />);
};

export const ConfirmPopup: React.FC<ConfirmPopupProps> = ({ visible, onHide, message, header, icon, accept, reject, position }) => {
    if (!visible) return null;

    return (
        <div className="confirm-popup" style={position ? { top: position.y, left: position.x } : undefined}>
            {header && (
                <div className="confirm-popup__header">
                    {icon && <i className={`${icon} confirm-popup__icon`} />}
                    {header}
                </div>
            )}
            <div className="confirm-popup__content">{message}</div>
            <div className="confirm-popup__footer">
                <button className="confirm-popup__button confirm-popup__button--reject" onClick={reject}>
                    No
                </button>
                <button className="confirm-popup__button confirm-popup__button--accept" onClick={accept}>
                    Yes
                </button>
            </div>
        </div>
    );
};
