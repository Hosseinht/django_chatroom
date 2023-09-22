import { Box, Heading, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import RoomCardContainer from "./RoomCardContainer.tsx";
import RoomCard from "./RoomCard.tsx";
import useServers from "../hooks/useServers.ts";
import useServerQueryStore from "../store.ts";
import useCategories from "../hooks/useCategories.ts";
import CategoryCard from "./CategoryCard.tsx";
import RoomDrawer from "./RoomDrawer.tsx";

const RoomGrid = () => {
  const { data, error, isLoading } = useServers();
  const { data: category } = useCategories();
  const selectedCategory = useServerQueryStore(
    (s) => s.serverQuery.categoryName,
  );
  const selectedFetchCategories = useServerQueryStore(
    (s) => s.serverQuery.fetchCategories,
  );

  const selectedServerId = useServerQueryStore((s) => s.serverQuery);

  if (error) return null;
  if (isLoading) return <Spinner />;

  if (selectedServerId?.serverId) {
    return (
      <Box padding="10px">
        {data && data.length > 0 && (
          <>
            <RoomDrawer />
            <Heading fontSize="2xl" justifyContent="center" textAlign="center">
              Welcome to {data[0].name}
              <Text fontSize="md" color="gray.500">
                {data[0].description}
              </Text>
            </Heading>
          </>
        )}
      </Box>
    );
  } else if (selectedFetchCategories) {
    return (
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} spacing={6}>
        <Heading fontSize="2xl" justifyContent="center" textAlign="center">
          Categories
        </Heading>
        {category?.map((category) => (
          <RoomCardContainer key={category.name}>
            <CategoryCard category={category} />
          </RoomCardContainer>
        ))}
      </SimpleGrid>
    );
  } else {
    return (
      <Box padding="10px">
        <Heading fontSize="2xl" justifyContent="center" textAlign="center">
          {selectedCategory ? selectedCategory : "Popular Servers"}
          {selectedCategory && (
            <Text fontSize="md" color="gray.500">
              Channels talking about {selectedCategory}
            </Text>
          )}
        </Heading>

        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} spacing={6}>
          {data?.map((server) => (
            <RoomCardContainer key={server.id}>
              <RoomCard server={server} />
            </RoomCardContainer>
          ))}
        </SimpleGrid>
      </Box>
    );
  }
};

export default RoomGrid;
