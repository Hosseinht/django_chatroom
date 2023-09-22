import { Box, Grid } from "@chakra-ui/react";
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
        lg: `250px 250px 1fr`,
      }}
      gridTemplateRows={{
        base: "700px",
        md: "10px 88vh ",
      }}
      gridTemplateAreas={gridTemplateAreas}
      gap={2}
      padding={2}
      overflow="hidden"
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
        <Box gridArea="message" shadow="lg" pos="relative">
          <Message />
        </Box>
      ) : (
        <Box gridArea="room" shadow="lg">
          <RoomGrid />
        </Box>
      )}
    </Grid>
  );
};

export default HomePage;
