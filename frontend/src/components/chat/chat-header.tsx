import {
  BellOffIcon,
  InfoIcon,
  SearchIcon,
  BlocksIcon,
  Trash2Icon,
  PhoneIcon,
  VideoIcon,
  MoreVerticalIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Chat } from "@/lib/types";
import { cn } from "@/lib/utils";

import { CURRENT_USER_ID } from "../../lib/sample-data";

function HeaderAction({
  label,
  onClick,
  icon,
}: {
  label: string;
  onClick?: () => void;
  icon: React.ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClick}
          className="hover:bg-accent"
          aria-label={label}
        >
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
}

interface ChatHeaderProps {
  chat: Chat;
  onVoiceCall?: () => void;
  onVideoCall?: () => void;
  onSearchMessages?: () => void;
  onViewProfile?: () => void;
  onMuteChat?: () => void;
  onDeleteChat?: () => void;
  onBlockUser?: () => void;
}

export function ChatHeader({
  chat,
  onVoiceCall,
  onVideoCall,
  onSearchMessages,
  onViewProfile,
  onMuteChat,
  onDeleteChat,
  onBlockUser,
}: ChatHeaderProps) {
  const participant = chat.participants.find((p) => p.id !== CURRENT_USER_ID);
  if (!participant) return null;

  const isOnline = Boolean(participant.isOnline);

  const statusText = isOnline ? "Active now" : "Offline";

  return (
    <header className="supports-backdrop-filter:bg-background/80 bg-background/95 flex h-16 shrink-0 items-center justify-between border-b px-4 backdrop-blur">
      {/* Left Section: Trigger + User Info */}
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <SidebarTrigger className="size-9 shrink-0" />

        <Button
          variant="ghost"
          onClick={onViewProfile}
          className="group flex h-auto min-w-0 items-center gap-3 transition-colors"
          aria-label={`View ${participant.name}'s profile`}
        >
          <Avatar className="group-hover:ring-primary size-10 shrink-0 ring-offset-2 transition-all group-hover:ring-2">
            <AvatarImage src={participant.avatar} alt={participant.name} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold uppercase">
              {participant.name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>

          <div className="flex min-w-0 flex-col items-start">
            <h2 className="truncate text-sm font-semibold">
              {participant.name}
            </h2>

            <div className="flex items-center gap-1.5">
              <span
                className={cn(
                  "size-2 rounded-full",
                  isOnline ? "bg-green-500" : "bg-muted-foreground/50",
                )}
                aria-hidden="true"
              />
              <p
                className={cn(
                  "text-muted-foreground truncate text-xs font-medium",
                  isOnline && "text-green-600 dark:text-green-500",
                )}
              >
                {statusText}
              </p>
            </div>
          </div>
        </Button>
      </div>

      {/* Right Section: Action Buttons */}
      <TooltipProvider delayDuration={300}>
        <div className="flex shrink-0 items-center gap-1">
          <HeaderAction
            label="Voice call"
            onClick={onVoiceCall}
            icon={<PhoneIcon className="size-4" />}
          />

          <HeaderAction
            label="Video call"
            onClick={onVideoCall}
            icon={<VideoIcon className="size-4" />}
          />

          <HeaderAction
            label="Search messages"
            onClick={onSearchMessages}
            icon={<SearchIcon className="size-4" />}
          />

          <HeaderAction
            label="View profile"
            onClick={onViewProfile}
            icon={<InfoIcon className="size-4" />}
          />

          {/* More Options */}
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-accent"
                    aria-label="More options"
                  >
                    <MoreVerticalIcon className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>More options</p>
              </TooltipContent>
            </Tooltip>

            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                onClick={onViewProfile}
                className="flex items-center gap-2"
              >
                <InfoIcon className="size-4" />
                View Profile
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={onSearchMessages}
                className="flex items-center gap-2"
              >
                <SearchIcon className="size-4" />
                Search in Chat
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={onMuteChat}
                className="flex items-center gap-2"
              >
                <BellOffIcon className="size-4" />
                Mute Notifications
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={onDeleteChat}
                className={cn(
                  "text-destructive focus:text-destructive",
                  "flex items-center gap-2",
                )}
              >
                <Trash2Icon className="size-4" />
                Delete Chat
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={onBlockUser}
                className={cn(
                  "text-destructive focus:text-destructive",
                  "flex items-center gap-2",
                )}
              >
                <BlocksIcon className="size-4" />
                Block User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TooltipProvider>
    </header>
  );
}
