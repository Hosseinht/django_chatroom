import React from "react";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

interface Props {
  message: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
}

const MessageForm = ({ message, onSend, onChange }: Props) => {
  return (
    <div>
      <FormControl>
        <FormLabel>
          <Input
            placeholder="Enter Message:"
            type="text"
            value={message}
            onChange={onChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && message.trim() !== "") {
                e.preventDefault();
                onSend();
              }
            }}
          />
        </FormLabel>
      </FormControl>
      <Button onClick={onSend}>
        {/*It sends a JSON message to the server with a type of "message" and the message state as the content.*/}
        Send Message
      </Button>
    </div>
  );
};

export default MessageForm;
