import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

type UserRole = "admin" | "user";

interface ProtectedRouteProps {
    children: ReactNode;
    allowedRoles: UserRole[];
}


export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {

    const { user, isAuthenticated } = useAuth();
    
    if(!isAuthenticated){
        return <Navigate to="/login" replace/>;
    } 

    if(!user || !allowedRoles.includes(user.role)){
         return <Navigate to="/Unauthorized" replace/>;

    }

    return children;
}