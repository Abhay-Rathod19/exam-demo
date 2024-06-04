import { useSelector } from "react-redux";
import { authenticateUser } from "../../helpers/authentication";
import { Navigate } from "react-router";
import { DashBoardComp } from "../../presentation/DashBoard";

export const PrivateRoute = ({ routeRole }) => {
  const userRole = useSelector((state) => state.exm.loggedUser.role);
  const lcStrRole = authenticateUser();

  if (userRole === routeRole || lcStrRole === routeRole) {
    return <DashBoardComp role={routeRole} />
  }
  return <Navigate to="/" />;
};
