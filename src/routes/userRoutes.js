import { Outlet, useRoutes } from "react-router";
import { UserAction } from "../presentation/UserAction";
import { loginFormData } from "../constants/userModule/loginFmData";
import { signUpFormInput } from "../constants/userModule/signupFmData";
import { forgotPassData } from "../constants/userModule/forgotPsData";
import { newPassData } from "../constants/userModule/forgotPsData";
import { resetPassData } from "../constants/userModule/forgotPsData";
import { TeacherDashBoard } from "../presentation/TeacherDashBoard";
import {
    onUserLogIn,
    onUserSignUp,
    onUserForgetPass,
    onUserNewPass,
    onUserResetPass,
} from "../helpers/userModules/userActions";
import { DashBoardComp } from "../containers/DashBoard";

export const UserRoutes = () => {
    const userRoutes = useRoutes([
        {
            path: "/",
            element: (
                <UserAction
                    actionType="Log in"
                    formData={loginFormData}
                    formName="LoginData"
                    onFormSubmit={onUserLogIn}
                />
            ),
        },
        {
            path: "/signup",
            element: (
                <UserAction
                    actionType="Sign up"
                    formData={signUpFormInput}
                    formName="SignupData"
                    onFormSubmit={onUserSignUp}
                />
            ),
        },
        {
            path: "/forgetpassword",
            element: (
                <UserAction
                    actionType="Forgot password"
                    formData={forgotPassData}
                    formName="ForgotPassData"
                    onFormSubmit={onUserForgetPass}
                />
            ),
        },
        {
            path: "/newPassword",
            element: (
                <UserAction
                    actionType="New password"
                    formData={newPassData}
                    formName="NewPassData"
                    onFormSubmit={onUserNewPass}
                />
            ),
        },
        {
            path: "/resetpassword",
            element: (
                <UserAction
                    actionType="Reset password"
                    formData={resetPassData}
                    formName="ResetPassData"
                    onFormSubmit={onUserResetPass}
                />
            ),
        },
        {
            path: "/dashboard",
            element: <DashBoardComp />,
            children: [
                {
                    index: true,
                    path: "Teachers",
                    element: <TeacherDashBoard />,
                },
            ],
        },
        {
            path: "*",
            element: <p>No match found for this path...</p>,
        },
    ]);

    return userRoutes;
};
