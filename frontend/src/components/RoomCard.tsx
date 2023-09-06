import { Card, CardBody, Heading, HStack, Text } from "@chakra-ui/react";
import { Server } from "../hooks/useServers.ts";

interface Props {
  server: Server;
}
const RoomCard = ({ server }: Props) => {
  return (
    <>
      <Card>
        {/*<Image src={getCroppedImageUrl(game.background_image)} />*/}
        <CardBody>
          <HStack justifyContent="space-between" marginBottom={3}>
            <Text>{server.id}</Text>
            <Text>{server.name}</Text>
          </HStack>
          <Heading fontSize="2xl">Heading</Heading>
        </CardBody>
      </Card>
    </>
  );
};

export default RoomCard;
