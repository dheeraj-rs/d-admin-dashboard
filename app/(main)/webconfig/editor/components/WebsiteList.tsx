"use client";

import { useEditorStore } from '@/lib/store';
import Card from '@/components/Card/Card';
import { ScrollArea } from '@/components/ScrollArea/ScrollArea';
import { Button } from '@/components/Button/Button';
import { useState } from 'react';

export function WebsiteList() {
  const { websites, setCurrentWebsite, currentWebsite, addWebsite } = useEditorStore();
  const [isCreating, setIsCreating] = useState(false);

  const handleAddWebsite = () => {
    const newWebsite = {
      id: `website-${Date.now()}`,
      name: `New Website ${websites.length + 1}`,
      layout: {
        nodes: [
          {
            id: 'header-1',
            type: 'componentNode',
            position: { x: 250, y: 0 },
            data: { 
              type: 'header',
              content: {
                logo: 'New Website',
                navigation: [
                  { label: 'Home', href: '#' },
                  { label: 'About', href: '#about' }
                ]
              }
            }
          }
        ],
        edges: []
      }
    };
    addWebsite(newWebsite);
    setCurrentWebsite(newWebsite.id);
    setIsCreating(false);
  };

  return (
    <Card className="w-64 p-4 m-4 h-[calc(100vh-2rem)]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Websites</h2>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleAddWebsite}
          disabled={isCreating}
        >
          {/* <Plus className="h-4 w-4" /> */}
          <i className='pi pi-plus'/>
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="space-y-2">
          {websites.map((website) => (
            <Button
              key={website.id}
              variant={currentWebsite === website.id ? "secondary" : "ghost"}
              className="w-full justify-start gap-2 text-left"
              onClick={() => setCurrentWebsite(website.id)}
            >
              {/* <Layout className="h-4 w-4 shrink-0" /> */}
              <i className='pi pi-image'/>
              <span className="truncate">{website.name}</span>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}