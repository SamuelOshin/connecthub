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
        "primary": "#0066FF",
        "primary-dark": "#0052cc", // distinct hover state
        "secondary": "#2d3748",
        "background-light": "#f5f7f8",
        "background-dark": "#0f1923",
        "brand-dark": "#0B1120",
      },
      fontFamily: {
        "sans": ["var(--font-inter)", "sans-serif"],
        "display": ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        "lg": "0.5rem",
        "xl": "1rem",
        "2xl": "1.5rem", // Custom larger radius for "Rounded-2xl" feel if needed, or stick to standard.
        // Standard tailwind: lg=0.5rem, xl=0.75rem, 2xl=1rem, 3xl=1.5rem.
        // The prompt says "Rounded-2xl". I'll stick to standard tailwind class names but maybe map them.
        // Let's just use standard tailwind classes in components.
      },
    },
  },
  plugins: [],
};
export default config;
