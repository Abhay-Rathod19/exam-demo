import { Fragment, useState } from "react";
import { Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ExmLabel } from "../shared/ExmLabel";
import { areEqual, findRepeated } from "../utils/javaScript";
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
import { SUBMIT_EXM_STD } from "../description/teacher.description";

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
  const [nextBtn, setNextBtn] = useState(false);

  const curQusAns = examAnswer[currQus]?.answer;
  const totalQus = ternary(
    areEqual(examActype, SUBMIT_EXM_STD),
    formData.length - 1,
    14
  );
  const dataLimit = 1;
  const lastInd = currQus + dataLimit;
  const startInd = lastInd - dataLimit;
  const QusData = formData?.slice(startInd, lastInd);

  const newField = {
    options: ["", "", "", ""],
    question: "",
    answer: "",
  };

  const changeQus = (e, index) => {
    const { value } = e.target;
    ternary(
      !value?.trim(),
      dispatch(addToAllErr({ ["question"]: " This field is required" })),
      dispatch(addToAllErr({ ["question"]: "" }))
    );
    const updatedData = [...formData];
    const allQues = updatedData?.map((ele) => ele.question);
    for (let qus of allQues) {
      if (areEqual(qus, value?.trim())) {
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
    if (areEqual(examActype, SUBMIT_EXM_STD)) {
      const answer = { question: qusID, answer: value };
      if (value?.length > 0) {
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
      const answer = QusData[0]?.["answer"];
      // const index = evrOpt?.findIndex((ele) => ele === answer);
      const index = evrOpt?.findIndex((ele) => areEqual(ele, answer));
      if (areEqual(index, -1)) {
        updatedData[questionIndex].answer = "";
      }
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
    if (areEqual(examActype, SUBMIT_EXM_STD) && !curQusAns) {
      dispatch(addToAllErr({ ["answer"]: "Select your answer" }));
    } else {
      if (
        valCreateExm(QusData, dispatch, allErrors) &&
        areEqual(objectValues(allErrors)?.filter((ele) => ele)?.length, 0)
      ) {
        if (
          areEqual(qusNum + 1, formData.length) &&
          currQus < 14 &&
          examActype !== "Submit Exam"
        ) {
          setFormData([...formData, newField]);
        }
        if (areEqual(currQus, totalQus)) {
          setPostExm(true);
          setNextBtn(true);
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
              {ternary(
                areEqual(examActype, SUBMIT_EXM_STD),
                <ExmQusField
                  sx={{
                    borderBottom: "none",
                    color: "black",
                    fontWeight: "800",
                    fontSize: "18px",
                  }}
                >
                  {data?.question}
                </ExmQusField>,
                <ExmInputField
                  id="exm-input-fields"
                  name={`qus-${currQus}`}
                  value={data?.question || ""}
                  onChange={(e) => changeQus(e, currQus)}
                  disabled={ternary(
                    areEqual(examActype, SUBMIT_EXM_STD),
                    true,
                    false
                  )}
                />
              )}

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
                  {
                    <ExmSRadio
                      name={`radio-${currQus}`}
                      value={opt || ""}
                      checked={ternary(
                        areEqual(examActype, SUBMIT_EXM_STD),
                        ternary(areEqual(opt, curQusAns), true, false),
                        ternary(
                          data.answer !== "" && areEqual(opt, data?.answer),
                          true,
                          false
                        )
                      )}
                      onChange={(e) =>
                        handleRadioChange(e, currQus, optIndex, data?._id)
                      }
                    />
                  }
                  {areEqual(examActype, SUBMIT_EXM_STD) ? (
                    <ExmQusField>{opt}</ExmQusField>
                  ) : (
                    <ExmInputField
                      id="exm-input-fields"
                      value={opt || ""}
                      onChange={(e) => changeOption(e, currQus, optIndex)}
                      disabled={ternary(
                        areEqual(examActype, SUBMIT_EXM_STD),
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
                  setPostExm(false);
                  setNextBtn(false);
                  if (
                    valCreateExm(QusData, dispatch, allErrors) &&
                    areEqual(
                      objectValues(allErrors)?.filter((ele) => ele)?.length,
                      0
                    )
                  ) {
                    setCurrQus((n) => n - 1);
                  }
                }}
                sx={{ width: 160 }}
                disabled={ternary(areEqual(currQus, 0), true, false)}
              >
                Back
              </ExmButton>
              <ExmButton
                onClick={(e) => handleNextQus(e, currQus)}
                disabled={ternary(nextBtn, true, false)}
                sx={{ width: 160 }}
              >
                {ternary(areEqual(currQus, totalQus), "Post Exam", "Next")}
              </ExmButton>
            </Stack>
          </Fragment>
        );
      })}
    </>
  );
};
