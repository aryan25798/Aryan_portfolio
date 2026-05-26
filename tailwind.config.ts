import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'xs': '420px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        'bg-deep': '#050816',
        'primary-purple': '#7C3AED',
        'primary-blue': '#3B82F6',
        'accent-cyan': '#06B6D4',
        'text-primary': '#F8FAFC',
        'text-secondary': '#94A3B8',
        'border-glass': 'rgba(255, 255, 255, 0.08)',
        'border-glass-hover': 'rgba(255, 255, 255, 0.15)',
        'surface-glass': 'rgba(13, 9, 36, 0.45)',
        'surface-glass-hover': 'rgba(22, 16, 56, 0.65)',
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        'glow-purple': '0 0 20px rgba(124, 58, 237, 0.25)',
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.25)',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.25)',
      },
      animation: {
        'spin-slow': 'spin 40s linear infinite',
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
};
export default config;
