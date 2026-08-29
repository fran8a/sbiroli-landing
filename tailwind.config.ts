import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        sbiroli: {
          navy: {
            DEFAULT: '#182463',
            50: '#F0F2FA',
            100: '#DCE1F2',
            200: '#BAC4E5',
            300: '#92A2D4',
            400: '#5E73BA',
            500: '#2A3C94',
            600: '#21307B',
            700: '#1C276F',
            800: '#182463',
            900: '#0F163D',
            950: '#0A0E28',
          },
          rosso: {
            DEFAULT: '#E8342A',
            50: '#FDF2F2',
            100: '#FBE3E2',
            200: '#F7CAC8',
            300: '#F0A3A0',
            400: '#EA6B66',
            500: '#E8342A',
            600: '#CE2118',
            700: '#A91A13',
            800: '#8A1712',
            900: '#5F0F0B',
            950: '#3D0704',
          },
          gold: {
            DEFAULT: '#F4D35E',
            50: '#FEFDF6',
            100: '#FDF9E7',
            200: '#FBF2CE',
            300: '#F9E493',
            400: '#F6D968',
            500: '#F4D35E',
            600: '#D6B436',
            700: '#A5861F',
            800: '#7F641A',
            900: '#574213',
          },
          semolina: {
            50: '#FFFEFC',
            100: '#FAF6EE',
            200: '#F3EBD9',
            300: '#E8DCBF',
            400: '#D5C49D',
            500: '#BAA276',
            600: '#9B8156',
            700: '#7B6441',
            800: '#5F4B30',
            900: '#433421',
          }
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'sbiroli-sm': '0 2px 8px -2px rgba(24, 36, 99, 0.08)',
        'sbiroli-md': '0 12px 24px -6px rgba(24, 36, 99, 0.12), 0 4px 8px -4px rgba(24, 36, 99, 0.04)',
        'sbiroli-lg': '0 20px 36px -8px rgba(24, 36, 99, 0.16), 0 8px 16px -6px rgba(24, 36, 99, 0.06)',
        'sbiroli-glow-rosso': '0 0 24px rgba(232, 52, 42, 0.35)',
        'sbiroli-glow-gold': '0 0 20px rgba(244, 211, 94, 0.4)',
      },
      borderRadius: {
        'sbiroli': '0.875rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'hero-in': 'heroIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scroll-bounce': 'scrollBounce 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        heroIn: {
          '0%': { opacity: '0', transform: 'translateY(20px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        scrollBounce: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.4' },
          '50%': { transform: 'translateY(6px)', opacity: '0.9' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
