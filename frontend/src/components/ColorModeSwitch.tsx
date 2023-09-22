import { Box, Button, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <Box padding={2}>
      <Button
        onClick={toggleColorMode}
        bg={useColorModeValue("white", "gray.700")}
        _hover={{
          textDecoration: "none",
        }}
      >
        {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      </Button>
    </Box>
  );
};

export default ColorModeSwitch;
