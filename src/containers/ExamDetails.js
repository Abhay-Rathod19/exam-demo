import React, { useEffect } from 'react';
import { Box, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ExmTypography } from '../shared/ExmTypography';
import { getExamDetails } from '../helpers/teacherModule/teacherActions';
import { VIEW_EXAM_DETAILS_API } from '../constants/userModule/apiConstants';
import { ExmButton } from '../shared/ExmButton';
import { deleteExam } from '../helpers/teacherModule/teacherActions';
import { ExmSpinnerCom } from '../shared/ExmSpinnerCom';
import { CreateExam } from './CreateExam';
import { editPutExam } from '../helpers/teacherModule/teacherActions';

export const ExamDetails = () => {

    const [idParam] = useSearchParams();
    const exmId = idParam.get("id");
    const viewExamQus = useSelector((state) => state?.teacher?.viewExamQus);
    const loading = useSelector((state) => state.api?.loading);
    const navigate = useNavigate();

    useEffect(() => {
        getExamDetails(`${VIEW_EXAM_DETAILS_API}${exmId}`);
    }, []);

    console.log("data you got is : ", viewExamQus);

    return (
        <Box sx={{ mx: '10px' }}>
            <Stack spacing={'70%'} direction='row'>
                <ExmTypography>Your Exam details.</ExmTypography>
            </Stack>
            {
                loading === false
                    ?
                    <Stack>
                        <CreateExam data={viewExamQus} exmAction={editPutExam} exmId={exmId} />
                        <ExmButton sx={{ w: 1, my: 10 }} onClick={() => deleteExam(exmId, navigate)}>Delete this Exam</ExmButton>
                    </Stack>
                    : <ExmSpinnerCom />
            }

        </Box>
    )
};
