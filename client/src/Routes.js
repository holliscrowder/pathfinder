import App from "./App";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import UpdatePassword from "./pages/UpdatePassword";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import Paths from "./pages/Paths";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/paths",
        element: <Paths />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/profile/update_password",
        element: <UpdatePassword />,
      },
    ],
  },
];
export default routes;
