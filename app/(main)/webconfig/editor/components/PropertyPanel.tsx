"use client";

import { useEditorStore } from '@/lib/store';
import Card from '@/components/Card/Card';
import { Button } from '@/components/Button/Button';
import { ScrollArea } from '@/components/ScrollArea/ScrollArea';
import { Label } from '@/components/Label/Label';
import { Input } from '@/components/Input/Input';

export function PropertyPanel() {
  const { selectedNode, updateComponentContent } = useEditorStore();

  if (!selectedNode) {
    return (
      <Card className="w-80 p-4 m-4 h-[calc(100vh-2rem)]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Properties</h2>
        </div>
        <p className="text-muted-foreground text-center mt-8">
          Select a component to edit its properties
        </p>
      </Card>
    );
  }

  const handleContentChange = (key: string, value: any) => {
    const content = { ...selectedNode.data.content };
    
    if (key.includes('.')) {
      const [parentKey, childKey, grandChildKey] = key.split('.');
      if (grandChildKey) {
        if (!content[parentKey]) content[parentKey] = {};
        if (!content[parentKey][childKey]) content[parentKey][childKey] = {};
        content[parentKey][childKey][grandChildKey] = value;
      } else {
        if (!content[parentKey]) content[parentKey] = {};
        content[parentKey][childKey] = value;
      }
    } else {
      content[key] = value;
    }
    
    updateComponentContent(selectedNode.id, content);
  };

  return (
    <Card className="w-80 p-4 m-4 h-[calc(100vh-2rem)]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Properties</h2>
        <Button variant="ghost" size="icon">
          {/* <Trash2 className="h-4 w-4 text-destructive" /> */}
          <i className='pi pi-trash'/>
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="space-y-6 pr-4">
          {selectedNode.data.type === 'header' && (
            <>
              <div>
                <Label>Logo Text</Label>
                <Input
                  value={selectedNode.data.content?.logo || ''}
                  onChange={(e) => handleContentChange('logo', e.target.value)}
                />
              </div>
              {selectedNode.data.content?.navigation?.map((_: any, index: number) => (
                <div key={index} className="space-y-2 p-3 border rounded-md">
                  <Label>Navigation Item {index + 1}</Label>
                  <Input
                    value={selectedNode.data.content?.navigation[index].label || ''}
                    onChange={(e) => handleContentChange(`navigation.${index}.label`, e.target.value)}
                    placeholder="Label"
                  />
                  <Input
                    value={selectedNode.data.content?.navigation[index].href || ''}
                    onChange={(e) => handleContentChange(`navigation.${index}.href`, e.target.value)}
                    placeholder="URL"
                  />
                </div>
              ))}
            </>
          )}
          {/* Existing property editors for other components */}
        </div>
      </ScrollArea>
    </Card>
  );
}