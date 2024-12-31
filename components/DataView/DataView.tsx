import React from 'react';
interface DataViewProps<T> {
    value: T[];
    layout: 'grid' | 'list';
    paginator?: boolean;
    rows?: number;
    sortOrder?: number | null;
    sortField?: string;
    header?: React.ReactNode;
    itemTemplate: (item: T, layout: 'grid' | 'list') => React.ReactNode;
}

export const DataView = <T extends object>({ value, layout, paginator, rows, header, itemTemplate }: DataViewProps<T>) => {
    const [currentPage, setCurrentPage] = React.useState(0);
    const totalPages = rows ? Math.ceil(value.length / rows) : 1;

    const getCurrentPageItems = () => {
        if (!rows) return value;
        const start = currentPage * rows;
        return value.slice(start, start + rows);
    };

    const contentClassName: string = `dataview-content ${layout as 'grid' | 'list'}`;

    return (
        <div className="dataview">
            {header && <div className="dataview-header">{header}</div>}
            <div className={contentClassName}>
                {getCurrentPageItems().map((item, index) => (
                    <div key={index} className="dataview-item">
                        {itemTemplate(item, layout)}
                    </div>
                ))}
            </div>
            {paginator && (
                <div className="dataview-paginator">
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button key={index} className={`paginator-button ${currentPage === index ? 'active' : ''}`} onClick={() => setCurrentPage(index)}>
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
