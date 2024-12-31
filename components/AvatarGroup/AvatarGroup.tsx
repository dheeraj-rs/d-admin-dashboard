import { Children, ReactNode } from 'react';

interface AvatarGroupProps {
    children: ReactNode;
    max?: number;
    className?: string;
}

export const AvatarGroup = ({ children, max, className }: AvatarGroupProps) => {
    const childrenArray = Children.toArray(children);
    const displayCount = max ? childrenArray.slice(0, max) : childrenArray;
    const remainingCount = max ? childrenArray.length - max : 0;

    return (
        <div className={`avatar-group ${className || ''}`}>
            {displayCount}
            {remainingCount > 0 && <div className="avatar-group__counter">+{remainingCount}</div>}
        </div>
    );
};
