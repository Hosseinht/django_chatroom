import APIClient from "../services/api-client.ts";

import { Auth } from "../entities/Auth.ts";
import { useMutation } from "@tanstack/react-query";

const apiClient = new APIClient<Auth>("/token/");

const useAuth = () => {
  return useMutation<Auth, Error, Auth>({
    // Auth(TData): data that we get from the backend. Error(TError): error object.
    // Auth(TVariable): The data that we send to the backend
    mutationFn: (user: Auth) => apiClient.post(user),
    onSuccess: (savedUser) => {
      const access = savedUser?.access ?? "";
      const refresh = savedUser?.refresh ?? "";

      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      const getUserIdFromToken = (access: string) => {
        const tokenParts = access.split(".");
        const encodedPayload = tokenParts[1];
        const decodedPayload = atob(encodedPayload);
        const payloadData = JSON.parse(decodedPayload);
        const userIds = payloadData.user_id;
        return userIds;
      };
      console.log(getUserIdFromToken(access));

      localStorage.setItem("userId", getUserIdFromToken(access));
    },
  });
};

export default useAuth;
