import { useEffect, useRef, useState } from "react";

import { MessageBubble } from "@/components/chat/message-list/message-bubble";
import { MessageDateDivider } from "@/components/chat/message-list/message-date-divider";
import { MessageInput } from "@/components/chat/message-list/message-input";
import { TypingIndicator } from "@/components/chat/message-list/typing-indicator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CURRENT_USER_ID } from "@/lib/sample-data";
import type { Message } from "@/lib/types";
import { cn } from "@/lib/utils";

interface MessageListProps {
  messages: Message[];
  chatId: string;
  currentUserId?: string;
  isTyping?: boolean;
  typingUserName?: string;
  onSendMessage?: (content: string) => void;
  onReactionAdd?: (messageId: string, emoji: string) => void;
  onReactionRemove?: (messageId: string, emoji: string) => void;
  onMessageReply?: (messageId: string) => void;
  onMessageEdit?: (messageId: string, newContent: string) => void;
  onMessageDelete?: (messageId: string) => void;
  className?: string;
}

export function MessageList({
  messages,
  chatId,
  currentUserId = CURRENT_USER_ID,
  isTyping = false,
  typingUserName,
  onSendMessage,
  onReactionAdd,
  onReactionRemove,
  onMessageReply,
  onMessageEdit,
  onMessageDelete,
  className,
}: MessageListProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (shouldAutoScroll && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length, shouldAutoScroll]);

  // Handle scroll position to determine auto-scroll behavior
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const isNearBottom =
      target.scrollHeight - target.scrollTop - target.clientHeight < 100;
    setShouldAutoScroll(isNearBottom);
  };

  // Group messages by date
  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className={cn("flex h-full flex-col", className)}>
      {/* Messages Area */}
      <ScrollArea
        ref={scrollAreaRef}
        className="flex-1 px-4"
        onScroll={handleScroll}
      >
        <div className="mx-auto max-w-4xl space-y-4 py-4">
          {groupedMessages.map((group, groupIndex) => (
            <div key={group.date + groupIndex} className="space-y-4">
              {/* Date Divider */}
              <MessageDateDivider date={group.date} />

              {/* Messages */}
              <div className="space-y-3">
                {group.messages.map((message, messageIndex) => {
                  const isOwnMessage = message.senderId === currentUserId;
                  const previousMessage = group.messages[messageIndex - 1];
                  const nextMessage = group.messages[messageIndex + 1];

                  // Check if we should show avatar (first in sequence or different sender)
                  const showAvatar =
                    previousMessage?.senderId !== message.senderId ||
                    isTimestampDifferent(
                      previousMessage.timestamp,
                      message.timestamp,
                      5,
                    );

                  // Check if we should show timestamp
                  const showTimestamp =
                    nextMessage?.senderId !== message.senderId ||
                    isTimestampDifferent(
                      message.timestamp,
                      nextMessage.timestamp,
                      5,
                    );

                  return (
                    <MessageBubble
                      key={message.id}
                      message={message}
                      isOwnMessage={isOwnMessage}
                      showAvatar={showAvatar}
                      showTimestamp={showTimestamp}
                      onReactionAdd={onReactionAdd}
                      onReactionRemove={onReactionRemove}
                      onReply={onMessageReply}
                      onEdit={onMessageEdit}
                      onDelete={onMessageDelete}
                    />
                  );
                })}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && typingUserName && (
            <TypingIndicator userName={typingUserName} />
          )}

          {/* Scroll anchor */}
          <div ref={bottomRef} className="h-px" />
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="border-t px-4 py-3">
        <div className="mx-auto max-w-4xl">
          <MessageInput
            chatId={chatId}
            onSendMessage={onSendMessage}
            placeholder="Type a message..."
          />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Helper Functions
// ============================================================================

interface MessageGroup {
  date: string;
  messages: Message[];
}

// Group messages by date for rendering date dividers
function groupMessagesByDate(messages: Message[]): MessageGroup[] {
  const groups: MessageGroup[] = [];
  let currentDate: string | null = null;
  let currentGroup: Message[] = [];

  messages.forEach((message) => {
    const messageDate = formatDate(message.timestamp);

    if (messageDate !== currentDate) {
      if (currentGroup.length > 0) {
        groups.push({ date: currentDate!, messages: currentGroup });
      }
      currentDate = messageDate;
      currentGroup = [message];
    } else {
      currentGroup.push(message);
    }
  });

  if (currentGroup.length > 0) {
    groups.push({ date: currentDate!, messages: currentGroup });
  }

  return groups;
}

// Format date for grouping (Today, Yesterday, or date)
function formatDate(date: Date): string {
  const now = new Date();
  const messageDate = new Date(date);
  const diffInDays = Math.floor(
    (now.getTime() - messageDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Yesterday";

  return messageDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year:
      messageDate.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

// Check if two timestamps are different by more than X minutes
function isTimestampDifferent(
  date1: Date,
  date2: Date,
  minutesThreshold: number,
): boolean {
  const diff = Math.abs(new Date(date1).getTime() - new Date(date2).getTime());
  return diff > minutesThreshold * 60 * 1000;
}
