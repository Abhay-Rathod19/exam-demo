import React from "react";
import { Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ExmInputField } from "../shared/ExmInputField";
import { ExmLabel } from "../shared/ExmLabel";
import { objectValues, ternary } from "../utils/javaScript";
import { ExmButton } from "../shared/ExmButton";
import {
    addToAllQus,
    addToAllAns,
    addToAllErr,
    addToAllOpts,
} from "../redux/slices/teacherSlice";

export const CreateExmForm = ({
    subName,
    qusNo,
    setQusNum,
    totalQus,
    makePrevQus,
    makeNextQus,
}) => {
    const dispatch = useDispatch();
    const quesRedx = useSelector((state) => state?.teacher?.allQuestions);
    const optsRedx = useSelector((state) => state?.teacher?.allOptions);
    const ansRedx = useSelector((state) => state?.teacher?.allAnswer);
    const errRdx = useSelector((state) => state?.teacher?.allErrors);


    const validation = (name, value) => {
        if (!value) {
            dispatch(addToAllErr({ [name]: " This field is required." }));
        } else {
            dispatch(addToAllErr({ [name]: "" }));
        }
    };

    const handleFormSubmit = (e) => {
        // const data = {
        //     question: quesRedx[`qus-${qusNo}`],
        //     answer: ansRedx[`q-${qusNo}-ans`],
        //     options: objectValues(optsRedx[`qus-${qusNo}`]),
        // };

        console.log("run")
        for (let field of optsRedx[`qus-${qusNo}`]) {
            console.log("field is :", optsRedx[`qus-${qusNo}`]?.[field])
            if (optsRedx[`qus-${qusNo}`]?.[field] === '') {
                dispatch(addToAllErr({ [field]: "This field is required" }));
            }
        }

        // const validateData = () => {
        //     if (!quesRedx[`qus-${qusNo}`]) {
        //         dispatch(addToAllErr({ [`qus-${qusNo}`]: "This field is required" }));
        //     }
        //     if (!ansRedx[`q-${qusNo}-ans`]) {
        //         dispatch(addToAllErr({ [`qus-${qusNo}-ans`]: "Select your answer to continue" }));
        //     }
        // }

        e.preventDefault();
        if (objectValues(errRdx).filter((value) => value).length === 0) {
            // if (validateData() && objectValues(errRdx).filter((value) => value).length === 0) {
            setQusNum((n) => n + 1);
        }
        return false;
    };

    const opts = ["opt1", "opt2", "opt3", "opt4"];

    const createQus = (e) => {
        const { name, value } = e.target;
        validation(name, value);
        dispatch(addToAllQus({ [name]: value }));
    };

    const createOptions = (e, qusName) => {
        const { name, value } = e.target;
        validation(name, value);
        const optData = { qus: qusName, data: { [name]: value } };
        dispatch(addToAllOpts(optData));
        // dispatch(addToAllOpts({ [name]: value }));
    };

    const makeAnswer = (name, value, errName) => {
        if (value.length > 0) {
            dispatch(addToAllAns({ [name]: value }));
        } else {
            dispatch(addToAllErr({ [errName]: "Enter answer first to select." }));
        }
    };

    return (
        <>
            <Stack spacing={2}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <ExmLabel>Enter question {qusNo} : </ExmLabel>
                    <ExmInputField
                        name={`qus-${qusNo}`}
                        value={quesRedx[`qus-${qusNo}`] || ""}
                        onChange={(e) => createQus(e)}
                    />
                    <ExmLabel className="text-danger">
                        {errRdx[`qus-${qusNo}`] ? errRdx[`qus-${qusNo}`] : ""}
                    </ExmLabel>
                </Stack>

                <ExmLabel className="mt-3">
                    Enter options for above question {qusNo}:
                </ExmLabel>
                <ExmLabel className="text-danger" style={{ height: '10px', marginBottom: '5px', marginTop: '-1px' }}>
                    {errRdx[`qus-${qusNo}-ans`] ? errRdx[`qus-${qusNo}-ans`] : ""}
                </ExmLabel>
                <form onSubmit={handleFormSubmit} className="create-form-data">
                    <Stack spacing={2}>
                        {opts?.map((data, index) => {
                            return (
                                <React.Fragment key={`opt-${index}`}>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <input
                                            type="radio"
                                            name={quesRedx[`qus-${qusNo}`]}
                                            checked={ternary(
                                                optsRedx[`qus-${qusNo}`]?.[`opt-${qusNo}-${index}`]?.length > 0 &&
                                                optsRedx[`qus-${qusNo}`]?.[`opt-${qusNo}-${index}`] ===
                                                ansRedx[`q-${qusNo}-ans`],
                                                true,
                                                false
                                            )}
                                            value={optsRedx[`qus-${qusNo}`]?.[`opt-${qusNo}-${index}`] || ""}
                                            onChange={(e) =>
                                                makeAnswer(
                                                    `q-${qusNo}-ans`,
                                                    e.target.value,
                                                    `opt-${qusNo}-${index}`
                                                )
                                            }
                                        />
                                        <ExmInputField
                                            name={`opt-${qusNo}-${index}`}
                                            value={optsRedx[`qus-${qusNo}`]?.[`opt-${qusNo}-${index}`] || ""}
                                            onChange={(e) => createOptions(e, `qus-${qusNo}`)}
                                        />
                                        <ExmLabel className="text-danger">
                                            {errRdx[`opt-${qusNo}-${index}`]
                                                ? errRdx[`opt-${qusNo}-${index}`]
                                                : ""}
                                        </ExmLabel>
                                    </Stack>
                                </React.Fragment>
                            );
                        })}
                    </Stack>


                    <Stack direction="row" sx={{ ml: "30px", mt: "30px" }} spacing={10}>
                        <ExmButton
                            onClick={makePrevQus}
                            sx={{ width: 160 }}
                            disabled={ternary(qusNo === 1, true, false)}
                        >
                            Back
                        </ExmButton>
                        <ExmButton
                            type="submit"
                            sx={{ width: 160 }}
                            disabled={ternary(qusNo === totalQus, true, false)}
                        >
                            Next
                        </ExmButton>
                    </Stack>
                    <ExmButton
                        disabled={ternary(qusNo === totalQus, false, true)}
                        sx={{ width: 402, ml: "27px", mt: "20px" }}
                    >
                        Create Exam
                    </ExmButton>
                </form>
            </Stack>
        </>
    );
};
