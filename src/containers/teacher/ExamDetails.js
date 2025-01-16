import React, { useEffect } from "react";
import { Box, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ExmTypography } from "../../shared/ExmTypography";
import { getExamDetails } from "../../helpers/teacherModule/teacherActions";
import { GET_EXAM_DETAILS } from "../../constants/userModule/apiConstants";
// import { ExmButton } from "../shared/ExmButton";
// import { deleteExam } from "../helpers/teacherModule/teacherActions";
import { ExmSpinnerCom } from "../../shared/ExmSpinnerCom";
import { CreateExam } from "../../components/CreateExam";
import { editPutExam } from "../../helpers/teacherModule/teacherActions";
import { resetLoader } from "../../redux/slices/apiSlice";

export const ExamDetails = () => {
  const [idParam] = useSearchParams();
  const exmId = idParam.get("id");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const CurExamData = {
    examName: location?.state?.subjectName,
    notes: location?.state?.notes[0],
  };

  useEffect(() => {
    dispatch(resetLoader());
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
            CurExamData={CurExamData}
          />
        </Stack>
      ) : (
        <ExmSpinnerCom />
      )}
    </Box>
  );
};
