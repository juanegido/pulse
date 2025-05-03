import React from 'react'
import ChatLayout from '@/components/chat/chat-layout';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
          <ChatLayout>
          {children}
          </ChatLayout>
  );
}