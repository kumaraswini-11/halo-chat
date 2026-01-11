import EmojiPickerLib, { Theme, type EmojiClickData } from "emoji-picker-react";

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  onClose: () => void;
}

export function EmojiPicker({ onEmojiSelect }: EmojiPickerProps) {
  return (
    <EmojiPickerLib
      theme={Theme.AUTO}
      onEmojiClick={(emojiData: EmojiClickData) =>
        onEmojiSelect(emojiData.emoji)
      }
      searchDisabled={false}
      skinTonesDisabled={false}
      lazyLoadEmojis
    />
  );
}
