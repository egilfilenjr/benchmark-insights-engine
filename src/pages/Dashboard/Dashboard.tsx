
import { Navigate, Outlet, useLocation } from "react-router-dom";

// This "Dashboard" page simply acts as a redirect to the first available/connected dashboard, or a default intro page.
// For now we just default to GA overview for the demo. (Plug in real logic for connected integrations)
export default function Dashboard() {
  const location = useLocation();
  // TODO: Detect connected integrations dynamically and redirect accordingly
  return <Navigate to="/dashboard/googleanalytics/overview" state={{ from: location }} replace />;
}
