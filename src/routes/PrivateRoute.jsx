import { useContext } from "react";
import { AuthContext } from "../AuthProvider";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const authContext = useContext(AuthContext);
  const { user, isLoading } = authContext;

  if (user) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
