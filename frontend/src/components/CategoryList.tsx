import { Box, Heading, HStack, Spinner, Text } from "@chakra-ui/react";
import useServers from "../hooks/useServers.ts";

const CategoryList = () => {
  const { data, error, isLoading } = useServers();

  if (error) return null;
  if (isLoading) return <Spinner />;

  return (
    <Box>
      <Heading as="h3" size="md" marginBottom={5} padding={2}>
        Categories
      </Heading>
      {data?.map((category) => (
        <HStack padding={2}>
          <Box>
            <Text fontWeight="bold">{category.name}</Text>
          </Box>
        </HStack>
      ))}
    </Box>
  );
};

export default CategoryList;
