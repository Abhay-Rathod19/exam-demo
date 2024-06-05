import { Fragment, useState } from "react";
import { Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ExmLabel } from "../shared/ExmLabel";
import { findRepeated } from "../utils/javaScript";
import { ExmInputField } from "../shared/ExmInputField";
import { ternary } from "../utils/javaScript";
import { ExmButton } from "../shared/ExmButton";
import { ExmSRadio } from "../shared/ExmSRadio";
import { valCreateExm } from "../helpers/teacherModule/crtExmValidation";
import { objectValues } from "../utils/javaScript";
import { ExmTypography } from "../shared/ExmTypography";
import { addToAllErr } from "../redux/slices/teacherSlice";
import { setExmAnswer } from "../redux/slices/studentSlice";
import { ExmQusField } from "../shared/ExmQusField";

export const CExamForm = ({
  formData,
  setFormData,
  setPostExm,
  examActype,
}) => {
  const dispatch = useDispatch();
  const allErrors = useSelector((state) => state?.teacher?.allErrors);
  const examAnswer = useSelector((state) => state?.student?.exmAnswer);
  const [currQus, setCurrQus] = useState(0);

  const curQusAns = examAnswer[currQus]?.answer;
  const totalQus = ternary(
    examActype === "Submit Exam",
    formData.length - 1,
    14
  );
  const dataLimit = 1;
  const lastInd = currQus + dataLimit;
  const startInd = lastInd - dataLimit;
  const QusData = formData?.slice(startInd, lastInd);

  const changeQus = (e, index) => {
    const { name, value } = e.target;
    if (!value?.trim()) {
      dispatch(addToAllErr({ ["question"]: " This field is required" }));
    } else {
      dispatch(addToAllErr({ ["question"]: "" }));
    }
    const updatedData = [...formData];
    const allQues = updatedData?.map((ele) => ele.question);
    for (let qus of allQues) {
      if (qus === value?.trim()) {
        dispatch(addToAllErr({ ["question"]: " This question is repeated." }));
      }
    }
    updatedData[index] = {
      ...updatedData[index],
      question: value,
    };
    setFormData(updatedData);
  };

  const handleRadioChange = (e, questionIndex, optIndex, qusID) => {
    const { value, checked } = e.target;

    if (examActype === "Submit Exam") {
      const answer = { question: qusID, answer: value };
      if (value?.length > 0) {
        console.log(`We are runnign`);
        dispatch(addToAllErr({ ["answer"]: "" }));
      }
      dispatch(setExmAnswer({ index: questionIndex, answer: answer }));
    } else {
      const updatedData = structuredClone(formData);
      updatedData[questionIndex].answer = checked ? value : "";
      if (value?.trim()?.length > 0) {
        dispatch(addToAllErr({ ["answer"]: "" }));
      }
      valCreateExm("", dispatch, "", `opt-${optIndex}`, value);
      setFormData(updatedData);
    }
  };

  const changeOption = (e, questionIndex, optionIndex, radio, qusID) => {
    const { value } = e.target;
    const updatedData = structuredClone(formData);
    updatedData[questionIndex].options[optionIndex] = value?.trim();
    if (!radio) {
      const evrOpt = updatedData[questionIndex].options;
      const repOpts = findRepeated(evrOpt);
      [...Array(4).keys()].forEach((idx) => {
        dispatch(
          addToAllErr({
            [`opt-${idx}`]: "",
          })
        );
      });
      if (repOpts?.length) {
        repOpts?.forEach((ele) => {
          dispatch(
            addToAllErr({
              [`opt-${ele}`]: "This is repeated value",
            })
          );
        });
      }
    }
    valCreateExm("", dispatch, "", `opt-${optionIndex}`, value);
    setFormData(updatedData);
  };

  const handleNextQus = (e, qusNum) => {
    if (examActype === "Submit Exam" && !curQusAns) {
      dispatch(addToAllErr({ ["answer"]: "Select your answer" }));
    } else {
      if (
        valCreateExm(QusData, dispatch, allErrors) &&
        objectValues(allErrors)?.filter((ele) => ele)?.length === 0
      ) {
        const newField = {
          options: ["", "", "", ""],
          question: "",
          answer: "",
        };
        if (
          qusNum + 1 === formData.length &&
          currQus < 14 &&
          examActype !== "Submit Exam"
        ) {
          setFormData([...formData, newField]);
        }
        if (currQus === totalQus) {
          setPostExm(true);
        } else {
          setCurrQus((q) => q + 1);
        }
      }
    }
  };

  return (
    <>
      {QusData?.map((data, ind) => {
        return (
          <Fragment key={`qus-${ind}`}>
            <Stack direction="row" spacing={2} alignItems="center">
              <ExmLabel>Question {currQus + 1} :</ExmLabel>
              <ExmInputField
                id="exm-input-fields"
                name={`qus-${currQus}`}
                value={data?.question || ""}
                onChange={(e) => changeQus(e, currQus)}
                disabled={ternary(examActype === "Submit Exam", true, false)}
              />
              <ExmTypography sx={{ color: "red", fontSize: "17px" }}>
                {ternary(allErrors["question"], allErrors["question"], "")}
              </ExmTypography>
            </Stack>
            <Stack direction="row" spacing={2}>
              <ExmLabel>Select your answer :</ExmLabel>
              <ExmTypography sx={{ color: "red", fontSize: "17px" }}>
                {ternary(allErrors["answer"], allErrors["answer"], "")}
              </ExmTypography>
            </Stack>
            {data?.options?.map((opt, optIndex) => {
              return (
                <Stack
                  direction="row"
                  spacing={2}
                  style={{ marginLeft: "116px", marginTop: "15px" }}
                  key={`opt-${optIndex}`}
                  alignItems="center"
                >
                  {examActype === "Submit Exam" ? (
                    <ExmSRadio
                      name={`radio-${currQus}`}
                      value={opt || ""}
                      checked={ternary(opt === curQusAns, true, false)}
                      onChange={(e) =>
                        handleRadioChange(e, currQus, optIndex, data?._id)
                      }
                    />
                  ) : (
                    <ExmSRadio
                      name={`radio-${currQus}`}
                      value={opt || ""}
                      checked={ternary(
                        data.answer !== "" && opt === data?.answer,
                        true,
                        false
                      )}
                      onChange={(e) => handleRadioChange(e, currQus, optIndex)}
                    />
                  )}

                  {examActype === "Submit Exam" ? (
                    <>
                      <ExmQusField>{opt}</ExmQusField>
                    </>
                  ) : (
                    <ExmInputField
                      id="exm-input-fields"
                      value={opt || ""}
                      onChange={(e) => changeOption(e, currQus, optIndex)}
                      disabled={ternary(
                        examActype === "Submit Exam",
                        true,
                        false
                      )}
                    />
                  )}

                  <ExmTypography sx={{ color: "red", fontSize: "17px" }}>
                    {ternary(
                      allErrors[`opt-${optIndex}`],
                      allErrors[`opt-${optIndex}`],
                      ""
                    )}
                  </ExmTypography>
                </Stack>
              );
            })}

            <Stack
              direction="row"
              style={{ marginLeft: "146px", marginTop: "15px" }}
              spacing={10}
            >
              <ExmButton
                onClick={() => {
                  // dispatch(removeAllErr());
                  setPostExm(false);
                  if (
                    valCreateExm(QusData, dispatch, allErrors) &&
                    objectValues(allErrors)?.filter((ele) => ele)?.length === 0
                  ) {
                    setCurrQus((n) => n - 1);
                  }
                }}
                sx={{ width: 160 }}
                disabled={ternary(currQus === 0, true, false)}
              >
                Back
              </ExmButton>
              <ExmButton
                onClick={(e) => handleNextQus(e, currQus)}
                sx={{ width: 160 }}
              >
                {ternary(currQus === totalQus, "Post Exam", "Next")}
              </ExmButton>
            </Stack>
          </Fragment>
        );
      })}
    </>
  );
};
