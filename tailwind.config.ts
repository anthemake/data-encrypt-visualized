import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'input-bg': '#2051311c', // Custom transparent background color
        'custom-green': 'rgb(0, 255, 135)', // Custom green color
        terminalGreen: '#00FF00', // You can define custom shades of green
      },
      fontSize: {
        'custom-xl': '80px', // Custom font size for the input text
      },
      boxShadow: {
        'glow-green': '0 0 15px rgba(0, 255, 0, 0.8)', // Green glow effect
      },
      backdropBlur: {
        'md': '12px', // Blur effect for glass-like boxes
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        'pulse': 'blink 1s infinite',
      },
    },
  },
  plugins: [],
};
export default config;
