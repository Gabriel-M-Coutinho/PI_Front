import { Navigate } from "react-router-dom";
import { isLogged } from "../utils/auth";

export default function ProtectedRoute({ children }: any) {
  const logged = isLogged(); 

  if (!logged) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
