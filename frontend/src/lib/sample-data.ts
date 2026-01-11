import type { User, Chat, Message } from "@/lib/types";

// ============================================================================
// Constants
// ============================================================================

export const CURRENT_USER_ID = "current-user";

// ============================================================================
// Mock Users - Diverse, Realistic Data
// ============================================================================

export const mockUsers: Record<string, User> = {
  "current-user": {
    id: "current-user",
    name: "You",
    email: "you@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
    bio: "Product Designer • Coffee enthusiast ☕",
    isOnline: true,
    role: "user",
  },
  "user-1": {
    id: "user-1",
    name: "Sarah Johnson",
    email: "sarah.j@company.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    bio: "UX Designer at TechCorp 🎨",
    phone: "+1 (555) 123-4567",
    isOnline: true,
    lastSeen: new Date(),
    role: "user",
  },
  "user-2": {
    id: "user-2",
    name: "Alex Chen",
    email: "alex.chen@company.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    bio: "Full-stack developer | React enthusiast",
    phone: "+1 (555) 234-5678",
    isOnline: true,
    lastSeen: new Date(),
    role: "user",
  },
  "user-3": {
    id: "user-3",
    name: "Michael Brown",
    email: "michael.b@company.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    bio: "Engineering Manager • Tech lead",
    phone: "+1 (555) 345-6789",
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
    role: "user",
  },
  "user-4": {
    id: "user-4",
    name: "Emma Wilson",
    email: "emma.w@company.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    bio: "Marketing Lead @ StartupCo",
    phone: "+1 (555) 456-7890",
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    role: "user",
  },
  "user-5": {
    id: "user-5",
    name: "David Martinez",
    email: "david.m@company.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    bio: "Product Manager | Coffee addict ☕",
    phone: "+1 (555) 567-8901",
    isOnline: true,
    lastSeen: new Date(),
    role: "user",
  },
  "user-6": {
    id: "user-6",
    name: "Lisa Anderson",
    email: "lisa.a@company.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    bio: "Senior Designer • Figma wizard 🪄",
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    role: "user",
  },
  "user-7": {
    id: "user-7",
    name: "James Taylor",
    email: "james.t@company.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    bio: "DevOps Engineer",
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    role: "user",
  },
  "user-8": {
    id: "user-8",
    name: "Sophie Zhang",
    email: "sophie.z@company.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
    bio: "Data Scientist | AI enthusiast 🤖",
    isOnline: true,
    lastSeen: new Date(),
    role: "user",
  },
};

// ============================================================================
// Mock Messages - Realistic Conversations
// ============================================================================

