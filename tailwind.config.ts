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
        "primary-dark": "#0052cc",
        "secondary": "#2d3748",
        "secondary-foreground": "#ffffff",
        "background-light": "#f5f7f8",
        "background-dark": "#0f1923",
        "brand-dark": "#0B1120",
        // Shadcn/ui like colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        "sans": ["var(--font-body)", "sans-serif"],
        "display": ["var(--font-display)", "sans-serif"],
        "body": ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        "lg": "0.5rem",
        "xl": "1rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [],
};
export default config;
