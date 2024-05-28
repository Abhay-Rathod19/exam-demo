import { useRoutes } from "react-router";
import { UserAction } from "../presentation/UserAction";
import { loginFormData } from "../constants/userModule/loginFmData";
import { signUpFormInput } from "../constants/userModule/signupFmData";
import { forgotPassData } from "../constants/userModule/forgotPsData";
import { newPassData } from "../constants/userModule/forgotPsData";
import { resetPassData } from "../constants/userModule/forgotPsData";
import { StudentDetails } from "../containers/StudentDetails";
import {
    onUserLogIn,
    onUserSignUp,
    onUserForgetPass,
    onUserNewPass,
    onUserResetPass,
} from "../helpers/userModules/userActions";
import { DashBoardComp } from "../presentation/DashBoard";
import { AllStudent } from "../presentation/AllStudent";
import { VerifiedStd } from "../presentation/VerifiedStd";
import { PrivateRoute } from "./private/PrivateRoute";
import { PublicRoute } from "./public/PublicRoute";
import { StudentsData } from "../presentation/StudentsData";

export const UserRoutes = () => {
    const userRoutes = useRoutes([
        {
            path: "/",
            element: (
                <PublicRoute> 
                <UserAction
                    actionType="Log in"
                    formData={loginFormData}
                    formName="LoginData"
                    onFormSubmit={onUserLogIn}
                />
                </PublicRoute> 
            ),
        },
        {
            path: "/signup",
            element: (
                <PublicRoute>
                    <UserAction
                        actionType="Sign up"
                        formData={signUpFormInput}
                        formName="SignupData"
                        onFormSubmit={onUserSignUp}
                    />
                </PublicRoute>
            ),
        },
        {
            path: "/forgetpassword",
            element: (
                <PublicRoute>
                    <UserAction
                        actionType="Forgot password"
                        formData={forgotPassData}
                        formName="ForgotPassData"
                        onFormSubmit={onUserForgetPass}
                    />
                </PublicRoute>
            ),
        },
        {
            path: "/newPassword",
            element: (
                <PublicRoute>
                    <UserAction
                        actionType="New password"
                        formData={newPassData}
                        formName="NewPassData"
                        onFormSubmit={onUserNewPass}
                    />
                </PublicRoute>
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
            element: (
                <PrivateRoute routeRole="teacher">
                    <DashBoardComp />
                </PrivateRoute>
            ),
            children: [
                {
                    path: "Teachers",
                    element: (
                        <PrivateRoute routeRole="teacher">
                            <AllStudent/>
                            {/* <StudentsData studentLabel='All Students Data' pathUrl='/dashboard/Teachers' /> */}
                        </PrivateRoute>
                    ),
                },
                {
                    path: "StudentForExam",
                    element: (
                        <PrivateRoute routeRole="teacher">
                        <VerifiedStd/>
                            {/* <StudentsData studentLabel='Verified Students Data' pathUrl='/dashboard/Teachers/StudentForExam' /> */}
                        </PrivateRoute>
                    ),
                },
                {
                    path: "StudentDetails/*",
                    element: (
                        <PrivateRoute routeRole="teacher">
                            <StudentDetails />
                        </PrivateRoute>
                    ),
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
