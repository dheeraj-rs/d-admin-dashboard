import { TreeNode, TreeTableSelectionKeysType } from '@/types';
import React, { useState } from 'react';
interface TreeTableProps {
    value: TreeNode[];
    selectionMode?: 'checkbox' | 'single' | 'multiple';
    selectionKeys?: TreeTableSelectionKeysType | null;
    onSelectionChange?: (e: { value: TreeTableSelectionKeysType }) => void;
    children: React.ReactNode;
}

export const TreeTable: React.FC<TreeTableProps> = ({ value, selectionMode, selectionKeys, onSelectionChange, children }) => {
    const [expandedKeys, setExpandedKeys] = useState<{ [key: string]: boolean }>({});

    const toggleNode = (key: string) => {
        setExpandedKeys((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const handleSelect = (key: string) => {
        const newSelectionKeys = { ...(selectionKeys || {}) };
        newSelectionKeys[key] = !newSelectionKeys[key];
        onSelectionChange?.({ value: newSelectionKeys });
    };

    const renderNode = (node: TreeNode, level = 0): JSX.Element => {
        return (
            <React.Fragment key={node.key}>
                <tr className="tree-table-row">
                    <td style={{ paddingLeft: `${level * 20}px` }}>
                        {node.children && (
                            <span className={`tree-toggle-icon ${expandedKeys[node.key] ? 'expanded' : ''}`} onClick={() => toggleNode(node.key)}>
                                ▶
                            </span>
                        )}
                        {selectionMode === 'checkbox' && (
                            <input type="checkbox" checked={selectionKeys?.[node.key]} onChange={() => handleSelect(node.key)} className="tree-checkbox" />
                        )}
                        {node.name}
                    </td>
                    <td>{node.size}</td>
                    <td>{node.type}</td>
                </tr>
                {expandedKeys[node.key] && node.children?.map((child: TreeNode) => renderNode(child, level + 1))}
            </React.Fragment>
        );
    };

    return (
        <div className="tree-table-container">
            <table className="tree-table">
                <thead>
                    <tr>
                        {React.Children.map(children, (child, index) => {
                            if (React.isValidElement(child)) {
                                return <th key={index}>{child.props.header}</th>;
                            }
                            return null;
                        })}
                    </tr>
                </thead>
                <tbody>{value.map((node) => renderNode(node))}</tbody>
            </table>
        </div>
    );
};
