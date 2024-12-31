"use client";

import { useCallback, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Connection,
  NodeChange,
  EdgeChange,
  Edge,
  Node as FlowNode,
  NodeMouseHandler
} from 'react-flow-renderer';
import { useEditorStore } from '@/lib/store';
import { ComponentNode } from '../components/ComponentNode';
import { WebsiteList } from '../components/WebsiteList';
import { PropertyPanel } from '../components/PropertyPanel';


const nodeTypes = {
  componentNode: ComponentNode,
};

export default function EditorPage() {
  const { 
    nodes: storeNodes, 
    edges: storeEdges,
    setNodes: setStoreNodes,
    setEdges: setStoreEdges,
    setSelectedNode,
    currentWebsite,
    setCurrentWebsite,
    updateNodePosition,
    updateEdges
  } = useEditorStore();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    if (!currentWebsite) {
      setCurrentWebsite('portfolio');
    }
  }, [currentWebsite, setCurrentWebsite]);

  useEffect(() => {
    setNodes(storeNodes);
    setEdges(storeEdges);
  }, [setEdges, setNodes]);

  const onNodeClick: NodeMouseHandler = useCallback((_, node) => {
    setSelectedNode(node);
  }, [setSelectedNode]);

  const onNodesChangeHandler = useCallback((changes: NodeChange[]) => {
    onNodesChange(changes);
    // Update node positions in store
    changes.forEach(change => {
      if (change.type === 'position' && change.position) {
        updateNodePosition(change.id, change.position);
      }
    });
    setStoreNodes(nodes);
  }, [onNodesChange, setStoreNodes, updateNodePosition]);

  const onEdgesChangeHandler = useCallback((changes: EdgeChange[]) => {
    onEdgesChange(changes);
    setStoreEdges(edges);
    updateEdges(edges);
  }, [onEdgesChange, setStoreEdges, updateEdges]);
  const onConnect = useCallback((params: Connection) => {
    setEdges((eds: Edge[]) => {
      if (!params.source || !params.target) return eds;
      const newEdges = [...eds, { ...params, id: `e${params.source}-${params.target}`, source: params.source, target: params.target }];
      updateEdges(newEdges);
      return newEdges;
    });
  }, []);

  return (
    <div className="flex h-screen bg-background">
      <WebsiteList />
      <div className="flex-1 h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChangeHandler}
          onEdgesChange={onEdgesChangeHandler}
          onNodeClick={onNodeClick}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          snapToGrid
          snapGrid={[20, 20]}
        >
          <Background />
          <Controls />
          <MiniMap 
            nodeStrokeColor="#666"
            nodeColor="#fff"
            nodeBorderRadius={2}
          />
        </ReactFlow>
      </div>
      <PropertyPanel />
    </div>
  );
}