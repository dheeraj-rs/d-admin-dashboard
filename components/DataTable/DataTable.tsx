import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { FilterMatchModeType, FilterOperatorType } from '../api/FilterTypes';
export interface DataTableRef {
    // Add any methods/properties you want to expose via the ref
    getElement: () => HTMLDivElement | null;
    exportCSV: () => void;
}

export interface DataTableFilterMeta {
    value: any;
    matchMode: FilterMatchModeType;
    operator?: FilterOperatorType;
}

export interface DataTableExpandedRows {
    [key: string]: boolean;
}

export interface DataTableSelectEvent {
    originalEvent: Event;
    data: any;
}

export interface DataTableProps {
    value?: any[] | null;
    ref?: React.Ref<DataTableRef>;
    dataKey?: string;
    rows?: number;
    first?: number;
    totalRecords?: number;
    paginator?: boolean;
    paginatorPosition?: 'top' | 'bottom' | 'both';
    filters?: { [key: string]: DataTableFilterMeta };
    globalFilter?: any;
    filterDisplay?: 'menu' | 'row';
    loading?: boolean;
    scrollable?: boolean;
    scrollHeight?: string;
    expandedRows?: DataTableExpandedRows;
    onExpandedRowsChange?: (expandedRows: DataTableExpandedRows) => void;
    rowExpansionTemplate?: (data: any) => React.ReactNode;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    onFilter?: (filters: { [key: string]: DataTableFilterMeta }) => void;
    onSort?: (field: string, order: 1 | -1) => void;
    onPage?: (first: number, rows: number) => void;
    children?: React.ReactNode;
    selection?: any;
    selectionMode?: 'single' | 'multiple';
    onSelectionChange?: (selection: any) => void;
    onRowSelect?: (event: DataTableSelectEvent) => void;
    responsiveLayout?: string;
    rowGroupMode?: 'subheader' | 'rowspan';
    groupRowsBy?: string;
    sortMode?: 'single' | 'multiple';
    rowGroupHeaderTemplate?: (data: any) => React.ReactNode;
    rowGroupFooterTemplate?: (data: any) => React.ReactNode;
    sortField?: string;
    sortOrder?: 1 | -1;
    onRowToggle?: (e: { data: DataTableExpandedRows }) => void;
    showGridlines?: boolean;
    emptyMessage?: React.ReactNode;
    rowsPerPageOptions?: number[];
    paginatorTemplate?: string;
    currentPageReportTemplate?: string;
}

const generateCSVContent = (data: any[]): string => {
    if (!data.length) return '';
    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(','), ...data.map((row) => headers.map((header) => JSON.stringify(row[header])).join(','))];
    return csvRows.join('\n');
};

export const DataTable = React.forwardRef<DataTableRef, DataTableProps>(
    (
        {
            value = [],
            dataKey = 'id',
            rows = 10,
            first = 0,
            filters,
            loading = false,
            header,
            footer,
            children,
            className = '',
            onSort,
            onFilter,
            onPage,
            selection,
            selectionMode,
            onSelectionChange,
            onRowSelect,
            responsiveLayout,
            expandedRows = {} as DataTableExpandedRows,
            onRowToggle,
            showGridlines = false,
            emptyMessage = 'No records found',
            rowsPerPageOptions = [10, 25, 50],
        },
        ref
    ) => {
        const [sortField, setSortField] = useState<string | null>(null);
        const [sortOrder, setSortOrder] = useState<1 | -1>(1);
        const [currentFilters, setCurrentFilters] = useState<{ [key: string]: DataTableFilterMeta }>(filters || {});
        const [currentPage, setCurrentPage] = useState(first);

        const tableRef = useRef<HTMLDivElement>(null);

        const exportCSV = () => {
            if (!value || value.length === 0) return;

            const csvContent = generateCSVContent(value);
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);

            link.setAttribute('href', url);
            link.setAttribute('download', 'table-export.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };

        useImperativeHandle(ref, () => ({
            getElement: () => tableRef.current,
            exportCSV,
        }));

        useEffect(() => {
            setCurrentFilters(filters || {});
        }, [filters]);

        const handleSort = (field: string) => {
            const newOrder = sortField === field && sortOrder === 1 ? -1 : 1;
            setSortField(field);
            setSortOrder(newOrder);
            onSort?.(field, newOrder);
        };

        const handleFilter = (field: string, value: any, matchMode: FilterMatchModeType) => {
            const newFilters = {
                ...currentFilters,
                [field]: { value, matchMode },
            };
            setCurrentFilters(newFilters);
            onFilter?.(newFilters);
        };

        const handleRowClick = (event: React.MouseEvent, rowData: any) => {
            if (!selectionMode) return;

            if (selectionMode === 'single') {
                onSelectionChange?.(rowData);
                onRowSelect?.({
                    originalEvent: event.nativeEvent,
                    data: rowData,
                });
            }
            // Add multiple selection logic here if needed
        };

        const renderHeader = () => {
            return React.Children.map(children, (column: any) => {
                if (!column) return null;

                return (
                    <th
                        className={`datatable-column-header ${column.props.sortable ? 'sortable' : ''}`}
                        onClick={() => column.props.sortable && handleSort(column.props.field)}
                    >
                        {column.props.header}
                        {sortField === column.props.field && <span className={`sort-icon ${sortOrder === 1 ? 'asc' : 'desc'}`} />}
                    </th>
                );
            });
        };

        const renderBody = () => {
            if (value && value.length === 0) {
                return (
                    <tr>
                        <td colSpan={React.Children.count(children)} className="datatable-empty-message">
                            {emptyMessage}
                        </td>
                    </tr>
                );
            }

            return value?.map((rowData: any, rowIndex: number) => (
                <tr key={rowData[dataKey] || rowIndex} onClick={(e) => handleRowClick(e, rowData)} className={selection === rowData ? 'selected' : ''}>
                    {React.Children.map(children, (column: any) => {
                        if (!column) return null;

                        return <td className={column.props.bodyClassName}>{column.props.body ? column.props.body(rowData) : rowData[column.props.field]}</td>;
                    })}
                </tr>
            ));
        };

        const handleRowToggle = (rowData: any) => {
            const expandedRowsCopy = { ...expandedRows };
            const rowKey = rowData[dataKey];

            if (expandedRowsCopy[rowKey]) {
                delete expandedRowsCopy[rowKey];
            } else {
                expandedRowsCopy[rowKey] = true;
            }

            onRowToggle?.({ data: expandedRowsCopy });
        };

        return (
            <div ref={tableRef} className={`custom-datatable ${className} ${loading ? 'loading' : ''} ${showGridlines ? 'gridlines' : ''}`}>
                {header && <div className="datatable-header">{header}</div>}

                <div className="datatable-wrapper">
                    <table>
                        <thead>
                            <tr>{renderHeader()}</tr>
                        </thead>
                        <tbody>{renderBody()}</tbody>
                    </table>

                    {loading && (
                        <div className="datatable-loading">
                            <div className="loading-spinner" />
                        </div>
                    )}
                </div>

                {footer && <div className="datatable-footer">{footer}</div>}
            </div>
        );
    }
);

DataTable.displayName = 'DataTable';
