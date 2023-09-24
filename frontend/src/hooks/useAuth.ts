import APIClient from "../services/api-client.ts";

import { Auth } from "../entities/Auth.ts";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const apiClient = new APIClient<Auth>("/token/");

const useAuth = () => {
  return useMutation({
    mutationFn: (user: Auth) => apiClient.post(user),
    // ... other configuration options
  });
};

export default useAuth;
