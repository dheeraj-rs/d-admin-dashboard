import React, { useState } from 'react';
interface CarouselProps {
    value: any[];
    numVisible: number;
    numScroll: number;
    responsiveOptions: any[];
    itemTemplate: (item: any) => React.ReactNode;
}

export const Carousel: React.FC<CarouselProps> = ({ value, numVisible, itemTemplate }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % Math.ceil(value.length / numVisible));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + Math.ceil(value.length / numVisible)) % Math.ceil(value.length / numVisible));
    };

    return (
        <div className="carousel">
            <button className="carousel__nav carousel__nav--prev" onClick={prevSlide}>
                <i className="pi pi-chevron-left" />
            </button>

            <div className="carousel__container">
                <div
                    className="carousel__track"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                    }}
                >
                    {value.map((item, index) => (
                        <div key={index} className="carousel__item">
                            {itemTemplate(item)}
                        </div>
                    ))}
                </div>
            </div>

            <button className="carousel__nav carousel__nav--next" onClick={nextSlide}>
                <i className="pi pi-chevron-right" />
            </button>
        </div>
    );
};
