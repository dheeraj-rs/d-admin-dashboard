import { ReactNode, useRef } from 'react';
interface ScrollPanelProps {
    children: ReactNode;
    style?: React.CSSProperties;
    className?: string;
}

export const ScrollPanel = ({ children, style, className }: ScrollPanelProps) => {
    const contentRef = useRef<HTMLDivElement>(null);

    return (
        <div className={`scroll-panel ${className || ''}`} style={style}>
            <div className="scroll-panel__wrapper">
                <div className="scroll-panel__content" ref={contentRef}>
                    {children}
                </div>
            </div>
        </div>
    );
};
