'use client';
import '@/styles/main/websites/index.scss';
import { useState } from 'react';
import WebsiteFilters from './components/WebsiteFilters';
import WebsiteGrid from './components/WebsiteGrid';

export type WebsiteCategory = 'all' | 'free' | 'paid' | 'premium';
export type WebsiteType = 'dashboard' | 'ecommerce' | 'static' | 'dynamic' | 'portfolio' | 'business' | 'other';
export type TechStack = 'react' | 'html' | 'scss' | 'tailwind';

interface FilterOption {
    label: string;
    value: string;
}

export interface WebsiteFiltersState {
    search: string;
    category: FilterOption;
    type: FilterOption;
    tech: FilterOption;
}

function WebsitesPage() {
    const initialFilters: WebsiteFiltersState = {
        search: '',
        category: { label: 'All Categories', value: 'all' },
        type: { label: 'All Types', value: 'all' },
        tech: { label: 'All Technologies', value: 'all' },
    };

    const [filters, setFilters] = useState<WebsiteFiltersState>(initialFilters);

    return (
        <div className="websites-page">
            <WebsiteFilters filters={filters} onFilterChange={setFilters} />
            <WebsiteGrid filters={filters} />
        </div>
    );
}

export default WebsitesPage;
