import {
  Avatar,
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MessageType } from "../../entities/MessageType.ts";

interface Props {
  roomName: string;
  newMessage: MessageType[];
}
const MessageBody = ({ roomName, newMessage }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Format the date and time
  };

  return (
    <div>
      <Flex alignItems={"center"} justifyContent="space-between" padding={2}>
        <Heading as="h3" size="md">
          {roomName}
        </Heading>
        <Icon
          display={{ lg: "none" }}
          boxSize={6}
          as={BiDotsVerticalRounded}
          onClick={onOpen}
        />
      </Flex>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Rooms</DrawerHeader>
          <DrawerBody>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Box padding={2}>
        {newMessage?.map((msg: MessageType, index: number) => {
          return (
            <div key={index}>
              <HStack marginTop={4} alignItems="flex-start">
                <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
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
                  <Text alignSelf="flex-end">{formatDate(msg.timestamp)}</Text>
                </VStack>
              </HStack>
            </div>
          );
        })}
      </Box>
    </div>
  );
};

export default MessageBody;
