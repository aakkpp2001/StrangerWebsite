/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Deep space backgrounds — soft blacks, muted blues
        void: {
          950: '#070A0F',
          900: '#0B0F18',
          800: '#111726',
          700: '#1A2133',
          600: '#252E44',
        },
        // Dusky purples — faded, desaturated, nostalgic
        dusk: {
          950: '#120C1A',
          900: '#1B1428',
          800: '#2A1F3D',
          700: '#3D2E54',
          600: '#52406B',
          500: '#6B5689',
          400: '#8A72A8',
        },
        // Warm cream / off-white text
        cream: {
          100: '#FAF6EE',
          200: '#F2EBDD',
          300: '#E6DCC8',
          400: '#D4C7AC',
        },
        // Warm accent — amber candlelight against the cold void
        ember: {
          300: '#E8B97A',
          400: '#D9A45C',
          500: '#C48A42',
          600: '#A67133',
        },
        // Desaturated teal — distant celestial glow
        astral: {
          300: '#7BA8B0',
          400: '#5B8A94',
          500: '#44707A',
          600: '#33585F',
        },
        // Semantic
        success: '#6B9A6E',
        warning: '#D9A45C',
        error: '#C46A5E',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        pixel: ['"Press Start 2P"', 'monospace'],
      },
      letterSpacing: {
        'wide-sm': '0.05em',
        nostalgic: '0.15em',
      },
      backgroundImage: {
        'starfield': 'radial-gradient(2px 2px at 20% 30%, rgba(250,246,238,0.8), transparent), radial-gradient(1px 1px at 40% 70%, rgba(250,246,238,0.4), transparent), radial-gradient(1.5px 1.5px at 70% 20%, rgba(250,246,238,0.6), transparent), radial-gradient(1px 1px at 85% 80%, rgba(250,246,238,0.3), transparent), radial-gradient(1px 1px at 50% 50%, rgba(250,246,238,0.5), transparent)',
      },
      animation: {
        'twinkle': 'twinkle 4s ease-in-out infinite alternate',
        'drift': 'drift 30s linear infinite',
        'fade-in': 'fadeIn 1.2s ease-out forwards',
        'fade-up': 'fadeUp 1s ease-out forwards',
      },
      keyframes: {
        twinkle: {
          '0%': { opacity: '0.3' },
          '100%': { opacity: '1' },
        },
        drift: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
