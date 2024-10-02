import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
	  fontFamily: {
        signature: ['agustina', 'sans-serif'],
        sans: ['Urbanist', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
        syne: ['Syne', 'sans-serif'],
        urbanist: ['Urbanist', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
     
      colors: {
        background: {
          DEFAULT: '#FCF8F2',
          dark: '#1E1B19'
        },
        footerBackground: {
          DEFAULT: '#CBBBA066',
              dark: '#1E1B19'
        },
        foreground: {
          DEFAULT: '#7B6A58',
          dark: '#E0D8D0'
        },
        primary: {
          DEFAULT: '#FFFFFF',
          foreground: '#FFFFFF',
          dark: '#8B6A4F',
          'dark-foreground': '#FFFFFF'
        },
        secondary: {
          DEFAULT: '#00000',
          foreground: '#4A4A4A',
          dark: '#3A3633',
          'dark-foreground': '#E0D8D0'
        },
        accent: {
          DEFAULT: '#7B6A58',
          foreground: '#FFFFFF',
          dark: '#E65A4F',
          'dark-foreground': '#FFFFFF'
        },
        muted: {
          DEFAULT: '#E5DED8',
          foreground: '#6C6C6C',
          dark: '#2A2624',
          'dark-foreground': '#A19789'
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#4A4A4A',
          dark: '#2A2624',
          'dark-foreground': '#E0D8D0'
        },
        popover: {
          DEFAULT: '#FFFFFF',
          foreground: '#4A4A4A',
          dark: '#2A2624',
          'dark-foreground': '#E0D8D0'
        },
        border: {
          DEFAULT: '#D1C7BE',
          dark: '#4A4541'
        },
        input: {
          DEFAULT: '#E5DED8',
          dark: '#3A3633'
        },
        ring: {
          DEFAULT: '#B08968',
          dark: '#8B6A4F'
        },
        destructive: {
          DEFAULT: '#D73427',
          foreground: '#FFFFFF',
          dark: '#E65A4F',
          'dark-foreground': '#FFFFFF'
        },
        chart: {
          '1': { DEFAULT: '#B08968', dark: '#8B6A4F' },
          '2': { DEFAULT: '#D73427', dark: '#E65A4F' },
          '3': { DEFAULT: '#E5DED8', dark: '#3A3633' },
          '4': { DEFAULT: '#FAF7F5', dark: '#1E1B19' },
          '5': { DEFAULT: '#4A4A4A', dark: '#E0D8D0' }
        }
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;