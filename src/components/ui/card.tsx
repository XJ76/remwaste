"use client"

import type React from "react"

interface CardProps {
  className?: string
  children: React.ReactNode
  onClick?: () => void
}

export function Card({ className = "", children, onClick }: CardProps) {
  return (
    <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} onClick={onClick}>
      {children}
    </div>
  )
}

interface CardContentProps {
  className?: string
  children: React.ReactNode
}

export function CardContent({ className = "", children }: CardContentProps) {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>
}
