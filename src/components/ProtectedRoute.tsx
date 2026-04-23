import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth, Role } from "@/contexts/AuthContext";

export const ProtectedRoute = ({
  children,
  role,
}: {
  children: ReactNode;
  role?: Role;
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-sm text-muted-foreground">Lade…</div>
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  if (role && user.role !== role) {
    const target =
      user.role === "admin"
        ? "/admin"
        : user.role === "stylist"
          ? "/dashboard/stylist"
          : "/dashboard";
    return <Navigate to={target} replace />;
  }
  return <>{children}</>;
};
