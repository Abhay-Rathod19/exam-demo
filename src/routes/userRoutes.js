import { useRoutes } from "react-router";
import { UserAction } from "../presentation/UserAction";
import { StudentDetails } from "../containers/StudentDetails";
import { DashBoardComp } from "../presentation/DashBoard";
import { AllStudent } from "../presentation/AllStudent";
import { VerifiedStd } from "../presentation/VerifiedStd";
import { PrivateRoute } from "./private/PrivateRoute";
import { PublicRoute } from "./public/PublicRoute";
import { CreateExam } from "../containers/CreateExam";
import { ViewExam } from "../containers/ViewExam";
import { ExamDetails } from "../containers/ExamDetails";
import {
    userFgtPsProps,
    userLoginProps,
    userNewPsProps,
    userRstPsProps,
    userSignUpProps,
} from "../constants/userModule/routesProps";

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
            element: <UserAction {...userRstPsProps} />,
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
                {
                    path: "teachers/examDetail/*",
                    element: (
                        <PrivateRoute routeRole="teacher">
                            <ExamDetails />
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