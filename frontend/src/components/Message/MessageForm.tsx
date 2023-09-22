import React from "react";
import { Box, FormControl, FormLabel, Textarea } from "@chakra-ui/react";

interface Props {
  message: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
}

const MessageForm = ({ message, onSend, onChange }: Props) => {
  return (
    <Box pos="absolute" bottom="0" padding={3} width="100%">
      <FormControl>
        <FormLabel>
          <Textarea
            placeholder="Enter Message:"
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
    </Box>
  );
};

export default MessageForm;
