import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { getVerifiedStdData } from "../helpers/teacherModule/teacherActions";
import { ExmTableComponent } from "../shared/ExmTableComp";
import { ExmTypography } from "../shared/ExmTypography";
import { ExmSpinnerCom } from "../shared/ExmSpinnerCom";
import { STUDENT_DETAILS_API } from "../constants/userModule/apiConstants";

export const VerifiedStd = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.api.loading);
  useEffect(() => {
    getVerifiedStdData();
  }, [dispatch]);

  const verifiedStudentData = useSelector(
    (state) => state?.teacher?.studentData.verifiedStd
  );

  return (
    <Box sx={{ textAlign: "center" }}>
      <ExmTypography>Verified Students Data</ExmTypography>

      {loading ? (
        <ExmSpinnerCom />
      ) : verifiedStudentData ? (
        <>
          <Box
            className="allstud-data-container"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <ExmTableComponent
              objectArray={verifiedStudentData}
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
