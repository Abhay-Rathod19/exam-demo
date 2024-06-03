import React, { useEffect } from "react";
import { Box, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ExmTypography } from "../shared/ExmTypography";
import { getStudentProfile } from "../helpers/studentModule/studentActions";
import { ExmSpinnerCom } from "../shared/ExmSpinnerCom";
import { ExmButton } from "../shared/ExmButton";

export const StudentProfile = () => {
  const studentDetails = useSelector((state) => state?.student?.stdProfile);
  const loading = useSelector((state) => state?.api?.loading);

  useEffect(() => {
    getStudentProfile();
  }, []);
  return (
    <Box>
      <ExmTypography variant="h4" sx={{ m: "5px 0 20px 20px" }}>My profile</ExmTypography>
      {loading ? (
        <ExmSpinnerCom />
      ) : (
        <Box sx={{ m: "5px 0 0 20px" }}>
          <Stack direction="column" >
            <ExmTypography>Name : {studentDetails?.name}</ExmTypography>
            <ExmTypography>Id : {studentDetails?._id}</ExmTypography>
            <ExmTypography>Email : {studentDetails?.email}</ExmTypography>
            <ExmTypography>Role : {studentDetails?.role}</ExmTypography>
          </Stack>
          <Link to="/dashboard/student/editProfile">
            <ExmButton>Change Name</ExmButton>
          </Link>
        </Box>
      )}
    </Box>
  );
};
