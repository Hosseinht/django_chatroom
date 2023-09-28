import { Card, CardBody, HStack, Text } from "@chakra-ui/react";
import { Category } from "../hooks/useCategories.ts";
import useServerQueryStore from "../stores/serverStore.ts";

interface Props {
  category: Category;
}
const RoomCard = ({ category }: Props) => {
  const setCategoryName = useServerQueryStore((s) => s.setCategoryName);
  return (
    <>
      <Card
        onClick={() => {
          setCategoryName(category.name);
        }}
      >
        {/*<Image src={getCroppedImageUrl(game.background_image)} />*/}
        <CardBody>
          <HStack justifyContent="space-between" marginBottom={3}>
            <Text>{category.id}</Text>
            <Text>{category.name}</Text>
          </HStack>
        </CardBody>
      </Card>
    </>
  );
};

export default RoomCard;
