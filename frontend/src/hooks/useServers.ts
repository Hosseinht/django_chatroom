import APIClient from "../services/api-client.ts";
import ms from "ms";
import { useQuery } from "@tanstack/react-query";

export interface Server {
  id: number;
  name: string;
  owner: string;
  category: string;
  description: string;
  room_server: [];
}

const apiClient = new APIClient<Server[]>("/server/select");

const useServers = () =>
  useQuery({
    queryKey: ["server"],
    queryFn: apiClient.getAllServers,
    staleTime: ms("24h"),
  });

export default useServers;
