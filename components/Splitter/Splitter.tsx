import React, { useEffect, useRef, useState } from 'react';
interface SplitterProps {
    children: React.ReactNode;
    layout?: 'horizontal' | 'vertical';
    style?: React.CSSProperties;
}

export const Splitter: React.FC<SplitterProps> = ({ children, layout = 'horizontal', style }) => {
    const splitterRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [positions, setPositions] = useState<number[]>([]);
    const [currentHandler, setCurrentHandler] = useState<((e: MouseEvent) => void) | null>(null);

    useEffect(() => {
        const childrenArray = React.Children.toArray(children);
        const initialPositions = childrenArray.map((_, index) => 100 / childrenArray.length);
        setPositions(initialPositions);
    }, [children]);

    const handleMouseDown = (index: number) => (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);
        const moveHandler = handleMouseMove(index);
        setCurrentHandler(() => moveHandler);
        document.addEventListener('mousemove', moveHandler);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (index: number) => (e: MouseEvent) => {
        if (!isDragging || !splitterRef.current) return;

        const rect = splitterRef.current.getBoundingClientRect();
        const offset = layout === 'horizontal' ? ((e.clientX - rect.left) / rect.width) * 100 : ((e.clientY - rect.top) / rect.height) * 100;

        setPositions((prev) => {
            const newPositions = [...prev];
            const totalSize = newPositions[index] + newPositions[index + 1];
            newPositions[index] = offset;
            newPositions[index + 1] = totalSize - offset;
            return newPositions;
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        if (currentHandler) {
            document.removeEventListener('mousemove', currentHandler);
        }
        document.removeEventListener('mouseup', handleMouseUp);
    };

    return (
        <div ref={splitterRef} className={`splitter ${layout}`} style={style}>
            {React.Children.map(children, (child, index) => (
                <>
                    <div
                        className="splitter-panel"
                        style={{
                            [layout === 'horizontal' ? 'width' : 'height']: `${positions[index]}%`,
                        }}
                    >
                        {child}
                    </div>
                    {index < React.Children.count(children) - 1 && <div className="splitter-gutter" onMouseDown={handleMouseDown(index)} />}
                </>
            ))}
        </div>
    );
};

export const SplitterPanel: React.FC<{
    children?: React.ReactNode;
    size?: number;
    minSize?: number;
}> = ({ children }) => {
    return <div className="splitter-panel-content">{children}</div>;
};
