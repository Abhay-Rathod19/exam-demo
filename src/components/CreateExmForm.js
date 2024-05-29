import React from "react";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ExmInputField } from "../shared/ExmInputField";
import { ExmLabel } from "../shared/ExmLabel";
import { objectValues, ternary } from "../utils/javaScript";
import { ExmButton } from "../shared/ExmButton";
import {
    addQuestions,
    addToAllQus,
    addToAllAns,
} from "../redux/slices/teacherSlice";

export const CreateExmForm = ({ subName, qusNo, setQusNum }) => {
    const dispatch = useDispatch();
    const quesRedx = useSelector((state) => state?.teacher?.allQuestions);
    const ansRedx = useSelector((state) => state?.teacher?.allAnswer);

    const [qusVal, setQusVal] = useState({});
    const [answer, setAnswer] = useState("");
    const [options, setOptions] = useState({});
    const [errors, setErrors] = useState({});

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (subName && qusVal && answer && [...objectValues(options)].length) {
            const data = {
                subName: subName,
                questions: [
                    {
                        question: qusVal,
                        answer: answer,
                        options: [...objectValues(options)],
                    },
                ],
            };
            setQusNum((n) => n + 1);
            dispatch(
                addQuestions({
                    question: qusVal,
                    answer: answer,
                    options: [...objectValues(options)],
                })
            );
            console.log("Final Exam data : ", data);
        }
        return false;
    };

    const opts = ["opt1", "opt2", "opt3", "opt4"];

    const changeQus = (e) => {
        const { name, value } = e.target;
        dispatch(addToAllQus({ [name]: value }));
    };

    const createOptions = (e) => {
        const { name, value } = e.target;
        dispatch(addToAllQus({ [name]: value }));
    };

    const makeAnswer = (name, value) => {
        if (value.length > 0) {
            dispatch(addToAllAns({ [name]: value }));
            // setAnswer(value);
        } else {
            setErrors({ ...errors, [name]: "Enter option value first" });
        }
    };

    return (
        <>
            <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                    <ExmLabel className="mt-1">Enter question {qusNo} : </ExmLabel>
                    <ExmInputField
                        name={`qus-${qusNo}`}
                        value={quesRedx[`qus-${qusNo}`] || ""}
                        onChange={(e) => changeQus(e)}
                    />
                </Stack>
                <ExmLabel className="mt-3">
                    Enter options for above question {qusNo}:{" "}
                </ExmLabel>
                <form onSubmit={handleFormSubmit} className="create-form-data">
                    <Stack spacing={2}>
                        {opts?.map((data, index) => {

                            return (
                                <React.Fragment key={`opt-${index}`}>
                                    <Stack direction="row" spacing={2}>
                                        <input
                                            type="radio"
                                            checked={ternary(
                                                (quesRedx[`opt-${qusNo}-${index}`]?.length > 0 &&
                                                    quesRedx[`opt-${qusNo}-${index}`] ===
                                                    ansRedx[`q-${qusNo}-ans`]),
                                                true,
                                                false
                                            )}
                                            value={quesRedx[`opt-${qusNo}-${index}`] || ""}
                                            onChange={(e) =>
                                                makeAnswer(`q-${qusNo}-ans`, e.target.value)
                                            }
                                        />
                                        <ExmInputField
                                            name={`opt-${qusNo}-${index}`}
                                            value={quesRedx[`opt-${qusNo}-${index}`] || ""}
                                            onChange={(e) => createOptions(e)}
                                        />
                                    </Stack>
                                    {/* <p className="text-danger">
                                        {errors[data] ? errors[data] : ""}
                                    </p> */}
                                </React.Fragment>
                            );
                        })}
                    </Stack>

                    <ExmButton type="submit" sx={{ width: 402, ml: "27px", mt: '20px' }}>
                        save
                    </ExmButton>
                </form>
            </Stack>
        </>
    );
};
