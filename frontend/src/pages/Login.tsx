import { useNavigate } from "react-router";
import { useFormik } from "formik";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth.ts";
import { AxiosError } from "axios";

const Login = () => {
  const navigate = useNavigate();
  const login = useAuth();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: (values) => {
      const errors: Partial<typeof values> = {};
      if (!values.username) {
        errors.username = "Username is required";
      }
      if (!values.password) {
        errors.password = "Username is required";
      }
      return errors;
    },
    onSubmit: (values) => {
      const { username, password } = values;

      login.mutate({
        username: username,
        password: password,
      });

      navigate("/");
    },
  });

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          {login.error && (
            <div>
              <Alert status="error">
                {(login.error as AxiosError<any>).response?.data.detail}
              </Alert>
            </div>
          )}
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={4}>
              <FormControl
                id="username"
                isInvalid={
                  !!formik.touched.username && !!formik.errors.username
                }
              >
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                />
                <FormErrorMessage>
                  {formik.touched.username && formik.errors.username}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                id="password"
                isInvalid={
                  !!formik.touched.password && !!formik.errors.password
                }
              >
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                <FormErrorMessage>
                  {formik.touched.password && formik.errors.password}
                </FormErrorMessage>
              </FormControl>

              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Text color={"blue.400"}>Forgot password?</Text>
                </Stack>
                <Button type="submit">Sign in</Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
