import { Card, CardBody, Heading, HStack, Text } from "@chakra-ui/react";

const RoomCard = () => {
  return (
    <Card>
      {/*<Image src={getCroppedImageUrl(game.background_image)} />*/}
      <CardBody>
        <HStack justifyContent="space-between" marginBottom={3}>
          <Text>Platform</Text>
          <Text>Card</Text>
        </HStack>
        <Heading fontSize="2xl">Heading</Heading>
      </CardBody>
    </Card>
  );
};

export default RoomCard;
