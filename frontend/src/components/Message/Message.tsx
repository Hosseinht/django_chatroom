import useRoomMessages from "../../hooks/useRoomMessages.ts";
import { Box, Spinner } from "@chakra-ui/react";
import MessageBody from "./MessageBody.tsx";
import MessageForm from "./MessageForm.tsx";
import useChatWebsocket from "../../hooks/useChatWebsocket.ts";

const Message = () => {
  const { error, isLoading } = useRoomMessages();
  const { newMessage, message, handleSendMessage, handleMessageChange } =
    useChatWebsocket();
  if (error) return null;
  if (isLoading) return <Spinner />;

  return (
    <Box>
      <MessageBody newMessage={newMessage} />
      <MessageForm
        message={message}
        onChange={handleMessageChange}
        onSend={handleSendMessage}
      />
    </Box>
  );
};

export default Message;
