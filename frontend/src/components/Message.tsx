import useWebSocket from "react-use-websocket";
import { useEffect, useState } from "react";
import useRoomMessages from "../hooks/useRoomMessages.ts";
import { MessageType } from "../entities/MessageType.ts";
import { Box, Flex, Heading, Spinner } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";
import { BiDotsVerticalRounded } from "react-icons/bi";

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

  if (error) return null;
  if (isLoading) return <Spinner />;

  return (
    <>
      <Flex alignItems={"center"} justifyContent="space-between" padding={2}>
        <Heading as="h3" size="md">
          {roomName}
        </Heading>
        <Icon display={{ lg: "none" }} boxSize={6} as={BiDotsVerticalRounded} />
      </Flex>
      <Box padding={2}>
        {newMessage?.map((msg: MessageType, index: number) => {
          return (
            <div key={index}>
              <p>{msg.sender}</p>
              <p>{msg.content}</p>
              <p>{msg.timestamp}</p>
            </div>
          );
        })}
        <form>
          <label>
            Enter Message:
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
        </form>
        <button
          onClick={() => {
            sendJsonMessage({ type: "message", message });
          }}
        >
          {/*It sends a JSON message to the server with a type of "message" and the message state as the content.*/}
          Send Message
        </button>
      </Box>
    </>
  );
};

export default Message;
