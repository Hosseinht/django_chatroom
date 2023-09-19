import { Box, Grid, GridItem } from "@chakra-ui/react";
import RoomGrid from "../components/RoomGrid.tsx";
import PopularServerList from "../components/PopularServerList.tsx";
import CategoryList from "../components/CategoryList.tsx";
import { useState } from "react";
import ServerRoomList from "../components/ServerRoomList.tsx";
import Message from "../components/Message.tsx";

export interface ServerQuery {
  category?: string;
  qty?: number;
  serverId: number;
  roomId?: number;
  roomName: string;
}

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
  const [serverQuery, setServerQuery] = useState<ServerQuery>(
    {} as ServerQuery,
  );
  const gridTemplateAreas = serverQuery.roomId
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
        <PopularServerList
          onSelectServer={(id) =>
            setServerQuery({
              ...serverQuery,
              serverId: id,
              category: undefined,
              roomId: undefined,
            })
          }
        />
      </Box>
      <Box
        gridArea="explore"
        display={{ base: "none", md: "none", lg: "block" }}
        shadow="lg"
      >
        {serverQuery.serverId ? (
          <ServerRoomList
            onSelectRoom={(id, name) =>
              setServerQuery({
                ...serverQuery,
                roomId: id,
                roomName: name,
              })
            }
            serverQuery={serverQuery}
          />
        ) : (
          <CategoryList
            onSelectCategory={(category) =>
              setServerQuery({ ...serverQuery, category: category.name })
            }
          />
        )}
      </Box>
      {serverQuery.roomId ? (
        <GridItem gridArea="message" shadow="lg">
          <Message
            roomId={serverQuery.roomId}
            serverId={serverQuery.serverId}
            roomName={serverQuery.roomName}
          />
        </GridItem>
      ) : (
        <GridItem gridArea="room" shadow="lg">
          <RoomGrid serverQuery={serverQuery} />
        </GridItem>
      )}
    </Grid>
  );
};

export default HomePage;
