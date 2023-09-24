import { useNavigate } from "react-router";
import { useFormik } from "formik";
import {
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

const Login = () => {
  const navigate = useNavigate();
  const loginUser = useAuth();
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
    onSubmit: async (values) => {
      const { username, password } = values;

      try {
        const response = await loginUser.mutateAsync({
          username: username,
          password: password,
        });

        // Handle successful login here, e.g., store tokens and navigate to a new page
        console.log("Login successful:", response);
        navigate("/"); // Navigate to the desired page
      } catch (error) {
        // Handle login error here, e.g., display an error message
        console.error("Login error:", error);

        if (error.response?.status === 401) {
          formik.setErrors({
            username: "Invalid username or password",
            password: "Invalid username or password",
          });
        }
      }
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
