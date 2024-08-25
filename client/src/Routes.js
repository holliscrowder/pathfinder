import App from "./App";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";

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
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
];
export default routes;
