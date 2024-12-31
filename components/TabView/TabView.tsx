import React, { useState } from 'react';
interface TabViewProps {
    children: React.ReactNode;
    activeIndex?: number;
    onTabChange?: (index: number) => void;
}

interface TabPanelProps {
    header: React.ReactNode;
    children?: React.ReactNode;
    disabled?: boolean;
}

export const TabView: React.FC<TabViewProps> = ({ children, activeIndex: controlledIndex, onTabChange }) => {
    const [internalActiveIndex, setInternalActiveIndex] = useState(0);
    const activeIndex = controlledIndex !== undefined ? controlledIndex : internalActiveIndex;

    const handleTabClick = (index: number) => {
        if (onTabChange) {
            onTabChange(index);
        } else {
            setInternalActiveIndex(index);
        }
    };

    return (
        <div className="tabview">
            <div className="tabview-nav">
                {React.Children.map(children, (child, index) => {
                    if (React.isValidElement<TabPanelProps>(child)) {
                        const isDisabled = child.props.disabled;
                        return (
                            <div
                                className={`tabview-nav-item ${index === activeIndex ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`}
                                onClick={() => !isDisabled && handleTabClick(index)}
                            >
                                {child.props.header}
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
            <div className="tabview-panels">
                {React.Children.map(children, (child, index) => {
                    if (React.isValidElement(child) && index === activeIndex) {
                        return <div className="tabview-panel">{child.props.children}</div>;
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export const TabPanel: React.FC<TabPanelProps> = ({ children }) => {
    return <>{children}</>;
};
