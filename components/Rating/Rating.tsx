import { useState } from 'react';
interface RatingProps {
    value?: number;
    onChange?: (value: number) => void;
    stars?: number;
    disabled?: boolean;
    readOnly?: boolean;
    className?: string;
    cancel?: boolean;
}

const Rating = ({ value = 0, onChange = () => {}, stars = 5, disabled, readOnly, className }: RatingProps) => {
    const [hoverValue, setHoverValue] = useState<number | null>(null);

    return (
        <div className={`rating ${className}`}>
            {[...Array(stars)].map((_, index) => {
                const starValue = index + 1;
                return (
                    <span
                        key={index}
                        className={`rating__star ${hoverValue || value >= starValue ? 'rating__star--filled' : ''}`}
                        onClick={() => !disabled && !readOnly && onChange(starValue)}
                        onMouseEnter={() => !disabled && !readOnly && setHoverValue(starValue)}
                        onMouseLeave={() => !disabled && !readOnly && setHoverValue(null)}
                    >
                        ★
                    </span>
                );
            })}
        </div>
    );
};

export default Rating;
