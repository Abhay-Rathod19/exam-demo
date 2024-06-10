import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { ExmTableComponent } from "../shared/ExmTableComp";
import { ExmTypography } from "../shared/ExmTypography";
import { ExmSpinnerCom } from "../shared/ExmSpinnerCom";
import { STUDENT_DETAILS_API } from "../constants/userModule/apiConstants";
import { getAllStdData } from "../helpers/teacherModule/teacherActions";
import { useNavigate } from "react-router";

export const AllStudent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state?.api?.loading);

  useEffect(() => {
    getAllStdData(navigate);
  }, [dispatch]);

  const allStudentData = useSelector(
    (state) => state?.teacher?.studentData?.allStudent
  );

  return (
    <Box sx={{ textAlign: "center" }}>
      <ExmTypography sx={{ m: "20px", fontSize: "24px" }}>
        All Students Data
      </ExmTypography>
      {loading ? (
        <ExmSpinnerCom />
      ) : allStudentData ? (
        <>
          <Box
            className="allstud-data-container"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <ExmTableComponent
              objectArray={allStudentData}
              urlPath={STUDENT_DETAILS_API}
            />
          </Box>
        </>
      ) : (
        ""
      )}
    </Box>
  );
};
