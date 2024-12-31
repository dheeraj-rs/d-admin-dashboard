interface TagProps {
    value: string;
    severity?: 'success' | 'info' | 'warning' | 'danger';
    rounded?: boolean;
    icon?: string;
}

export const Tag = ({ value, severity = 'info', rounded, icon }: TagProps) => {
    return (
        <span className={`tag ${severity ? `tag--${severity}` : ''} ${rounded ? 'tag--rounded' : ''}`}>
            {icon && <i className={`tag__icon ${icon}`} />}
            <span className="tag__value">{value}</span>
        </span>
    );
};
