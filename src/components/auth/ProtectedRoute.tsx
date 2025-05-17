
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserProfile } from "@/hooks/useUserProfile";

const ProtectedRoute = () => {
  const { user, loading } = useUserProfile();
  const location = useLocation();

  // While checking authentication status, show nothing
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, show the protected content
  return <Outlet />;
};

export default ProtectedRoute;
