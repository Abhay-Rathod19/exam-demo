import React, { useEffect, useState } from 'react';
import { Box, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { ExmLabel } from '../shared/ExmLabel';
import { ExmInputField } from '../shared/ExmInputField';
import { ExmTypography } from '../shared/ExmTypography';
import { getExamDetails } from '../helpers/teacherModule/teacherActions';
import { VIEW_EXAM_DETAILS_API } from '../constants/userModule/apiConstants';
import { ExmButton } from '../shared/ExmButton';
import { deleteExam } from '../helpers/teacherModule/teacherActions';
import { ternary } from '../utils/javaScript';
import { ExmSpinnerCom } from '../shared/ExmSpinnerCom';


export const ExamDetails = () => {

    const [idParam] = useSearchParams();
    const exmId = idParam.get("id");
    const viewExamQus = useSelector((state) => state?.teacher?.viewExamQus);
    const loading = useSelector((state) => state.api?.loading);

    const [qusData, setQusData] = useState(viewExamQus);
    const [currQus, setCurrQus] = useState(1);

    const dataLimit = 1;
    const lastInd = currQus * dataLimit;
    const startInd = lastInd - dataLimit;
    const totalPage = qusData?.length;
    const tableData = qusData?.slice(startInd, lastInd);

    useEffect(() => {
        getExamDetails(`${VIEW_EXAM_DETAILS_API}${exmId}`);
    }, []);

    const createExamEdit = (e, id) => {
        const editIndex = qusData.findIndex((data) => data.answer === id);
        const dataToEdt = qusData[editIndex];
        // console.log("data are : ", editData);
    }

    return (
        <Box sx={{ mx: '10px' }}>
            <Stack spacing={'70%'} direction='row'>
                <ExmTypography>Your Exam details.</ExmTypography>
                <ExmButton sx={{ w: 1 }} onClick={() => deleteExam(exmId)}>Delete this Exam</ExmButton>
            </Stack>

            {
                loading ? <ExmSpinnerCom /> : (
                    <Stack>
                        {
                            tableData?.map((qus, index) => {
                                return (
                                    <React.Fragment key={`label-${index}`}>
                                        <Stack direction="row" spacing={2}>
                                            <ExmLabel className="mt-1"> Question {currQus} : </ExmLabel>
                                            <ExmInputField
                                                name={`qus-${index + 1}`}
                                                value={qus.question}
                                                onChange={(e) => createExamEdit(e, (qus.answer))}
                                            />
                                        </Stack>
                                        <Stack sx={{ ml: 9.5, mt: 2 }} spacing={2}>
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
                                        </Stack>
                                        <Stack direction="row" sx={{ ml: "105px", mt: "30px" }} spacing={10}>
                                            <ExmButton
                                                onClick={() => setCurrQus((n) => n - 1)}
                                                sx={{ width: 160 }}
                                                disabled={ternary(currQus === 1, true, false)}
                                            >
                                                Back
                                            </ExmButton>
                                            <ExmButton
                                                onClick={() => setCurrQus((n) => n + 1)}
                                                sx={{ width: 160 }}
                                                disabled={ternary(currQus === totalPage, true, false)}
                                            >
                                                Next
                                            </ExmButton>
                                        </Stack>
                                    </React.Fragment>
                                )
                            })
                        }
                    </Stack>
                )
            }
        </Box>
    )
};
