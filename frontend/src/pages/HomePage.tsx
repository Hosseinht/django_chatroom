import { Grid, GridItem } from "@chakra-ui/react";
import RoomGrid from "../components/RoomGrid.tsx";
import ServerList from "../components/ServerList.tsx";

const HomePage = () => {
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
      <GridItem gridArea="popular" shadow="lg" height="90vh">
        <ServerList />
      </GridItem>
      <GridItem gridArea="explore" shadow="lg">
        Categories
      </GridItem>
      <GridItem gridArea="main" shadow="lg">
        <RoomGrid />
      </GridItem>
    </Grid>
  );
};

export default HomePage;
