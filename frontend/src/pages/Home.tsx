import { Box, Grid } from "@chakra-ui/react";
import Navbar from "../components/Navbar.tsx";

const Home = () => {
  return (
    <Grid
      gridTemplateColumns={{
        base: "1fr 1fr",
        md: "1fr 1fr 2fr",
      }}
      gridTemplateRows={{
        base: "40px 100px 200px 50px",
        md: "40px 100px 200px 50px",
      }}
      gridTemplateAreas={{
        base: `'header header' 'popular explore ' 'main main'`,
        md: `'header header header' 'popular explore main'`,
      }}
      gap={4}
      padding={5}
    >
      <Box gridArea="header">
        <Navbar />
      </Box>
      <Box gridArea="popular">Popular</Box>
      <Box gridArea="explore">Explore</Box>
      <Box gridArea="main">Main</Box>
    </Grid>
  );
};

export default Home;
