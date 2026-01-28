import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "white" | "neutral";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full font-bold transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer overflow-hidden active:scale-95";

  const variants = {
    primary:
      "bg-primary text-white hover:bg-blue-600 shadow-md shadow-blue-500/20",
    secondary:
      "bg-secondary text-white hover:bg-slate-700",
    outline:
      "bg-white/80 backdrop-blur-sm dark:bg-slate-800 dark:text-white text-primary border border-primary/20 hover:bg-primary/5 shadow-sm",
    ghost: "bg-transparent hover:bg-slate-100 text-slate-700",
    white: "bg-white text-primary hover:bg-slate-50 shadow-lg",
    neutral: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 shadow-sm"
  };

  const sizes = {
    sm: "h-10 px-6 text-sm",
    md: "h-12 px-6 text-base",
    lg: "h-14 px-8 text-lg",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      <span className="truncate">{children}</span>
    </button>
  );
}
