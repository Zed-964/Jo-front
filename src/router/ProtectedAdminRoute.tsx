import { Navigate } from "react-router-dom";
import { ComponentType } from "react";
import useUserStatus from "../hooks/useUserStatus";

interface ProtectedRouteProps {
    element: ComponentType<any>;
    [key: string]: any;
}

const ProtectedRoute = ({ element: Component, ...rest }: ProtectedRouteProps) => {
    const { userStatus } = useUserStatus();
    const isAdmin = userStatus.isAdmin;

    return isAdmin ? <Component {...rest} /> : <Navigate to="/" />;
};

export default ProtectedRoute;