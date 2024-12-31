"use client";

import { Button } from '../Button/Button';

interface AboutProps {
  title?: string;
  description?: string;
  image?: string;
  resumeUrl?: string;
}

export function About({
  title = "About Me",
  description = "I'm a passionate developer with experience in building modern web applications.",
  image = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80",
  resumeUrl = "#"
}: AboutProps) {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">{title}</h2>
            <p className="text-lg text-muted-foreground">{description}</p>
            <Button variant="outline" className="gap-2">
              <i className='pi pi-file-pdf' />
              Download Resume
            </Button>
          </div>
          <div className="aspect-square relative">
            <img 
              src={image} 
              alt="Profile"
              className="rounded-lg object-cover"
              width={100}
              height={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
}