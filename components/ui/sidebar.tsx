"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Home, Clock, User, ChevronLeft, ChevronRight, Sun, Moon } from "lucide-react";
import { useModel, MODELS } from "@/hooks/use-model";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

/**
 * Sidebar component with company logo and navigation links.
 */
export function Sidebar() {
  const { selectedModel, setSelectedModel } = useModel();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [collapsed, setCollapsed] = React.useState(false);
  return (
    <aside
      className={
        `flex flex-col h-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border ring-sidebar-ring transition-all duration-200 ${
          collapsed ? "w-16" : "w-64"
        }`
      }
    >
      <div className="relative h-20 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center justify-center h-full">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="Company Logo"
                width={100}
                height={100}
              />
            </Link>
          </div>
        )}
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="text-sidebar-foreground"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        <Link
          href="/"
          className={
            `flex items-center p-2 rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
            collapsed ? "justify-center" : ""
          }`
          }
        >
          <Home className="w-4 h-4" />
          {!collapsed && <span className="ml-3 text-sm font-medium">Inicio</span>}
        </Link>
        <Link
          href="/history"
          className={
            `flex items-center p-2 rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
            collapsed ? "justify-center" : ""
          }`
          }
        >
          <Clock className="w-4 h-4" />
          {!collapsed && <span className="ml-3 text-sm font-medium">Histórico</span>}
        </Link>
        <Link
          href="/profile"
          className={
            `flex items-center p-2 rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
            collapsed ? "justify-center" : ""
          }`
          }
        >
          <User className="w-4 h-4" />
          {!collapsed && <span className="ml-3 text-sm font-medium">Perfil</span>}
        </Link>
      </nav>
      {/* Model selection */}
      {!collapsed && (
        <div className="p-4 border-t border-sidebar-border">
          <Select value={selectedModel} onValueChange={setSelectedModel}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Modelo" />
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
      )}
    </aside>
  );
}