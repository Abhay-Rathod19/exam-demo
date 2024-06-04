import { getFromLocalStorage } from "../utils/javaScript";
import { rmvFromLclStorage } from "../utils/javaScript";

export const authenticateUser = () => {
    const lcStrRole = JSON.parse(getFromLocalStorage("LogInUser"))?.role;
    return lcStrRole;
};


export const jwtFailRedirect = (navigate) => {
    rmvFromLclStorage('LogInUser');
    navigate('/');
};