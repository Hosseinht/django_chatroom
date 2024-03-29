import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client.ts";
import { User } from "../entities/User.ts";
import { AxiosError, AxiosRequestConfig } from "axios";
import useRefreshToken from "./useRefreshToken.ts";
import useAuthQueryStore from "../stores/authStore.ts";
import { useNavigate } from "react-router";

const apiClient = new APIClient<User>("/user/");

const useUser = () => {
  const fetchIsLoggedIn = useAuthQueryStore((s) => s.authQuery.isLoggedIn);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const refreshTokenMutation = useRefreshToken();
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const config: AxiosRequestConfig = {
        params: {
          user_id: userId,
        },
      };
      try {
        return await apiClient.get(config);
      } catch (error) {
        if (!fetchIsLoggedIn) {
          navigate("/login");
        }
        if (
          (error as AxiosError).response &&
          (error as AxiosError).response?.status === 401
        ) {
          // If the response status is 401 (Unauthorized), refresh the token
          refreshTokenMutation.mutate({});

          return apiClient.get(config);
        }
        throw error; // Propagate the error further if it's not a 401 error
      }
    },
  });
};

export default useUser;
