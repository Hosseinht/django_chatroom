import { Card, CardBody, HStack, Text } from "@chakra-ui/react";
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
        <CardBody>
          <HStack justifyContent="space-between" marginBottom={3}>
            <Text>{server.id}</Text>
            <Text>{server.name}</Text>
          </HStack>
        </CardBody>
      </Card>
    </>
  );
};

export default RoomCard;
