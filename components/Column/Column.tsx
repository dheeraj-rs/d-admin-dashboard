import React from 'react';
import { FilterMatchModeType } from '../api/FilterTypes';

export interface ColumnFilterElementTemplateOptions {
    field: string;
    filterModel: any;
    value: any;
    filterCallback: (value: any, index?: number) => void;
    clearFilter: () => void;
    index?: number;
}

export interface ColumnFilterClearTemplateOptions {
    field: string;
    filterModel: any;
    filterClearCallback: () => void;
}

export interface ColumnFilterApplyTemplateOptions {
    field: string;
    filterModel: any;
    filterApplyCallback: () => void;
}

export interface ColumnProps {
    field?: string;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    sortable?: boolean;
    filter?: boolean;
    filterMatchMode?: FilterMatchModeType;
    filterElement?: (options: ColumnFilterElementTemplateOptions) => React.ReactNode;
    filterClear?: (options: ColumnFilterClearTemplateOptions) => React.ReactNode;
    filterApply?: (options: ColumnFilterApplyTemplateOptions) => React.ReactNode;
    frozen?: boolean;
    style?: React.CSSProperties;
    className?: string;
    headerStyle?: React.CSSProperties;
    headerClassName?: string;
    bodyStyle?: React.CSSProperties;
    bodyClassName?: string;
    footerStyle?: React.CSSProperties;
    footerClassName?: string;
    showFilterMenu?: boolean;
    showFilterOperator?: boolean;
    showClearButton?: boolean;
    showApplyButton?: boolean;
    dataType?: string;
    body?: (data: any) => React.ReactNode;
    selectionMode?: 'single' | 'multiple';
}

export const Column: React.FC<ColumnProps> = () => {
    // This is a configuration component that doesn't render anything
    return null;
};
