import { useSelector } from "react-redux";
import { authenticateUser } from "../../helpers/authentication";
import { Navigate } from "react-router";

export const PrivateRoute = ({ children, routeRole }) => {

    const userRole = useSelector((state) => state.exm.loggedUser.role);
    const lcStrRole = authenticateUser();

    if (userRole === routeRole || lcStrRole === routeRole) {
        console.log("Protected");
        return children;
    }
    return <Navigate to='/' />
};

