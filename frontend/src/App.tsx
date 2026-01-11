import { MessageList } from "@/components/chat/message-list/message-list";
import { AppLayout } from "@/components/sidebar/app-layout";
import { getMessagesByChatId } from "@/lib/sample-data";

export default function App() {
  // Using chat-1 as the default chat (conversation with Sarah Johnson)
  const chatId = "chat-1";
  const messages = getMessagesByChatId(chatId);

  // const currentUserId = "user-1";
  const isUserTyping = true;

  const handleSendMessage = (content: string) => {
    console.log("Sending message:", content);
  };

  const handleReactionAdd = (messageId: string, emoji: string) => {
    console.log("Adding reaction:", messageId, emoji);
  };

  const handleReactionRemove = (messageId: string, emoji: string) => {
    console.log("Removing reaction:", messageId, emoji);
  };

  const handleReply = (messageId: string) => {
    console.log("Replying to message:", messageId);
  };

  const handleEdit = (messageId: string, newContent: string) => {
    console.log("Editing message:", messageId, newContent);
  };

  const handleDelete = (messageId: string) => {
    console.log("Deleting message:", messageId);
  };

  return (
    <AppLayout>
      <MessageList
        messages={messages}
        chatId={chatId}
        // currentUserId={currentUserId}
        isTyping={isUserTyping}
        typingUserName="Sarah"
        onSendMessage={handleSendMessage}
        onReactionAdd={handleReactionAdd}
        onReactionRemove={handleReactionRemove}
        onMessageReply={handleReply}
        onMessageEdit={handleEdit}
        onMessageDelete={handleDelete}
      />
    </AppLayout>
  );
}
