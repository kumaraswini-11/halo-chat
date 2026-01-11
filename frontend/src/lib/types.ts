export type FileType = "document" | "image" | "audio" | "video" | "other";
export type MessageType = "text" | "file" | "image" | "audio" | "video";

export type DeliveryStatus =
  | "sending"
  | "sent"
  | "delivered"
  | "read"
  | "failed";

export type UserStatus = "online" | "offline" | "away" | "busy";

export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  isOnline: boolean;
  lastSeen?: Date;
  role?: "user" | "admin" | "moderator";
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  chatId: string;
  timestamp: Date;
  type: MessageType;

  // File-related (only for file/image/audio types)
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  fileMimeType?: string;

  // Message features
  replyTo?: string; // Message ID being replied to
  reactions?: MessageReaction[];
  isEdited?: boolean;
  editedAt?: Date;
  deliveryStatus: DeliveryStatus;

  // Optional metadata
  metadata?: Record<string, unknown>;
}

export interface MessageReaction {
  emoji: string;
  userId: string;
  timestamp: Date;
}

export interface Chat {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  isGroup: boolean;

  // Group-specific fields
  name?: string; // Only for group chats
  avatar?: string; // Only for group chats
  description?: string; // Only for group chats

  // Metadata
  createdAt: Date;
  updatedAt: Date;

  // Chat settings
  isMuted?: boolean;
  isPinned?: boolean;
  isArchived?: boolean;
}

export interface TypingIndicator {
  userId: string;
  chatId: string;
  timestamp: Date;
}

// ============================================================================
// Store/State Types
// ============================================================================
// export interface ChatState {
//   // Current state
//   currentChatId: string | null;
//   chats: Chat[];
//   messages: Record<string, Message[]>; // chatId -> messages
//   users: Record<string, User>; // userId -> user
//   currentUser: User | null;

//   // UI state
//   isLoading: boolean;
//   isSidebarOpen: boolean;
//   isProfilePanelOpen: boolean;
//   isSearchOpen: boolean;
//   typingIndicators: TypingIndicator[];
//   searchQuery: string;

//   // Actions - Chat Management
//   setCurrentChat: (chatId: string | null) => void;
//   addChat: (chat: Chat) => void;
//   updateChat: (chatId: string, updates: Partial<Chat>) => void;
//   deleteChat: (chatId: string) => void;

//   // Actions - Message Management
//   addMessage: (message: Message) => void;
//   updateMessage: (
//     messageId: string,
//     chatId: string,
//     updates: Partial<Message>,
//   ) => void;
//   deleteMessage: (messageId: string, chatId: string) => void;
//   markMessagesAsRead: (chatId: string) => void;

//   // Actions - Reactions
//   addReaction: (
//     messageId: string,
//     chatId: string,
//     reaction: MessageReaction,
//   ) => void;
//   removeReaction: (
//     messageId: string,
//     chatId: string,
//     userId: string,
//     emoji: string,
//   ) => void;

//   // Actions - Typing Indicators
//   setTypingIndicator: (indicator: TypingIndicator) => void;
//   removeTypingIndicator: (userId: string, chatId: string) => void;

//   // Actions - UI State
//   toggleSidebar: () => void;
//   toggleProfilePanel: () => void;
//   toggleSearch: () => void;
//   setSearchQuery: (query: string) => void;

//   // Actions - User Management
//   updateUser: (userId: string, updates: Partial<User>) => void;
//   setCurrentUser: (user: User) => void;
// }

// // ============================================================================
// // API/Service Types
// // ============================================================================

// export interface SendMessageRequest {
//   content: string;
//   chatId: string;
//   type: MessageType;
//   replyTo?: string;
//   fileUrl?: string;
//   fileName?: string;
//   fileSize?: number;
// }

// export interface CreateChatRequest {
//   participantIds: string[];
//   isGroup: boolean;
//   name?: string;
//   avatar?: string;
//   description?: string;
// }

// export interface UpdateChatRequest {
//   name?: string;
//   avatar?: string;
//   description?: string;
//   isMuted?: boolean;
//   isPinned?: boolean;
//   isArchived?: boolean;
// }

// // ============================================================================
// // Utility Types
// // ============================================================================

// export type Nullable<T> = T | null;

// export type Optional<T> = T | undefined;

// export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// export type PartialFields<T, K extends keyof T> = Omit<T, K> &
//   Partial<Pick<T, K>>;
