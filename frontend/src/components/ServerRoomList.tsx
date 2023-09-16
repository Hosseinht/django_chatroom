import {
  Box,
  Heading,
  HStack,
  List,
  ListItem,
  Spinner,
} from "@chakra-ui/react";
import useServers from "../hooks/useServers.ts";
import { ServerQuery } from "../pages/HomePage.tsx";

interface Props {
  serverQuery: ServerQuery;
}

const ServerRoomList = ({ serverQuery }: Props) => {
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
            <ListItem key={room.id}>{room.name}</ListItem>
          ))}
        </List>
      </HStack>
    </Box>
  );
};

export default ServerRoomList;
