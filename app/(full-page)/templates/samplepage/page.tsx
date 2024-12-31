'use client';
import '@/styles/main/web/index.scss';
import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Templates from './components/Templates';

type FilterOption = 'all' | 'free' | 'premium';

export default function Home() {
    const [filter, setFilter] = useState<FilterOption>('all');

    return (
        <main className="templates-page">
            <Header />
            <Hero onFilterChange={setFilter} />
            <Templates filter={filter} />
        </main>
    );
}
