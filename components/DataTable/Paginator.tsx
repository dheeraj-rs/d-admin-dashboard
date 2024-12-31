import React from 'react';
interface PaginatorProps {
    first: number;
    rows: number;
    totalRecords: number;
    onPageChange: (page: number) => void;
}

export const Paginator: React.FC<PaginatorProps> = ({ first, rows, totalRecords, onPageChange }) => {
    const pageCount = Math.ceil(totalRecords / rows);
    const pages = Array.from({ length: pageCount }, (_, i) => i);

    return (
        <div className="custom-paginator">
            <button className="paginator-prev" disabled={first === 0} onClick={() => onPageChange(first - 1)}>
                Previous
            </button>

            <div className="paginator-pages">
                {pages.map((page) => (
                    <button key={page} className={`paginator-page ${page === first ? 'active' : ''}`} onClick={() => onPageChange(page)}>
                        {page + 1}
                    </button>
                ))}
            </div>

            <button className="paginator-next" disabled={first === pageCount - 1} onClick={() => onPageChange(first + 1)}>
                Next
            </button>
        </div>
    );
};
