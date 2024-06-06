import { Navigate } from "react-router";
import { authenticateUser } from "../../helpers/authentication";

export const ProtectedRoute = ({ children }) => {
    const lcStrRole = authenticateUser();

    if (lcStrRole) {
        return children;
    }

    return <Navigate to="/" />;
};
