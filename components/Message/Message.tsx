import React from 'react';

interface MessageProps {
    severity?: 'success' | 'info' | 'warn' | 'error';
    text?: string;
    children?: React.ReactNode;
}

export const Message: React.FC<MessageProps> = ({ severity = 'info', text, children }) => {
    return (
        <div className={`custom-message ${severity}`}>
            <span className="message-icon"></span>
            <span className="message-text">{text || children}</span>
        </div>
    );
};
