import { Card, CardBody, HStack, Text } from "@chakra-ui/react";
import {Server} from "../entities/Server"


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
            <Text>{server.category}</Text>
          </HStack>
        </CardBody>
      </Card>
    </>
  );
};

export default RoomCard;
