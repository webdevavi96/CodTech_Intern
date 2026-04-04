import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { useContext } from "react";
import { MdFrontLoader } from "react-icons/md";

export default function ProtectedRoutes({ children }) {
    const { isAuthenticated, loading } = useContext(AuthContext);

    if (loading) return <MdFrontLoader />;

    if (!isAuthenticated)
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: window.location.pathname }}
            />
        );

    return children;
}