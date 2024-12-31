import React, { Dispatch, HTMLAttributeAnchorTarget, MutableRefObject, ReactNode, SetStateAction } from 'react';

/* CSSTransition Types */
export interface CSSTransitionProps {
    in: boolean;
    timeout: {
        enter: number;
        exit: number;
    };
    classNames: string;
    children: React.ReactElement;
    onEnter?: () => void;
    onExit?: () => void;
}

// New file for theme types
export type ColorTheme = {
    title: string;
    name: string;
    primary: string;
    secondary: string;
    text: string;
    accent: string;
    gradient: string;
    theme: string;
    colorScheme: 'light' | 'dark';
};

/* Breadcrumb Types */
export interface AppBreadcrumbProps {
    className?: string;
}

export interface Breadcrumb {
    labels?: string[];
    to?: string;
}

export interface BreadcrumbItem {
    label: string;
    to?: string;
    items?: BreadcrumbItem[];
}

/* Context Types */
export type LayoutState = {
    topbarAutoHide: boolean;
    staticMenuDesktopInactive: boolean;
    staticConfigDesktopInactive: boolean;
    staticBottombarDesktopInactive: boolean;
    overlayMenuActive: boolean;
    overlayConfigActive: boolean;
    overlayBottombarActive: boolean;
    profileSidebarVisible: boolean;
    configSidebarVisible: boolean;
    staticMenuMobileActive: boolean;
    staticConfigMobileActive: boolean;
    staticBottombarMobileActive: boolean;
    menuHoverActive: boolean;
    sidebarAutoOverlayActive: boolean;
    searchSidebarItems: [];
};

export type LayoutConfig = {
    ripple: boolean;
    inputStyle: string;
    menuMode: string;
    colorScheme: string;
    theme: string;
    scale: number;
    secretKey: string;
};

export interface LayoutContextProps {
    layoutConfig: LayoutConfig;
    setLayoutConfig: Dispatch<SetStateAction<LayoutConfig>>;
    layoutState: LayoutState;
    setLayoutState: Dispatch<SetStateAction<LayoutState>>;
    onMenuToggle: () => void;
    onConfigToggle: () => void;
    showProfileSidebar: () => void;
    onBottombarToggle: () => void;
    onTopbarToggle: () => void;
    onSidebarAutoOverlayToggle: () => void;
}

export interface MenuContextProps {
    activeMenu: string;
    setActiveMenu: Dispatch<SetStateAction<string>>;
}

/* AppConfig Types */
export interface AppConfigProps {
    simple?: boolean;
}

/* AppTopbar Types */
export type NodeRef = MutableRefObject<ReactNode>;
export interface AppTopbarRef {
    topbarElement?: HTMLDivElement | null;
    menubutton?: HTMLButtonElement | null;
    toolbarbutton?: HTMLButtonElement | null;
    topbarmenu?: HTMLDivElement | null;
    topbarmenubutton?: HTMLButtonElement | null;
}

/* AppMenu Types */
type CommandProps = {
    originalEvent: React.MouseEvent<HTMLAnchorElement, MouseEvent>;
    item: MenuModelItem;
};

export interface MenuProps {
    model: MenuModel[];
}

export interface MenuModel {
    label: string;
    icon?: string;
    items?: MenuModel[];
    to?: string;
    url?: string;
    target?: HTMLAttributeAnchorTarget;
    seperator?: boolean;
}

export interface AppMenuItem extends MenuModel {
    items?: AppMenuItem[];
    badge?: 'UPDATED' | 'NEW';
    badgeClass?: string;
    class?: string;
    preventExact?: boolean;
    visible?: boolean;
    disabled?: boolean;
    replaceUrl?: boolean;
    description?: string;
    keywords?: string[];
    command?: ({ originalEvent, item }: CommandProps) => void;
}

export interface AppMenuItemProps {
    item?: AppMenuItem;
    parentKey?: string;
    index?: number;
    root?: boolean;
    className?: string;
}

/* Search Types */
export interface SearchableItem {
    label: string;
    items?: SearchableItem[];
    [key: string]: any;
}

export interface SearchConfig {
    searchKeys?: string[];
    maxResults: number;
    minSearchLength: number;
    fuzzySearch?: boolean;
    searchMode?: 'simple' | 'advanced';
}

export interface AppSearchProps<T extends SearchableItem> {
    searchRef: React.RefObject<HTMLDivElement>;
    menubarRef: React.RefObject<HTMLDivElement>;
    type?: 'menu' | 'pageContent';
    items?: T[];
    onSearchResults?: (results: T[]) => void;
    searchConfig?: Partial<SearchConfig>;
    placeholder?: string;
}
