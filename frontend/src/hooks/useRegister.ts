import APIClient from "../services/api-client.ts";
import { Auth } from "../entities/Auth.ts";
import { useMutation } from "@tanstack/react-query";

const apiClient = new APIClient<Auth>("/user/register/");

const useRegister = () => {
  return useMutation<Auth, Error, Auth>({
    mutationFn: (user: Auth) => apiClient.post(user),
  });
};
export default useRegister;
