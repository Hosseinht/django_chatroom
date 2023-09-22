import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import "../index.css";
import ColorModeSwitch from "./ColorModeSwitch.tsx";
import useServerQueryStore from "../store.ts";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const setServerId = useServerQueryStore((s) => s.setServerId);
  const setCategoryName = useServerQueryStore((s) => s.setCategoryName);

  const handleOnClicks = () => {
    setServerId(undefined);
    setCategoryName("");
  };

  return (
    <>
      <Box shadow="lg" className={isOpen ? "menu-open" : ""} zIndex={100}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            px={4}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ lg: "none" }}
            onClick={isOpen ? onClose : onOpen}
            // background="white"
            _hover={{
              background: "white",
            }}
          />
          <HStack ms={4} spacing={8} alignItems={"center"}>
            <Link to="/" onClick={handleOnClicks}>
              ChatRoom
            </Link>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <ColorModeSwitch />
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  me={4}
                  src={
                    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
              </MenuButton>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box>
            <Stack as={"nav"} spacing={4} padding={4}>
              <a>Popular</a>
              <a>Rooms</a>
              <a>Main</a>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Navbar;
