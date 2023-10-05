import { Card, CardBody, Image, Text, VStack } from "@chakra-ui/react";
import { Server } from "../entities/Server";
import useServerQueryStore from "../stores/serverStore.ts";

interface Props {
  server: Server;
}
const RoomCard = ({ server }: Props) => {
  const setServerId = useServerQueryStore((s) => s.setServerId);
  return (
    <>
      <Card
        onClick={() => {
          setServerId(server.id);
        }}
      >
        {/*<Image src={getCroppedImageUrl(game.background_image)} />*/}
        <CardBody borderRadius="lg">
          <VStack justifyContent="space-between" marginBottom={3}>
            <Image borderRadius="lg" src={server.banner} />
            <Text>{server.name}</Text>
          </VStack>
        </CardBody>
      </Card>
    </>
  );
};

export default RoomCard;
