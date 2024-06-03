import React, { useState } from "react";
import { Stack } from "@mui/material";
import { ExmLabel } from "../shared/ExmLabel";
import { ExmInputField } from "../shared/ExmInputField";
import { questions } from "../constants/teacherModule/createExamData";

export const TestCreateExm = ({ queNum = 1 }) => {
  const data = [
    {
      options: ["ans1", "ans2", "ans3", "ans4"],
      question: "question8",
      answer: "ans4",
    },
    {
      options: ["ans1", "ans2", "ans3", "ans4"],
      question: "question8",
      answer: "ans4",
    },
    {
      options: ["", "", "", ""],
      question: "",
      answer: "",
    },
  ];

  const [homeData, setHomeData] = useState(data);

  console.log("data are : ", homeData);

  const changeQus = (e, index) => {
    const { name, value } = e.target;
    const updatedData = [...homeData];
    updatedData[index] = {
      ...updatedData[index],
      question: value,
    };
    setHomeData(updatedData);
    console.log(name, value);
  };

  const changeOption = (e, questionIndex, optionIndex) => {
    const { value } = e.target;
    const updatedData = structuredClone(homeData);
    updatedData[questionIndex].options[optionIndex] = value;
    updatedData[questionIndex].answer = value;
    setHomeData(updatedData);
  };

  const handleRadioChange = (e, questionIndex, optionIndex) => {
    const { value, checked } = e.target;
    const updatedData = structuredClone(homeData);
    // updatedData[questionIndex].answer = value;
    updatedData[questionIndex].answer = checked ? value : "";
    setHomeData(updatedData);
  };

  return (
    <>
      <p>Exam is :</p>
      {homeData.map((data, ind) => {
        return (
          <React.Fragment key={`qus-${ind}`}>
            <ExmLabel className="mt-1">Enter question {ind + 1} : </ExmLabel>
            <ExmInputField
              name={`qus-${queNum}`}
              value={data.question || ""}
              onChange={(e) => changeQus(e, ind)}
            />
            {data.options.map((opt, optIndex) => {
              return (
                <Stack direction="row" spacing={2} key={`opt-${optIndex}`}>
                  <input
                    type="radio"
                    name={`radio-${ind}`}
                    value={opt || ""}
                    checked={data?.answer ? opt === data?.answer : false}
                    onChange={(e) => handleRadioChange(e, ind, optIndex)}
                  />
                  <ExmInputField
                    value={opt || ""}
                    onChange={(e) => changeOption(e, ind, optIndex)}
                  />
                </Stack>
              );
            })}
          </React.Fragment>
        );
      })}
    </>
  );
};
