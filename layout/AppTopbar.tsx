import { classNames } from '@/lib/utils';
import { AppTopbarRef } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { LayoutContext } from './context/layoutContext';

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const { layoutConfig, layoutState, onMenuToggle, onConfigToggle, onBottombarToggle, showProfileSidebar, onTopbarToggle } = useContext(LayoutContext);
    const topbarRef = useRef<HTMLDivElement>(null);
    const menubuttonRef = useRef<HTMLButtonElement>(null);
    const profileMenuButtonRef = useRef<HTMLButtonElement>(null);
    const topbarmenuRef = useRef<HTMLDivElement>(null);
    const topbarmenubuttonRef = useRef<HTMLButtonElement>(null);
    const pathname = usePathname();
    const pathSegments = pathname?.split('/').filter(Boolean) || [];
    const [showMessageDropdown, setShowMessageDropdown] = useState(false);
    const messageDropdownRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
        topbarElement: topbarRef.current,
        menubutton: menubuttonRef.current,
        profileMenuButton: profileMenuButtonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current,
    }));

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (messageDropdownRef.current && !messageDropdownRef.current.contains(event.target as Node) && showMessageDropdown) {
                setShowMessageDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showMessageDropdown]);

    return (
        <React.Fragment>
            <div ref={topbarRef} className="layout-topbar-main">
                <div className="topbar-start">
                    <Link href="/" className="logo-row">
                        <Image
                            src={`/layout/logo-${layoutConfig.colorScheme === 'dark' ? 'dark' : 'white'}.svg`}
                            width={40}
                            height={40}
                            alt="logo"
                            className="logo-img"
                        />
                        <span className="logo-text">
                            {'D-Admin'.split('').map((letter, index) => (
                                <span key={index}>{letter}</span>
                            ))}
                        </span>
                    </Link>
                    <nav className="breadcrumb">
                        <Link href="/" className="breadcrumb-link">
                            Pages
                        </Link>
                        {pathSegments.map((segment, index) => (
                            <React.Fragment key={index}>
                                <span className="breadcrumb-separator">/</span>
                                <Link href={'/' + pathSegments.slice(0, index + 1).join('/')} className="breadcrumb-segment">
                                    {segment.charAt(0).toUpperCase() + segment.slice(1)}
                                </Link>
                            </React.Fragment>
                        ))}
                    </nav>
                </div>

                <div className="topbar-center">
                    <div ref={messageDropdownRef}>
                        <div className="topbar-message" onClick={() => setShowMessageDropdown(!showMessageDropdown)}>
                            <i className="pi pi-bell" />
                            <span>You have 4 new messages</span>
                        </div>
                        {showMessageDropdown && (
                            <div className="topbar-message-dropdown">
                                <div className="message-header">
                                    <h3>Recent Messages</h3>
                                    <button className="clear-all">Clear All</button>
                                </div>
                                <div className="message-list">
                                    <div className="message-item">
                                        <i className="pi pi-envelope" />
                                        <div className="message-content">
                                            <span className="message-title">New Order Received</span>
                                            <span className="message-desc">Order #2023-456 needs processing</span>
                                            <span className="message-time">2 mins ago</span>
                                        </div>
                                    </div>
                                    {/* Add more message items as needed */}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="topbar-end">
                    <div
                        ref={topbarmenuRef}
                        className={classNames('layout-topbar-menu', {
                            'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible,
                        })}
                    >
                        <div className="layout-button-container">
                            <button ref={menubuttonRef} type="button" className="p-link layout-topbar-button" onClick={onMenuToggle}>
                                <i className="pi pi-bars" />
                                <span>Menu</span>
                            </button>
                            <button ref={menubuttonRef} type="button" className="p-link layout-topbar-button" onClick={onTopbarToggle}>
                                <i className="pi pi-window-maximize" />
                                <span>Header</span>
                            </button>
                            <button ref={menubuttonRef} type="button" className="p-link layout-topbar-button" onClick={onBottombarToggle}>
                                <i className="pi pi-tablet" />
                                <span>Footer</span>
                            </button>
                            <button ref={menubuttonRef} type="button" className="p-link layout-topbar-button" onClick={onConfigToggle}>
                                <i className="pi pi-sliders-h" />
                                <span>Config</span>
                            </button>
                        </div>

                        <div className="topbar-actions">
                            <button ref={profileMenuButtonRef} type="button" className="p-link layout-topbar-button" onClick={showProfileSidebar}>
                                <i className="pi pi-user"></i>
                                <span>Profile</span>
                            </button>
                            <button ref={menubuttonRef} type="button" className="p-link layout-topbar-button">
                                <i className="pi pi-calendar"></i>
                                <span>Calendar</span>
                            </button>
                            <Link href="/document/documentation">
                                <button ref={menubuttonRef} type="button" className="p-link layout-topbar-button">
                                    <i className="pi pi-cog"></i>
                                    <span>Settings</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                <button
                    ref={topbarmenubuttonRef}
                    type="button"
                    className="p-link layout-topbar-button layout-topbar-menu-button"
                    onMouseDown={showProfileSidebar}
                >
                    <i className="pi pi-ellipsis-v" />
                </button>
            </div>
            <div className="layout-topbar-mask" />
        </React.Fragment>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
