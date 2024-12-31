"use client";

import { Button } from '../Button/Button';

interface HeaderProps {
  logo?: string;
  navigation?: Array<{ label: string; href: string; }>;
}

export function Header({ 
  logo = "Portfolio",
  navigation = [
    { label: "Home", href: "#" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" }
  ]
}: HeaderProps) {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="text-xl font-bold">{logo}</div>
        <nav className="hidden md:flex items-center gap-6">
          {navigation.map((item, index) => (
            <a key={index} href={item.href} className="hover:text-primary">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            {/* <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" /> */}
             <i className='pi pi-sun' />
             <i className='pi pi-moon' />
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            {/* <Menu className="h-5 w-5" /> */}
            <i className='pi pi-bars' />
          </Button>
        </div>
      </div>
    </header>
  );
}