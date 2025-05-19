
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold text-navy-900 mb-4">404</h1>
          <p className="text-xl text-navy-600 mb-8">
            Oops! The page you're looking for doesn't exist.
          </p>
          <Link to="/">
            <Button className="bg-lilac hover:bg-lilac-700 text-white">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFound;
