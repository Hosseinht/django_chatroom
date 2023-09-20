import useWebSocket from "react-use-websocket";
import React, { useEffect, useState } from "react";
import useRoomMessages from "../../hooks/useRoomMessages.ts";
import { MessageType } from "../../entities/MessageType.ts";
import { Spinner } from "@chakra-ui/react";
import MessageBody from "./MessageBody.tsx";
import MessageForm from "./MessageForm.tsx";

interface Props {
  roomId: number;
  serverId: number;
  roomName: string;
}

const Message = ({ roomId, serverId, roomName }: Props) => {
  const [newMessage, setNewMessage] = useState<MessageType[]>([]);
  const [message, setMessage] = useState("");

  const { data, error, isLoading } = useRoomMessages(roomId);

  const socketUrl = roomId
    ? `ws://127.0.0.1:8000/${serverId}/${roomId}/`
    : null;

  const { sendJsonMessage } = useWebSocket(socketUrl, {
    onOpen: () => {
      // grab the data that is related to the particular room, when open the room

      if (isLoading) {
        // If data is still loading, wait for it.
        console.log("Waiting for data to load...");
      } else if (data) {
        // If data has been fetched, set the newMessage state.
        setNewMessage(data);
      }
      console.log("connected");
    },
    onClose: () => {
      console.log("closed");
    },
    onError: () => {
      console.log("Error");
    },
    onMessage: (msg) => {
      // The onMessage callback is invoked whenever the WebSocket connection receives a message from the backend.
      const data = JSON.parse(msg.data);

      setNewMessage((prev_msg) => [...prev_msg, data.new_message]);
      // set the new message that we received from the backend

      setMessage("");
    },
  });

  useEffect(() => {
    if (!isLoading) {
      // If data is not loading, fetch it now.
      // This will ensure that we get the data once it's available.
      setNewMessage(data || []);
    }
  }, [data, isLoading]);

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    sendJsonMessage({ type: "message", message });
  };

  if (error) return null;
  if (isLoading) return <Spinner />;

  return (
    <>
      <MessageBody roomName={roomName} newMessage={newMessage} />
      <MessageForm
        message={message}
        onChange={handleMessageChange}
        onSend={handleSendMessage}
      />
    </>
  );
};

export default Message;
