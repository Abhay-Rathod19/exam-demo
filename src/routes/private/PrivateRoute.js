import { Navigate } from "react-router";
import { authenticateUser } from "../../helpers/authentication";
import { DashBoardComp } from "../../presentation/DashBoard";

const userRouteRole = {
  teacher: 1,
  student: 1,
};

export const PrivateRoute = ({ routeRole }) => {
  const lcStrRole = authenticateUser();

  if (!routeRole) {
    return <Navigate to="/" />;
  }
  if (userRouteRole[lcStrRole]) {
    return <DashBoardComp role={lcStrRole} />;
  }

  return <Navigate to="/" />;
};
