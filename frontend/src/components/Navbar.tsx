import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  Stack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import ColorModeSwitch from "./ColorModeSwitch";
import useServerQueryStore from "../store.ts";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const setServerId = useServerQueryStore((s) => s.setServerId);
  const setCategoryName = useServerQueryStore((s) => s.setCategoryName);
  const setFetchCategory = useServerQueryStore((s) => s.setFetchCategories);

  const handleServerOnClick = () => {
    setServerId(undefined);
    setCategoryName("");
    setFetchCategory(false);
  };

  const handleCategoryOnClick = () => {
    setServerId(undefined);
    setFetchCategory(true);
  };

  return (
    <>
      <Box px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            bg={useColorModeValue("white", "gray.700")}
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ lg: "none" }}
            onClick={isOpen ? onClose : onOpen}
            _hover={{
              textDecoration: "none",
            }}
          />
          <Box alignItems={"center"} fontWeight="bold">
            <Link to="/" onClick={handleServerOnClick}>
              ChatRoom
            </Link>
          </Box>
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
                  src={
                    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
              </MenuButton>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ lg: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <Button
                variant="ghost"
                onClick={handleServerOnClick}
                alignSelf="flex-start"
                _hover={{
                  textDecoration: "none",
                }}
              >
                Servers
              </Button>
              <Button
                variant="ghost"
                onClick={handleCategoryOnClick}
                alignSelf="flex-start"
                _hover={{
                  textDecoration: "none",
                }}
              >
                Categories
              </Button>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
