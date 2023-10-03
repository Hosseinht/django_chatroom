import { Button } from "@chakra-ui/react";
import useUser from "../hooks/useUser.ts";
import { AxiosError } from "axios";
import useLogout from "../hooks/useLogout.ts";

const User = () => {
  const { data, error } = useUser();
  const logout = useLogout();

  if (error) return (error as AxiosError).message;
  const handleLogout = () => {
    logout.mutate();
  };

  return (
    <div>
      {data?.username}
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default User;
