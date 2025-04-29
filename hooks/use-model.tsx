"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type Model = { id: string; name: string };

// Define available models here
export const MODELS: Model[] = [
  { id: "gpt-4-turbo", name: "GPT-4 Turbo" },
];

type ModelContextType = {
  selectedModel: string;
  setSelectedModel: (model: string) => void;
};

const ModelContext = createContext<ModelContextType | undefined>(undefined);

export function ModelProvider({ children }: { children: ReactNode }) {
  const [selectedModel, setSelectedModel] = useState<string>(MODELS[0].id);
  return (
    <ModelContext.Provider value={{ selectedModel, setSelectedModel }}>
      {children}
    </ModelContext.Provider>
  );
}

export function useModel(): ModelContextType {
  const context = useContext(ModelContext);
  if (!context) {
    throw new Error("useModel must be used within a ModelProvider");
  }
  return context;
}