import { useState } from 'react';

type FilterOption = 'all' | 'free' | 'premium';

interface HeroProps {
    onFilterChange: (filter: FilterOption) => void;
}

export default function Hero({ onFilterChange }: HeroProps) {
    const [activeFilter, setActiveFilter] = useState<FilterOption>('all');

    const handleFilterClick = (filter: FilterOption) => {
        setActiveFilter(filter);
        onFilterChange(filter);
    };

    return (
        <section className="hero">
            <h1 className="hero__title">
                Free <span className="hero__title__portfolio">Portfolio</span> & <span className="hero__title__website">Website</span> Templates
            </h1>
            <p className="hero__subtitle">Browse, clone, and customize thousands of websites #dcode.</p>
            <div className="hero__filter">
                <button
                    className={`hero__filter__button ${activeFilter === 'all' ? 'hero__filter__button_active' : ''}`}
                    onClick={() => handleFilterClick('all')}
                >
                    All
                </button>
                <button
                    className={`hero__filter__button ${activeFilter === 'free' ? 'hero__filter__button_active' : ''}`}
                    onClick={() => handleFilterClick('free')}
                >
                    Free (Ad)
                </button>
                <button
                    className={`hero__filter__button ${activeFilter === 'premium' ? 'hero__filter__button_active' : ''}`}
                    onClick={() => handleFilterClick('premium')}
                >
                    ⚡ Premium
                </button>
            </div>
        </section>
    );
}
