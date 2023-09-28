import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Link,
  List,
  ListItem,
  useDisclosure,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";
import { BiDotsVerticalRounded } from "react-icons/bi";
import useServerQueryStore from "../stores/serverStore.ts";
import useServers from "../hooks/useServers.ts";

const RoomDrawer = () => {
  const { data } = useServers();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const selectedRoomName = useServerQueryStore((s) => s.serverQuery.roomName);
  const setRoom = useServerQueryStore((s) => s.setRoom);
  const serverRooms = data?.flatMap((server) => server.room_server);

  return (
    <>
      <Flex alignItems={"center"} justifyContent="space-between" padding={2}>
        <Heading as="h3" size="md" textTransform="capitalize">
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
    </>
  );
};

export default RoomDrawer;
