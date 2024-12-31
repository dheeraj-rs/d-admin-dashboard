'use client';
import Slider from '@/components/Slider/Slider';
import { ThemeManager } from '@/lib/ThemeManager';
import { classNames } from '@/lib/utils';
import { useContext, useEffect, useState } from 'react';
import { AppConfigProps, LayoutConfig, LayoutState } from '../types/layout';
import { LayoutContext } from './context/layoutContext';
import { useTheme } from './context/themeContext';

const AppConfigbar = (props: AppConfigProps) => {
    const [scales] = useState([11, 12, 13, 14, 15]);
    const { layoutConfig, setLayoutConfig, setLayoutState, layoutState, onSidebarAutoOverlayToggle } = useContext(LayoutContext);
    const { activeTheme, changeTheme } = useTheme();

    useEffect(() => {
        setLayoutState((prevState: LayoutState) => ({
            ...prevState,
            configSidebarVisible: true,
        }));
    }, [setLayoutState]);

    const changeRipple = (e: { value: boolean }) => {
        ThemeManager.ripple = e.value;
        setLayoutConfig((prevState: LayoutConfig) => ({
            ...prevState,
            ripple: e.value,
        }));
    };

    const changeMenuMode = (e: { value: string }) => {
        setLayoutConfig((prevState: LayoutConfig) => ({
            ...prevState,
            menuMode: e.value,
        }));
    };

    // const changeTheme = (theme: string, colorScheme: string) => {
    //     ThemeManager.changeTheme?.(layoutConfig.theme, theme, 'theme-css', () => {
    //         setLayoutConfig((prevState: LayoutConfig) => ({
    //             ...prevState,
    //             theme,
    //             colorScheme,
    //         }));
    //     });
    // };

    useEffect(() => {
        document.documentElement.style.fontSize = layoutConfig.scale + 'px';
    }, [layoutConfig.scale]);

    const ThemeButton = ({
        theme,
        colorScheme,
        name,
        primary,
        secondary,
    }: {
        theme: string;
        colorScheme: 'light' | 'dark';
        name: string;
        primary: string;
        secondary: string;
    }) => (
        <div
            key={`${name}-${colorScheme}`}
            onClick={() => changeTheme(theme)}
            className={classNames('theme-selector__grid-item', {
                selected: layoutConfig.theme === theme,
            })}
            style={{
                background: `linear-gradient(135deg, ${primary}, ${secondary})`,
            }}
            role="button"
            aria-label={`${name} theme`}
        >
            <div className="theme-selector__grid-item-content">
                <div className="theme-selector__grid-item-content-top">
                    <div className={`color-dot ${colorScheme}`} />
                    {activeTheme === theme && <i className="pi pi-check selected-icon" />}
                </div>
                <div className="theme-selector__grid-item-content-bottom">
                    <p>{name}</p>
                </div>
            </div>
        </div>
    );

    const ThemeCategory = ({
        title,
        themes,
    }: {
        title: string;
        themes: Array<{
            theme: string;
            colorScheme: 'light' | 'dark';
            name: string;
            primary: string;
            secondary: string;
            gradient: string;
        }>;
    }) => (
        <div className="theme-category">
            <h6>{title}</h6>
            <div className="theme-grid">
                {themes.map((theme) => (
                    <ThemeButton key={theme.theme} {...theme} />
                ))}
            </div>
        </div>
    );

    return (
        <div className="layout-config-container">
            <div className="scale-control">
                <div className="scale-header">
                    <h5>Scale</h5>
                    <span className="scale-value">{layoutConfig.scale}px</span>
                </div>
                <div className="slider-container">
                    <Slider
                        value={layoutConfig.scale}
                        onChange={(e) => {
                            setLayoutConfig((prevState: LayoutConfig) => ({
                                ...prevState,
                                scale: e.value as number,
                            }));
                        }}
                        min={scales[0]}
                        max={scales[scales.length - 1]}
                        step={1}
                    />
                    <div className="scale-markers">
                        {scales.map((scale) => (
                            <div
                                key={scale}
                                className={classNames('marker', {
                                    active: scale === layoutConfig.scale,
                                })}
                                onClick={() => {
                                    setLayoutConfig((prevState: LayoutConfig) => ({
                                        ...prevState,
                                        scale: scale,
                                    }));
                                }}
                            >
                                <span className="dot"></span>
                                <span className="label">{scale}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <h5 className="config-title">Menu Type</h5>
            <div className="menu-type-selector">
                <button
                    className={`menu-type-btn ${layoutConfig.menuMode === 'static' ? 'active' : ''}`}
                    onClick={() => changeMenuMode({ value: 'static' })}
                    title="Static Menu"
                >
                    <i className="pi pi-lock" />
                    <span>Static</span>
                </button>
                <button
                    className={`menu-type-btn ${layoutConfig.menuMode === 'overlay' ? 'active' : ''}`}
                    onClick={() => changeMenuMode({ value: 'overlay' })}
                    title="Overlay Menu"
                >
                    <i className="pi pi-bars" />
                    <span>Overlay</span>
                </button>
            </div>

            {layoutConfig.menuMode === 'static' && (
                <>
                    <h5 className="config-title">Menu Mode</h5>
                    <div className="menu-mode-selector">
                        <button
                            className={classNames('mode-button', {
                                active: !layoutState.sidebarAutoOverlayActive,
                            })}
                            onClick={() => onSidebarAutoOverlayToggle()}
                        >
                            <i className="pi pi-arrows-alt" />
                            <span>Default</span>
                        </button>
                        <button
                            className={classNames('mode-button', {
                                active: layoutState.sidebarAutoOverlayActive,
                            })}
                            onClick={() => onSidebarAutoOverlayToggle()}
                        >
                            <i className="pi pi-sync" />
                            <span>Auto</span>
                        </button>
                    </div>
                </>
            )}

            <h5 className="config-title">Ripple Effect</h5>
            <div className="ripple-toggle">
                <button
                    className={`toggle-button ${layoutConfig.ripple ? 'active' : ''}`}
                    onClick={() => changeRipple({ value: !layoutConfig.ripple })}
                    title="Toggle Ripple Effect"
                >
                    <i className="pi pi-circle-fill ripple-icon" />
                    <span>Ripple</span>
                </button>
            </div>

            <div className="theme-container">
                <h5 className="config-title">Themes</h5>
                <ThemeCategory
                    title="Bootstrap"
                    themes={[
                        {
                            theme: 'bootstrap4-light-blue',
                            colorScheme: 'light',
                            name: 'Blue',
                            primary: '#0d6efd',
                            secondary: '#f8f9fa',
                            gradient: 'bg-gradient-to-r from-blue-500 to-blue-600',
                        },
                        {
                            theme: 'bootstrap4-light-purple',
                            colorScheme: 'light',
                            name: 'Purple',
                            primary: '#6f42c1',
                            secondary: '#e9ecef',
                            gradient: 'bg-gradient-to-r from-purple-500 to-purple-600',
                        },
                        {
                            theme: 'bootstrap4-dark-blue',
                            colorScheme: 'dark',
                            name: 'Blue',
                            primary: '#0d6efd',
                            secondary: '#212529',
                            gradient: 'bg-gradient-to-r from-blue-600 to-blue-700',
                        },
                        {
                            theme: 'bootstrap4-dark-purple',
                            colorScheme: 'dark',
                            name: 'Purple',
                            primary: '#6f42c1',
                            secondary: '#212529',
                            gradient: 'bg-gradient-to-r from-purple-600 to-purple-700',
                        },
                    ]}
                />
                <ThemeCategory
                    title="Material Design"
                    themes={[
                        {
                            theme: 'md-light-indigo',
                            colorScheme: 'light',
                            name: 'Indigo',
                            primary: '#3f51b5',
                            secondary: '#ffffff',
                            gradient: 'bg-gradient-to-r from-indigo-500 to-indigo-600',
                        },
                        {
                            theme: 'md-light-deeppurple',
                            colorScheme: 'light',
                            name: 'Deep Purple',
                            primary: '#673ab7',
                            secondary: '#ffffff',
                            gradient: 'bg-gradient-to-r from-purple-500 to-purple-600',
                        },
                        {
                            theme: 'md-dark-indigo',
                            colorScheme: 'dark',
                            name: 'Indigo',
                            primary: '#3f51b5',
                            secondary: '#212529',
                            gradient: 'bg-gradient-to-r from-indigo-600 to-indigo-700',
                        },
                        {
                            theme: 'md-dark-deeppurple',
                            colorScheme: 'dark',
                            name: 'Deep Purple',
                            primary: '#673ab7',
                            secondary: '#212529',
                            gradient: 'bg-gradient-to-r from-purple-600 to-purple-700',
                        },
                    ]}
                />

                <ThemeCategory
                    title="Custom Design"
                    themes={[
                        {
                            theme: 'lara-light-indigo',
                            colorScheme: 'light',
                            name: 'Indigo',
                            primary: '#6366f1',
                            secondary: '#ffffff',
                            gradient: 'bg-gradient-to-r from-indigo-500 to-indigo-600',
                        },
                        {
                            theme: 'lara-light-blue',
                            colorScheme: 'light',
                            name: 'Blue',
                            primary: '#3b82f6',
                            secondary: '#ffffff',
                            gradient: 'bg-gradient-to-r from-blue-500 to-blue-600',
                        },
                        {
                            theme: 'lara-light-purple',
                            colorScheme: 'light',
                            name: 'Purple',
                            primary: '#8b5cf6',
                            secondary: '#ffffff',
                            gradient: 'bg-gradient-to-r from-purple-500 to-purple-600',
                        },
                        {
                            theme: 'lara-light-teal',
                            colorScheme: 'light',
                            name: 'Teal',
                            primary: '#14b8a6',
                            secondary: '#ffffff',
                            gradient: 'bg-gradient-to-r from-teal-500 to-teal-600',
                        },
                        {
                            theme: 'lara-dark-indigo',
                            colorScheme: 'dark',
                            name: 'Indigo',
                            primary: '#6366f1',
                            secondary: '#1e1e1e',
                            gradient: 'bg-gradient-to-r from-indigo-600 to-indigo-700',
                        },
                        {
                            theme: 'lara-dark-blue',
                            colorScheme: 'dark',
                            name: 'Blue',
                            primary: '#3b82f6',
                            secondary: '#1e1e1e',
                            gradient: 'bg-gradient-to-r from-blue-600 to-blue-700',
                        },
                        {
                            theme: 'lara-dark-purple',
                            colorScheme: 'dark',
                            name: 'Purple',
                            primary: '#8b5cf6',
                            secondary: '#1e1e1e',
                            gradient: 'bg-gradient-to-r from-purple-600 to-purple-700',
                        },
                        {
                            theme: 'lara-dark-teal',
                            colorScheme: 'dark',
                            name: 'Teal',
                            primary: '#14b8a6',
                            secondary: '#1e1e1e',
                            gradient: 'bg-gradient-to-r from-teal-600 to-teal-700',
                        },
                    ]}
                />
            </div>
        </div>
    );
};

export default AppConfigbar;
