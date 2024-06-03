import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { CreateExam } from "../components/CreateExam";
import { getExamPaper } from "../helpers/studentModule/studentActions";
import { ExmSpinnerCom } from "../shared/ExmSpinnerCom";
import { AlreadyExmGiven } from "../components/AlreadyExmGiven";
import { ExmTypography } from "../shared/ExmTypography";

export const GiveExamComp = () => {
  const [serchId] = useSearchParams();
  const examId = serchId.get("id");

  useEffect(() => {
    getExamPaper(examId);
  }, []);

  const examPaper = useSelector((state) => state?.student?.examPaper);
  const noticeMsg = useSelector((state) => state?.student?.stdNoticeMsg);

  return (
    <>
      {
        noticeMsg ? <AlreadyExmGiven /> : (
          <>
            <ExmTypography variant="h5" sx={{ m: "0 5px 10px 20px" }}>
              Give exam :
            </ExmTypography>
            {
              examPaper.length > 0 ? (
                <CreateExam
                  data={examPaper}
                  exmId={examId}
                  examActype="Submit Exam"
                />
              ) : (
                <ExmSpinnerCom />
              )
            }
          </>

        )
      }
      {/* <ExmTypography variant="h5" sx={{ m: "0 5px 10px 20px" }}>
        Give exam :
      </ExmTypography> */}

      {/* {examPaper.length > 0 ? (
        <CreateExam
          data={examPaper}
          exmId={examId}
          examActype="Submit Exam"
        /> ? (
          noticeMsg
        ) : (
          noticeMsg
        )
      ) : (
        <ExmSpinnerCom />
      )} */}

    </>
  );
};
