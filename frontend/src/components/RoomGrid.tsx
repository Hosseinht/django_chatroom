import { Box, SimpleGrid, Spinner } from "@chakra-ui/react";
import RoomCardContainer from "./RoomCardContainer.tsx";
import RoomCard from "./RoomCard.tsx";
import useServers from "../hooks/useServers.ts";

const RoomGrid = () => {
  const { data, error, isLoading } = useServers();

  if (error) return null;
  if (isLoading) return <Spinner />;

  return (
    <Box padding="10px">
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} spacing={6}>
        {data?.map((server) => (
          <RoomCardContainer key={server.id}>
            <RoomCard server={server} />
          </RoomCardContainer>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default RoomGrid;
