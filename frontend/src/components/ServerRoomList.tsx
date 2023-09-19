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
import { ServerQuery } from "../pages/HomePage.tsx";

interface Props {
  serverQuery: ServerQuery;
  onSelectRoom: (id: number, name: string) => void;
}

const ServerRoomList = ({ serverQuery, onSelectRoom }: Props) => {
  const { data, error, isLoading } = useServers(serverQuery);

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
              <Link onClick={() => onSelectRoom(room.id, room.name)}>
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
