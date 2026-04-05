import { createBrowserRouter } from "react-router-dom";
import { Chat, Layout } from "../components/components";
import {
  Landing,
  Login,
  Register,
  OTPVerify,
  Contact,
  About,
  Home,
  Calls,
  Settings,
  UpdateProfile,
  ManageProfile,
} from "../pages/pages.js";
import ProtectedRoutes from "./ProtectedRoutes.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Landing /> },

      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/verify_otp", element: <OTPVerify /> },

      { path: "/contact", element: <Contact /> },
      { path: "/about", element: <About /> },

      {
        path: "/home",
        element: (
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/calls",
        element: (
          <ProtectedRoutes>
            <Calls />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/settings",
        element: (
          <ProtectedRoutes>
            <Settings />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/update_profile",
        element: (
          <ProtectedRoutes>
            <UpdateProfile />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/manage_profile",
        element: (
          <ProtectedRoutes>
            <ManageProfile />
          </ProtectedRoutes>
        ),
      },

      {
        path: "/chat/:id",
        element: (
          <ProtectedRoutes>
            <Chat />
          </ProtectedRoutes>
        ),
      },
    ],
  },
]);

export default router;
