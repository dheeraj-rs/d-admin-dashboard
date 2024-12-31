import { FilterMatchMode, FilterState } from './types';

export const sortData = (data: any[], field: string, order: 1 | -1): any[] => {
    return [...data].sort((a, b) => {
        const valueA = resolveFieldData(a, field);
        const valueB = resolveFieldData(b, field);

        if (valueA == null) return 1;
        if (valueB == null) return -1;

        if (typeof valueA === 'string' && typeof valueB === 'string') {
            return order * valueA.localeCompare(valueB);
        }

        return order * (valueA > valueB ? 1 : -1);
    });
};

export const filterData = (data: any[], filters: FilterState): any[] => {
    if (!filters || Object.keys(filters).length === 0) return data;

    return data.filter((item) => {
        for (const [field, filterMeta] of Object.entries(filters)) {
            const value = resolveFieldData(item, field);
            if (!matchesFilter(value, filterMeta.value, filterMeta.matchMode)) {
                return false;
            }
        }
        return true;
    });
};

export const matchesFilter = (value: any, filterValue: any, matchMode: FilterMatchMode): boolean => {
    if (filterValue == null || filterValue === '') return true;
    if (value == null) return false;

    switch (matchMode) {
        case 'startsWith':
            return value.toString().toLowerCase().startsWith(filterValue.toString().toLowerCase());
        case 'contains':
            return value.toString().toLowerCase().includes(filterValue.toString().toLowerCase());
        case 'endsWith':
            return value.toString().toLowerCase().endsWith(filterValue.toString().toLowerCase());
        case 'equals':
            return value === filterValue;
        case 'notEquals':
            return value !== filterValue;
        case 'in':
            return Array.isArray(filterValue) && filterValue.includes(value);
        case 'lt':
            return value < filterValue;
        case 'lte':
            return value <= filterValue;
        case 'gt':
            return value > filterValue;
        case 'gte':
            return value >= filterValue;
        default:
            return true;
    }
};

export const resolveFieldData = (data: any, field: string): any => {
    if (!data || !field) return null;

    if (field.indexOf('.') === -1) {
        return data[field];
    }

    let value = data;
    const fields = field.split('.');
    for (let i = 0, len = fields.length; i < len; ++i) {
        if (value == null) {
            return null;
        }
        value = value[fields[i]];
    }
    return value;
};

export const createLazyLoadEvent = (first: number, rows: number, sortField?: string, sortOrder?: number, filters?: FilterState) => {
    return {
        first,
        rows,
        sortField,
        sortOrder,
        filters,
        multiSortMeta: sortField ? [{ field: sortField, order: sortOrder }] : undefined,
    };
};
