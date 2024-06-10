import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { ExmTypography } from "../shared/ExmTypography";
import { useSelector } from "react-redux";
import { ExmSpinnerCom } from "../shared/ExmSpinnerCom";
import { ExmTableComponent } from "../shared/ExmTableComp";
import { getAllExams } from "../helpers/studentModule/studentActions";
import { SET_EXAM_PAPER_PATH } from "../constants/userModule/apiConstants";
import { useNavigate } from "react-router";

export const AllExamComp = () => {
  const allExams = useSelector((state) => state?.student?.allExams);
  const loading = useSelector((state) => state?.api?.loading);
  const navigate = useNavigate();

  useEffect(() => {
    getAllExams(navigate);
  }, []);

  return (
    <Box sx={{ textAlign: "center" }}>
      <ExmTypography>All Exams are</ExmTypography>
      {loading ? (
        <ExmSpinnerCom />
      ) : (
        <ExmTableComponent
          objectArray={allExams}
          btnLabel="Give Exam"
          // showNotes={true}
          urlPath={SET_EXAM_PAPER_PATH}
        />
      )}
    </Box>
  );
};
