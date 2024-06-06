import { Outlet } from "react-router";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { ExmButton } from "../shared/ExmButton";
import { ExmTypography } from "../shared/ExmTypography";
import { teachSideBarOpts } from "../description/teacher.description";
import { STUDENT, studSideBarOpts } from "../description/student.description";
import { Navbar } from "../components/Navbar";
import { areEqual, ternary } from "../utils/javaScript";

export const DashBoardComp = ({ role }) => {
  const sideBarList = ternary(
    areEqual(role, STUDENT),
    studSideBarOpts,
    teachSideBarOpts
  );

  return (
    <Box
      sx={{ width: 1, display: "flex", height: "100%" }}
      className="dashboard-main-container"
    >
      <Box className="dashboard-sidebar" sx={{ width: 1 / 5 }}>
        <ExmTypography
          variant="h4"
          sx={{ textAlign: "left", p: "15px 0 15px 10px ", borderBottom: 2 }}
        >
          Dashboard
        </ExmTypography>

        {sideBarList?.map((element, index) => {
          return (
            <Link to={element?.link} key={`btn-${index}`}>
              <ExmButton
                variant="text"
                sx={{
                  p: "15px 10px",
                  width: 1,
                  display: "block",
                  my: "1px",
                  textAlign: "left",
                  fontSize: "15px",
                  borderBottom: 1,
                  borderRadius: 0,
                }}
              >
                {element?.label}
              </ExmButton>
            </Link>
          );
        })}
      </Box>
      <Box className="dashboard-content-container">
        <Navbar />
        <Outlet />
      </Box>
    </Box>
  );
};
