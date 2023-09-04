import Navbar from "../components/Navbar.tsx";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router";

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
