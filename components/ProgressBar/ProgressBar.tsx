interface ProgressBarProps {
    value?: number | string;
    showValue?: boolean;
    className?: string;
}

export const ProgressBar = ({ value = 0, showValue = true, className }: ProgressBarProps) => {
    const percentage = typeof value === 'string' ? parseInt(value) : value;
    const validPercentage = Math.max(0, Math.min(100, isNaN(percentage) ? 0 : percentage));

    return (
        <div className={`progress-bar ${className}`}>
            <div className="progress-bar__fill" style={{ width: `${validPercentage}%` }}>
                {showValue && <span className="progress-bar__label">{validPercentage}%</span>}
            </div>
        </div>
    );
};
