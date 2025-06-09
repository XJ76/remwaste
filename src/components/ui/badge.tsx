import type React from "react"

interface BadgeProps {
  variant?: "default" | "outline"
  className?: string
  children: React.ReactNode
}

export function Badge({ variant = "default", className = "", children }: BadgeProps) {
  const baseClasses =
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"

  const variantClasses = {
    default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    outline: "text-foreground",
  }

  return <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>{children}</div>
}
