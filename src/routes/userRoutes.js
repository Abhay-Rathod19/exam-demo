import { useRoutes } from "react-router";
import { UserAction } from "../presentation/UserAction";
import { loginFormData } from "../constants/userModule/loginFmData";
import { signUpFormInput } from "../constants/userModule/signupFmData";
import { forgotPassData } from "../constants/userModule/forgotPsData";
import { newPassData } from "../constants/userModule/forgotPsData";
import { resetPassData } from "../constants/userModule/forgotPsData";



export const UserRoutes = () => {
    const userRoutes = useRoutes([
        {
            path: "/",
            element: <UserAction actionType="Log in" formData={loginFormData} formName="LoginData" />,
        },
        {
            path: "/signup",
            element: <UserAction actionType="Sign up" formData={signUpFormInput} formName="SignupData" />,
        },
        {
            path: "/forgetpassword",
            element: <UserAction actionType="Forgot password" formData={forgotPassData} formName="ForgotPassData" />,
        },
        {
            path: "/newpassword",
            element: <UserAction actionType="New password" formData={newPassData} formName="NewPassData" />
        },
        {
            path: "/resetpassword",
            element: <UserAction actionType="Reset password" formData={resetPassData} formName="ResetPassData" />
        },
        {
            path: "*",
            element: <p>No match found...</p>
        }
    ]);

    return userRoutes;
}