interface SkeletonProps {
    width?: string;
    height?: string;
    borderRadius?: string;
    className?: string;
    shape?: 'circle' | 'rectangle';
    size?: string;
}

export const Skeleton = ({ width = '100%', height = '1rem', borderRadius = '4px', className, shape = 'rectangle', size }: SkeletonProps) => {
    const finalWidth = size || width;
    const finalHeight = size || height;
    const finalBorderRadius = shape === 'circle' ? '50%' : borderRadius;

    return (
        <div
            className={`skeleton ${className || ''}`}
            style={{
                width: finalWidth,
                height: finalHeight,
                borderRadius: finalBorderRadius
            }}
        />
    );
};
