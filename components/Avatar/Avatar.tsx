interface AvatarProps {
    image?: string;
    label?: string;
    size?: 'normal' | 'large' | 'xlarge';
    shape?: 'square' | 'circle';
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    icon?: string;
    alt?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ image, label, size = 'normal', shape = 'circle', className, children, icon, alt }: AvatarProps) => {
    return (
        <div className={`avatar avatar--${size} avatar--${shape} ${className || ''}`}>
            {image ? (
                <img src={image} alt={alt || label || 'avatar'} className="avatar__image" />
            ) : icon ? (
                <i className={`${icon} avatar__icon`} />
            ) : (
                <span className="avatar__label">{label?.charAt(0).toUpperCase()}</span>
            )}
            {children}
        </div>
    );
};
