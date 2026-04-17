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
  ProfilePhotoUpdate,
  ErrorPage,
} from "../pages/pages.js";
import ProtectedRoutes from "./ProtectedRoutes.jsx";
import CallPage from "../components/CallPage.jsx";

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
      // {
      //   path: "/calls",
      //   element: (
      //     <ProtectedRoutes>
      //       <Calls />
      //     </ProtectedRoutes>
      //   ),
      // },
      {
        path: "/settings",
        element: (
          <ProtectedRoutes>
            <Settings />
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

      {
        path: "/call/:id",
        element: (
          <ProtectedRoutes>
            <CallPage />
          </ProtectedRoutes>
        ),
      },

      {
        path: "settings/profile",
        element: (
          <ProtectedRoutes>
            <UpdateProfile />
          </ProtectedRoutes>
        ),
      },

      {
        path: "/settings/profile-photo",
        element: (
          <ProtectedRoutes>
            <ProfilePhotoUpdate />
          </ProtectedRoutes>
        ),
      },

      {
        path: "/*",
        element: <ErrorPage />,
      },
    ],
  },
]);

export default router;
