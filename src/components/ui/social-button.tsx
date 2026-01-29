import * as React from "react"
import { cn } from "@/lib/utils"

interface SocialButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  provider: "google" | "apple";
}

const SocialButton = React.forwardRef<HTMLButtonElement, SocialButtonProps>(
  ({ className, provider, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-[#dbe0e6] bg-white transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700",
          className
        )}
        {...props}
      >
        {provider === "google" && (
            <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
            </svg>
        )}
        {provider === "apple" && (
            <svg className="h-5 w-5 fill-black dark:fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.684.816-1.813 1.58-2.997 1.43-.16-.94.417-1.99 1.132-2.718.784-.81 2.016-1.55 3.042-1.792zm-5.74 5.92c-1.63 0-2.855.918-3.666.918-.767 0-1.94-.87-3.085-.87-3.15 0-6.07 2.45-6.07 7.09 0 4.19 3.078 9.54 5.253 9.54 1.18 0 1.638-.79 3.064-.79 1.425 0 1.83.79 3.065.79 2.05 0 5.418-5.59 5.418-5.59s-2.69-1.57-2.69-5.9c0-3.3 2.768-4.94 2.895-5.01-1.614-2.31-4.04-2.55-4.885-2.6-1.077-.12-2.148.43-2.69.43z"></path>
            </svg>
        )}
        <span className="text-[#111418] dark:text-white font-bold text-sm">
            {provider === "google" ? "Google" : "Apple"}
        </span>
      </button>
    )
  }
)
SocialButton.displayName = "SocialButton"

export { SocialButton }
