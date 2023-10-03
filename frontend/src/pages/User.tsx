import { Button } from "@chakra-ui/react";
import useUser from "../hooks/useUser.ts";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";

const User = () => {
  const navigate = useNavigate();
  const { data, error } = useUser();

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
