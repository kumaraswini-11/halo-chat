import { useState } from "react";
import { toast } from "sonner";

import { ChatHeader } from "@/components/chat/chat-header";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

import { mockChats } from "../../lib/sample-data";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [selectedChatId, setSelectedChatId] = useState<string>(
    mockChats[0]?.id ?? "",
  );

  const selectedChat = mockChats.find((chat) => chat.id === selectedChatId);

  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId);
  };

  const handleNewChat = () => {
    // TODO: Implement new chat creation
    toast("New chat coming soon...");
  };

  const handleVoiceCall = () => {
    // TODO: Implement voice call
    toast("Voice call coming soon...");
  };

  const handleVideoCall = () => {
    // TODO: Implement video call
    toast("Video call coming soon...");
  };

  const handleSearchMessages = () => {
    // TODO: Implement message search
    toast("Search messages coming soon...");
  };

  const handleViewProfile = () => {
    // TODO: Implement profile view
    toast("View profile coming soon...");
  };

  const handleMuteChat = () => {
    // TODO: Implement mute functionality
    toast("Mute chat coming soon...");
  };

  const handleDeleteChat = () => {
    // TODO: Implement delete functionality
    toast("Delete chat coming soon...");
  };

  const handleBlockUser = () => {
    // TODO: Implement block functionality
    toast("Block user coming soon...");
  };

  return (
    <SidebarProvider
      defaultOpen
      style={
        {
          "--sidebar-width": "20rem",
          "--sidebar-width-mobile": "100%",
        } as React.CSSProperties
      }
    >
      <AppSidebar
        selectedChatId={selectedChatId}
        onChatSelect={handleChatSelect}
        onNewChat={handleNewChat}
      />

      <main className="flex h-screen w-full flex-1 flex-col overflow-hidden">
        {selectedChat && (
          <ChatHeader
            chat={selectedChat}
            onVoiceCall={handleVoiceCall}
            onVideoCall={handleVideoCall}
            onSearchMessages={handleSearchMessages}
            onViewProfile={handleViewProfile}
            onMuteChat={handleMuteChat}
            onDeleteChat={handleDeleteChat}
            onBlockUser={handleBlockUser}
          />
        )}

        <div className="flex-1 overflow-hidden">{children}</div>
      </main>
    </SidebarProvider>
  );
}
