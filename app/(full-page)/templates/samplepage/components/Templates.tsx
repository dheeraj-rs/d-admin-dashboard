import Image from 'next/image';

interface Template {
    id: string;
    title: string;
    image: string;
    technologies: string;
    price: number | 'Free';
    type: 'free' | 'premium';
}

interface TemplatesProps {
    filter: 'all' | 'free' | 'premium';
}

export default function Templates({ filter }: TemplatesProps) {
    const templates: Template[] = [
        {
            id: '1',
            title: 'Neon Personal Portfolio',
            image: '/placeholder.svg',
            technologies: 'HTML, CSS, Javascript',
            price: 299,
            type: 'premium',
        },
        {
            id: '2',
            title: 'Digital Marketing',
            image: '/placeholder.svg',
            technologies: 'HTML, CSS, Javascript',
            price: 'Free',
            type: 'free',
        },
        {
            id: '3',
            title: 'UI/UX Designer',
            image: '/placeholder.svg',
            technologies: 'HTML, CSS, Javascript',
            price: 'Free',
            type: 'free',
        },
        {
            id: '4',
            title: 'Bluetooth Headphone',
            image: '/placeholder.svg',
            technologies: 'HTML, CSS, Javascript',
            price: 'Free',
            type: 'free',
        },
    ];

    const filteredTemplates = templates.filter((template) => {
        if (filter === 'all') return true;
        return template.type === filter;
    });

    return (
        <section className="templates">
            <h2 className="templates__title">All Templates</h2>
            <div className="templates__grid">
                {filteredTemplates.map((template) => (
                    <div key={template.id} className="templates__card">
                        <Image src={template.image} alt={template.title} width={400} height={200} className="templates__card__image" />
                        <div className="templates__card__content">
                            <h3 className="templates__card__content__title">{template.title}</h3>
                            <p className="templates__card__content__tech">{template.technologies}</p>
                            <p className={`templates__card__content__price ${template.price === 'Free' ? 'templates__card__content__price_free' : ''}`}>
                                {template.price === 'Free' ? 'Free' : `₹${template.price}`}
                            </p>
                            <div className="templates__card__content__actions">
                                <button className="templates__card__content__actions__preview">Preview</button>
                                <button className="templates__card__content__actions__action">{template.price === 'Free' ? 'Download' : 'Buy Now'}</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
