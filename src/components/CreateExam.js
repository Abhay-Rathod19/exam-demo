import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router";
import { getAllExams } from "../helpers/studentModule/studentActions";
import { areEqual, rmvFromLclStorage } from "../utils/javaScript";
import { ExmTypography } from "../shared/ExmTypography";
import { ExmInputField } from "../shared/ExmInputField";
import { ExmLabel } from "../shared/ExmLabel";
import { resetLoader } from "../redux/slices/apiSlice";
import { ExmButton } from "../shared/ExmButton";
import { getFromLocalStorage, ternary } from "../utils/javaScript";
import { CExamForm } from "../components/CExamForm";
import { valCrtExmForm } from "../helpers/teacherModule/crtExmValidation";
import { submitExamPaper } from "../helpers/studentModule/studentActions";
import { ExmSpinnerCom } from "../shared/ExmSpinnerCom";
import { createExmFields } from "../description/examForm.description";
import { objectValues } from "../utils/javaScript";
import { ExmQusField } from "../shared/ExmQusField";
import { SUBMIT_EXM_STD } from "../description/teacher.description";
import { CREATE_EXM_STD } from "../description/teacher.description";
import { setExamLoading } from "../redux/slices/apiSlice";

export const CreateExam = ({
  data,
  exmAction,
  exmId,
  examActype = CREATE_EXM_STD,
  CurExamData,
}) => {
  const exmLoading = useSelector((state) => state?.api?.examLoading);
  const allErrors = useSelector((state) => state?.teacher?.allErrors);
  const subAnswers = useSelector((state) => state?.student?.exmAnswer)?.filter(
    (ans) => ans
  );
  const exmRelaData = JSON.parse(getFromLocalStorage("ExamDetails"));
  const allExmDetails = useSelector((state) => state?.student?.allExams);
  const curExm = allExmDetails?.find((exam) => exam._id === exmId);
  const CurExmDetail = {
    examName: curExm?.subjectName,
    notes: curExm?.notes?.[0],
  };
  const [postExm, setPostExm] = useState(false);
  const [formData, setFormData] = useState(data);

  const [crtFmData, setCrtFmData] = useState({
    examName: CurExamData?.["examName"] || "",
    notes: CurExamData?.["notes"] || "",
  });

  // const [crtFmData, setCrtFmData] = useState({
  //   examName: CurExamData?.["examName"] || exmRelaData?.["examName"] || "",
  //   notes: CurExamData?.["notes"] || exmRelaData?.["notes"] || "",
  // });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createExamHere = () => {
    dispatch(setExamLoading());
    if (areEqual(examActype, SUBMIT_EXM_STD)) {
      rmvFromLclStorage("ExamDetails");
      submitExamPaper(exmId, subAnswers, navigate);
    } else {
      const examDataObj = {
        subjectName: crtFmData["examName"],
        questions: formData,
        notes: [crtFmData["notes"]],
      };
      if (
        valCrtExmForm("", "", examDataObj, dispatch) &&
        areEqual(objectValues(allErrors)?.filter((ele) => ele)?.length, 0)
      ) {
        rmvFromLclStorage("ExamDetails");
        exmAction(examDataObj, navigate, exmId);
      }
    }
  };

  useEffect(() => {
    dispatch(resetLoader());
    if (areEqual(examActype, CREATE_EXM_STD)) {
      setCrtFmData({});
    }
    if (!areEqual(examActype, CREATE_EXM_STD) && !allExmDetails?.length) {
      getAllExams(navigate);
    }
  }, []);

  return (
    <Stack sx={{ px: 2 }} spacing={3}>
      <>
        {createExmFields?.map((data, idx) => {
          return (
            <Stack
              key={`input-${idx}`}
              direction="row"
              alignItems="baseline"
              spacing={3}
            >
              <ExmLabel>{data?.label}</ExmLabel>

              {ternary(
                areEqual(examActype, SUBMIT_EXM_STD),
                <ExmQusField sx={{ borderBottom: "none" }}>
                  {crtFmData[data?.value] || CurExmDetail?.[data?.value]}
                </ExmQusField>,
                <ExmInputField
                  id="exm-input-fields"
                  value={
                    crtFmData[data?.value] || CurExmDetail?.[data?.value] || ""
                  }
                  onChange={(e) => {
                    setCrtFmData({
                      ...crtFmData,
                      [data?.value]: e.target.value,
                    });
                    valCrtExmForm(data?.name, e.target.value, "", dispatch);
                  }}
                  disabled={
                    ternary(
                      areEqual(examActype, SUBMIT_EXM_STD),
                      true,
                      false
                    ) || ternary(exmLoading, true, false)
                  }
                />
              )}
              <ExmTypography sx={{ color: "red", fontSize: "17px" }}>
                {ternary(allErrors[data?.name], allErrors[data?.name], "")}
              </ExmTypography>
            </Stack>
          );
        })}
      </>

      <hr style={{ width: "100%", height: "5px", borderRadius: "4px" }} />

      <CExamForm
        setPostExm={setPostExm}
        formData={formData}
        setFormData={setFormData}
        examActype={examActype}
        disablField={ternary(exmLoading, true, false)}
      />
      <ExmButton
        disabled={
          ternary(postExm, false, true) || ternary(exmLoading, true, false)
        }
        sx={{ width: 402, m: "20px", p: 0, height: "40px" }}
        style={{ marginLeft: "146px" }}
        onClick={createExamHere}
      >
        {examActype}
        {exmLoading ? (
          <ExmSpinnerCom sx={{ m: "0 10px", color: "white", p: 1 }} />
        ) : (
          ""
        )}
      </ExmButton>
    </Stack>
  );
};
