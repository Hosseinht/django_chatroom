import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client.ts";
import { User } from "../entities/User.ts";

const apiClient = new APIClient<User>("/user/?user_id=1");

const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: apiClient.get,
  });
};

export default useUser;
