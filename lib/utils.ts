import { ClassValue } from '@/types';

// Enhanced cn utility with more features
export function cn(...args: ClassValue[]) {
    const classes: string[] = [];

    args.forEach((arg) => {
        if (!arg) return;

        const argType = typeof arg;

        if (argType === 'string' || argType === 'number') {
            classes.push(arg);
        } else if (Array.isArray(arg)) {
            classes.push(cn(...arg));
        } else if (argType === 'object') {
            Object.keys(arg).forEach((key) => {
                if (arg[key]) {
                    classes.push(key);
                }
            });
        }
    });

    return classes.filter(Boolean).join(' ');
}

export const classNames = (...classes: ClassValue[]): string => {
    const result = new Set<string>();

    const addClass = (item: ClassValue): void => {
        if (!item) return;

        // Handle strings and numbers
        if (typeof item === 'string' || typeof item === 'number') {
            result.add(String(item));
            return;
        }

        // Handle arrays recursively
        if (Array.isArray(item)) {
            item.forEach(addClass);
            return;
        }

        // Handle objects with conditional classes
        if (typeof item === 'object') {
            Object.entries(item).forEach(([className, condition]) => {
                // Explicitly evaluate the condition
                let shouldAdd = false;

                // Handle complex conditions with explicit checks
                if (typeof condition === 'boolean') {
                    shouldAdd = condition;
                } else {
                    try {
                        // More explicit evaluation of the condition
                        shouldAdd = condition === true || (condition !== false && condition !== null && condition !== undefined);
                    } catch {
                        shouldAdd = false;
                    }
                }

                if (shouldAdd) {
                    result.add(className);
                }
            });
        }
    };

    classes.forEach(addClass);
    return Array.from(result).filter(Boolean).join(' ');
};
