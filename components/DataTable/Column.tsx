import React from 'react';
import { FilterMatchModeType } from '../api/FilterTypes';

interface ColumnProps {
    field?: string;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    sortable?: boolean;
    filter?: boolean;
    filterMatchMode?: FilterMatchModeType;
    filterElement?: (options: ColumnFilterElementTemplateOptions) => React.ReactNode;
    filterClear?: (options: ColumnFilterClearTemplateOptions) => React.ReactNode;
    filterApply?: (options: ColumnFilterApplyTemplateOptions) => React.ReactNode;
    body?: (rowData: any) => React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    headerStyle?: React.CSSProperties;
    headerClassName?: string;
    bodyStyle?: React.CSSProperties;
    bodyClassName?: string;
    footerStyle?: React.CSSProperties;
    footerClassName?: string;
    expander?: boolean;
    frozen?: boolean;
    alignFrozen?: 'left' | 'right';
    showFilterMenu?: boolean;
    showFilterOperator?: boolean;
    showClearButton?: boolean;
    showApplyButton?: boolean;
    showFilterMatchModes?: boolean;
    filterMenuStyle?: React.CSSProperties;
    dataType?: string;
    selectionMode?: string;
    filterPlaceholder?: string;
}

export const Column: React.FC<ColumnProps> = () => {
    // This is just a configuration component
    return null;
};

export interface ColumnFilterClearTemplateOptions {
    field: string;
    filterModel: any;
    filterCallback: () => void;
}

export interface ColumnFilterApplyTemplateOptions {
    field: string;
    filterModel: any;
    filterCallback: () => void;
}

export interface ColumnFilterElementTemplateOptions {
    field: string;
    filterModel: any;
    value?: any;
    filterCallback: (value: any, index?: number) => void;
    clearFilter?: () => void;
    index?: number;
}
