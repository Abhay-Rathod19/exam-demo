import { Navigate } from "react-router";
import { authenticateUser } from "../../helpers/authentication";
import { DashBoardComp } from "../../presentation/DashBoard";
import { areEqual } from "../../utils/javaScript";

export const PrivateRoute = ({ routeRole }) => {
  const lcStrRole = authenticateUser();

  if (!routeRole) {
    return <Navigate to="/" />;
  }
  if (routeRole && areEqual(routeRole, lcStrRole)) {
    return <DashBoardComp role={lcStrRole} />;
  }

  return <Navigate to="/" />;
};
