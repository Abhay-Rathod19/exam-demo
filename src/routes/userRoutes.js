import { useRoutes } from "react-router";
import { UserAction } from "../presentation/UserAction";
import { StudentDetails } from "../containers/teacher/StudentDetails";
import { ProfileEdit } from "../containers/student/ProfileEdit";
import { GiveExamComp } from "../containers/student/GiveExamComp";
import { AllExamComp } from "../containers/student/AllExamComp";
import { StudentProfile } from "../containers/student/StudentProfile";
import { AllStudent } from "../presentation/AllStudent";
import { VerifiedStd } from "../presentation/VerifiedStd";
import { PrivateRoute } from "./private/PrivateRoute";
import { PublicRoute } from "./public/PublicRoute";
import { ExmCrtMain } from "../containers/teacher/ExmCrtMain";
import { ViewExam } from "../containers/teacher/ViewAllExam";
import { ExamDetails } from "../containers/teacher/ExamDetails";
import { ProtectedRoute } from "./private/Protected";
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
        <PublicRoute>
          <UserAction {...userLoginProps} />
        </PublicRoute>
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
      path: "/dashboard",
      children: [
        {
          index: true,
          element: <PrivateRoute />,
        },
        {
          path: "Teacher",
          element: <PrivateRoute routeRole="teacher" />,
          children: [
            {
              path: "AllStudents",
              element: <AllStudent />,
            },
            {
              path: "StudentForExam",
              element: <VerifiedStd />,
            },
            {
              path: "StudentDetails/*",
              element: <StudentDetails />,
            },
            {
              path: "createExam",
              element: <ExmCrtMain />,
            },
            {
              path: "viewExam",
              element: <ViewExam />,
            },
            {
              path: "examDetail/*",
              element: <ExamDetails />,
            },
          ],
        },
        {
          path: "student",
          element: <PrivateRoute routeRole="student" />,
          children: [
            {
              path: "allExam",
              element: <AllExamComp />,
            },
            {
              path: "examPaper/*",
              element: <GiveExamComp />,
            },
            {
              path: "myProfile",
              element: <StudentProfile />,
            },
            {
              path: "editProfile",
              element: <ProfileEdit />,
            },
          ],
        },
        {
          path: "resetpassword",
          element: (
            <ProtectedRoute>
              <UserAction {...userRstPsProps} />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "*",
      element: <h4>No match found for this path...</h4>,
    },
  ]);

  return userRoutes;
};
