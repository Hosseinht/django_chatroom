import { Avatar, Box, HStack, Text, VStack } from "@chakra-ui/react";
import { MessageType } from "../../entities/MessageType.ts";
import "../../main.css";
import Scroll from "./Scroll.tsx";
import RoomDrawer from "../RoomDrawer.tsx";

interface Props {
  newMessage: MessageType[];
}
const MessageBody = ({ newMessage }: Props) => {
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Format the date and time
  };

  return (
    <div>
      <RoomDrawer />
      <Scroll>
        <Box padding={2}>
          {newMessage?.map((msg: MessageType, index: number) => {
            return (
              <div key={index}>
                <HStack marginTop={4} alignItems="flex-start">
                  <Avatar
                    name="Dan Abrahmov"
                    src="https://bit.ly/dan-abramov"
                  />
                  <VStack
                    alignItems="left"
                    spacing="3px"
                    width="550px"
                    backgroundColor="blue.50"
                    borderRadius="10px"
                    border="1px "
                    borderColor="transparent"
                    padding={3}
                  >
                    <Text fontWeight="700">{msg.sender}</Text>
                    <Text>{msg.content}</Text>
                    <Text alignSelf="flex-end" as="sub" padding={2}>
                      {formatDate(msg.timestamp)}
                    </Text>
                  </VStack>
                </HStack>
              </div>
            );
          })}
        </Box>
      </Scroll>
    </div>
  );
};

export default MessageBody;
