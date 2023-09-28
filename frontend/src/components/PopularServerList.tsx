import {
  Avatar,
  Box,
  Heading,
  HStack,
  Link,
  Spinner,
  Text,
} from "@chakra-ui/react";
import usePopularServers from "../hooks/usePopularServers.ts";
import useServerQueryStore from "../stores/serverStore.ts";

const PopularServerList = () => {
  const { data, error, isLoading } = usePopularServers();
  const setServerId = useServerQueryStore((s) => s.setServerId);

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
            <Text
              fontWeight="bold"
              onClick={() => {
                setServerId(server.id);
              }}
            >
              <Link>{server.name}</Link>{" "}
            </Text>
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
