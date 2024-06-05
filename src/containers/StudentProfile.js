import React, { useEffect } from "react";
import { Box, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ExmTypography } from "../shared/ExmTypography";
import { getStudentProfile } from "../helpers/studentModule/studentActions";
import { ExmSpinnerCom } from "../shared/ExmSpinnerCom";
import { ExmButton } from "../shared/ExmButton";
import UserImage from "../assets/images/userImage.webp";


export const StudentProfile = () => {
  const studentDetails = useSelector((state) => state?.student?.stdProfile);
  const loading = useSelector((state) => state?.api?.loading);
  const navigate = useNavigate();

  useEffect(() => {
    getStudentProfile(navigate);
  }, []);
  return (
    <Box >
      <ExmTypography variant="h4" sx={{ m: "5px 0 20px 20px" }}>My profile</ExmTypography>
      {loading ? (
        <ExmSpinnerCom />
      ) : (
        <Box className="student-profile-container" sx={{ m: "5px 0 0 20px" }}>
          <Box>
            <img src={UserImage} alt='userImage' className="user-image" />
          </Box>
          <Stack direction="column" spacing={1} >
            <ExmTypography variant="para">Name : {studentDetails?.name}</ExmTypography>
            <ExmTypography variant="para">Id : {studentDetails?._id}</ExmTypography>
            <ExmTypography variant="para">Email : {studentDetails?.email}</ExmTypography>
            <ExmTypography variant="para">Role : {studentDetails?.role}</ExmTypography>
            <Link to="/dashboard/student/editProfile">
              <ExmButton sx={{ m: "3px 0" }}>Change Name</ExmButton>
            </Link>
          </Stack>
        </Box>
      )}
    </Box>
  );
};
