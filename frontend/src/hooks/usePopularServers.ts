import APIClient from "../services/api-client.ts";
import ms from "ms";
import { useQuery } from "@tanstack/react-query";
import { Server } from "./useServers.ts";

const apiClient = new APIClient<Server[]>("/server/select");

const usePopularServers = () =>
  useQuery({
    queryKey: ["popularServers"],
    queryFn: apiClient.getAll,
    staleTime: ms("24h"),
  });

export default usePopularServers;
