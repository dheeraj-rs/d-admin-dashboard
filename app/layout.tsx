'use client';
import { ThemeProvider } from '@/layout/context/themeContext';
import { LayoutProvider } from '../layout/context/layoutContext';
import 'nextflex/nextflex.scss';

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning>
            {/* <head>
                <link id="theme-css" href={`/themes/md-dark-indigo/theme.css`} rel="stylesheet"></link>
            </head> */}          
            <ThemeProvider>
            <body>
                <LayoutProvider>{children}</LayoutProvider>
            </body>
            </ThemeProvider>
        </html>
    );
}
