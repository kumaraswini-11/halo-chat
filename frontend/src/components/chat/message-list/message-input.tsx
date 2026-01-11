import {
  Image as ImageIcon,
  Mic,
  Paperclip,
  Send,
  Smile,
  X,
} from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";

import { EmojiPicker } from "@/components/chat/message-list/emoji-picker";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MessageInputProps {
  chatId: string;
  onSendMessage?: (content: string) => void;
  onFileUpload?: (file: File) => void;
  onImageUpload?: (file: File) => void;
  onVoiceRecord?: () => void;
  onTypingStart?: () => void;
  onTypingStop?: () => void;
  placeholder?: string;
  disabled?: boolean;
  replyingTo?: {
    id: string;
    content: string;
    senderName: string;
  };
  onCancelReply?: () => void;
}

export function MessageInput({
  // chatId,
  onSendMessage,
  onFileUpload,
  onImageUpload,
  onVoiceRecord,
  onTypingStart,
  onTypingStop,
  placeholder = "Type a message...",
  disabled = false,
  replyingTo,
  onCancelReply,
}: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isMessageEmpty = message.trim().length === 0;

  // Handle typing indicator
  const handleTyping = () => {
    if (!isTyping) {
      setIsTyping(true);
      onTypingStart?.();
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      onTypingStop?.();
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    handleTyping();

    // Auto-resize textarea
    e.target.style.height = "inherit";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
  };

  const handleSend = () => {
    if (isMessageEmpty || disabled) return;

    onSendMessage?.(message.trim());
    setMessage("");

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "inherit";
    }

    // Stop typing indicator
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    setIsTyping(false);
    onTypingStop?.();

    // Focus back on input
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    const cursorPosition =
      textareaRef.current?.selectionStart ?? message.length;
    const newMessage =
      message.slice(0, cursorPosition) + emoji + message.slice(cursorPosition);
    setMessage(newMessage);
    setShowEmojiPicker(false);

    // Focus back and set cursor position
    setTimeout(() => {
      textareaRef.current?.focus();
      textareaRef.current?.setSelectionRange(
        cursorPosition + emoji.length,
        cursorPosition + emoji.length,
      );
    }, 0);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload?.(file);
    }
    e.target.value = ""; // Reset input
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload?.(file);
    }
    e.target.value = ""; // Reset input
  };

  return (
    <div className="space-y-2">
      {/* Reply Preview */}
      {replyingTo && (
        <div className="bg-muted flex items-center justify-between rounded-lg px-3 py-2">
          <div className="min-w-0 flex-1">
            <div className="text-primary text-xs font-medium">
              Replying to {replyingTo.senderName}
            </div>
            <div className="text-muted-foreground truncate text-xs">
              {replyingTo.content}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 shrink-0"
            onClick={onCancelReply}
          >
            <X className="size-4" />
          </Button>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-muted flex items-end gap-2 rounded-2xl px-2 py-2">
        {/* Left Actions */}
        <div className="flex shrink-0 items-center gap-1">
          <TooltipProvider delayDuration={300}>
            {/* File Upload */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-9"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={disabled}
                >
                  <Paperclip className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Attach file</TooltipContent>
            </Tooltip>

            {/* Image Upload */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-9"
                  onClick={() => imageInputRef.current?.click()}
                  disabled={disabled}
                >
                  <ImageIcon className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Attach image</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Hidden File Inputs */}
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileSelect}
            accept="*/*"
          />
          <input
            ref={imageInputRef}
            type="file"
            className="hidden"
            onChange={handleImageSelect}
            accept="image/*"
          />
        </div>

        {/* Text Input */}
        <div className="relative flex-1">
          <Textarea
            name="message"
            ref={textareaRef}
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className="max-h-50 min-h-1 resize-none border-0 bg-transparent px-3 py-2 shadow-none focus-visible:ring-0"
            rows={1}
          />
        </div>

        {/* Right Actions */}
        <div className="flex shrink-0 items-center gap-1">
          <TooltipProvider delayDuration={300}>
            {/* Emoji Picker */}
            <div className="relative">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-9"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    disabled={disabled}
                  >
                    <Smile className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Add emoji</TooltipContent>
              </Tooltip>

              {showEmojiPicker && (
                <div className="absolute right-0 bottom-full mb-2">
                  <EmojiPicker
                    onEmojiSelect={handleEmojiSelect}
                    onClose={() => setShowEmojiPicker(false)}
                  />
                </div>
              )}
            </div>

            {/* Voice Record / Send Button */}
            {isMessageEmpty ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-9"
                    onClick={onVoiceRecord}
                    disabled={disabled}
                  >
                    <Mic className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Record voice message</TooltipContent>
              </Tooltip>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    className="size-9"
                    onClick={handleSend}
                    disabled={disabled || isMessageEmpty}
                  >
                    <Send className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Send message</TooltipContent>
              </Tooltip>
            )}
          </TooltipProvider>
        </div>
      </div>

      {/* Helper Text */}
      <div className="text-muted-foreground px-1 text-xs">
        Press Enter to send, Shift+Enter for new line
      </div>
    </div>
  );
}
