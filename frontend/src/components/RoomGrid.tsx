import { Box, Heading, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import RoomCardContainer from "./RoomCardContainer.tsx";
import RoomCard from "./RoomCard.tsx";
import useServers from "../hooks/useServers.ts";
import useServerQueryStore from "../store.ts";

const RoomGrid = () => {
  const { data, error, isLoading } = useServers();
  const selectedCategory = useServerQueryStore((s) => s.serverQuery.category);
  const selectedServerId = useServerQueryStore((s) => s.serverQuery);

  if (error) return null;
  if (isLoading) return <Spinner />;

  if (selectedServerId?.serverId) {
    return (
      <Box padding="10px">
        {data && data.length > 0 && (
          <Heading fontSize="2xl" justifyContent="center" textAlign="center">
            Welcome to {data[0].name}
            <Text fontSize="md" color="gray.500">
              {data[0].description}
            </Text>
          </Heading>
        )}
      </Box>
    );
  } else {
    return (
      <Box padding="10px">
        <Heading fontSize="2xl" justifyContent="center" textAlign="center">
          {selectedCategory ? selectedCategory : "Popular Servers"}
          {selectedServerId?.category && (
            <Text fontSize="md" color="gray.500">
              Channels talking about {selectedCategory}
            </Text>
          )}
        </Heading>

        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} spacing={6}>
          {data?.map((server) => (
            <RoomCardContainer key={server.id}>
              <RoomCard server={server} />
            </RoomCardContainer>
          ))}
        </SimpleGrid>
      </Box>
    );
  }
};

export default RoomGrid;
