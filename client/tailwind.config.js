/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        navy: {
          950: '#030712', // Background Primary
          900: '#070d1e', // Background Secondary
          850: '#0b132b', // Background Elevated
          800: '#111c44', // Surface Hover / Elevated borders
          700: '#1c2a5e', // Subtle dividers
        },
        electric: {
          cyan: '#00f2fe',  // Primary Accent
          blue: '#4facfe',  // Secondary Accent
          glow: 'rgba(0, 242, 254, 0.22)',
        },
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"Fira Code"', 'monospace'],
      },
      fontSize: {
        'display': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-mobile': ['2.5rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.3)',
        'elevated': '0 10px 25px -5px rgba(0, 0, 0, 0.6), 0 8px 10px -6px rgba(0, 0, 0, 0.5)',
        'floating': '0 20px 35px -10px rgba(0, 0, 0, 0.75)',
        'glow-cyan': '0 0 25px rgba(0, 242, 254, 0.22)',
        'glow-blue': '0 0 25px rgba(79, 172, 254, 0.25)',
      },
      borderRadius: {
        'sm': '6px',
        'md': '10px',
        'lg': '16px',
        'xl': '24px',
      },
      maxWidth: {
        'container': '1280px',
      },
      transitionTimingFunction: {
        'cinema': 'cubic-bezier(0.16, 1, 0.3, 1)', // expo.out equivalent for transitions
      },
    },
  },
  plugins: [],
}
