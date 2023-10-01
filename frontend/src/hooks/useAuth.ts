import APIClient from "../services/api-client.ts";

import { Auth } from "../entities/Auth.ts";
import { useMutation } from "@tanstack/react-query";

const apiClient = new APIClient<Auth>("/token/");

const useAuth = () => {
  return useMutation<Auth, Error, Auth>({
    // Auth(TData): data that we get from the backend. Error(TError): error object.
    // Auth(TVariable): The data that we send to the backend
    mutationFn: (user: Auth) => apiClient.post(user),
  });
};

export default useAuth;
