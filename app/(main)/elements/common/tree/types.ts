export interface TreeNode {
    key: string;
    label: string;
    data?: any;
    icon?: string;
    children?: TreeNode[];
    expanded?: boolean;
    type?: string;
    size?: string;
    name?: string;
}

export type TreeSelectionKeysType = {
    [key: string]: boolean;
};

export type TreeTableSelectionKeysType = {
    [key: string]: boolean;
};
