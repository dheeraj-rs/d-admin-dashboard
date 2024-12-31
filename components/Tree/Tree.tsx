import { TreeNode, TreeSelectionKeysType } from '@/types';
import React, { useState } from 'react';
interface TreeProps {
    value: TreeNode[];
    selectionMode?: 'checkbox' | 'single' | 'multiple';
    selectionKeys?: TreeSelectionKeysType | null;
    onSelectionChange?: (e: { value: TreeSelectionKeysType }) => void;
}

const TreeNodeComponent = ({
    node,
    level = 0,
    selectionMode,
    selected,
    onSelect,
}: {
    node: TreeNode;
    level?: number;
    selectionMode?: string;
    selected?: boolean;
    onSelect?: (key: string) => void;
}) => {
    const [expanded, setExpanded] = useState(node.expanded || false);

    return (
        <div className="tree-node" style={{ paddingLeft: `${level * 20}px` }}>
            <div className="tree-node-content">
                {node.children && (
                    <span className={`tree-toggle-icon ${expanded ? 'expanded' : ''}`} onClick={() => setExpanded(!expanded)}>
                        ▶
                    </span>
                )}
                {selectionMode === 'checkbox' && <input type="checkbox" checked={selected} onChange={() => onSelect?.(node.key)} className="tree-checkbox" />}
                <span className="tree-label">{node.label}</span>
            </div>
            {expanded && node.children && (
                <div className="tree-children">
                    {node.children.map((child: TreeNode) => (
                        <TreeNodeComponent
                            key={child.key}
                            node={child}
                            level={level + 1}
                            selectionMode={selectionMode}
                            selected={selected}
                            onSelect={onSelect}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export const Tree: React.FC<TreeProps> = ({ value, selectionMode, selectionKeys, onSelectionChange }) => {
    const handleSelect = (key: string) => {
        const newSelectionKeys = { ...(selectionKeys || {}) };
        newSelectionKeys[key] = !newSelectionKeys[key];
        onSelectionChange?.({ value: newSelectionKeys });
    };

    return (
        <div className="tree-container">
            {value.map((node) => (
                <TreeNodeComponent key={node.key} node={node} selectionMode={selectionMode} selected={selectionKeys?.[node.key]} onSelect={handleSelect} />
            ))}
        </div>
    );
};
