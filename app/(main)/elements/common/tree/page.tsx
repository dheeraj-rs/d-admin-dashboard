'use client';
import { Column } from '@/components/DataTable/Column';
import { Tree } from '@/components/Tree/Tree';
import { TreeTable } from '@/components/TreeTable/TreeTable';
import { NodeService } from '@/demo/service/NodeService';
import { TreeNode, TreeSelectionKeysType, TreeTableSelectionKeysType } from '@/types';
import { useEffect, useState } from 'react';

const TreeDemo = () => {
    const [files, setFiles] = useState<TreeNode[]>([]);
    const [files2, setFiles2] = useState<TreeNode[]>([]);
    const [selectedFileKeys, setSelectedFileKeys] = useState<TreeSelectionKeysType | null>(null);
    const [selectedFileKeys2, setSelectedFileKeys2] = useState<TreeTableSelectionKeysType | null>(null);

    useEffect(() => {
        NodeService.getFiles().then((files) => setFiles(files as TreeNode[]));
        NodeService.getFilesystem().then((files) => setFiles2(files as TreeNode[]));
    }, []);

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Tree</h5>
                    <Tree value={files} selectionMode="checkbox" selectionKeys={selectedFileKeys} onSelectionChange={(e) => setSelectedFileKeys(e.value)} />
                </div>
            </div>
            <div className="col-12">
                <div className="card">
                    <h5>TreeTable</h5>
                    <TreeTable
                        value={files2}
                        selectionMode="checkbox"
                        selectionKeys={selectedFileKeys2}
                        onSelectionChange={(e) => setSelectedFileKeys2(e.value)}
                    >
                        <Column field="name" header="Name" expander />
                        <Column field="size" header="Size" />
                        <Column field="type" header="Type" />
                    </TreeTable>
                </div>
            </div>
        </div>
    );
};

export default TreeDemo;
