import React from 'react';

interface OrderListProps {
    value: any[];
    listStyle?: React.CSSProperties;
    className?: string;
    header?: string;
    itemTemplate: (item: any) => React.ReactNode;
    onChange: (e: { value: any[] }) => void;
}

export const OrderList: React.FC<OrderListProps> = ({ value, listStyle, className, header, itemTemplate, onChange }) => {
    const moveItem = (fromIndex: number, toIndex: number) => {
        const newValue = [...value];
        const [removed] = newValue.splice(fromIndex, 1);
        newValue.splice(toIndex, 0, removed);
        onChange({ value: newValue });
    };

    return (
        <div className={`orderlist ${className || ''}`}>
            {header && <div className="orderlist-header">{header}</div>}
            <ul className="orderlist-list" style={listStyle}>
                {value.map((item, index) => (
                    <li key={index} className="orderlist-item">
                        <div className="orderlist-item-content">{itemTemplate(item)}</div>
                        <div className="orderlist-controls">
                            <button className="orderlist-button" onClick={() => index > 0 && moveItem(index, index - 1)} disabled={index === 0}>
                                ↑
                            </button>
                            <button
                                className="orderlist-button"
                                onClick={() => index < value.length - 1 && moveItem(index, index + 1)}
                                disabled={index === value.length - 1}
                            >
                                ↓
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
