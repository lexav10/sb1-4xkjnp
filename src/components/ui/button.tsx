import { cn } from "@/lib/utils";
import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link" | "danger";
  size?: "sm" | "default" | "lg";
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", isLoading, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-gray-900 text-gray-50 shadow hover:bg-gray-900/90": variant === "default",
            "border border-gray-200 bg-white shadow-sm hover:bg-gray-100": variant === "outline",
            "hover:bg-gray-100 hover:text-gray-900": variant === "ghost",
            "text-gray-900 underline-offset-4 hover:underline": variant === "link",
            "bg-red-500 text-white shadow hover:bg-red-600": variant === "danger",
            "h-8 px-3 text-[14px]": size === "sm",
            "h-9 px-4 py-2 text-[14px]": size === "default",
            "h-10 px-8 text-[14px]": size === "lg",
          },
          className
        )}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-50 border-t-transparent" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };