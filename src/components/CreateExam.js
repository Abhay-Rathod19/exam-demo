import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router";
import { rmvFromLclStorage } from "../utils/javaScript";
import { ExmTypography } from "../shared/ExmTypography";
import { ExmInputField } from "../shared/ExmInputField";
import { ExmLabel } from "../shared/ExmLabel";
import { ExmButton } from "../shared/ExmButton";
import { getFromLocalStorage, ternary } from "../utils/javaScript";
import { CExamForm } from "../components/CExamForm";
import { valCrtExmForm } from "../helpers/teacherModule/crtExmValidation";
import { submitExamPaper } from "../helpers/studentModule/studentActions";
import { ExmSpinnerCom } from "../shared/ExmSpinnerCom";
import { createExmFields } from "../description/examForm.description";
import { objectValues } from "../utils/javaScript";

export const CreateExam = ({
  data,
  exmAction,
  exmId,
  examActype = "Create exam",
}) => {
  const loading = useSelector((state) => state?.api?.loading);
  const allErrors = useSelector((state) => state?.teacher?.allErrors);
  const subAnswers = useSelector((state) => state?.student?.exmAnswer).filter(
    (ans) => ans
  );
  const exmRelaData = JSON.parse(getFromLocalStorage("ExamDetails"));

  const [postExm, setPostExm] = useState(false);
  const [formData, setFormData] = useState(data);
  const [crtFmData, setCrtFmData] = useState({
    examName: exmRelaData?.["examName"] || "",
    notes: exmRelaData?.["notes"] || "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createExamHere = () => {
    if (examActype === "Submit Exam") {
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
        objectValues(allErrors)?.filter((ele) => ele)?.length === 0
      ) {
        rmvFromLclStorage("ExamDetails");
        exmAction(examDataObj, navigate, exmId);
      }
    }
  };

  useEffect(() => {
    if (examActype === "Create exam") {
      setCrtFmData({});
    }
  }, []);

  return (
    <Stack sx={{ px: 2 }} spacing={3}>
      {createExmFields?.map((data, idx) => {
        return (
          <Stack
            key={`input-${idx}`}
            direction="row"
            spacing={2}
            alignItems="center"
          >
            <ExmLabel>{data?.label}</ExmLabel>
            <ExmInputField
              id="exm-input-fields"
              value={crtFmData[data?.value] || ""}
              onChange={(e) => {
                setCrtFmData({ ...crtFmData, [data?.value]: e.target.value });
                valCrtExmForm(data?.name, e.target.value, "", dispatch); //
              }}
              disabled={ternary(examActype === "Submit Exam", true, false)}
            />
            <ExmTypography sx={{ color: "red", fontSize: "17px" }}>
              {ternary(allErrors[data?.name], allErrors[data?.name], "")}
            </ExmTypography>
          </Stack>
        );
      })}

      <hr style={{ width: "100%", height: "5px", borderRadius: "4px" }} />
      <CExamForm
        setPostExm={setPostExm}
        formData={formData}
        setFormData={setFormData}
        examActype={examActype}
      />
      <ExmButton
        disabled={ternary(postExm, false, true)}
        sx={{ width: 402, m: "20px" }}
        style={{ marginLeft: "146px" }}
        onClick={createExamHere}
      >
        {examActype}
        {loading ? (
          <ExmSpinnerCom sx={{ m: "2px 10px", color: "white" }} />
        ) : (
          ``
        )}
      </ExmButton>
    </Stack>
  );
};
