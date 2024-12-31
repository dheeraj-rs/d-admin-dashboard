import React from 'react';
interface PickListProps<T> {
    source: T[];
    target: T[];
    sourceHeader?: string;
    targetHeader?: string;
    itemTemplate: (item: T) => React.ReactNode;
    onChange: (e: { source: T[]; target: T[] }) => void;
    sourceStyle?: React.CSSProperties;
    targetStyle?: React.CSSProperties;
}

export const PickList = <T,>({ source, target, sourceHeader, targetHeader, itemTemplate, onChange, sourceStyle, targetStyle }: PickListProps<T>) => {
    const moveToTarget = (item: T) => {
        const newSource = source.filter((i) => i !== item);
        const newTarget = [...target, item];
        onChange({ source: newSource, target: newTarget });
    };

    const moveToSource = (item: T) => {
        const newTarget = target.filter((i) => i !== item);
        const newSource = [...source, item];
        onChange({ source: newSource, target: newTarget });
    };

    return (
        <div className="picklist">
            <div className="picklist-list-wrapper" style={sourceStyle}>
                {sourceHeader && <div className="picklist-header">{sourceHeader}</div>}
                <ul className="picklist-list">
                    {source.map((item, index) => (
                        <li key={index} className="picklist-item" onClick={() => moveToTarget(item)}>
                            {itemTemplate(item)}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="picklist-list-wrapper" style={targetStyle}>
                {targetHeader && <div className="picklist-header">{targetHeader}</div>}
                <ul className="picklist-list">
                    {target.map((item, index) => (
                        <li key={index} className="picklist-item" onClick={() => moveToSource(item)}>
                            {itemTemplate(item)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
