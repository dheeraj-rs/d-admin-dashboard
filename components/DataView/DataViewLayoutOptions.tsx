import React from 'react';
interface DataViewLayoutOptionsProps {
    layout: string | 'grid' | 'list';
    onChange: (e: { value: 'grid' | 'list' }) => void;
}

export const DataViewLayoutOptions: React.FC<DataViewLayoutOptionsProps> = ({ layout, onChange }) => {
    const safeLayout: 'grid' | 'list' = layout === 'list' ? 'list' : 'grid';

    return (
        <div className="layout-options">
            <button className={`layout-button ${safeLayout === 'grid' ? 'active' : ''}`} onClick={() => onChange({ value: 'grid' })}>
                <i className="grid-icon" />
            </button>
            <button className={`layout-button ${safeLayout === 'list' ? 'active' : ''}`} onClick={() => onChange({ value: 'list' })}>
                <i className="list-icon" />
            </button>
        </div>
    );
};
