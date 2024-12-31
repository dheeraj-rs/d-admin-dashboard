'use client';
import React from 'react';

interface CodeSnippet {
    code: string;
    language?: string;
}

interface DocumentSectionProps {
    title: string;
    children: React.ReactNode;
}

interface ExternalLinkProps {
    href: string;
    children: React.ReactNode;
}

const ExternalLink: React.FC<ExternalLinkProps> = ({ href, children }) => (
    <a href={href} className="font-medium hover:underline text-primary" target="_blank" rel="noopener noreferrer">
        {children}
    </a>
);

const CodeBlock: React.FC<CodeSnippet> = ({ code, language }) => (
    <pre className="app-code" lang={language}>
        <code>{code}</code>
    </pre>
);

const DocumentSection: React.FC<DocumentSectionProps> = ({ title, children }) => (
    <section className="mb-6">
        <h4 className="mb-4">{title}</h4>
        {children}
    </section>
);

const Documentation: React.FC = () => {
    const codeSnippets = {
        install: {
            code: `"npm install" or "yarn"`,
        },
        start: {
            code: `"npm run dev" or "yarn dev"`,
        },
        dependencies: {
            code: `"d-admin": "^1.0.0",                    //required: d-admin components
"drjicons": "^1.0.0",                   //required: Icons
"nextflex": "^1.0.0",                   //required: Utility CSS classes`,
        },
        rootLayout: {
            code: `"use client"
import { LayoutProvider } from "./layout/context/layoutcontext";
import { Provider } from "d-admin/api";
import "d-admin/resources/d-admin.css";
...
import "../styles/layout/layout.scss";
import "../styles/demo/Demos.scss";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link id="theme-css" href={\`/themes/lara-light-indigo/theme.css\`} rel="stylesheet"></link>
      </head>
      <body>
        <Provider>
            <LayoutProvider>{children}</LayoutProvider>
        </Provider>
      </body>
    </html>
  );
}`,
        },
        sassVariables: {
            code: `/* General */
$scale:13px;                           /* initial font size */
$border-radius-layout-base:12px;       /* border radius of layout element e.g. card, sidebar */
$duration-transition-base:.2s;         /* transition duration of layout elements e.g. sidebar */`,
            language: 'scss',
        },
    };

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card docs">
                    <DocumentSection title="Current Version">
                        <p>Next v13.4.8, React v18, Typescript with d-admin v1.0.0</p>
                    </DocumentSection>

                    <DocumentSection title="Getting Started">
                        <p>
                            d-Admin is an application template for React based on <ExternalLink href="https://nextjs.org/">Next.js</ExternalLink> framework with
                            new <ExternalLink href="https://nextjs.org/docs/app">App Router</ExternalLink>. To get started, clone the{' '}
                            <ExternalLink href="https://github.com/dheeraj-rs">repository</ExternalLink> from GitHub and install the dependencies with npm or
                            yarn.
                        </p>
                        <CodeBlock {...codeSnippets.install} />

                        <p>
                            Next step is running the application using the start script and navigate to <b>http://localhost:3000/</b> to view the application.
                        </p>
                        <CodeBlock {...codeSnippets.start} />
                    </DocumentSection>

                    <DocumentSection title="Dependencies">
                        <p>Dependencies of d-Admin are listed below and needs to be defined at package.json.</p>
                        <CodeBlock {...codeSnippets.dependencies} />
                    </DocumentSection>

                    <DocumentSection title="Project Structure">
                        <p>d-Admin consists of folders where demos and core layout have been separated.</p>
                        <ul className="line-height-3">
                            <li>
                                <span className="text-primary font-medium">layout/</span>: Main layout files
                            </li>
                            <li>
                                <span className="text-primary font-medium">demo/</span>: Contains demo related utilities
                            </li>
                            <li>
                                <span className="text-primary font-medium">app/</span>: Demo pages
                            </li>
                            <li>
                                <span className="text-primary font-medium">public/demo</span>: Assets used in demos
                            </li>
                            <li>
                                <span className="text-primary font-medium">public/layout</span>: Layout assets
                            </li>
                            <li>
                                <span className="text-primary font-medium">styles/demo</span>: Demo-specific styles
                            </li>
                            <li>
                                <span className="text-primary font-medium">styles/layout</span>: Core layout SCSS files
                            </li>
                        </ul>
                    </DocumentSection>

                    <DocumentSection title="Configuration">
                        <p>
                            Root Layout is defined at <span className="text-primary font-medium">app/layout.tsx</span> file. It contains style imports and
                            layout context provider.
                        </p>
                        <CodeBlock {...codeSnippets.rootLayout} />
                    </DocumentSection>

                    <DocumentSection title="SASS Variables">
                        <p>
                            To customize the main layout variables, modify <b>_variables.scss</b> file under the layout folder. Changes will be reflected
                            instantly in your browser.
                        </p>
                        <CodeBlock {...codeSnippets.sassVariables} />
                    </DocumentSection>
                </div>
            </div>
        </div>
    );
};

export default Documentation;
