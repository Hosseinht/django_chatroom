import { Avatar, Box, Heading, HStack, Spinner, Text } from "@chakra-ui/react";
import usePopularServers from "../hooks/usePopularServers.ts";
import {Server} from "../hooks/useServers.ts";

interface Props {
    onSelectServer: (server: Server) => void;
}
const PopularServerList = ({onSelectServer}:Props) => {
  const { data, error, isLoading } = usePopularServers();

  if (error) return null;
  if (isLoading) return <Spinner />;

  return (
    <Box>
      <Heading as="h3" size="md" marginBottom={5} padding={2}>
        Servers
      </Heading>
      {data?.map((server) => (
        <HStack padding={2} key={server.id}>
          <Avatar>Icon</Avatar>
          <Box>
            <Text fontWeight="bold" onClick={() => onSelectServer(server)}>{server.name}</Text>
            <Text as="span" color="gray.500" fontWeight="bold" fontSize="sm">
              {server.category}
            </Text>
          </Box>
        </HStack>
      ))}
    </Box>
  );
};

export default PopularServerList;
