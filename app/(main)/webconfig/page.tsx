'use client';
import Card from '@/components/Card/Card';
import { websiteCategories } from '@/public/demo/data/menuItems';
import '@/styles/main/webconfig/index.scss';
import Link from 'next/link';
interface Category {
    id: number;
    type: string;
    title: string;
    description: string;
    icon: string;
    count: number;
    color: string;
    url: string;
}

function WebConfigStudio() {
    return (
        <div className="webconfig-studio">
            {/* <div className="header">
                <h1>Website Configuration</h1>
            </div> */}
            <div className="grid">
                {websiteCategories.map((category) => (
                    <div key={category.id} className="card-wrapper">
                        <Card className={`website-card ${category.color}`}>
                            <Link href={category.url} style={{ textDecoration: 'none' }}>
                                <div className="card-header">
                                    <div className="card-content">
                                        <h3 className="title">{category.title}</h3>
                                        <div className="count">{category.count} sites</div>
                                    </div>
                                    <div className="icon-wrapper">
                                        <i className={category.icon} />
                                    </div>
                                </div>
                                <div className="card-content">
                                    <p className="description">{category.description}</p>
                                </div>
                                <div className="card-footer">
                                    <span className="status">
                                        <i className="pi pi-check-circle mr-2" />
                                        Active Sites
                                    </span>
                                </div>
                            </Link>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WebConfigStudio;
