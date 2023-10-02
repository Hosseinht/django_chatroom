import useUser from "../hooks/useUser.ts";
import { Navigate } from "react-router-dom";
import Layout from "../pages/Layout.tsx";
import { Spinner } from "@chakra-ui/react";

const PrivateRoute = () => {
  const { data, isLoading } = useUser();
  if (isLoading) return <Spinner />;
  if (!data) return <Navigate to="/login" />;
  return <Layout />;
};

export default PrivateRoute;
