import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client.ts";

interface Token {
  refresh?: string;
  access?: string;
}

const apiClient = new APIClient<Token>("/token/refresh/");

const useRefreshToken = () => {
  return useMutation<Token, Error, Token>({
    mutationFn: (refreshToken: Token) => apiClient.post(refreshToken),

    // Handle successful refresh
    onSuccess: (savedToken) => {
      const access = savedToken?.access ?? "";
      localStorage.setItem("access_token", access); // Update the access token in local storage
    },
  });
};

export default useRefreshToken;
