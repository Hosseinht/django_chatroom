import APIClient from "../services/api-client.ts";

import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const apiClient = new APIClient("/user/logout/");

const useAuth = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => apiClient.post({}),
    onSuccess: () => {
      localStorage.setItem("isLoggedIn", "false");
      navigate("/login");
    },
  });
};

export default useAuth;
