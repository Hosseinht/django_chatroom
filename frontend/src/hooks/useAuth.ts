import APIClient from "../services/api-client.ts";

import { Auth } from "../entities/Auth.ts";
import { useMutation } from "@tanstack/react-query";

const apiClient = new APIClient<Auth>("/token/");

const useAuth = () => {
  return useMutation<Auth, Error, Auth>({
    mutationFn: (user: Auth) => apiClient.post(user),
    // onSuccess: (savedUser, newUser) => {
    //   console.log(newUser);
    // },
  });
};

export default useAuth;
