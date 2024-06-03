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

export const CreateExam = ({
  data,
  exmAction,
  exmId,
  examActype = "Create exam",
}) => {
  const exmDetails = useSelector((state) => state?.teacher?.examNameNotes);
  const subAnswers = useSelector((state) => state?.student?.exmAnswer).filter(
    (ans) => ans
  );

  const exmRelaData = JSON.parse(getFromLocalStorage("ExamDetails"))

  const [postExm, setPostExm] = useState(false);
  const [sub, setSub] = useState(exmDetails?.examName || exmRelaData?.name || "");
  const [note, setNote] = useState(exmDetails?.notes || exmRelaData?.notes[0] || "");
  const [formData, setFormData] = useState(data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allErrors = useSelector((state) => state?.teacher?.allErrors);

  const createExamHere = () => {
    if (examActype === "Submit Exam") {
      rmvFromLclStorage("ExamDetails");
      submitExamPaper(exmId, subAnswers, navigate);
    } else {
      const examDataObj = {
        subjectName: sub,
        questions: formData,
        notes: [note],
      };
      if (valCrtExmForm("", "", examDataObj, dispatch)) {
        rmvFromLclStorage("ExamDetails");
        exmAction(examDataObj, navigate, exmId);
      }
    }
  };

  useEffect(() => {
    if (examActype === "Create exam") {
      setNote();
      setSub();
    }
  }, []);

  return (
    <Stack sx={{ px: 2 }} spacing={3}>
      <Stack direction="row" spacing={2} alignItems="center">
        <ExmLabel>Subject name : </ExmLabel>
        <ExmInputField
          id="exm-input-fields"
          value={sub || ""}
          onChange={(e) => {
            setSub(e.target.value);
            valCrtExmForm(`Subject`, e.target.value, "", dispatch);
          }}
          disabled={ternary(examActype === "Submit Exam", true, false)}
        />
        <ExmTypography sx={{ color: "red", fontSize: "17px" }}>
          {ternary(allErrors["Subject"], allErrors["Subject"], "")}
        </ExmTypography>
      </Stack>
      <Stack direction="row" spacing={3.2} alignItems="center">
        <ExmLabel>Exam Notes : </ExmLabel>
        <ExmInputField
          id="exm-input-fields"
          value={note || ""}
          onChange={(e) => {
            setNote(e.target.value);
            valCrtExmForm(`Notes`, e.target.value, "", dispatch);
          }}
          disabled={ternary(examActype === "Submit Exam", true, false)}
        />
        <ExmTypography sx={{ color: "red", fontSize: "17px" }}>
          {ternary(allErrors["Notes"], allErrors["Notes"], "")}
        </ExmTypography>
      </Stack>
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
      </ExmButton>
    </Stack>
  );
};
