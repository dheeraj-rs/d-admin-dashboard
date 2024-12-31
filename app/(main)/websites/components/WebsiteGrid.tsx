import { useRouter } from 'next/navigation';
import { WebsiteFiltersState } from '../page';
import { useEffect, useState } from 'react';

interface Website {
    _id: string;
    name: string;
    image: string;
    type: string;
    category: string;
    technologies: string[];
    price: number;
    url: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

interface WebsiteGridProps {
    filters: WebsiteFiltersState;
}

interface TechIcon {
    icon: string;
    title: string;
}

interface TechIcons {
    [key: string]: TechIcon;
}

export default function WebsiteGrid({ filters }: WebsiteGridProps) {
    const router = useRouter();
    const [websites, setWebsites] = useState<Website[]>([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('/api/items');
                if (!response.ok) {
                    throw new Error('Failed to fetch websites');
                }
                const data = await response.json();
                setWebsites(data);
            } catch (error) {
                console.error('Error fetching websites:', error);
                setWebsites([]);
            }
        };
        fetchItems();
    }, []);

    const filteredWebsites = websites.filter((website: Website) => {
        const searchTerm = filters.search?.toLowerCase() || '';
        const websiteName = website.name?.toLowerCase() || '';
        const matchesSearch = !searchTerm || websiteName.includes(searchTerm);

        const categoryValue = filters.category?.value;
        const matchesCategory = !categoryValue || 
                              categoryValue === 'all' || 
                              website.category === categoryValue;

        const typeValue = filters.type?.value;
        const matchesType = !typeValue || 
                           typeValue === 'all' || 
                           website.type === typeValue;

        const techValue = filters.tech?.value;
        const matchesTech = !techValue || 
                           techValue === 'all' || 
                           (Array.isArray(website.technologies) && 
                            website.technologies.includes(techValue));

        return matchesSearch && matchesCategory && matchesType && matchesTech;
    });

    const renderTechIcon = (tech: string): JSX.Element | null => {
        const techIcons: TechIcons = {
            react: { icon: 'pi pi-slack', title: 'React' },
            html: { icon: 'pi pi-code', title: 'HTML' },
            scss: { icon: 'pi pi-file', title: 'SCSS' },
            tailwind: { icon: 'pi pi-globe', title: 'Tailwind CSS' },
            css: { icon: 'pi pi-palette', title: 'CSS' },
            next: { icon: 'pi pi-server', title: 'Next.js' },
            typescript: { icon: 'pi pi-code', title: 'TypeScript' },
            nodejs: { icon: 'pi pi-server', title: 'Node.js' }
        };

        const techInfo = techIcons[tech];
        return techInfo ? <i className={techInfo.icon} title={techInfo.title} /> : null;
    };

    const renderActionButton = (website: Website): JSX.Element | null => {
        switch (website.category) {
            case 'free':
                return <button className="website-card__action download">Download</button>;
            case 'paid':
            case 'premium':
                return <button className="website-card__action buy">Buy Now ${website.price}</button>;
            default:
                return null;
        }
    };

    const handlePreview = (url: string | undefined): void => {
        if (url) {
            router.push(url);
        }
    };

    return (
        <div className="website-grid">
            {filteredWebsites.map((website) => (
                <div key={website._id} className="website-card">
                    <div className="website-card__image">
                        <img src={website.image} alt={website.name} />
                        <span className={`category-badge ${website.category}`}>{website.category}</span>
                    </div>
                    <div className="website-card__content">
                        <h3 className="website-card__title">{website.name}</h3>
                        <div className="website-card__tech">
                            {website.technologies.map((tech) => (
                                <span key={tech} className="tech-icon">
                                    {renderTechIcon(tech)}
                                </span>
                            ))}
                        </div>
                        {website.price !== undefined && (
                            <div className={`website-card__price ${website.category}`}>
                                {website.price === 0 ? 'Free' : `$${website.price}`}
                            </div>
                        )}
                        <div className="website-card__actions">
                            <button 
                                className="website-card__action preview" 
                                onClick={() => handlePreview(website.url)}
                            >
                                Preview
                            </button>
                            {renderActionButton(website)}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
