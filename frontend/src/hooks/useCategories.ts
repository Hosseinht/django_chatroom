import APIClient from "../services/api-client.ts";
import ms from "ms";
import { useQuery } from "@tanstack/react-query";
export interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
}

const apiClient = new APIClient<Category[]>("/server/category");

const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: apiClient.getAll,
    staleTime: ms("24h"),
  });

export default useCategories;
