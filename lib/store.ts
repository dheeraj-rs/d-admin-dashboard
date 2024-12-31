import { create } from 'zustand';
import { Node, Edge } from 'react-flow-renderer';

interface Website {
  id: string;
  name: string;
  layout: {
    nodes: Node[];
    edges: Edge[];
  };
}

interface EditorStore {
  websites: Website[];
  currentWebsite: string | null;
  nodes: Node[];
  edges: Edge[];
  selectedNode: Node | null;
  components: Record<string, any>;
  setWebsites: (websites: Website[]) => void;
  setCurrentWebsite: (id: string) => void;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  setSelectedNode: (node: Node | null) => void;
  updateComponentContent: (id: string, content: any) => void;
  addWebsite: (website: Website) => void;
  updateNodePosition: (nodeId: string, position: { x: number; y: number }) => void;
  updateEdges: (edgeChanges: Edge[]) => void;
}

const initialWebsites: Website[] = [
  {
    id: 'portfolio',
    name: 'Portfolio Website',
    layout: {
      nodes: [
        {
          id: 'header-1',
          type: 'componentNode',
          position: { x: 250, y: 0 },
          data: { 
            type: 'header',
            content: {
              logo: 'John Doe',
              navigation: [
                { label: 'Home', href: '#' },
                { label: 'About', href: '#about' },
                { label: 'Projects', href: '#projects' },
                { label: 'Contact', href: '#contact' }
              ]
            }
          }
        },
        {
          id: 'hero-1',
          type: 'componentNode',
          position: { x: 250, y: 100 },
          data: { 
            type: 'hero',
            content: {
              title: 'Creative Developer',
              description: 'Building modern web experiences',
              ctaText: 'View Projects'
            }
          }
        },
        {
          id: 'about-1',
          type: 'componentNode',
          position: { x: 250, y: 300 },
          data: {
            type: 'about',
            content: {
              title: 'About Me',
              description: 'Passionate developer with 5+ years of experience',
              image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
            }
          }
        },
        {
          id: 'skills-1',
          type: 'componentNode',
          position: { x: 250, y: 500 },
          data: {
            type: 'skills',
            content: {
              title: 'My Skills',
              skills: [
                { name: 'React', level: 90, category: 'Frontend' },
                { name: 'Node.js', level: 85, category: 'Backend' },
                { name: 'TypeScript', level: 88, category: 'Languages' }
              ]
            }
          }
        }
      ],
      edges: [
        { id: 'e1-2', source: 'header-1', target: 'hero-1' },
        { id: 'e2-3', source: 'hero-1', target: 'about-1' },
        { id: 'e3-4', source: 'about-1', target: 'skills-1' }
      ]
    }
  }
];

export const useEditorStore = create<EditorStore>((set) => ({
  websites: initialWebsites,
  currentWebsite: null,
  nodes: [],
  edges: [],
  selectedNode: null,
  components: {},
  setWebsites: (websites) => set({ websites }),
  setCurrentWebsite: (id) => {
    const website = initialWebsites.find(w => w.id === id);
    if (website) {
      set({ 
        currentWebsite: id,
        nodes: website.layout.nodes,
        edges: website.layout.edges,
        components: website.layout.nodes.reduce((acc, node) => ({
          ...acc,
          [node.id]: { type: node.data.type, content: node.data.content }
        }), {})
      });
    }
  },
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  setSelectedNode: (node) => set({ selectedNode: node }),
  updateComponentContent: (id, content) =>
    set((state) => ({
      components: {
        ...state.components,
        [id]: { ...state.components[id], content }
      },
      nodes: state.nodes.map(node => 
        node.id === id 
          ? { ...node, data: { ...node.data, content } }
          : node
      )
    })),
  addWebsite: (website) =>
    set((state) => ({
      websites: [...state.websites, website]
    })),
  updateNodePosition: (nodeId, position) =>
    set((state) => ({
      nodes: state.nodes.map(node =>
        node.id === nodeId
          ? { ...node, position }
          : node
      )
    })),
  updateEdges: (edgeChanges) =>
    set((state) => ({
      edges: edgeChanges
    }))
}));