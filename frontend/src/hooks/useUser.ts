import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client.ts";
import { User } from "../entities/User.ts";
import { AxiosError, AxiosRequestConfig } from "axios";
import useRefreshToken from "./useRefreshToken.ts";

const apiClient = new APIClient<User>("/user/");

const useUser = () => {
  const userId = localStorage.getItem("userId");
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const { mutate: refreshTokenMutation } = useRefreshToken(); // Get the refreshToken mutation function

  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const config: AxiosRequestConfig = {
        params: {
          user_id: userId,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      try {
        return await apiClient.getAll(config);
      } catch (error) {
        if (
          (error as AxiosError).response &&
          (error as AxiosError).response?.status === 401 &&
          refreshToken !== null
        ) {
          // If the response status is 401 (Unauthorized), refresh the token
          refreshTokenMutation({ refresh: refreshToken });

          // Retry the query after the token is refreshed
          const accessToken = localStorage.getItem("access_token");
          config.headers = {
            ...(config.headers || {}),
            Authorization: `Bearer ${accessToken}`,
          };
          return apiClient.getAll(config);
        }
        throw error; // Propagate the error further if it's not a 401 error
      }
    },
  });
};

export default useUser;
