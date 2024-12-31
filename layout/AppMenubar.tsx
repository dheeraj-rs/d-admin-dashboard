import { menuItems } from '@/public/demo/data/menuItems';
import { AppMenuItem, LayoutContextProps } from '@/types';
import React, { useContext, useRef } from 'react';
import AppMenuitem from './AppMenuitem';
import AppMenuSearch from './AppMenuSearch';
import { LayoutContext } from './context/layoutContext';
import { MenuProvider } from './context/menuContext';

const AppMenubar = ({ menubarRef }: { menubarRef: React.RefObject<HTMLDivElement> }) => {
    const searchRef = useRef<HTMLDivElement>(null);

    const { layoutState } = useContext(LayoutContext as unknown as React.Context<LayoutContextProps>);

    const items: AppMenuItem[] = layoutState?.searchSidebarItems?.length ? layoutState.searchSidebarItems : menuItems;

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {items.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
                <AppMenuSearch searchRef={searchRef} menubarRef={menubarRef} />
            </ul>
        </MenuProvider>
    );
};

export default AppMenubar;
