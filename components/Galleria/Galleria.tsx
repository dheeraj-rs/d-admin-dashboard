import React, { useState } from 'react';
interface GalleriaProps {
    value: any[];
    numVisible: number;
    circular?: boolean;
    style?: React.CSSProperties;
    item: (item: any) => React.ReactNode;
    thumbnail: (item: any) => React.ReactNode;
    responsiveOptions?: any[];
}

export const Galleria: React.FC<GalleriaProps> = ({ value, numVisible, item, thumbnail, style }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="galleria" style={style}>
            <div className="galleria__main">{item(value[activeIndex])}</div>

            <div className="galleria__thumbnails">
                {value.map((image, index) => (
                    <div key={index} className={`galleria__thumbnail ${index === activeIndex ? 'active' : ''}`} onClick={() => setActiveIndex(index)}>
                        {thumbnail(image)}
                    </div>
                ))}
            </div>
        </div>
    );
};
