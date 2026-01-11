import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface MessageDateDividerProps {
  date: string;
  className?: string;
}

/**
 * Visually separates chat messages by date.
 * Used inside message lists to improve readability in long conversations.
 *
 * @property {string} date - Human-readable date string (e.g. "Today", "Yesterday", "Mar 12")
 * @property {string} className - Optional className for custom styling.
 */
export function MessageDateDivider({
  date,
  className,
}: MessageDateDividerProps) {
  return (
    <div
      role="separator"
      aria-label={`Messages from ${date}`}
      className={cn("relative flex items-center py-4", className)}
    >
      {/* Left horizontal line */}
      <Separator className="flex-1" />

      {/* Date label */}
      <div className="bg-background text-muted-foreground px-4 text-xs font-medium">
        {date}
      </div>

      {/* Right horizontal line */}
      <Separator className="flex-1" />
    </div>
  );
}
