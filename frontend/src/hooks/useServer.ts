import { Server } from "../entities/Server.ts";
import APIClient from "../services/api-client.ts";
import { useQuery } from "@tanstack/react-query";

const apiClient = new APIClient<Server>("/server/select");
const useServer = (id: number) =>
  useQuery({
    queryKey: ["server_rooms", id],
    queryFn: () => apiClient.get(id), // Use id in the API URL
  });

export default useServer;
