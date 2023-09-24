import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import Layout from "./pages/Layout.tsx";
import Login from "./pages/Login.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <Login /> },
    ],
  },
]);

export default router;
