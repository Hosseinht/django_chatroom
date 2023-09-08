import { Box, Heading, HStack, Link, Spinner } from "@chakra-ui/react";
import { MdOutlineSportsSoccer } from "react-icons/md";
import { Icon } from "@chakra-ui/icons";
import useCategories, { Category } from "../hooks/useCategories.ts";

interface Props {
  onSelectCategory: (category: Category) => void;
}
const CategoryList = ({ onSelectCategory }: Props) => {
  const { data, error, isLoading } = useCategories();

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

          <Link onClick={() => onSelectCategory(category)} fontWeight="bold">
            {category.name}
          </Link>
        </HStack>
      ))}
    </Box>
  );
};

export default CategoryList;
