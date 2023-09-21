import {
  Box,
  Heading,
  HStack,
  Link,
  List,
  ListItem,
  Spinner,
} from "@chakra-ui/react";
import useServers from "../hooks/useServers.ts";
import useServerQueryStore from "../store.ts";

const ServerRoomList = () => {
  const { data, error, isLoading } = useServers();
  const setRoom = useServerQueryStore((s) => s.setRoom);

  if (error) return null;
  if (isLoading) return <Spinner />;

  const serverRooms = data?.flatMap((server) => server.room_server);

  return (
    <Box>
      <Heading as="h3" size="md" marginBottom={5} padding={2}>
        {data && data[0].name} Rooms
      </Heading>
      <HStack padding={2}>
        <List>
          {serverRooms?.map((room) => (
            <ListItem key={room.id}>
              <Link onClick={() => setRoom(room.id, room.name)}>
                {room.name}
              </Link>{" "}
            </ListItem>
          ))}
        </List>
      </HStack>
    </Box>
  );
};

export default ServerRoomList;