export const mockMessages: Message[] = [
  // Chat 1: Sarah Johnson (Recent conversation about project)
  {
    id: "msg-1-1",
    content: "Hey! How are you doing?",
    senderId: "user-1",
    chatId: "chat-1",
    timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 mins ago
    type: "text",
    deliveryStatus: "read",
  },
  {
    id: "msg-1-2",
    content: "I'm good! Just finished the new design mockups 🎨",
    senderId: CURRENT_USER_ID,
    chatId: "chat-1",
    timestamp: new Date(Date.now() - 1000 * 60 * 8),
    type: "text",
    deliveryStatus: "read",
  },
  {
    id: "msg-1-3",
    content: "Awesome! Can you share them with the team?",
    senderId: "user-1",
    chatId: "chat-1",
    timestamp: new Date(Date.now() - 1000 * 60 * 7),
    type: "text",
    deliveryStatus: "read",
  },
  {
    id: "msg-1-4",
    content: "Sure thing! I'll send them over in a few minutes",
    senderId: CURRENT_USER_ID,
    chatId: "chat-1",
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
    type: "text",
    deliveryStatus: "delivered",
  },

  // Chat 2: Alex Chen (Technical discussion)
  {
    id: "msg-2-1",
    content: "Did you check the PR I submitted?",
    senderId: "user-2",
    chatId: "chat-2",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    type: "text",
    deliveryStatus: "read",
  },
  {
    id: "msg-2-2",
    content: "Yes! Looks great. Just left a few comments",
    senderId: CURRENT_USER_ID,
    chatId: "chat-2",
    timestamp: new Date(Date.now() - 1000 * 60 * 40),
    type: "text",
    deliveryStatus: "read",
  },
  {
    id: "msg-2-3",
    content: "Perfect! I'll address them and push the changes",
    senderId: "user-2",
    chatId: "chat-2",
    timestamp: new Date(Date.now() - 1000 * 60 * 38),
    type: "text",
    deliveryStatus: "read",
  },

  // Chat 3: Michael Brown (File sharing)
  {
    id: "msg-3-1",
    content: "Q3-Report-Final.pdf",
    senderId: "user-3",
    chatId: "chat-3",
    timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    type: "file",
    fileName: "Q3-Report-Final.pdf",
    fileSize: 2.4 * 1024 * 1024, // 2.4 MB
    deliveryStatus: "read",
  },
  {
    id: "msg-3-2",
    content: "Here's the final Q3 report. Let me know if you need any changes!",
    senderId: "user-3",
    chatId: "chat-3",
    timestamp: new Date(Date.now() - 1000 * 60 * 119),
    type: "text",
    deliveryStatus: "read",
  },
  {
    id: "msg-3-3",
    content: "Thanks! I'll review it this afternoon",
    senderId: CURRENT_USER_ID,
    chatId: "chat-3",
    timestamp: new Date(Date.now() - 1000 * 60 * 115),
    type: "text",
    deliveryStatus: "read",
  },

  // Chat 5: David Martinez (Product discussion)
  {
    id: "msg-5-1",
    content: "Can we schedule a quick sync about the new feature?",
    senderId: "user-5",
    chatId: "chat-5",
    timestamp: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
    type: "text",
    deliveryStatus: "read",
  },
  {
    id: "msg-5-2",
    content: "Sure! How about 3 PM today?",
    senderId: CURRENT_USER_ID,
    chatId: "chat-5",
    timestamp: new Date(Date.now() - 1000 * 60 * 175),
    type: "text",
    deliveryStatus: "read",
  },
  {
    id: "msg-5-3",
    content: "Perfect! See you then 👍",
    senderId: "user-5",
    chatId: "chat-5",
    timestamp: new Date(Date.now() - 1000 * 60 * 173),
    type: "text",
    deliveryStatus: "read",
    reactions: [
      { emoji: "👍", userId: CURRENT_USER_ID, timestamp: new Date() },
    ],
  },
];

// ============================================================================
// Mock Chats - Realistic Chat List
// ============================================================================

