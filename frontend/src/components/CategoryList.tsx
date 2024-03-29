import { Box, Heading, HStack, Link, Spinner } from "@chakra-ui/react";
import { MdOutlineSportsSoccer } from "react-icons/md";
import { Icon } from "@chakra-ui/icons";
import useCategories from "../hooks/useCategories.ts";
import useServerQueryStore from "../stores/serverStore.ts";

const CategoryList = () => {
  const { data, error, isLoading } = useCategories();
  const setCategoryName = useServerQueryStore((s) => s.setCategoryName);

  if (error) return null;
  if (isLoading) return <Spinner />;

  return (
    <Box>
      <Heading as="h3" size="md" marginBottom={5} padding={2}>
        Categories
      </Heading>
      {data?.map((category) => (
        <HStack padding={2} key={category.id}>
          <Icon as={MdOutlineSportsSoccer} />

          <Link
            onClick={() => setCategoryName(category.name)}
            fontWeight="bold"
          >
            {category.name}
          </Link>
        </HStack>
      ))}
    </Box>
  );
};

export default CategoryList;
