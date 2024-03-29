import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router";

import Navbar from "../components/Navbar.tsx";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Box>
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
