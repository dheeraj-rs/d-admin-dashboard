import { ReactNode } from 'react';
interface TimelineProps {
    value: any[];
    align?: 'left' | 'right' | 'alternate';
    layout?: 'vertical' | 'horizontal';
    content: (item: any) => ReactNode;
    opposite?: ((item: any) => ReactNode) | ReactNode;
    marker?: (item: any) => ReactNode;
    className?: string;
}

const Timeline = ({ value, align = 'left', layout = 'vertical', content, opposite, marker, className = '' }: TimelineProps) => {
    const getClassName = () => {
        return ['timeline', `timeline-${align}`, `timeline-${layout}`, className].join(' ');
    };

    const getDefaultMarker = (item: any) => {
        return <div className="timeline-marker"></div>;
    };

    return (
        <div className={getClassName()}>
            {value.map((item, index) => (
                <div key={index} className="timeline-item">
                    {opposite && <div className="timeline-opposite">{typeof opposite === 'function' ? opposite(item) : opposite}</div>}
                    <div className="timeline-separator">
                        {marker ? marker(item) : getDefaultMarker(item)}
                        {layout === 'vertical' && <div className="timeline-line"></div>}
                    </div>
                    <div className="timeline-content">{content(item)}</div>
                </div>
            ))}
        </div>
    );
};

export default Timeline;
