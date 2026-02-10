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
        // Design System Colors
        "primary": "#007bff",
        "primary-dark": "#0056b3",
        // Background colors
        "background-light": "#f5f7f8",
        "background-dark": "#0f1923",
        // Surface colors (cards, sidebars)
        "surface-light": "#ffffff",
        "surface-dark": "#1a242f",
        // Card colors
        "card-light": "#ffffff",
        "card-dark": "#1a242f",
        // Text colors
        "text-main": "#101418",
        "text-secondary": "#5e758d",
        // Legacy colors for compatibility
        "royal-blue": "#0066FF",
        "golden-amber": "#FFB020",
        "light-slate": "#F8FAFC",
        "secondary": "#2d3748",
        "secondary-foreground": "#ffffff",
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
          DEFAULT: "#FF7F50",
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
        "display": ["Plus Jakarta Sans", "var(--font-display)", "sans-serif"],
        "sans": ["Plus Jakarta Sans", "var(--font-body)", "sans-serif"],
        "body": ["Noto Sans", "var(--font-body)", "sans-serif"],
        "serif": ["Playfair Display", "var(--font-serif)", "serif"],
      },
      borderRadius: {
        "DEFAULT": "1rem",
        "lg": "1.5rem",
        "xl": "2rem",
        "2xl": "2.5rem",
        "3xl": "3rem",
        "md": "calc(var(--radius) - 2px)",
        "sm": "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        "soft": "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
        "glow": "0 0 15px rgba(0, 123, 255, 0.3)",
      },
    },
  },
  plugins: [],
};
export default config;
