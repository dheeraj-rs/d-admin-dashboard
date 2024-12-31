'use client';
import { useState } from 'react';

interface CardProps {
    children: React.ReactNode;
    title: string;
    href: string;
    className?: string;
    containerClassName?: string;
}

export const Card = ({ children, title, href, className, containerClassName }: CardProps) => {
    const [transform, setTransform] = useState('translate(-50%,-50%) rotateX(0deg)');

    const onMouseEnter = () => {
        setTransform('translate(-50%,-50%) rotateX(40deg) scale(0.8)');
    };

    const onMouseLeave = () => {
        setTransform('translate(-50%,-50%) rotateX(0deg) scale(1)');
    };

    return (
        <div className={`pin-container ${containerClassName || ''}`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <div
                className="pin-container__pin-wrapper"
                style={{
                    perspective: '1000px',
                    transform: 'rotateX(70deg) translateZ(0deg)',
                }}
            >
                <div
                    className="pin-container__pin-content"
                    style={{
                        transform: transform,
                    }}
                >
                    <div className={className}>{children}</div>
                </div>
            </div>
            <PinPerspective title={title} href={href} />
        </div>
    );
};

interface PinPerspectiveProps {
    title: string;
    href: string;
}

export const PinPerspective = ({ title, href }: PinPerspectiveProps) => {
    return (
        <div className="pin-container__perspective">
            <div className="perspective-content">
                <div className="link-wrapper">
                    <a href={href} target="_blank" rel="noopener noreferrer" className="pin-container__link">
                        <span className="pin-container__link-text">{title}</span>
                        <span className="pin-container__gradient-underline"></span>
                    </a>
                </div>

                <div
                    className="ripple-wrapper"
                    style={{
                        perspective: '1000px',
                        transform: 'rotateX(70deg) translateZ(0)',
                    }}
                >
                    {[0, 2, 4].map((delay) => (
                        <RippleCircle key={delay} delay={delay} />
                    ))}
                </div>

                <>
                    <div className="gradient-line gradient-line--blur" />
                    <div className="gradient-line" />
                    <div className="glow-dot glow-dot--large" />
                    <div className="glow-dot glow-dot--small" />
                </>
            </div>
        </div>
    );
};

interface RippleCircleProps {
    delay?: number;
}

const RippleCircle = ({ delay = 0 }: RippleCircleProps) => {
    return <div className={`ripple-circle ripple-${delay}`} />;
};

export default Card;
