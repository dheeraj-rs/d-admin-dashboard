'use client';
import React, { useRef, useState } from 'react';

type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

const CodeEditor: React.FC = () => {
    const [code, setCode] = useState('');
    const previewRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 20, y: 20 });
    const [size, setSize] = useState({ width: 400, height: 300 });
    const dragStart = useRef({ x: 0, y: 0 });
    const [previewContent, setPreviewContent] = useState<string>('');

    React.useEffect(() => {
        const sampleJson = {
            name: 'Sample Project',
            version: '1.0.0',
            description: 'This is a sample JSON structure',
            features: {
                resizable: true,
                draggable: true,
                colors: ['blue', 'red', 'green'],
            },
            settings: {
                theme: 'dark',
                fontSize: 14,
                autoSave: true,
            },
            nested: {
                level1: {
                    level2: {
                        value: 'Deep nested value',
                    },
                },
            },
        };

        const formattedJson = JSON.stringify(sampleJson, null, 2);
        setCode(formattedJson);
        setPreviewContent(formattedJson);
    }, []);

    const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newCode = e.target.value;
        setCode(newCode);

        try {
            const parsedCode = JSON.parse(newCode);
            setPreviewContent(JSON.stringify(parsedCode, null, 2));
        } catch (error) {
            setPreviewContent('Invalid JSON format');
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).classList.contains('previewPanel__header')) {
            setIsDragging(true);
            dragStart.current = {
                x: e.clientX - position.x,
                y: e.clientY - position.y,
            };
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - dragStart.current.x,
                y: e.clientY - dragStart.current.y,
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleResize = (e: React.MouseEvent, direction: ResizeDirection) => {
        e.preventDefault();
        e.stopPropagation();

        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = size.width;
        const startHeight = size.height;
        const startPosition = { ...position };

        const handleMouseMove = (e: MouseEvent) => {
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;

            const newSize = { ...size };
            const newPosition = { ...position };

            if (direction.includes('e')) {
                newSize.width = Math.max(200, startWidth + deltaX);
            } else if (direction.includes('w')) {
                newSize.width = Math.max(200, startWidth - deltaX);
                newPosition.x = startPosition.x + deltaX;
            }

            if (direction.includes('s')) {
                newSize.height = Math.max(200, startHeight + deltaY);
            } else if (direction.includes('n')) {
                newSize.height = Math.max(200, startHeight - deltaY);
                newPosition.y = startPosition.y + deltaY;
            }

            setSize(newSize);
            setPosition(newPosition);
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    return (
        <div className="mainContainer" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
            <textarea value={code} onChange={handleCodeChange} className="codeEditor" spellCheck="false" placeholder="Paste your JSON code here..." />
            <div
                ref={previewRef}
                className="previewPanel"
                style={{
                    right: position.x,
                    top: position.y,
                    width: size.width,
                    height: size.height,
                }}
                onMouseDown={handleMouseDown}
            >
                <div className="previewPanel__header">Preview</div>
                <div className="previewPanel__content">
                    <pre>{previewContent}</pre>
                </div>
                <div className="previewPanel__resizeHandle" onMouseDown={(e) => handleResize(e, 'se')} />
            </div>
        </div>
    );
};

export default CodeEditor;
