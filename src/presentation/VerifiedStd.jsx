import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { fetchApiData, removeApiData } from "../redux/slices/apiSlice";
import { ExmTableComponent } from "../shared/ExmTableComp";
import { ExmTypography } from "../shared/ExmTypography";
import { ExmSpinnerCom } from "../shared/ExmSpinnerCom";

export const VerifiedStd = () => {

    const dispatch = useDispatch();
    const loading = useSelector((state) => state.api.loading);
    useEffect(() => {
        dispatch(removeApiData());
        dispatch(fetchApiData({ url: '/dashboard/Teachers/StudentForExam' }));
    }, []);

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
                                    <ExmTableComponent objectArray={VerifiedStudentData} />
                                </Box>
                            </>
                        ) : ""
                    )
            }
        </Box>
    )
};
