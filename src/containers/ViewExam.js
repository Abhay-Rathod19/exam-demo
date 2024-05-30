import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { reset } from '@reduxjs/toolkit';
import { removeApiData, fetchApiData } from '../redux/slices/apiSlice';
import { ExmTableComponent } from '../shared/ExmTableComp';
import { ExmSpinnerCom } from '../shared/ExmSpinnerCom';
import { ExmTypography } from '../shared/ExmTypography';

export const ViewExam = () => {

    const dispatch = useDispatch();
    const loading = useSelector((state) => state?.api?.loading);
    const viewExamData = useSelector((state) => state?.api?.apiData);

    useEffect(() => {
        dispatch(removeApiData());
        dispatch(reset());
        dispatch(
            fetchApiData({ url: `/dashboard/Teachers/viewExam` })
        );
    }, []);

    return (
        <Box className='view-exam-details' sx={{ textAlign: "center" }}>
            <ExmTypography>
                Exam
            </ExmTypography>
            {
                loading ?
                    <ExmSpinnerCom /> :
                    (<ExmTableComponent objectArray={viewExamData} showNotes={true} btnLabel='View Exam' />)
            }

        </Box>
    )
};
