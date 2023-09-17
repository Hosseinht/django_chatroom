import useWebSocket from "react-use-websocket";
import { useState } from "react";

interface Props {
  roomId: number;
  serverId?: number;
}

const Message = ({ roomId, serverId }: Props) => {
  const [newMessage, setNewMessage] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const socketUrl = roomId
    ? `ws://127.0.0.1:8000/${serverId}/${roomId}/`
    : null;

  const { sendJsonMessage } = useWebSocket(socketUrl, {
    onOpen: () => {
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
      console.log(data);
      setNewMessage((prev_msg) => [...prev_msg, data.new_message]);
    },
  });

  return (
    <div>
      {newMessage.map((msg, index) => {
        return (
          <div key={index}>
            <p>{msg}</p>
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
