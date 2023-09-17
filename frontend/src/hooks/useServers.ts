import APIClient from "../services/api-client.ts";
import ms from "ms";
import { useQuery } from "@tanstack/react-query";
import { ServerQuery } from "../pages/HomePage.tsx";
import { AxiosRequestConfig } from "axios";
import { Server } from "../entities/Server";

const apiClient = new APIClient<Server[]>("/server/select");

const useServers = (serverQuery: ServerQuery) =>
  useQuery({
    queryKey: ["servers", serverQuery],
    queryFn: () => {
      const config: AxiosRequestConfig = {
        params: {
          category: serverQuery?.category || "",
          by_serverid: serverQuery?.serverId || "",
        },
      };
      return apiClient.getAll(config);
    },
    //  if serverQuery.category is defined, it will be passed in the request, and if it's empty or undefined,
    //  the endpoint will be "/server/select".
    staleTime: ms("24h"),
  });

export default useServers;
