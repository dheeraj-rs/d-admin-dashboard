"use client";

import { memo } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { useEditorStore } from '@/lib/store'; 
import { Hero } from '@/components/WebSections/Hero';
import { Features } from '@/components/WebSections/Features';
import { Testimonials } from '@/components/WebSections/Testimonials';
import { Header } from '@/components/WebSections/Header';
import { About } from '@/components/WebSections/About';
import { Skills } from '@/components/WebSections/Skills';
import Card from '@/components/Card/Card';

const componentMap = {
  header: Header,
  hero: Hero,
  about: About,
  skills: Skills,
  features: Features,
  testimonials: Testimonials,
};

interface ComponentNodeProps {
  id: string;
  data: {
    type: keyof typeof componentMap;
    content?: any;
  };
}

export const ComponentNode = memo(({ id, data }: ComponentNodeProps) => {
  const { components } = useEditorStore();
  const Component = componentMap[data.type];

  if (!Component) {
    return null;
  }

  return (
    <div className="relative">
      <Handle type="target" position={Position.Top} />
      <Card className="p-4 min-w-[300px]">
        <Component {...(components[id]?.content || {})} />
      </Card>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
});

ComponentNode.displayName = 'ComponentNode';