import { Navigate } from "react-router-dom";
import { useAuth } from "../Utils/context";

function PrivateRoute({ children }) {
  const auth = useAuth();
  return auth ? children : <Navigate to="/" />;
}

export default PrivateRoute;
