import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import Layout from "./pages/Layout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      // { path: "server/category/:categoryName", element: <RoomGrid /> },
    ],
  },
]);

export default router;
