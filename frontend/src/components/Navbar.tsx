import { HStack, Text } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch.tsx";

const Navbar = () => {
  return (
    <HStack justifyContent="space-between">
      <Text>Chat</Text>
      <ColorModeSwitch />
    </HStack>
  );
};

export default Navbar;
