import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'translate-x-[-500%]',
    'translate-x-[-400%]',
    'translate-x-[-300%]',
    'translate-x-[-200%]',
    'translate-x-[-100%]',
    'translate-x-[0%]',
    'translate-x-[100%]',
    'translate-x-[200%]',
    'translate-x-[300%]',
    'translate-x-[400%]',
    'translate-x-[500%]',
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'spin-click': 'spin 1.3s linear 0.5',
      }
    },
    screens: {
      'xm': '330px',
      'sm': '600px',
      // => @media (min-width: 600px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["emerald", "light", "dark"],
  },
};
export default config;
