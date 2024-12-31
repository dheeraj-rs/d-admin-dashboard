import { FC, useState } from 'react';

export interface ColorPickerRGBType {
    r: number;
    g: number;
    b: number;
}

export interface ColorPickerHSBType {
    h: number;
    s: number;
    b: number;
}

interface ColorPickerProps {
    value?: string | ColorPickerRGBType | ColorPickerHSBType;
    onChange?: (e: { value: string }) => void;
    defaultColor?: string;
    style?: React.CSSProperties;
}

const ColorPicker: FC<ColorPickerProps> = ({ value, onChange, defaultColor = '#000000', style }) => {
    const [color, setColor] = useState(() => {
        if (!value) return defaultColor;
        if (typeof value === 'string') return value;
        // Convert RGB/HSB to hex string
        return typeof value === 'object' && 'r' in value ? rgbToHex(value as ColorPickerRGBType) : hsbToHex(value as ColorPickerHSBType);
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newColor = e.target.value;
        setColor(newColor);
        onChange?.({ value: newColor });
    };

    return (
        <div className="colorPicker" style={style}>
            <input type="color" value={color} onChange={handleChange} className="picker" />
            <span className="value">{color}</span>
        </div>
    );
};

export default ColorPicker;

// Add these helper functions
const rgbToHex = (rgb: ColorPickerRGBType): string => {
    return '#' + [rgb.r, rgb.g, rgb.b].map((x) => Math.round(x).toString(16).padStart(2, '0')).join('');
};

const hsbToHex = (hsb: ColorPickerHSBType): string => {
    // Add HSB to hex conversion if needed
    // For now, returning default black
    return '#000000';
};
