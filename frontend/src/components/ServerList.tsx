import useServers from "../hooks/useServers.ts";
import { Avatar, Box, Heading, HStack, Spinner, Text } from "@chakra-ui/react";

const ServerList = () => {
  const { data, error, isLoading } = useServers();

  if (error) return null;
  if (isLoading) return <Spinner />;

  return (
    <Box>
      <Heading as="h3" size="md" marginBottom={5} padding={2}>
        Servers
      </Heading>
      {data?.map((server) => (
        <HStack padding={2}>
          <Avatar>Icon</Avatar>
          <Box>
            <Text fontWeight="bold">{server.name}</Text>
            <Text as="span" color="gray.500" fontWeight="bold" fontSize="sm">
              {server.category}
            </Text>
          </Box>
        </HStack>
      ))}
    </Box>
  );
};

export default ServerList;