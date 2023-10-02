import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client.ts";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";

interface Token {
  refresh?: string;
}

const apiClient = new APIClient<Token>("/token/refresh/");

const useRefreshToken = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: apiClient.post,
    onError: (error) => {
      if (
        (error as AxiosError).response &&
        (error as AxiosError).response?.status === 401
      ) {
        // If the response status is 401 (Unauthorized), refresh the token
        localStorage.setItem("isLoggedIn", "false");
        navigate("/login");
      }
    },
  });
};

export default useRefreshToken;
