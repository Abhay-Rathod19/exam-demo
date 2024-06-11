import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ternary } from "../../utils/javaScript";
import { getStudDetail } from "../../helpers/teacherModule/teacherActions";
import { ExmTypography } from "../../shared/ExmTypography";
import { ExmSpinnerCom } from "../../shared/ExmSpinnerCom";
import { ExmTableComponent } from "../../shared/ExmTableComp";

export const StudentDetails = () => {
  const navigate = useNavigate();
  const [idParam] = useSearchParams();
  const stdId = idParam?.get("id");
  const loading = useSelector((state) => state?.api?.loading);

  useEffect(() => {
    getStudDetail(stdId, navigate);
  }, []);

  const stdDetails = useSelector(
    (state) => state?.teacher?.studentData?.idvStudent
  );

  return (
    <Box className="student-data-container" sx={{ p: "0 20px" }}>
      <ExmTypography>Student Details</ExmTypography>
      {loading ? (
        <ExmSpinnerCom />
      ) : (
        stdDetails?.map((data, index) => {
          return (
            <Box
              key={`std-det-${index}`}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <ExmTypography variant="subtitle1" sx={{ display: "flex" }}>
                Name : {data?.name}
              </ExmTypography>
              <ExmTypography variant="subtitle1" sx={{ display: "flex" }}>
                Email : {data?.email}
              </ExmTypography>
              <ExmTypography variant="subtitle1" sx={{ display: "flex" }}>
                Id : {data?._id}
              </ExmTypography>

              {ternary(
                data?.Result?.length > 0,
                <ExmTableComponent
                  btnRequire={false}
                  objectArray={data?.Result?.map(({ __v, ...rest }) => {
                    return rest;
                  })}
                  key={`data-${index}`}
                />,
                <ExmTypography sx={{ color: "salmon", my: 1 }}>
                  There is no exam given by this student.
                </ExmTypography>
              )}
            </Box>
          );
        })
      )}
    </Box>
  );
};
