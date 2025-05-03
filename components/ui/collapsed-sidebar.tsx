"use client";
import React from "react";
import Link from "next/link";
import { Home, Clock, User, ChevronRight, Settings, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface CollapsedSidebarProps {
  onToggle: () => void;
}

/**
 * Collapsed version of the sidebar showing only icons
 */
export function CollapsedSidebar({ onToggle }: CollapsedSidebarProps) {
  return (
    <motion.aside
      initial={{ width: 64 }}
      animate={{ width: 64 }}
      className="flex flex-col h-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border"
    >
      <div className="relative h-20 border-b border-sidebar-border flex items-center justify-center">
        <div className="flex items-center justify-center h-full">
          <span className="font-bold text-2xl">AI</span>
        </div>
       
      </div>
      
      <nav className="flex-1 overflow-y-auto p-2 flex flex-col items-center space-y-4 mt-4">
        <Link
          href="/"
          className="flex items-center justify-center p-2 rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-10 h-10"
          title="Home"
        >
          <Home className="w-5 h-5" />
        </Link>
        <Link
          href="/history"
          className="flex items-center justify-center p-2 rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-10 h-10"
          title="History"
        >
          <Clock className="w-5 h-5" />
        </Link>
        <Link
          href="/profile"
          className="flex items-center justify-center p-2 rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-10 h-10"
          title="Profile"
        >
          <User className="w-5 h-5" />
        </Link>
        <Link
          href="/settings"
          className="flex items-center justify-center p-2 rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-10 h-10"
          title="Settings"
        >
          <Settings className="w-5 h-5" />
        </Link>
      </nav>
    </motion.aside>
  );
}