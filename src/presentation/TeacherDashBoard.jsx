import { Outlet } from "react-router";
import { ExmTypography } from "../shared/ExmTypography";


export const TeacherDashBoard = () => {
    return (
        <div>
            <ExmTypography sx={{ fontSize: "24px" }}>
                Welcome to your dashboard teacher.
            </ExmTypography>
            <Outlet />
        </div>
    )
};
