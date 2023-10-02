import { Button, Spinner } from "@chakra-ui/react";
import useUser from "../hooks/useUser.ts";
import { Navigate, useNavigate } from "react-router";
import useAuthQueryStore from "../stores/authStore.ts";
import { AxiosError } from "axios";

const User = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useUser();
  const fetchIsLoggedIn = useAuthQueryStore((s) => s.authQuery.isLoggedIn);

  if (!fetchIsLoggedIn) return <Navigate to="/login" />;

  if (isLoading) return <Spinner />;

  if (error) return (error as AxiosError).message;
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.setItem("isLoggedIn", "false");
    navigate("/");
  };

  return (
    <div>
      {data?.username}
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default User;
