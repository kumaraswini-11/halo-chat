import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CURRENT_USER_ID } from "@/lib/sample-data";
import type { MessageReaction } from "@/lib/types";
import { cn } from "@/lib/utils";

import { EmojiPicker } from "./emoji-picker";

interface MessageReactionsProps {
  reactions: MessageReaction[];
  messageId: string;
  onReactionAdd?: (messageId: string, emoji: string) => void;
  onReactionRemove?: (messageId: string, emoji: string) => void;
  className?: string;
}

export function MessageReactions({
  reactions,
  messageId,
  onReactionAdd,
  onReactionRemove,
  className,
}: MessageReactionsProps) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Group reactions by emoji
  const groupedReactions = groupReactionsByEmoji(reactions);

  const handleReactionClick = (emoji: string, hasUserReacted: boolean) => {
    if (hasUserReacted) {
      onReactionRemove?.(messageId, emoji);
    } else {
      onReactionAdd?.(messageId, emoji);
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    onReactionAdd?.(messageId, emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-1", className)}>
      {groupedReactions.map(({ emoji, count, userIds, hasUserReacted }) => (
        <TooltipProvider key={emoji} delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "h-7 gap-1 rounded-full px-2 text-xs transition-all hover:scale-105",
                  hasUserReacted &&
                    "border-primary bg-primary/10 hover:bg-primary/20",
                )}
                onClick={() => handleReactionClick(emoji, hasUserReacted)}
              >
                <span className="text-base leading-none">{emoji}</span>
                <span className="font-medium">{count}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <div className="max-w-xs">
                <div className="text-xs">
                  {userIds.length === 1
                    ? hasUserReacted
                      ? "You reacted"
                      : "1 person reacted"
                    : hasUserReacted
                      ? `You and ${userIds.length - 1} ${
                          userIds.length - 1 === 1 ? "other" : "others"
                        }`
                      : `${userIds.length} people reacted`}
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}

      {/* Add Reaction Button */}
      <div className="relative">
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="size-7 rounded-full p-0 hover:scale-105"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <Plus className="size-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add reaction</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {showEmojiPicker && (
          <div className="absolute bottom-full left-0 mb-2">
            <EmojiPicker
              onEmojiSelect={handleEmojiSelect}
              onClose={() => setShowEmojiPicker(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// Helper Functions
// ============================================================================

interface GroupedReaction {
  emoji: string;
  count: number;
  userIds: string[];
  hasUserReacted: boolean;
}

// Group reactions by emoji and count occurrences
function groupReactionsByEmoji(
  reactions: MessageReaction[],
): GroupedReaction[] {
  const grouped = new Map<string, GroupedReaction>();

  reactions.forEach((reaction) => {
    const existing = grouped.get(reaction.emoji);

    if (existing) {
      existing.count++;
      existing.userIds.push(reaction.userId);
      if (reaction.userId === CURRENT_USER_ID) {
        existing.hasUserReacted = true;
      }
    } else {
      grouped.set(reaction.emoji, {
        emoji: reaction.emoji,
        count: 1,
        userIds: [reaction.userId],
        hasUserReacted: reaction.userId === CURRENT_USER_ID,
      });
    }
  });

  return Array.from(grouped.values());
}
