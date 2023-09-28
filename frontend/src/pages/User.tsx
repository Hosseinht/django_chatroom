import { Button, Spinner } from "@chakra-ui/react";
import useUser from "../hooks/useUser.ts";
import { useNavigate, Navigate } from "react-router";
import useAuthQueryStore from "../stores/authStore.ts";

const User = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useUser();

  const fetchIsLoggedIn = useAuthQueryStore((s) => s.authQuery.isLoggedIn);
  console.log(fetchIsLoggedIn);

  if (!fetchIsLoggedIn) return <Navigate to="/login" />;

  if (isLoading) return <Spinner />;
  if (error) return "Error";
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
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
