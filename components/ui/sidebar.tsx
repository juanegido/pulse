"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Home, Clock, User, ChevronLeft, ChevronRight, Settings, FileText } from "lucide-react";
import { useModel, MODELS } from "@/hooks/use-model";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  isMobile?: boolean;
  onClose?: () => void;
}

/**
 *  sidebar component with improved styling while maintaining original structure
 */
export function Sidebar({ isOpen, onToggle, isMobile = false, onClose }: SidebarProps) {
  const { selectedModel, setSelectedModel } = useModel();
  const { theme, setTheme } = useTheme();
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={isMobile ? { x: -320 } : { x: 0 }}
          animate={{ x: 0 }}
          exit={isMobile ? { x: -320 } : { x: 0 }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          className={`flex flex-col h-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-200 ${
            isOpen ? (isMobile ? "w-72 fixed z-50" : "w-64") : "w-0"
          }`}
        >
          <div className="relative h-20 border-b border-sidebar-border flex items-center justify-center">
            <Link href="/" className="flex items-center justify-center h-full">
              <Image
                src="/logo.svg"
                alt="Company Logo"
                width={100}
                height={100}
              />
            </Link>
            
          </div>
          
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            <Link
              href="/"
              className="flex items-center p-2 rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Home className="w-4 h-4" />
              <span className="ml-3 text-sm font-medium">Home</span>
            </Link>
            <Link
              href="/history"
              className="flex items-center p-2 rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Clock className="w-4 h-4" />
              <span className="ml-3 text-sm font-medium">History</span>
            </Link>
            <Link
              href="/profile"
              className="flex items-center p-2 rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <User className="w-4 h-4" />
              <span className="ml-3 text-sm font-medium">Profile</span>
            </Link>
            <Link
              href="/settings"
              className="flex items-center p-2 rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Settings className="w-4 h-4" />
              <span className="ml-3 text-sm font-medium">Settings</span>
            </Link>

          </nav>
          
          {/* Model selection */}
          <div className="p-4 border-t border-sidebar-border">
            <p className="text-xs text-sidebar-foreground/70 mb-2">AI Model</p>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-full bg-sidebar-accent/50">
                <SelectValue placeholder="Select Model" />
              </SelectTrigger>
              <SelectContent>
                {MODELS.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    {model.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}