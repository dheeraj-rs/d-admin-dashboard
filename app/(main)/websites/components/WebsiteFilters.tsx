import { Dropdown } from '@/components/Dropdown/Dropdown';
import { InputText } from '@/components/InputText/InputText';
import { useState } from 'react';
import { WebsiteFiltersState } from '../page';

interface WebsiteFiltersProps {
    filters: WebsiteFiltersState;
    onFilterChange: (filters: WebsiteFiltersState) => void;
}

export default function WebsiteFilters({ filters, onFilterChange }: WebsiteFiltersProps) {
    const [searchFocused, setSearchFocused] = useState(false);

    const categoryOptions = [
        { label: 'All Categories', value: 'all' },
        { label: 'Free', value: 'free' },
        { label: 'Paid', value: 'paid' },
        { label: 'Premium', value: 'premium' },
    ];

    const typeOptions = [
        { label: 'All Types', value: 'all' },
        { label: 'Static', value: 'static' },
        { label: 'Dynamic', value: 'dynamic' },
        { label: 'E-commerce', value: 'ecommerce' },
        { label: 'Blog', value: 'blog' },
        { label: 'Dashboard', value: 'dashboard' },
        { label: 'Portfolio', value: 'portfolio' },
        { label: 'Landing Page', value: 'landing-page' },
        { label: 'Admin Panel', value: 'admin-panel' }
    ];

    const techOptions = [
        { label: 'All Technologies', value: 'all' },
        { label: 'React', value: 'react' },
        { label: 'Next.js', value: 'next' },
        { label: 'HTML', value: 'html' },
        { label: 'CSS', value: 'css' },
        { label: 'SCSS', value: 'scss' },
        { label: 'Tailwind CSS', value: 'tailwind' },
        { label: 'TypeScript', value: 'typescript' },
        { label: 'Node.js', value: 'nodejs' }
    ];

    const handleResetFilters = () => {
        onFilterChange({
            search: '',
            category: { label: 'All Categories', value: 'all' },
            type: { label: 'All Types', value: 'all' },
            tech: { label: 'All Technologies', value: 'all' },
        });
    };

    return (
        <div className="website-filters">
            <div className="website-filters__container">
                <div className={`website-filters__search ${searchFocused ? 'focused' : ''}`}>
                    <InputText
                        value={filters.search}
                        onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                        placeholder="Search websites..."
                    />
                    {filters.search && (
                        <button className="clear-search" onClick={() => onFilterChange({ ...filters, search: '' })}>
                            <i className="pi pi-times" />
                        </button>
                    )}
                </div>

                <div className="website-filters__dropdowns">
                    <Dropdown
                        id="category"
                        value={filters.category}
                        options={categoryOptions}
                        onChange={(e) => onFilterChange({ ...filters, category: e.value })}
                        className="website-dropdown"
                        placeholder="Select Category"
                    />

                    <Dropdown
                        id="type"
                        value={filters.type}
                        options={typeOptions}
                        onChange={(e) => onFilterChange({ ...filters, type: e.value })}
                        className="website-dropdown"
                        placeholder="Select Type"
                    />

                    <Dropdown
                        id="tech"
                        value={filters.tech}
                        options={techOptions}
                        onChange={(e) => onFilterChange({ ...filters, tech: e.value })}
                        className="website-dropdown"
                        placeholder="Select Technology"
                    />

                    <button className="website-filters__reset" onClick={handleResetFilters} title="Reset all filters">
                        <i className="pi pi-refresh" />
                    </button>
                </div>
            </div>
        </div>
    );
}
