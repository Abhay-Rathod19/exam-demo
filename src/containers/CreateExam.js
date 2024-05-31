import React from 'react';
import { Stack } from '@mui/material';
import { useState } from "react";
import { ExmTypography } from "../shared/ExmTypography";
import { ExmInputField } from "../shared/ExmInputField";
import { ExmLabel } from "../shared/ExmLabel";
import { ExmButton } from "../shared/ExmButton";
import { ternary } from "../utils/javaScript";
import { createExam } from '../helpers/teacherModule/teacherActions';
import { CExamForm } from '../components/CExamForm';

const data = [
    {
        options: ["", "", "", ""],
        question: "",
        answer: "",
    },
];

export const CreateExam = () => {

    const [currQus, setCurrQus] = useState(0);
    const [sub, setSub] = useState('');
    const [note, setNote] = useState('');
    const [formData, setFormData] = useState(data);

    const totalQus = 14;

    const makeNextQus = () => {
        if (currQus >= totalQus) {
            console.log("No more questions.");
        } else {
            setCurrQus((n) => n + 1);
        }
    }

    const makePrevQus = () => {
        if (currQus === 1) {
            console.log("No more questions.");
        } else {
            setCurrQus((n) => n - 1);
        }
    }

    const valCrtExmForm = (name, value) => {
        
    }

    const createExamHere = () => {
        const examDataObj = {
            subjectName: sub,
            questions: formData,
            notes: [note]
        };
        createExam(examDataObj);
    }

    return (
        <Stack sx={{ p: 2 }} spacing={3}>

            <Stack direction="row" spacing={2}>
                <ExmLabel className="mt-1">Subject name : </ExmLabel>
                <ExmInputField value={sub || ''} onChange={(e) => setSub(e.target.value)} />
            </Stack>
            <Stack direction="row" spacing={2}>
                <ExmLabel className="mt-1">Exam Notes : </ExmLabel>
                <ExmInputField value={note || ''} onChange={(e) => setNote(e.target.value)} />
            </Stack>
            <ExmTypography>
                Fill form to create exam :
            </ExmTypography>
            <CExamForm
                currQus={currQus}
                setCurrQus={setCurrQus}
                formData={formData}
                setFormData={setFormData}
            />
            <ExmButton
                disabled={ternary(currQus === totalQus, false, true)}
                sx={{ width: 402, m: "20px" }}
                style={{ marginLeft: "146px" }}
                onClick={createExamHere}
            >
                Create Exam
            </ExmButton>
        </Stack>
    )
};
