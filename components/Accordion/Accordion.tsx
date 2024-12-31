import React, { useState } from 'react';
interface AccordionProps {
    activeIndex?: number | number[];
    multiple?: boolean;
    children: React.ReactNode;
    onTabChange?: (index: number) => void;
}

interface AccordionItemProps {
    isActive?: boolean;
    onToggle?: () => void;
}

export const Accordion: React.FC<AccordionProps> = ({ activeIndex: controlledIndex, multiple = false, children, onTabChange }) => {
    const [activeIndexes, setActiveIndexes] = useState<number[]>(
        Array.isArray(controlledIndex) ? controlledIndex : controlledIndex !== undefined ? [controlledIndex] : []
    );

    const isControlled = controlledIndex !== undefined;

    const handleTabToggle = (index: number) => {
        if (isControlled && onTabChange) {
            onTabChange(index);
            return;
        }

        setActiveIndexes((prev) => {
            if (multiple) {
                return prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index];
            }
            return prev.includes(index) ? [] : [index];
        });
    };

    const isTabActive = (index: number) => {
        if (isControlled) {
            if (Array.isArray(controlledIndex)) {
                return controlledIndex.includes(index);
            }
            return controlledIndex === index;
        }
        return activeIndexes.includes(index);
    };

    return (
        <div className="accordion">
            {React.Children.map(children, (child, index) => {
                if (React.isValidElement<AccordionItemProps>(child)) {
                    return React.cloneElement(child, {
                        isActive: isTabActive(index),
                        onToggle: () => handleTabToggle(index),
                    });
                }
                return child;
            })}
        </div>
    );
};
