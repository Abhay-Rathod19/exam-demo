import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { fetchApiData, removeApiData } from "../redux/slices/apiSlice";
import { ExmTableComponent } from "../shared/ExmTableComp";
import { ExmTypography } from "../shared/ExmTypography";
import { ExmSpinnerCom } from "../shared/ExmSpinnerCom";
import { STUDENT_DETAILS_API } from "../constants/userModule/apiConstants";

export const VerifiedStd = () => {

    const dispatch = useDispatch();
    const loading = useSelector((state) => state.api.loading);
    useEffect(() => {
        dispatch(removeApiData());
        dispatch(fetchApiData({ url: '/dashboard/Teachers/StudentForExam' }));
    }, [dispatch]);


    const VerifiedStudentData = useSelector((state) => state?.api?.apiData);

    return (
        <Box sx={{ textAlign: "center" }}>
            <ExmTypography>
                Verified Students Data
            </ExmTypography>

            {
                loading ? <ExmSpinnerCom /> :
                    (
                        VerifiedStudentData ? (
                            <>
                                <Box className='allstud-data-container' sx={{ display: 'flex', justifyContent: "center" }}>
                                    <ExmTableComponent objectArray={VerifiedStudentData} urlPath={STUDENT_DETAILS_API} />
                                </Box>
                            </>
                        ) : ""
                    )
            }
        </Box>
    )
};
