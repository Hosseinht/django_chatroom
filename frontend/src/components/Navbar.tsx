import { HStack, Text } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch.tsx";

const Navbar = () => {
  return (
    <HStack justifyContent="space-between" padding={5} shadow="lg">
      <Text fontSize="3xl" as="b">
        ChatRoom
      </Text>
      <ColorModeSwitch />
    </HStack>
  );
};

// const Navbar = () => {
//   return (
//     <HStack justifyContent="space-between" padding={5} shadow="lg">
//       <Text fontSize="3xl" as="b">
//         ChatRoom
//       </Text>
//       <ColorModeSwitch />
//     </HStack>
//   );
// };
//

export default Navbar;
