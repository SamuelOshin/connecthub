import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "royal-blue": "#0066FF",
        "golden-amber": "#FFB020",
        "light-slate": "#F8FAFC",
        "primary": "#007bff",
        "secondary": "#2d3748",
        "background-light": "#f5f7f8",
        "background-dark": "#0f1923",
        "brand-dark": "#0B1120",
      },
      fontFamily: {
        "display": ["var(--font-plus-jakarta-sans)", "sans-serif"],
      },
      borderRadius: {
        "lg": "2rem",
        "xl": "3rem",
      },
    },
  },
  plugins: [],
};
export default config;
