export const SORT_ORDER = {
    ASCENDING: 1,
    DESCENDING: -1,
    NONE: 0,
} as const;

export const FILTER_MATCH_MODES = {
    STARTS_WITH: 'startsWith',
    CONTAINS: 'contains',
    ENDS_WITH: 'endsWith',
    EQUALS: 'equals',
    NOT_EQUALS: 'notEquals',
    IN: 'in',
    LESS_THAN: 'lt',
    LESS_THAN_OR_EQUAL_TO: 'lte',
    GREATER_THAN: 'gt',
    GREATER_THAN_OR_EQUAL_TO: 'gte',
    BETWEEN: 'between',
    DATE_IS: 'dateIs',
    DATE_IS_NOT: 'dateIsNot',
    DATE_BEFORE: 'dateBefore',
    DATE_AFTER: 'dateAfter',
} as const;

export const DEFAULT_ROWS_PER_PAGE = 10;
export const DEFAULT_ROWS_PER_PAGE_OPTIONS = [5, 10, 20, 50, 100];
