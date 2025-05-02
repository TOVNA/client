import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Navbar from "../Navbar";

const ProtectedRoute = () => {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" />;
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
