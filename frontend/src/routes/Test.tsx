import { Navigate, Outlet } from "react-router-dom";
import Home from "../components/Home";

const PrivateRoute = () => {
  const accessToken = localStorage.getItem("accessToken");

  return accessToken ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoute;
