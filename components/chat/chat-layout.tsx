"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { 
  Menu, 
  Sun, 
  Moon,
  Share2,
  Download,
  LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/ui/sidebar";
import { CollapsedSidebar } from "@/components/ui/collapsed-sidebar";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Session, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

interface ChatLayoutProps {
  children: React.ReactNode;
}

export default function ChatLayout({ children }: ChatLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  const supabase = useSupabaseClient();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Toggle sidebar based on screen size
  useEffect(() => {
    if (isSmallScreen) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
    
  }, [isSmallScreen]);


  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      if (!session) {
        router.push("/login");
      }
    });
  }, [supabase, router]);

  if (loading || !session) {
    return null;
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="flex h-full w-full bg-background">
      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}
      </AnimatePresence>
      
      {/* Sidebar logic: show sidebar when open, collapsed sidebar when closed (on desktop only) */}
      {(sidebarOpen || mobileSidebarOpen) ? (
        <Sidebar 
          isOpen={true}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          isMobile={isSmallScreen && mobileSidebarOpen} 
          onClose={() => setMobileSidebarOpen(false)}
        />
      ) : (
        !isSmallScreen && <CollapsedSidebar onToggle={() => setSidebarOpen(true)} />
      )}
      
      {/* Main content area with header */}
      <div className="flex flex-col flex-1 h-full">
        {/* Header */}
        <header className="flex items-center justify-between px-4 h-16 border-b bg-background/90 backdrop-blur-sm sticky top-0 z-10">
          {/* Mobile sidebar toggle */}
          {isSmallScreen && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          {!isSmallScreen && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={isSmallScreen ? 'hidden' : ''}
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          
          {/* Title */}
          <div className="flex-1 flex justify-center text-center mx-4">
            <h1 className="text-lg font-medium">AI Chat Assistant</h1>
          </div>
          
          {/* Theme toggle and actions */}
          <div className="flex items-center gap-2">
            {/* Share button */}
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Share2 className="h-4 w-4" />
            </Button>
            
            {/* Export chat button */}
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Download className="h-4 w-4" />
            </Button>
            
            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            >
              {resolvedTheme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
            {/* Logout */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              title="Logout"
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </header>
        
        {/* Content area - children will be the chat interface */}
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}