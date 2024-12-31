/** @type {import('tailwindcss').Config} */
const config = {
    content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
                // rottating icons
                xs: '480px',
            },
        },
        extend: {
            colors: {
                black: {
                    DEFAULT: '#000',
                    100: '#000319',
                    200: 'rgba(17, 25, 40, 0.75)',
                    300: 'rgba(255, 255, 255, 0.125)',
                },
                white: {
                    DEFAULT: '#FFF',
                    100: '#BEC1DD',
                    200: '#C1C2D3',
                },
                blue: {
                    100: '#E4ECFF',
                },
                purple: '#CBACF9',
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                // old
                // accent: {
                //   DEFAULT: 'hsl(var(--accent))',
                //   foreground: 'hsl(var(--accent-foreground))',
                // },

                // wizard
                accent: 'rgb(var(--accent))',
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            keyframes: {
                // rottating icons
                'spin-reverse': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(-360deg)' },
                },

                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
                spotlight: {
                    '0%': {
                        opacity: '0',
                        transform: 'translate(-72%, -62%) scale(0.5)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translate(-50%,-40%) scale(1)',
                    },
                },
                shimmer: {
                    from: {
                        backgroundPosition: '0 0',
                    },
                    to: {
                        backgroundPosition: '-200% 0',
                    },
                },
                moveHorizontal: {
                    '0%': {
                        transform: 'translateX(-50%) translateY(-10%)',
                    },
                    '50%': {
                        transform: 'translateX(50%) translateY(10%)',
                    },
                    '100%': {
                        transform: 'translateX(-50%) translateY(-10%)',
                    },
                },
                moveInCircle: {
                    '0%': {
                        transform: 'rotate(0deg)',
                    },
                    '50%': {
                        transform: 'rotate(180deg)',
                    },
                    '100%': {
                        transform: 'rotate(360deg)',
                    },
                },
                moveVertical: {
                    '0%': {
                        transform: 'translateY(-50%)',
                    },
                    '50%': {
                        transform: 'translateY(50%)',
                    },
                    '100%': {
                        transform: 'translateY(-50%)',
                    },
                },
                scroll: {
                    to: {
                        transform: 'translate(calc(-50% - 0.5rem))',
                    },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                spotlight: 'spotlight 2s ease .75s 1 forwards',
                shimmer: 'shimmer 2s linear infinite',
                first: 'moveVertical 30s ease infinite',
                second: 'moveInCircle 20s reverse infinite',
                third: 'moveInCircle 40s linear infinite',
                fourth: 'moveHorizontal 40s ease infinite',
                fifth: 'moveInCircle 20s ease infinite',
                scroll: 'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
                // rottating icons
                'spin-slow': 'spin 40s linear infinite',
                'spin-slow-reverse': 'spin-reverse 40s linear infinite',
            },

            // backgroundImage: {
            //   'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            //   'gradient-conic':
            //     'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            // },
            // boxShadow: {
            //   sidebar: '-4px 8px 24px hsla(0, 0%, 0%, 0.25)',
            // },

            backgroundImage: {
                'firefly-radial': 'radial-gradient(50% 50% at 50% 50%, rgba(253, 255, 80, 0.5) 0%, rgba(217,217,217, 0) 100%)',
            },
            boxShadow: {
                'glass-inset': 'inset 0 17px 5px -9px rgba(254,254,91, 0.05)',
                'glass-sm': '5px 5px 20px 0px rgba(254,254,91, 0.3)',
            },
        },
    },
    plugins: [],
};

module.exports = config;
