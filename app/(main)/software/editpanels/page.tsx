'use client';
import '@/styles/main/editpanels/index.scss';
import { useState } from 'react';
import CodeEditor from './CodeEditor';

function Editpanels() {
    const [panels] = useState(Array(3).fill(null));

    return (
        <div className="panels-container">
            <div className="panel-wrapper">
                {panels.map((_, index) => (
                    <div key={index} className="panel">
                        <div className="panel-header">
                            <div className="panel-controls">
                                <button className="control-btn copy-btn">
                                    <i className="fas fa-copy"></i> Copy
                                </button>
                            </div>
                        </div>
                        <div className="panel-content">
                            <CodeEditor />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Editpanels;
