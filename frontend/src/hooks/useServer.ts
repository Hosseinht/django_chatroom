import { Server } from "../entities/Server.ts";
import APIClient from "../services/api-client.ts";
import { useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";

const apiClient = new APIClient<Server>("/server/select");
const useServer = (id: number) =>
  useQuery({
    queryKey: ["server_rooms", id],
    queryFn: () => {
      const config: AxiosRequestConfig = {
        params: {
          by_serverid: id || "",
        },
      };
      return apiClient.getAll(config);
    }, // Use id in the API URL
  });

export default useServer;
