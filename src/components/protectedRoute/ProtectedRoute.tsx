import React, { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks/react-redux/hook";
import { selectIsUserLoggedIn } from "../../store/auth/authSlice/authSlice";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isUserLoggedIn = useAppSelector(selectIsUserLoggedIn);

  if (!isUserLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
