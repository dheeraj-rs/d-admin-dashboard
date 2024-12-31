'use client';

import '@/styles/main/embedding/index.scss';
import { useCallback, useState } from 'react';

export default function EmbeddedView() {
    const [inputValue, setInputValue] = useState('https://www.google.com');
    const [iframeKey, setIframeKey] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [zoom, setZoom] = useState(100);
    const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    const SEARCH_ENGINE_ID = process.env.NEXT_PUBLIC_SEARCH_ENGINE_ID;

    // URL validation and handling
    const isValidUrl = useCallback((urlString: string) => {
        try {
            const url = new URL(urlString);
            return ['http:', 'https:'].includes(url.protocol);
        } catch {
            return false;
        }
    }, []);

    const normalizeUrl = useCallback((input: string) => {
        const trimmed = input.trim();
        if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
            return `https://${trimmed}`;
        }
        return trimmed;
    }, []);

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        setError(null);
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        const input = inputValue.trim();

        // Check if input looks like a URL
        const normalizedUrl = normalizeUrl(input);
        if (isValidUrl(normalizedUrl)) {
            setInputValue(normalizedUrl);
            setIframeKey((prev) => prev + 1);
            setIsLoading(false);
            return;
        }

        // If not a URL, treat as search query
        try {
            const response = await fetch(
                `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${encodeURIComponent(input)}`
            );
            const data = await response.json();

            if (data.items?.[0]?.link) {
                setInputValue(data.items[0].link);
                setIframeKey((prev) => prev + 1);
            } else {
                setError('No results found');
            }
        } catch (error) {
            setError('Search failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Proxy URL handling
    const getProxiedUrl = (originalUrl: string) => {
        try {
            const processedUrl = originalUrl.replace(/^https?:\/\//, '');
            return `/api/proxy/${processedUrl}`;
        } catch {
            setError('Invalid URL format');
            return '';
        }
    };

    // Controls handling
    const refreshPage = () => setIframeKey((prev) => prev + 1);

    const handleZoom = (zoomIn: boolean) => {
        setZoom((prev) => {
            const newZoom = zoomIn ? prev + 10 : prev - 10;
            return Math.min(Math.max(newZoom, 25), 250);
        });
    };

    const toggleFullscreen = () => setIsFullscreen((prev) => !prev);

    return (
        <div className={`embed-container ${isFullscreen ? 'fullscreen' : ''}`}>
            <div className="embed-controls">
                <form onSubmit={handleSubmit} className="url-form">
                    <div className="control-group">
                        <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Enter URL or search term..." required />
                        <div className="button-group">
                            <button type="submit" className="control-btn go-btn" title="Go to URL or search">
                                Go
                            </button>
                            <button type="button" onClick={refreshPage} className="control-btn" title="Refresh page">
                                ↻
                            </button>
                            <button type="button" onClick={() => handleZoom(true)} className="control-btn" title="Zoom in">
                                +
                            </button>
                            <button type="button" onClick={() => handleZoom(false)} className="control-btn" title="Zoom out">
                                -
                            </button>
                            <button type="button" onClick={toggleFullscreen} className="control-btn" title="Toggle fullscreen">
                                {isFullscreen ? '↙' : '↗'}
                            </button>
                        </div>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>

            <div className="embed-viewer">
                {isLoading && (
                    <div className="loader">
                        <div className="spinner" />
                    </div>
                )}
                <iframe
                    key={iframeKey}
                    src={inputValue ? getProxiedUrl(inputValue) : undefined}
                    style={{
                        transform: `scale(${zoom / 100})`,
                        transformOrigin: 'top left',
                        width: '100%',
                        height: '100%',
                    }}
                    className="embedded-frame"
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-downloads allow-presentation"
                    referrerPolicy="no-referrer"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    onError={() => {
                        setError('Failed to load the webpage');
                        setIsLoading(false);
                    }}
                    onLoad={() => {
                        setIsLoading(false);
                        setError(null);
                    }}
                />
            </div>
        </div>
    );
}
