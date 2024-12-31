'use client';
import { projects } from '@/public/demo/data/menuItems';
import '@/styles/main/websites/index.scss';
import { Card } from './Card';

// Add interface for project item structure
interface Project {
    id: number;
    title: string;
    des: string;
    img: string;
    iconLists: string[];
}

const ProjectsCards = (): JSX.Element => {
    return (
        <div className="recent-projects">
            <h1 className="heading">
                A small selection of <span>recent projects</span>
            </h1>
            <div className="projects-container">
                {projects.map((item: Project) => (
                    <div className="project-card" key={item.id}>
                        <Card title="/ui.aceternity.com" href="https://twitter.com/mannupaaji">
                            <div className="image-container">
                                <div className="background">
                                    <img src="/bg.png" alt="bgimg" />
                                </div>
                                <img src={item.img} alt="cover" className="cover-image" />
                            </div>

                            <h1 className="project-title">{item.title}</h1>
                            <p className="project-description">{item.des}</p>

                            <div className="project-footer">
                                <div className="icon-list">
                                    {item.iconLists.map((icon: string, index: number) => (
                                        <div
                                            key={index}
                                            className="icon-container"
                                            style={{
                                                transform: `translateX(-${5 * index + 2}px)`,
                                            }}
                                        >
                                            <img src={icon} alt={`icon${index + 1}`} />
                                        </div>
                                    ))}
                                </div>

                                <div className="live-site">
                                    <p>Check Live Site</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectsCards;
