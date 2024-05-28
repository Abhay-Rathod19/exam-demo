import { getFromLocalStorage } from "../utils/javaScript";

export const authenticateUser = () => {
    const lcStrRole = JSON.parse(getFromLocalStorage("LogInUser")).role;
    return lcStrRole;
};
