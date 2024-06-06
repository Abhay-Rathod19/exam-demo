import React, { useEffect } from "react";
import { Box, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ExmTypography } from "../shared/ExmTypography";
import { getExamDetails } from "../helpers/teacherModule/teacherActions";
import { GET_EXAM_DETAILS } from "../constants/userModule/apiConstants";
// import { ExmButton } from "../shared/ExmButton";
// import { deleteExam } from "../helpers/teacherModule/teacherActions";
import { ExmSpinnerCom } from "../shared/ExmSpinnerCom";
import { CreateExam } from "../components/CreateExam";
import { editPutExam } from "../helpers/teacherModule/teacherActions";

export const ExamDetails = () => {
  const [idParam] = useSearchParams();
  const exmId = idParam.get("id");
  const navigate = useNavigate();

  useEffect(() => {
    getExamDetails(`${GET_EXAM_DETAILS}${exmId}`, navigate);
  }, []);

  const viewExamQus = useSelector((state) => state?.teacher?.viewExamQus);

  return (
    <Box sx={{ mx: "10px" }}>
      <Stack spacing={"70%"} direction="row">
        <ExmTypography>Your Exam details.</ExmTypography>
      </Stack>
      {viewExamQus?.length > 0 ? (
        <Stack>
          <CreateExam
            data={viewExamQus}
            exmAction={editPutExam}
            exmId={exmId}
            examActype="Post edit exam"
          />
          {/* <ExmButton
            sx={{ w: 1, my: 10 }}
            onClick={() => deleteExam(exmId, navigate)}
          >
            Delete this Exam
          </ExmButton> */}
        </Stack>
      ) : (
        <ExmSpinnerCom />
      )}
    </Box>
  );
};