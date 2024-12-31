import React, { useEffect, useRef, useState } from 'react';
interface TooltipProps {
    target: React.RefObject<HTMLElement>;
    position?: 'top' | 'bottom' | 'left' | 'right';
    content: string;
    event?: 'hover' | 'focus';
}

export const Tooltip: React.FC<TooltipProps> = ({ target, position = 'bottom', content, event = 'hover' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const tooltipRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const targetElement = target.current;
        if (!targetElement) return;

        const showTooltip = () => setIsVisible(true);
        const hideTooltip = () => setIsVisible(false);

        if (event === 'hover') {
            targetElement.addEventListener('mouseenter', showTooltip);
            targetElement.addEventListener('mouseleave', hideTooltip);
        } else if (event === 'focus') {
            targetElement.addEventListener('focus', showTooltip);
            targetElement.addEventListener('blur', hideTooltip);
        }

        return () => {
            if (event === 'hover') {
                targetElement.removeEventListener('mouseenter', showTooltip);
                targetElement.removeEventListener('mouseleave', hideTooltip);
            } else if (event === 'focus') {
                targetElement.removeEventListener('focus', showTooltip);
                targetElement.removeEventListener('blur', hideTooltip);
            }
        };
    }, [target, event]);

    return isVisible ? (
        <div ref={tooltipRef} className={`tooltip tooltip-${position}`}>
            {content}
        </div>
    ) : null;
};
