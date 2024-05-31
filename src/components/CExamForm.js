import { Fragment } from "react";
import { Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ExmLabel } from "../shared/ExmLabel";
import { ExmInputField } from "../shared/ExmInputField";
import { ternary } from "../utils/javaScript";
import { ExmButton } from "../shared/ExmButton";
import { ExmSRadio } from "../shared/ExmSRadio";
import { valCreateExm } from "../helpers/teacherModule/crtExmValidation";
import { objectValues } from "../utils/javaScript";
import { ExmTypography } from "../shared/ExmTypography";
import { addToAllErr } from "../redux/slices/teacherSlice";

export const CExamForm = ({
    formData,
    setFormData,
    currQus,
    setCurrQus,
}) => {

    const dispatch = useDispatch();
    const allErrors = useSelector((state) => state?.teacher?.allErrors);
    const dataLimit = 1;
    const lastInd = currQus + dataLimit;
    const startInd = lastInd - dataLimit;
    const QusData = formData?.slice(startInd, lastInd);

    const changeQus = (e, index) => {
        const { name, value } = e.target;
        valCreateExm('', dispatch, '', 'question', value);
        const updatedData = [...formData];
        updatedData[index] = {
            ...updatedData[index],
            question: value,
        };
        setFormData(updatedData);
    };

    const changeOption = (e, questionIndex, optionIndex, radio) => {
        const { value } = e.target;
        valCreateExm('', dispatch, '', `opt-${optionIndex}`, value);
        const updatedData = [...formData];
        const optData = updatedData[questionIndex].options;
        if (!radio) {
            if (optData.includes(value)) {
                dispatch(addToAllErr({ [`opt-${optionIndex}`]: "This is repeated value" }));
            }
        }
        updatedData[questionIndex].options[optionIndex] = value;
        updatedData[questionIndex].answer = value;
        if (value.length > 0) {
            dispatch(addToAllErr({ ['answer']: "" }));
        }
        setFormData(updatedData);
    };

    const handleNextQus = (e, qusNum) => {
        if (valCreateExm(QusData, dispatch, allErrors) && objectValues(allErrors).filter((ele) => ele).length === 0) {
            const newField = {
                options: ["", "", "", ""],
                question: "",
                answer: "",
            };
            if (qusNum + 1 === formData.length && currQus < 14) {
                setFormData([...formData, newField]);
            }
            setCurrQus((q) => q + 1);
        }
    };

    return (
        <>
            {QusData.map((data, ind) => {
                return (
                    <Fragment key={`qus-${ind}`}>
                        <Stack direction="row" spacing={2}>
                            <ExmLabel className="mt-1">
                                Enter question {currQus + 1} :{" "}
                            </ExmLabel>
                            <ExmInputField
                                name={`qus-${currQus}`}
                                value={data.question || ""}
                                onChange={(e) => changeQus(e, currQus)}
                            />
                            <p className="mt-2 text-danger">{allErrors['question'] ? allErrors['question'] : ''}</p>
                        </Stack>
                        <Stack direction='row' spacing={2}>
                            <ExmTypography>Select your answer : </ExmTypography>
                            <p className="mt-1 text-danger">{allErrors['answer'] ? allErrors['answer'] : ''}</p>
                        </Stack>
                        {data.options.map((opt, optIndex) => {
                            return (
                                <Stack
                                    direction="row"
                                    spacing={2}
                                    style={{ marginLeft: "116px", marginTop: "15px" }}
                                    key={`opt-${optIndex}`}
                                >
                                    <ExmSRadio
                                        name={`radio-${currQus}`}
                                        value={opt || ""}
                                        checked={ternary(
                                            data.answer !== "" && opt === data.answer,
                                            true,
                                            false
                                        )}
                                        onChange={(e) => changeOption(e, currQus, optIndex, 'radio')}
                                    />
                                    <ExmInputField
                                        value={opt || ""}
                                        onChange={(e) => changeOption(e, currQus, optIndex)}
                                    />
                                    <p className="mt-2 text-danger"> {allErrors[`opt-${optIndex}`] ? allErrors[`opt-${optIndex}`] : ''}</p>
                                </Stack>
                            );
                        })}

                        <Stack
                            direction="row"
                            style={{ marginLeft: "146px", marginTop: "15px" }}
                            spacing={10}
                        >
                            <ExmButton
                                onClick={() => setCurrQus((n) => n - 1)}
                                sx={{ width: 160 }}
                                disabled={ternary(currQus === 0, true, false)}
                            >
                                Back
                            </ExmButton>
                            <ExmButton
                                onClick={(e) => handleNextQus(e, currQus)}
                                sx={{ width: 160 }}
                                disabled={ternary(currQus === 14, true, false)}
                            >
                                Next
                            </ExmButton>
                        </Stack>
                    </Fragment>
                );
            })}
        </>
    );
};