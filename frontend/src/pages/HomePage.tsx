import { Grid, GridItem } from "@chakra-ui/react";
import RoomGrid from "../components/RoomGrid.tsx";
import PopularServerList from "../components/PopularServerList.tsx";
import CategoryList from "../components/CategoryList.tsx";
import { useState } from "react";
import ServerRoomList from "../components/ServerRoomList.tsx";

export interface ServerQuery {
  category?: string;
  qty?: number;
  byServerId?: number;
}
const HomePage = () => {
  const [serverQuery, setServerQuery] = useState<ServerQuery>(
    {} as ServerQuery,
  );

  return (
    <Grid
      gridTemplateColumns={{
        base: "1fr 1fr",
        md: "1fr 1fr 2fr",
        lg: "250px 250px 1fr",
      }}
      gridTemplateRows={{
        base: "40px 100px 200px 50px",
        md: "40px 100px 200px 50px",
      }}
      gridTemplateAreas={{
        base: `'header header' 'popular explore ' 'main main'`,
        md: `'header header header' 'popular explore main'`,
      }}
      gap={2}
      // padding={2}
    >
      <GridItem gridArea="popular" shadow="lg">
        <PopularServerList
          onSelectServer={(id) =>
            setServerQuery({ ...serverQuery, byServerId: id })
          }
        />
      </GridItem>
      <GridItem gridArea="explore" shadow="lg">
        {serverQuery.byServerId ? (
          <ServerRoomList serverQuery={serverQuery} />
        ) : (
          <CategoryList
            onSelectCategory={(category) =>
              setServerQuery({ ...serverQuery, category: category.name })
            }
          />
        )}
      </GridItem>
      <GridItem gridArea="main" shadow="lg">
        <RoomGrid serverQuery={serverQuery} />
      </GridItem>
    </Grid>
  );
};

export default HomePage;
