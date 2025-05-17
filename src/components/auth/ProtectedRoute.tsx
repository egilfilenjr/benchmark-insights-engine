
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserProfile } from "@/hooks/useUserProfile";

const ProtectedRoute = () => {
  const { user, loading, testMode } = useUserProfile();
  const location = useLocation();

  // While checking authentication status, show loading
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

  // If test mode is enabled or user is authenticated, show the protected content
  if (testMode || user) {
    return <Outlet />;
  }

  // If not authenticated and not in test mode, redirect to login
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;
