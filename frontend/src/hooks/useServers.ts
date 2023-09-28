import APIClient from "../services/api-client.ts";
import ms from "ms";
import { useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { Server } from "../entities/Server";
import useServerQueryStore from "../stores/serverStore.ts";

const apiClient = new APIClient<Server[]>("/server/select");

const useServers = () => {
  const serverQuery = useServerQueryStore((s) => s.serverQuery);
  return useQuery({
    queryKey: ["servers", serverQuery],
    queryFn: () => {
      const config: AxiosRequestConfig = {
        params: {
          category: serverQuery?.categoryName || "",
          by_serverid: serverQuery?.serverId || "",
        },
      };
      return apiClient.getAll(config);
    },
    //  if serverQuery.category is defined, it will be passed in the request, and if it's empty or undefined,
    //  the endpoint will be "/server/select".
    staleTime: ms("24h"),
  });
};

export default useServers;
