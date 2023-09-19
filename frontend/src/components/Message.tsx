import useWebSocket from "react-use-websocket";
import { useEffect, useState } from "react";
import useRoomMessages from "../hooks/useRoomMessages.ts";
import { MessageType } from "../entities/MessageType.ts";
import { Spinner } from "@chakra-ui/react";

interface Props {
  roomId: number;
  serverId: number;
}

const Message = ({ roomId, serverId }: Props) => {
  const [newMessage, setNewMessage] = useState<MessageType[]>([]);
  const [message, setMessage] = useState("");
  // console.log(newMessage);
  const { data, error, isLoading } = useRoomMessages(roomId);
  // console.log(isLoading);
  // console.log(newMessage);
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
    <div>
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
    </div>
  );
};

export default Message;
