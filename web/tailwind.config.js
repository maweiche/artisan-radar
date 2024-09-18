const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', join(
    __dirname,
    '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
  ),
  ...createGlobPatternsForDependencies(__dirname),],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        signature: ['agustina', 'sans-serif'],
        sans: ['Urbanist', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
        syne: ['Syne', 'sans-serif'],
        urbanist: ['Urbanist', 'sans-serif'],
      },
      screens: {
        xs: '375px',
      },
      colors: {
        bg: 'var(--color-bg)',
        bgSecondary: 'var(--color-secondary)',
        bgSecondaryText: 'var(--color-secondary-text)',
        accent: 'var(--color-accent)',
        'accent-light': 'var(--color-accent-light)',
        text: 'var(--color-text)',
        'dark-1': 'var(--color-dark-1)',
        'dark-2': 'var(--color-dark-2)',
        'dark-3': 'var(--color-dark-3)',
        secondary: 'var(--color-secondary)',
        secondaryText: 'var(--color-secondary-text)',
      },
      transitionTimingFunction: {
        'in-scroll': 'cubic-bezier(0.645, 0.045, 0.355, 1)',
      },
      gridTemplateColumns: {
        'auto-300': 'repeat(auto-fill, minmax(300px, 1fr))',
        'auto-250': 'repeat(auto-fill, minmax(250px, 1fr))',
      },
      backgroundImage: {
        bg: "var(--color-bg)",
        secondary: "var(--color-secondary)"
      }
    },
  },
  plugins: [],
};

exports.default = module.exports;