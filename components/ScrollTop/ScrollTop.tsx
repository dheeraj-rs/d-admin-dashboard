import { useEffect, useState } from 'react';

interface ScrollTopProps {
    threshold?: number;
    behavior?: ScrollBehavior;
    className?: string;
    icon?: string;
    target?: string;
}

export const ScrollTop = ({ threshold = 400, behavior = 'smooth', className, icon = '↑', target }: ScrollTopProps) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.pageYOffset > threshold);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [threshold]);

    const scrollToTop = () => {
        if (target) {
            const element = document.getElementById(target);
            if (element) {
                element.scrollIntoView({ behavior });
            }
        } else {
            window.scrollTo({ top: 0, behavior });
        }
    };

    if (!visible) return null;

    return (
        <button className={`scroll-top ${className || ''}`} onClick={scrollToTop} aria-label="Scroll to top">
            {icon}
        </button>
    );
};
