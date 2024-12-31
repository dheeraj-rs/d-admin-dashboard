import React, { useEffect, useState } from 'react';
export interface ToastMessage {
    severity: 'success' | 'error' | 'info' | 'warning' | 'warn';
    summary: string;
    detail?: string;
    life?: number;
}

export interface ToastRef {
    show: (message: ToastMessage) => void;
    clear: () => void;
}

export const Toast = React.forwardRef<ToastRef, {}>((props, ref) => {
    const [messages, setMessages] = useState<(ToastMessage & { id: number })[]>([]);
    const [counter, setCounter] = useState(0);

    const show = (message: ToastMessage) => {
        const newMessage = {
            ...message,
            life: message.life || 3000,
            id: counter,
        };
        setCounter((prev) => prev + 1);
        setMessages((prev) => [...prev, newMessage]);
    };

    const clear = () => {
        setMessages([]);
    };

    const remove = (id: number) => {
        setMessages((prev) => prev.filter((msg) => msg.id !== id));
    };

    React.useImperativeHandle(ref, () => ({
        show,
        clear,
    }));

    return (
        <div className="toast-container">
            {messages.map((msg) => (
                <ToastMessage key={msg.id} message={msg} onRemove={() => remove(msg.id)} />
            ))}
        </div>
    );
});
Toast.displayName = 'Toast';

const ToastMessage: React.FC<{
    message: ToastMessage;
    onRemove: () => void;
}> = ({ message, onRemove }) => {
    useEffect(() => {
        const timer = setTimeout(onRemove, message.life);
        return () => clearTimeout(timer);
    }, [message.life, onRemove]);

    const getIcon = (severity: ToastMessage['severity']) => {
        if (severity === 'success') {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                    <path d="M8 12L11 15L16 10" />
                </svg>
            );
        }
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M15 9l-6 6" />
                <path d="M9 9l6 6" />
            </svg>
        );
    };

    return (
        <div className={`toast-message toast-message--${message.severity}`}>
            <div className="toast-message__indicator" />
            <div className="toast-message__wrapper">
                <div className="toast-message__icon">{getIcon(message.severity)}</div>
                <div className="toast-message__content">
                    <div className="toast-message__summary">{message.summary}</div>
                    {message.detail && <div className="toast-message__detail">{message.detail}</div>}
                </div>
                <button className="toast-message__close" onClick={onRemove}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18" />
                        <path d="M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
};
ToastMessage.displayName = 'ToastMessage';

export default Toast;
