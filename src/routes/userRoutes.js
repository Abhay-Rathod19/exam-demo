import { useRoutes } from "react-router";
import { UserAction } from "../presentation/UserAction";
import { StudentDetails } from "../containers/StudentDetails";
// import { loginFormData } from "../constants/userModule/loginFmData";
// import { signUpFormInput } from "../constants/userModule/signupFmData";
// import { forgotPassData } from "../constants/userModule/forgotPsData";
// import { newPassData } from "../constants/userModule/forgotPsData";
// import { resetPassData } from "../constants/userModule/forgotPsData";
// import {
//     onUserLogIn,
//     onUserSignUp,
//     onUserForgetPass,
//     onUserNewPass,
//     onUserResetPass,
// } from "../helpers/userModules/userActions";
import { DashBoardComp } from "../presentation/DashBoard";
import { AllStudent } from "../presentation/AllStudent";
import { VerifiedStd } from "../presentation/VerifiedStd";
import { PrivateRoute } from "./private/PrivateRoute";
import { PublicRoute } from "./public/PublicRoute";
// --------------------------
import { userFgtPsProps, userLoginProps, userNewPsProps, userRstPsProps, userSignUpProps } from "../constants/userModule/routesProps";
import { CreateExam } from "../containers/CreateExam";
import { ViewExam } from "../containers/ViewExam";

export const UserRoutes = () => {
    const userRoutes = useRoutes([
        {
            path: "/",
            element: (
                // <PublicRoute>  
                <UserAction {...userLoginProps} />
                // </PublicRoute> 
            ),
        },
        {
            path: "/signup",
            element: (
                <PublicRoute>
                    <UserAction {...userSignUpProps} />
                </PublicRoute>
            ),
        },
        {
            path: "/forgetpassword",
            element: (
                <PublicRoute>
                    <UserAction {...userFgtPsProps} />
                </PublicRoute>
            ),
        },
        {
            path: "/newPassword",
            element: (
                <PublicRoute>
                    <UserAction {...userNewPsProps} />
                </PublicRoute>
            ),
        },
        {
            path: "/resetpassword",
            element: (
                <UserAction {...userRstPsProps} />
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
                            <AllStudent />
                        </PrivateRoute>
                    ),
                },
                {
                    path: "StudentForExam",
                    element: (
                        <PrivateRoute routeRole="teacher">
                            <VerifiedStd />
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
                {
                    path: "createExam",
                    element: (
                        <PrivateRoute routeRole="teacher">
                            <CreateExam />
                        </PrivateRoute>
                    ),
                },
                {
                    path: "viewExam",
                    element: (
                        <PrivateRoute routeRole="teacher">
                            <ViewExam />
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
