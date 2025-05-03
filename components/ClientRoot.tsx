"use client";
import { createClient } from "@supabase/supabase-js";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

import { ReactNode } from "react";
import Image from "next/image";
import { ThemeProvider } from "next-themes";
import { ModelProvider } from "@/hooks/use-model";
import { Sidebar } from "@/components/ui/sidebar";

/**
 * Client-side root wrapper: theme & model providers + sidebar layout
 */
// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;
const supabaseClient = createClient(supabaseUrl, supabaseKey);

export default function ClientRoot({ children }: { children: ReactNode }) {
  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ModelProvider>
          {/* <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 flex flex-col">

              <div className="flex-1 overflow-auto p-4">
                {children}
              </div>
            </main>
          </div> */}
           {children}
        </ModelProvider>
      </ThemeProvider>
    </SessionContextProvider>
  );
}