export const mockChats: Chat[] = [
  // Individual chats
  {
    id: "chat-1",
    participants: [mockUsers["user-1"], mockUsers[CURRENT_USER_ID]],
    lastMessage: mockMessages.find((m) => m.id === "msg-1-4"),
    unreadCount: 2,
    isGroup: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 2),
    isPinned: true,
  },
  {
    id: "chat-2",
    participants: [mockUsers["user-2"], mockUsers[CURRENT_USER_ID]],
    lastMessage: mockMessages.find((m) => m.id === "msg-2-3"),
    unreadCount: 0,
    isGroup: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    updatedAt: new Date(Date.now() - 1000 * 60 * 38),
    isPinned: true,
  },
  {
    id: "chat-3",
    participants: [mockUsers["user-3"], mockUsers[CURRENT_USER_ID]],
    lastMessage: mockMessages.find((m) => m.id === "msg-3-3"),
    unreadCount: 0,
    isGroup: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    updatedAt: new Date(Date.now() - 1000 * 60 * 115),
  },
  {
    id: "chat-4",
    participants: [mockUsers["user-4"], mockUsers[CURRENT_USER_ID]],
    lastMessage: {
      id: "msg-4-1",
      content: "Thanks for the update!",
      senderId: "user-4",
      chatId: "chat-4",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
      type: "text",
      deliveryStatus: "read",
    },
    unreadCount: 1,
    isGroup: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 4),
  },
  {
    id: "chat-5",
    participants: [mockUsers["user-5"], mockUsers[CURRENT_USER_ID]],
    lastMessage: mockMessages.find((m) => m.id === "msg-5-3"),
    unreadCount: 0,
    isGroup: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    updatedAt: new Date(Date.now() - 1000 * 60 * 173),
  },
  {
    id: "chat-6",
    participants: [mockUsers["user-6"], mockUsers[CURRENT_USER_ID]],
    lastMessage: {
      id: "msg-6-1",
      content: "I'll send you the design files tomorrow",
      senderId: "user-6",
      chatId: "chat-6",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      type: "text",
      deliveryStatus: "read",
    },
    unreadCount: 0,
    isGroup: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },

  // Group chats
  {
    id: "chat-7",
    name: "Design Team",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=DT",
    participants: [
      mockUsers["user-1"],
      mockUsers["user-6"],
      mockUsers[CURRENT_USER_ID],
    ],
    lastMessage: {
      id: "msg-7-1",
      content: "John: I agree with the new mockups",
      senderId: "user-1",
      chatId: "chat-7",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      type: "text",
      deliveryStatus: "read",
    },
    unreadCount: 0,
    isGroup: true,
    description: "Design team collaboration",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    updatedAt: new Date(Date.now() - 1000 * 60 * 15),
  },
  {
    id: "chat-8",
    name: "Engineering Team",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=ET",
    participants: [
      mockUsers["user-2"],
      mockUsers["user-3"],
      mockUsers["user-7"],
      mockUsers[CURRENT_USER_ID],
    ],
    lastMessage: {
      id: "msg-8-1",
      content: "James: Deployment completed successfully ✅",
      senderId: "user-7",
      chatId: "chat-8",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      type: "text",
      deliveryStatus: "read",
    },
    unreadCount: 0,
    isGroup: true,
    description: "Engineering discussions and updates",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: "chat-9",
    name: "Product Team",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=PT",
    participants: [
      mockUsers["user-4"],
      mockUsers["user-5"],
      mockUsers[CURRENT_USER_ID],
    ],
    lastMessage: {
      id: "msg-9-1",
      content: "Emma: Can we schedule a call for tomorrow?",
      senderId: "user-4",
      chatId: "chat-9",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
      type: "text",
      deliveryStatus: "read",
    },
    unreadCount: 3,
    isGroup: true,
    description: "Product strategy and roadmap",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
  },
  {
    id: "chat-10",
    name: "AI Research",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=AI",
    participants: [mockUsers["user-8"], mockUsers[CURRENT_USER_ID]],
    lastMessage: {
      id: "msg-10-1",
      content: "Sophie: Check out this new paper on transformers!",
      senderId: "user-8",
      chatId: "chat-10",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
      type: "text",
      deliveryStatus: "read",
    },
    unreadCount: 0,
    isGroup: true,
    description: "AI/ML research discussions",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
  },
];

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get messages for a specific chat
 */
export function getMessagesByChatId(chatId: string): Message[] {
  return mockMessages.filter((message) => message.chatId === chatId);
}

/**
 * Get user by ID
 */
export function getUserById(userId: string): User | undefined {
  return mockUsers[userId];
}

/**
 * Get chat by ID
 */
export function getChatById(chatId: string): Chat | undefined {
  return mockChats.find((chat) => chat.id === chatId);
}

/**
 * Get other participant in a direct chat (non-group)
 */
export function getOtherParticipant(
  chat: Chat,
  currentUserId: string,
): User | undefined {
  if (chat.isGroup) return undefined;
  return chat.participants.find((p) => p.id !== currentUserId);
}

/**
 * Format file size to human-readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

/**
 * Format timestamp to relative time
 */
export function formatTimestamp(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return date.toLocaleDateString();
}
