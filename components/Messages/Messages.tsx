import { forwardRef, useImperativeHandle, useState } from 'react';

interface MessageItem {
    severity: 'success' | 'info' | 'warn' | 'error';
    content: string;
    id: number;
}

export interface MessagesRef {
    show: (message: Omit<MessageItem, 'id'>) => void;
}

export const Messages = forwardRef<MessagesRef, {}>((_, ref) => {
    const [messages, setMessages] = useState<MessageItem[]>([]);

    useImperativeHandle(ref, () => ({
        show: (message) => {
            const newMessage = { ...message, id: Date.now() };
            setMessages((prev) => [...prev, newMessage]);

            // Auto remove after 3 seconds
            setTimeout(() => {
                setMessages((prev) => prev.filter((msg) => msg.id !== newMessage.id));
            }, 3000);
        },
    }));

    return (
        <div className="custom-messages">
            {messages.map((msg) => (
                <div key={msg.id} className={`message-item ${msg.severity}`}>
                    <span className="message-icon"></span>
                    <span className="message-content">{msg.content}</span>
                </div>
            ))}
        </div>
    );
});

Messages.displayName = 'Messages';
