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
  Link,
  List,
  ListItem,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MessageType } from "../../entities/MessageType.ts";
import ServerRoomList from "../ServerRoomList.tsx";
import { Room } from "../../entities/Room.ts";
import { useState } from "react";
import { ServerQuery } from "../../pages/HomePage.tsx";
import useServers from "../../hooks/useServers.ts";

interface Props {
  roomName: string;
  newMessage: MessageType[];
  serverQuery: ServerQuery;
  onSelectRoom: (id: number, name: string) => void;
}
const MessageBody = ({
  roomName,
  newMessage,
  serverQuery,
  onSelectRoom,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, error, isLoading } = useServers(serverQuery);

  const serverRooms = data?.flatMap((server) => server.room_server);
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
          <List>
            {serverRooms?.map((room) => (
              <ListItem key={room.id}>
                <Link onClick={() => onSelectRoom(room.id, room.name)}>
                  {room.name}
                </Link>{" "}
              </ListItem>
            ))}
          </List>
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
