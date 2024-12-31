interface BadgeProps {
    value?: string | number;
    severity?: 'success' | 'info' | 'warning' | 'danger';
    size?: 'normal' | 'large' | 'xlarge';
}

export const Badge = ({ value, severity, size = 'normal' }: BadgeProps) => {
    return <span className={`badge ${severity ? `badge--${severity}` : ''} badge--${size}`}>{value}</span>;
};
