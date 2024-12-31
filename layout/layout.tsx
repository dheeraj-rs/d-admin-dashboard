/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useEventListener, useUnmountEffect } from '@/hooks';
import { classNames } from '@/lib/utils';
import { AppTopbarRef, ChildContainerProps, LayoutState } from '@/types';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useContext, useEffect, useRef } from 'react';
import AppBottombar from './AppBottombar';
import AppConfigbar from './AppConfigbar';
import AppFooter from './AppFooter';
import AppMenubar from './AppMenubar';
import AppTopbar from './AppTopbar';
import { LayoutContext } from './context/layoutContext';

const Layout = ({ children }: ChildContainerProps) => {
    const { layoutConfig, layoutState, setLayoutState } = useContext(LayoutContext);
    const topbarRef = useRef<AppTopbarRef>(null);
    const menubarRef = useRef<HTMLDivElement>(null);
    const configbarRef = useRef<HTMLDivElement>(null);
    const bottombarRef = useRef<HTMLDivElement>(null);
    const [bindMenuOutsideClickListener, unbindMenuOutsideClickListener] = useEventListener({
        type: 'click',
        listener: (event) => {
            const isOutsideClicked = !(
                menubarRef.current?.isSameNode(event.target as Node) ||
                menubarRef.current?.contains(event.target as Node) ||
                configbarRef.current?.isSameNode(event.target as Node) ||
                configbarRef.current?.contains(event.target as Node) ||
                topbarRef.current?.menubutton?.isSameNode(event.target as Node) ||
                topbarRef.current?.menubutton?.contains(event.target as Node) ||
                topbarRef.current?.toolbarbutton?.isSameNode(event.target as Node) ||
                topbarRef.current?.toolbarbutton?.contains(event.target as Node)
            );

            if (isOutsideClicked) {
                hideMenu();
            }
        },
    });

    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        hideMenu();
        hideProfileMenu();
    }, [pathname, searchParams]);

    const [bindProfileMenuOutsideClickListener, unbindProfileMenuOutsideClickListener] = useEventListener({
        type: 'click',
        listener: (event) => {
            const isOutsideClicked = !(
                topbarRef.current?.topbarmenu?.isSameNode(event.target as Node) ||
                topbarRef.current?.topbarmenu?.contains(event.target as Node) ||
                topbarRef.current?.topbarmenubutton?.isSameNode(event.target as Node) ||
                topbarRef.current?.topbarmenubutton?.contains(event.target as Node) ||
                topbarRef.current?.toolbarbutton?.isSameNode(event.target as Node) ||
                topbarRef.current?.toolbarbutton?.contains(event.target as Node)
            );

            if (isOutsideClicked) {
                hideProfileMenu();
            }
        },
    });

    const hideMenu = () => {
        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            overlayMenuActive: false,
            overlayConfigActive: false,
            staticMenuMobileActive: false,
            staticConfigMobileActive: false,
            menuHoverActive: false,
        }));
        unbindMenuOutsideClickListener();
        unblockBodyScroll();
    };

    const hideProfileMenu = () => {
        setLayoutState((prevLayoutState: LayoutState) => ({
            ...prevLayoutState,
            profileSidebarVisible: false,
        }));
        unbindProfileMenuOutsideClickListener();
    };

    const blockBodyScroll = (): void => {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        } else {
            document.body.className += ' blocked-scroll';
        }
    };

    const unblockBodyScroll = (): void => {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        } else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    };

    useEffect(() => {
        if (layoutState.overlayMenuActive || layoutState.overlayConfigActive || layoutState.staticMenuMobileActive || layoutState.staticConfigMobileActive) {
            bindMenuOutsideClickListener();
        }

        layoutState.staticMenuMobileActive && blockBodyScroll();
        layoutState.staticConfigMobileActive && blockBodyScroll();
    }, [
        layoutState.overlayMenuActive,
        layoutState.overlayConfigActive,
        layoutState.staticMenuMobileActive,
        layoutState.staticConfigMobileActive,
        bindMenuOutsideClickListener,
    ]);

    useEffect(() => {
        if (layoutState.profileSidebarVisible) {
            bindProfileMenuOutsideClickListener();
        }
    }, [layoutState.profileSidebarVisible, bindProfileMenuOutsideClickListener]);

    useUnmountEffect(() => {
        unbindMenuOutsideClickListener();
        unbindProfileMenuOutsideClickListener();
    });

    const containerClass = classNames('layout-wrapper', {
        'layout-overlay ': layoutConfig.menuMode === 'overlay',
        'layout-static': layoutConfig.menuMode === 'static',
        'layout-static-sidebar-inactive': layoutState.staticMenuDesktopInactive && layoutConfig.menuMode === 'static',
        'layout-static-config-inactive': layoutState.staticConfigDesktopInactive && layoutConfig.menuMode === 'static',
        'layout-bottombar-desktop-inactive': layoutState.staticBottombarDesktopInactive,
        'layout-bottombar-mobile-active': layoutState.staticBottombarMobileActive,
        'layout-overlay-sidebar-active': layoutState.overlayMenuActive,
        'layout-overlay-config-active': layoutState.overlayConfigActive,
        'layout-mobile-sidebar-active': layoutState.staticMenuMobileActive,
        'layout-mobile-config-active': layoutState.staticConfigMobileActive,
        'p-input-filled': layoutConfig.inputStyle === 'filled',
        'p-ripple-disabled': !layoutConfig.ripple,
        'layout-topbar-auto-hide': layoutState.topbarAutoHide,
        'layout-sidebar-auto-overlay-active': layoutState.sidebarAutoOverlayActive,
    });

    return (
        <React.Fragment>
            <div className={containerClass}>
                <div className="layout-topbar">
                    <AppTopbar ref={topbarRef} />
                </div>

                <div ref={menubarRef} className="layout-sidebar">
                    <AppMenubar menubarRef={menubarRef} />
                </div>

                <div ref={configbarRef} className="layout-config">
                    <AppConfigbar />
                </div>

                <div className="layout-main-container">
                    <div className="layout-main">{children}</div>
                    <AppFooter />
                </div>

                <div ref={bottombarRef} className="layout-bottombar">
                    <AppBottombar />
                </div>
                <div className="layout-mask" />
            </div>
        </React.Fragment>
    );
};

export default Layout;
