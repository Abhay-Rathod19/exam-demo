import React from 'react';
import { Stack } from '@mui/material';
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { ExmTypography } from "../shared/ExmTypography";
import { ExmInputField } from "../shared/ExmInputField";
import { ExmLabel } from "../shared/ExmLabel";
import { ExmButton } from "../shared/ExmButton";
import { ternary } from "../utils/javaScript";
import { CExamForm } from '../components/CExamForm';
import { valCrtExmForm } from '../helpers/teacherModule/crtExmValidation';
import { useNavigate } from 'react-router';


// const data = [
//     {
//         options: ["", "", "", ""],
//         question: "",
//         answer: "",
//          <ExmTypography>
//                Fill form to create exam :
//          </ExmTypography> 
//     },
// ];

export const CreateExam = ({ data, exmAction, exmId }) => {

    const exmDetails = useSelector((state) => state?.teacher?.examNameNotes);

    const [currQus, setCurrQus] = useState(0);
    const [sub, setSub] = useState(exmDetails.examName || '');
    const [note, setNote] = useState(exmDetails.notes || '');
    const [formData, setFormData] = useState(data);
    const dispatch = useDispatch();
    const allErrors = useSelector((state) => state?.teacher?.allErrors);
    const navigate = useNavigate();

    const totalQus = 14;

    const createExamHere = () => {
        const examDataObj = {
            subjectName: sub,
            questions: formData,
            notes: [note]
        };
        if (valCrtExmForm('', '', examDataObj, dispatch)) {
            exmAction(examDataObj, navigate, exmId);
        }
    };

    return (
        <Stack sx={{ px: 2 }} spacing={3}>

            <Stack direction="row" spacing={2} alignItems='center'>
                <ExmLabel>Subject name : </ExmLabel>
                <ExmInputField
                    value={sub || ''}
                    onChange={(e) => {
                        setSub(e.target.value);
                        valCrtExmForm(`Subject`, e.target.value, '', dispatch);
                    }}
                />
                <ExmTypography sx={{ color: 'red', fontSize: '17px' }}>{ternary((allErrors['Subject']), allErrors['Subject'], '')}</ExmTypography>
            </Stack>
            <Stack direction="row" spacing={3.2} alignItems='center'>
                <ExmLabel>Exam Notes : </ExmLabel>
                <ExmInputField
                    value={note || ''}
                    onChange={(e) => {
                        setNote(e.target.value);
                        valCrtExmForm(`Notes`, e.target.value, '', dispatch);
                    }}
                />
                <ExmTypography sx={{ color: 'red', fontSize: '17px' }}>{ternary((allErrors['Notes']), allErrors['Notes'], '')}</ExmTypography>
            </Stack>
            <hr style={{ width: '100%', height: '5px', borderRadius: '4px' }} />
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
