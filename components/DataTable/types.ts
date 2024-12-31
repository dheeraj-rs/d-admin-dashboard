export type SortOrder = 1 | -1 | 0;
export type FilterMatchMode =
    | 'startsWith'
    | 'contains'
    | 'endsWith'
    | 'equals'
    | 'notEquals'
    | 'in'
    | 'lt'
    | 'lte'
    | 'gt'
    | 'gte'
    | 'between'
    | 'dateIs'
    | 'dateIsNot'
    | 'dateBefore'
    | 'dateAfter';

export interface SortMeta {
    field: string;
    order: SortOrder;
}

export interface FilterMeta {
    value: any;
    matchMode: FilterMatchMode;
}

export interface FilterState {
    [key: string]: FilterMeta;
}

export interface ColumnProps {
    field?: string;
    header?: string | React.ReactNode;
    footer?: string | React.ReactNode;
    body?: (data: any) => React.ReactNode;
    sortable?: boolean;
    filter?: boolean;
    filterMatchMode?: FilterMatchMode;
    filterElement?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    frozen?: boolean;
    width?: string;
    minWidth?: string;
    maxWidth?: string;
}

export interface DataTableProps {
    value: any[];
    columns?: ColumnProps[];
    dataKey?: string;
    rows?: number;
    first?: number;
    totalRecords?: number;
    paginator?: boolean;
    paginatorPosition?: 'top' | 'bottom' | 'both';
    sortField?: string;
    sortOrder?: SortOrder;
    multiSortMeta?: SortMeta[];
    filters?: FilterState;
    selection?: any | any[];
    selectionMode?: 'single' | 'multiple' | 'checkbox' | null;
    responsive?: boolean;
    expandedRows?: any[];
    rowExpansion?: boolean;
    rowClassName?: (data: any) => string;
    loading?: boolean;
    scrollable?: boolean;
    scrollHeight?: string;
    virtualScroll?: boolean;
    virtualRowHeight?: number;
    frozenWidth?: string;
    unfrozenWidth?: string;
    resizableColumns?: boolean;
    reorderableColumns?: boolean;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    onSort?: (field: string, order: SortOrder) => void;
    onFilter?: (filters: FilterState) => void;
    onPage?: (first: number, rows: number) => void;
    onSelectionChange?: (selection: any) => void;
    onRowExpand?: (event: { originalEvent: Event; data: any }) => void;
    onRowCollapse?: (event: { originalEvent: Event; data: any }) => void;
}
