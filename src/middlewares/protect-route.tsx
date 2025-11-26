import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { getProfile } from "../api/api";

interface ProtectedRouteProps {
  children: any;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get("token");
      if (!token) {
        setIsLogged(false);
        setIsLoading(false);
        return;
      }

      try {
        await getProfile(); // tenta buscar o perfil
        setIsLogged(true);
      } catch (err) {
        console.error(err);
        Cookies.remove("token");
        setIsLogged(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) return <div>Carregando...</div>; // enquanto checa autenticação

  if (!isLogged) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
