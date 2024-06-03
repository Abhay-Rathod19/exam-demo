import { useRoutes } from "react-router";
import { UserAction } from "../presentation/UserAction";
import { StudentDetails } from "../containers/StudentDetails";
import { ProfileEdit } from "../containers/ProfileEdit";
import { GiveExamComp } from "../containers/GiveExamComp";
import { AllExamComp } from "../containers/AllExamComp";
import { StudentProfile } from "../containers/StudentProfile";
import { AllStudent } from "../presentation/AllStudent";
import { VerifiedStd } from "../presentation/VerifiedStd";
import { PrivateRoute } from "./private/PrivateRoute";
import { PublicRoute } from "./public/PublicRoute";
import { ExmCrtMain } from "../containers/ExmCrtMain";
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
      children: [
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
      ],
    },
    {
      path: "*",
      element: <p>No match found for this path...</p>,
    },
  ]);

  return userRoutes;
};
