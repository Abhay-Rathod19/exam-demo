import React from 'react';
import { Stack } from '@mui/material';
import { useState } from "react";
import { CreateExmForm } from "../components/CreateExmForm";
import { ExmTypography } from "../shared/ExmTypography";
import { ExmInputField } from "../shared/ExmInputField";
import { ExmLabel } from "../shared/ExmLabel";
import { ExmButton } from "../shared/ExmButton";
import { ternary } from "../utils/javaScript";
import { createExamData } from "../constants/teacherModule/createExamData";
import { questions } from '../constants/teacherModule/createExamData';

export const CreateExam = () => {

    const [qusNo, setQusNum] = useState(1);
    const [sub, setSub] = useState('');
    const [note, setNote] = useState('');


    const totalQus = 5;

    const makeNextQus = () => {
        if (qusNo >= totalQus) {
            console.log("No more questions.");
        } else {
            setQusNum((n) => n + 1);
        }
    }

    const makePrevQus = () => {
        if (qusNo === 1) {
            console.log("No more questions.");
        } else {
            setQusNum((n) => n - 1);
        }
    }

    const createExam = (e, id) => {
        console.log(e.target.value);
    }
    return (
        <Stack sx={{ p: 2 }} spacing={3}>

            <Stack direction="row" spacing={2}>
                <ExmLabel className="mt-1">Subject name : </ExmLabel>
                <ExmInputField value={sub || ''} onChange={(e) => setSub(e.target.value)} />
            </Stack>
            <Stack direction="row" spacing={2}>
                <ExmLabel className="mt-1">Subject Notes : </ExmLabel>
                <ExmInputField value={note || ''} onChange={(e) => setNote(e.target.value)} />
            </Stack>
            <ExmTypography>
                Fill form to create exam
            </ExmTypography>
            <CreateExmForm subName='Testing' qusNo={qusNo} setQusNum={setQusNum} />
            <Stack direction='row' spacing={10} >
                <ExmButton onClick={makePrevQus} disabled={ternary((qusNo === 1), true, false)}>
                    Back
                </ExmButton>
                <ExmButton onClick={makeNextQus} disabled={ternary((qusNo === totalQus), true, false)}>
                    Next
                </ExmButton>
            </Stack>

            {/* {
                createExamData?.map((qus, index) => {
                    return (
                        <React.Fragment key={`label-${index}`}>
                            <Stack direction="row" spacing={2}>
                                <ExmLabel className="mt-1">Enter question {index + 1} : </ExmLabel>
                                <ExmInputField
                                    name={`qus-${index + 1}`}
                                    value={qus.question}
                                    onChange={(e) => createExam(e, qus.answer)}
                                />
                            </Stack>
                            {
                                qus?.options?.map((options, index) => {
                                    return (
                                        <Stack direction="row" spacing={2} key={`input-${index}`}>
                                            <input
                                                type="radio"
                                                name={qus?.question}
                                                checked={options === qus.answer ? true : false}
                                                onChange={() => console.log('Changing..')}
                                                value={''}
                                            />
                                            <ExmInputField
                                                value={options}
                                            />
                                        </Stack>
                                    )
                                })
                            }
                        </React.Fragment>
                    )
                })
            } */}
        </Stack>
    )
};
