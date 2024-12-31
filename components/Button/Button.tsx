import React from 'react';
interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    label?: string;
    icon?: string;
    iconPos?: 'left' | 'right';
    severity?: 'primary' | 'secondary' | 'success' | 'warning' | 'help' | 'danger' | 'info';
    size?: 'small' | 'medium' | 'large'|'icon';
    outlined?: boolean;
    text?: boolean;
    raised?: boolean;
    rounded?: boolean;
    link?: boolean;
    loading?: boolean;
    className?: string;
    tooltip?: string;
    children?: React.ReactNode;
    variant?: 'outline' | 'ghost' | 'raised' | 'text' | 'link' | 'rounded' | 'raised-rounded' | 'raised-outline' | 'raised-ghost' | 'raised-text' | 'raised-link' | 'raised-rounded-outline' | 'raised-rounded-ghost' | 'raised-rounded-text' | 'raised-rounded-link' | 'raised-outline-ghost' | 'raised-outline-text' | 'raised-outline-link' | 'raised-ghost-text' | 'raised-ghost-link' | 'raised-text-link' | 'raised-rounded-outline-ghost' | 'raised-rounded-outline-text' | 'raised-rounded-outline-link' | 'raised-rounded-ghost-text' | 'raised-rounded-ghost-link' | 'raised-rounded-text-link' | 'raised-outline-ghost-text' | 'raised-outline-ghost-link' | 'raised-outline-text-link' | 'raised-ghost-text-link' | 'raised-rounded-ghost-text-link' | 'raised-rounded-outline-ghost-text' | 'raised-rounded-outline-ghost-link' | 'raised-rounded-outline-text-link' | 'raised-rounded-ghost-text-link' | 'raised-rounded-ghost-text-link' | 'raised-rounded-outline-ghost-text-link'|'secondary';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        { label, icon, iconPos = 'left', severity, size, outlined, text, raised, rounded, link, loading, className, tooltip, children, disabled, ...props },
        ref
    ) => {
        const classes = [
            'custom-button',
            'p-ripple',
            severity && `custom-button--${severity}`,
            size && `custom-button--${size}`,
            outlined && 'custom-button--outlined',
            text && 'custom-button--text',
            raised && 'custom-button--raised',
            rounded && 'custom-button--rounded',
            link && 'custom-button--link',
            loading && 'custom-button--loading',
            disabled && 'custom-button--disabled',
            className,
        ]
            .filter(Boolean)
            .join(' ');

        return (
            <button ref={ref} className={classes} disabled={disabled || loading} title={tooltip} {...props}>
                {loading && <i className="custom-icon pi pi-spinner custom-button__spinner" />}
                {icon && iconPos === 'left' && <i className={`custom-icon ${icon}`} />}
                {label && <span className="custom-button__label">{label}</span>}
                {icon && iconPos === 'right' && <i className={`custom-icon ${icon}`} />}
                {children}
                <span className="p-ink"></span>
            </button>
        );
    }
);

Button.displayName = 'Button';
