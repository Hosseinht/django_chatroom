import {
  Avatar,
  Box,
  Drawer,
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
import useServers from "../../hooks/useServers.ts";
import useServerQueryStore from "../../store.ts";

interface Props {
  newMessage: MessageType[];
}
const MessageBody = ({ newMessage }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useServers();

  const setRoom = useServerQueryStore((s) => s.setRoom);
  const selectedRoomName = useServerQueryStore((s) => s.serverQuery.roomName);

  const serverRooms = data?.flatMap((server) => server.room_server);
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Format the date and time
  };

  return (
    <div>
      <Flex alignItems={"center"} justifyContent="space-between" padding={2}>
        <Heading as="h3" size="md">
          {selectedRoomName}
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
                <Link onClick={() => setRoom(room.id, room.name)}>
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
