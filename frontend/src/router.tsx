import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Layout from "./pages/Layout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ index: true, element: <Home /> }],
  },
]);

export default router;
