import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router";
import Simple from "../components/Navbar.tsx";

const Layout = () => {
  return (
    <>
      <Simple />
      <Box>
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
