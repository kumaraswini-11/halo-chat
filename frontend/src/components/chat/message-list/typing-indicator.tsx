import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface TypingIndicatorProps {
  userName: string;
  userAvatar?: string;
  className?: string;
}

// Displays a visual typing indicator for a chat participant.
export function TypingIndicator({
  userName,
  userAvatar,
  className,
}: TypingIndicatorProps) {
  return (
    <div className={cn("flex items-start gap-3", className)} aria-live="polite">
      {/* Avatar */}
      <Avatar className="size-8 shrink-0">
        <AvatarImage src={userAvatar} alt={userName} />
        <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium uppercase">
          {userName.charAt(0).slice(0, 2)}
        </AvatarFallback>
      </Avatar>

      {/* Typing Bubble */}
      <div className="bg-muted flex items-end gap-1 rounded-2xl px-4 py-3">
        <span className="text-muted-foreground text-xs font-medium">
          {userName} is typing
        </span>

        {/* Animated typing dots */}
        <div className="flex gap-1">
          <span className="bg-muted-foreground size-1.5 animate-bounce rounded-full [animation-delay:0ms]" />
          <span className="bg-muted-foreground size-1.5 animate-bounce rounded-full [animation-delay:150ms]" />
          <span className="bg-muted-foreground size-1.5 animate-bounce rounded-full [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}
