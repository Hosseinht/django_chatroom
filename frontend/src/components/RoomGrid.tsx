import { Box, SimpleGrid } from "@chakra-ui/react";
import RoomCardContainer from "./RoomCardContainer.tsx";
import RoomCard from "./RoomCard.tsx";

const RoomGrid = () => {
  return (
    <Box padding="10px">
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} spacing={6}>
        <RoomCardContainer>
          <RoomCard />
        </RoomCardContainer>
        <RoomCardContainer>
          <RoomCard />
        </RoomCardContainer>
        <RoomCardContainer>
          <RoomCard />
        </RoomCardContainer>
        <RoomCardContainer>
          <RoomCard />
        </RoomCardContainer>
      </SimpleGrid>
    </Box>
  );
};

export default RoomGrid;
