import { Navigate } from "react-router";
import { authenticateUser } from "../../helpers/authentication";

export const PublicRoute = ({ children }) => {

    const lcStrRole = authenticateUser();

    if (lcStrRole) {
        return <Navigate to='/dashboard' />
    }

    return children;
};
