import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client.ts";
import { User } from "../entities/User.ts";
import { AxiosRequestConfig } from "axios";

const apiClient = new APIClient<User>("/user/");

const useUser = () => {
  const userId = localStorage.getItem("userId");
  const accessToken = localStorage.getItem("access_token");
  return useQuery({
    queryKey: ["user"],
    queryFn: () => {
      const config: AxiosRequestConfig = {
        params: {
          user_id: userId,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      return apiClient.getAll(config);
    },
  });
};

export default useUser;
