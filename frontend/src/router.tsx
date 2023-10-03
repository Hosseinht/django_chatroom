import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import Layout from "./pages/Layout.tsx";
import Login from "./pages/Login.tsx";
import User from "./pages/User.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import Signup from "./pages/Signup.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "user", element: <User /> },
    ],
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
    ],
  },
]);

export default router;
