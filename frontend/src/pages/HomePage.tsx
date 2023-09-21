import { Box, Grid, GridItem } from "@chakra-ui/react";
import RoomGrid from "../components/RoomGrid.tsx";
import PopularServerList from "../components/PopularServerList.tsx";
import CategoryList from "../components/CategoryList.tsx";
import ServerRoomList from "../components/ServerRoomList.tsx";
import Message from "../components/Message/Message.tsx";
import useServerQueryStore from "../store.ts";

const gridTemplateAreasWithMain1 = {
  base: `'message'`,
  md: `'header ' 'message'`,
  lg: `'header header header' 'popular explore message'`,
};

const gridTemplateAreasWithMain2 = {
  base: `'room'`,
  md: `'header' 'room'`,
  lg: `'header header header' 'popular explore room'`,
};
const HomePage = () => {
  const selectedServerId = useServerQueryStore((s) => s.serverQuery.serverId);
  const selectedRoomId = useServerQueryStore((s) => s.serverQuery.roomId);

  const gridTemplateAreas = selectedRoomId
    ? gridTemplateAreasWithMain1
    : gridTemplateAreasWithMain2;

  return (
    <Grid
      gridTemplateColumns={{
        base: "100%",
        md: "100%",
        lg: "250px 250px 1fr",
      }}
      gridTemplateRows={{
        base: "700px",
        md: "10px 700px ",
      }}
      gridTemplateAreas={gridTemplateAreas}
      gap={2}
      // padding={2}
    >
      <Box
        gridArea="popular"
        display={{ base: "none", md: "none", lg: "block" }}
        shadow="lg"
      >
        <PopularServerList />
      </Box>
      <Box
        gridArea="explore"
        display={{ base: "none", md: "none", lg: "block" }}
        shadow="lg"
      >
        {selectedServerId ? <ServerRoomList /> : <CategoryList />}
      </Box>
      {selectedRoomId ? (
        <GridItem gridArea="message" shadow="lg">
          <Message />
        </GridItem>
      ) : (
        <GridItem gridArea="room" shadow="lg">
          <RoomGrid />
        </GridItem>
      )}
    </Grid>
  );
};

export default HomePage;
