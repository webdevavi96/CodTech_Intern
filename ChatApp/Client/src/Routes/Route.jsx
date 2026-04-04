import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/components";
import { Landing, Login, Register, OTPVerify, Contact, About, Home, Calls, Settings, UpdateProfile, ManageProfile } from "../pages/pages.js";



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

            { path: "/chats", element: <Home /> },
            { path: "/calls", element: <Calls /> },
            { path: "/settings", element: <Settings /> },
            { path: "/update_profile", element: <UpdateProfile /> },
            { path: "/manage_profile", element: <ManageProfile /> },
        ]
    }
]);


export default router;