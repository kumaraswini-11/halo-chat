import {
  MoreVertical,
  Reply,
  Edit,
  Trash2,
  Copy,
  Forward,
  Smile,
  Check,
  CheckCheck,
  Clock,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getUserById } from "@/lib/sample-data";
import type { Message } from "@/lib/types";
import { cn } from "@/lib/utils";

import { EmojiPicker } from "./emoji-picker";
import { MessageFile } from "./message-file";
import { MessageReactions } from "./message-reactions";

interface MessageBubbleProps {
  message: Message;
  isOwnMessage: boolean;
  showAvatar: boolean;
  showTimestamp: boolean;
  onReactionAdd?: (messageId: string, emoji: string) => void;
  onReactionRemove?: (messageId: string, emoji: string) => void;
  onReply?: (messageId: string) => void;
  onEdit?: (messageId: string, newContent: string) => void;
  onDelete?: (messageId: string) => void;
}

export function MessageBubble({
  message,
  isOwnMessage,
  showAvatar,
  showTimestamp,
  onReactionAdd,
  onReactionRemove,
  onReply,
  onEdit,
  onDelete,
}: MessageBubbleProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const sender = getUserById(message.senderId);
  const hasReactions = message.reactions && message.reactions.length > 0;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
  };

  const handleReactionSelect = (emoji: string) => {
    onReactionAdd?.(message.id, emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div
      className={cn(
        "group relative flex gap-3",
        isOwnMessage && "flex-row-reverse",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Avatar */}
      <div className={cn("shrink-0", !showAvatar && "invisible")}>
        <Avatar className="size-8">
          <AvatarImage src={sender?.avatar} alt={sender?.name} />
          <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
            {sender?.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Message Content */}
      <div
        className={cn(
          "flex max-w-[70%] min-w-0 flex-col gap-1",
          isOwnMessage && "items-end",
        )}
      >
        {/* Sender Name (only for other users' messages) */}
        {!isOwnMessage && showAvatar && (
          <span className="text-muted-foreground px-3 text-xs font-medium">
            {sender?.name}
          </span>
        )}

        {/* Message Bubble */}
        <div className="relative">
          {/* Quick Actions (visible on hover) */}
          {isHovered && (
            <div
              className={cn(
                "bg-background absolute top-0 z-10 flex items-center gap-1 rounded-lg border p-1 shadow-lg transition-opacity",
                isOwnMessage ? "-left-20" : "-right-20",
              )}
            >
              <TooltipProvider delayDuration={300}>
                {/* Emoji Reaction */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    >
                      <Smile className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Add reaction</TooltipContent>
                </Tooltip>

                {/* Reply */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7"
                      onClick={() => onReply?.(message.id)}
                    >
                      <Reply className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Reply</TooltipContent>
                </Tooltip>

                {/* More Options */}
                <DropdownMenu>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-7">
                          <MoreVertical className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent>More options</TooltipContent>
                  </Tooltip>

                  <DropdownMenuContent
                    align={isOwnMessage ? "end" : "start"}
                    className="w-48"
                  >
                    <DropdownMenuItem onClick={() => void handleCopy()}>
                      <Copy className="mr-2 size-4" />
                      <span>Copy</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onReply?.(message.id)}>
                      <Reply className="mr-2 size-4" />
                      <span>Reply</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Forward className="mr-2 size-4" />
                      <span>Forward</span>
                    </DropdownMenuItem>

                    {isOwnMessage && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => onEdit?.(message.id, message.content)}
                        >
                          <Edit className="mr-2 size-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDelete?.(message.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="mr-2 size-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipProvider>
            </div>
          )}

          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div
              className={cn(
                "absolute top-0 z-20",
                isOwnMessage ? "-left-80" : "-right-80",
              )}
            >
              <EmojiPicker
                onEmojiSelect={handleReactionSelect}
                onClose={() => setShowEmojiPicker(false)}
              />
            </div>
          )}

          {/* Message Content Bubble */}
          <div
            className={cn(
              "rounded-2xl px-4 py-2 shadow-sm transition-colors",
              isOwnMessage ? "bg-primary text-primary-foreground" : "bg-muted",
              message.type === "file" && "bg-transparent p-0 shadow-none",
            )}
          >
            {/* File Message */}
            {message.type === "file" && (
              <MessageFile
                fileName={message.fileName!}
                fileSize={message.fileSize!}
                fileUrl={message.fileUrl}
              />
            )}

            {/* Text Message */}
            {message.type === "text" && (
              <div className="text-sm leading-relaxed wrap-break-word">
                {message.content}
                {message.isEdited && (
                  <span className="text-muted-foreground ml-2 text-xs opacity-70">
                    (edited)
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Reactions */}
          {hasReactions && (
            <MessageReactions
              reactions={message.reactions!}
              messageId={message.id}
              onReactionAdd={onReactionAdd}
              onReactionRemove={onReactionRemove}
              className={cn("mt-1", isOwnMessage && "justify-end")}
            />
          )}
        </div>

        {/* Timestamp & Status */}
        {showTimestamp && (
          <div
            className={cn(
              "flex items-center gap-1.5 px-3",
              isOwnMessage && "flex-row-reverse",
            )}
          >
            <time className="text-muted-foreground text-xs">
              {formatMessageTime(message.timestamp)}
            </time>
            {isOwnMessage && <DeliveryStatus status={message.deliveryStatus} />}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// Helper Components
// ============================================================================

interface DeliveryStatusProps {
  status: Message["deliveryStatus"];
}

function DeliveryStatus({ status }: DeliveryStatusProps) {
  const icons = {
    sending: <Clock className="size-3" />,
    sent: <Check className="size-3" />,
    delivered: <CheckCheck className="size-3" />,
    read: <CheckCheck className="text-primary size-3" />,
    failed: <AlertCircle className="text-destructive size-3" />,
  };

  return (
    <span className="text-muted-foreground shrink-0">{icons[status]}</span>
  );
}

// ============================================================================
// Helper Functions
// ============================================================================

function formatMessageTime(date: Date): string {
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}
