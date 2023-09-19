import APIClient from "../services/api-client.ts";
import { useQuery } from "@tanstack/react-query";
import { MessageType } from "../entities/MessageType.ts";
import { AxiosRequestConfig } from "axios";
import ms from "ms";

const apiClient = new APIClient<MessageType[]>("/messages");
const useRoomMessages = (roomId: number) =>
  useQuery({
    queryKey: ["serverRooms", roomId],
    queryFn: () => {
      const config: AxiosRequestConfig = {
        params: {
          room_id: roomId,
        },
      };
      return apiClient.getAll(config);
    },
    staleTime: ms("24h"),
  });

export default useRoomMessages;
