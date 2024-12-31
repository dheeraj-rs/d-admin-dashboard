import { FC, useEffect, useState } from 'react';

interface KnobProps {
    value?: number;
    min?: number;
    max?: number;
    onChange?: (e: { value: number }) => void;
    size?: number;
    disabled?: boolean;
    valueTemplate?: string;
    step?: number;
}

const Knob: FC<KnobProps> = ({ value = 0, min = 0, max = 100, onChange, size = 100, disabled = false, step = 1 }) => {
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        const percentage = ((value - min) / (max - min)) * 100;
        const newRotation = (percentage / 100) * 360;
        setRotation(newRotation);
    }, [value, min, max]);

    const handleChange = (e: React.MouseEvent<HTMLDivElement>) => {
        if (disabled) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        const angle = Math.atan2(y, x) * (180 / Math.PI);

        let newRotation = angle + 90;
        if (newRotation < 0) newRotation += 360;

        const percentage = (newRotation / 360) * 100;
        let newValue = Math.round(((max - min) * percentage) / 100 + min);

        newValue = Math.round(newValue / step) * step;

        onChange?.({ value: newValue });
    };

    return (
        <div
            className={`knob ${disabled ? 'disabled' : ''}`}
            style={{ width: size, height: size }}
            onClick={handleChange}
            role="slider"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
        >
            <div className="indicator" style={{ transform: `rotate(${rotation}deg)` }} />
            <div className="value">{value}</div>
        </div>
    );
};

export default Knob;
