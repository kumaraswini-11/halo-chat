import { Plus, Search, X } from "lucide-react";
import { useState } from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { Chat } from "@/lib/types";
import { cn } from "@/lib/utils";

import { CURRENT_USER_ID, mockChats } from "../../lib/sample-data";

interface AppSidebarProps {
  selectedChatId?: string;
  onChatSelect?: (chatId: string) => void;
  onNewChat?: () => void;
}

function filterChatsByParticipantName(
  chats: Chat[],
  searchQuery: string,
): Chat[] {
  const query = searchQuery.trim().toLowerCase();

  if (!query) {
    return chats;
  }

  return chats.filter((chat) => {
    const participant = chat.participants.find((p) => p.id !== CURRENT_USER_ID);

    return participant?.name.toLowerCase().includes(query);
  });
}

function EmptySearchState() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
      <Search className="text-muted-foreground mb-3 size-10 opacity-20" />
      <p className="text-muted-foreground text-sm font-medium">
        No conversations found
      </p>
      <p className="text-muted-foreground mt-1 text-xs">
        Try a different search term
      </p>
    </div>
  );
}

export function AppSidebar({
  selectedChatId,
  onChatSelect,
  onNewChat,
}: AppSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // React Compiler will optimize this automatically
  const filteredChats = filterChatsByParticipantName(mockChats, searchQuery);
  const handleClearSearch = () => setSearchQuery("");

  const hasSearchQuery = searchQuery.trim().length > 0;

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b px-3 py-2.5">
        <div className="mb-2 flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight">Messages</h1>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={onNewChat}
              className="hover:bg-accent"
              aria-label="New chat"
            >
              <Plus className="size-4" />
            </Button>
          </div>
        </div>

        {/* Enhanced Search Input */}
        <div className="relative">
          <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-9 pl-9"
            aria-label="Search chats"
          />

          {hasSearchQuery && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClearSearch}
              className="absolute top-1/2 right-1 size-7 -translate-y-1/2 hover:bg-transparent"
              aria-label="Clear search"
            >
              <X className="size-3.5" />
            </Button>
          )}
        </div>
      </SidebarHeader>

      {/* Chat List with Scroll Area */}
      <SidebarContent className="hide-scrollbar">
        <SidebarGroup className="px-0 py-0.5">
          <SidebarGroupContent>
            <ScrollArea className="h-[calc(100vh-7.2rem)]">
              {filteredChats.length === 0 ? (
                <EmptySearchState />
              ) : (
                <SidebarMenu className="gap-1 px-1">
                  {filteredChats.map((chat) => (
                    <ChatListItem
                      key={chat.id}
                      chat={chat}
                      isSelected={selectedChatId === chat.id}
                      onSelect={() => onChatSelect?.(chat.id)}
                    />
                  ))}
                </SidebarMenu>
              )}
            </ScrollArea>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

interface ChatListItemProps {
  chat: Chat;
  isSelected: boolean;
  onSelect: () => void;
}

function ChatListItem({ chat, isSelected, onSelect }: ChatListItemProps) {
  const participant = chat.participants.find((p) => p.id !== CURRENT_USER_ID);

  const hasUnread = chat.unreadCount > 0;

  const formattedTime = chat.lastMessage
    ? new Date(chat.lastMessage.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={isSelected}
        onClick={onSelect}
        className={cn(
          "h-auto p-2 transition-colors",
          "hover:bg-accent/50",
          isSelected && "bg-accent",
        )}
      >
        {/* Avatar with Online Status */}
        <div className="relative shrink-0">
          <Avatar className="size-11">
            <AvatarImage src={participant?.avatar} alt={participant?.name} />
            <AvatarFallback className="bg-primary/10 text-primary font-medium uppercase">
              {participant?.name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>

          {participant?.isOnline && (
            <span
              className="border-background absolute right-0 bottom-0 size-3 rounded-full border-2 bg-green-500 shadow-sm"
              aria-label="Online"
            />
          )}
        </div>

        {/* Chat Content */}
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex items-center justify-between gap-2">
            <h3
              className={cn(
                "truncate text-sm font-semibold",
                hasUnread && "font-bold",
              )}
            >
              {participant?.name}
            </h3>

            {formattedTime && (
              <time
                className={cn(
                  "text-muted-foreground text-xs tabular-nums",
                  hasUnread && "text-primary font-medium",
                )}
                // dateTime={chat.lastMessage?.timestamp}
              >
                {formattedTime}
              </time>
            )}
          </div>

          <div className="flex items-center justify-between gap-2">
            <p
              className={cn(
                "text-muted-foreground line-clamp-1 text-xs",
                hasUnread && "text-foreground font-medium",
              )}
            >
              {chat.lastMessage?.content ?? "No messages yet"}
            </p>

            {hasUnread && (
              <Badge className="ml-auto size-4 shrink-0 items-center justify-center p-0 text-[10px] font-bold">
                {chat.unreadCount > 99 ? "99+" : chat.unreadCount}
              </Badge>
            )}
          </div>
        </div>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
