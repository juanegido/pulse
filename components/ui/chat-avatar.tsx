"use client"

import React from "react"
import { Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatAvatarProps {
  role: "user" | "assistant" | string
  className?: string
}

export function ChatAvatar({ role, className }: ChatAvatarProps) {
  const isUser = role === "user"
  
  return (
    <div
      className={cn(
        "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow-sm",
        isUser
          ? "bg-background text-foreground"
          : "bg-primary/10 text-primary",
        className
      )}
      aria-hidden="true"
    >
      {isUser ? (
        <User className="h-4 w-4" />
      ) : (
        <Bot className="h-4 w-4" />
      )}
    </div>
  )
}