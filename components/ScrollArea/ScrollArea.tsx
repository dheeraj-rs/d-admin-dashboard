import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'vertical' | 'horizontal';
  scrollHideDelay?: number;
}

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, children, orientation = 'vertical', scrollHideDelay = 600, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative overflow-auto',
          orientation === 'horizontal' ? 'overflow-x-auto overflow-y-hidden' : 'overflow-y-auto overflow-x-hidden',
          className
        )}
        {...props}
      >
        <div className="min-w-full">
          {children}
        </div>
        <div className={cn(
          'absolute right-0.5 bottom-0.5 top-0.5 w-2 transition-all',
          orientation === 'horizontal' ? 'left-0.5 h-2 w-auto bottom-0.5' : ''
        )}>
          <div className="relative h-full w-full">
            <div className="absolute bg-border/50 rounded-full w-full opacity-0 transition-opacity hover:opacity-100" 
                 style={{ height: orientation === 'horizontal' ? '100%' : '25%' }} />
          </div>
        </div>
      </div>
    );
  }
);

ScrollArea.displayName = 'ScrollArea'; 