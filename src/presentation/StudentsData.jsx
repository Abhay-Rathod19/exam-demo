import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { fetchApiData, removeApiData } from "../redux/slices/apiSlice";
import { ExmTableComponent } from "../shared/ExmTableComp";
import { ExmTypography } from "../shared/ExmTypography";
import { ExmSpinnerCom } from "../shared/ExmSpinnerCom";

export const StudentsData = ({ studentLabel, pathUrl }) => {

    const dispatch = useDispatch();
    const loading = useSelector((state) => state.api.loading);
    useEffect(() => {
        dispatch(removeApiData());
        dispatch(fetchApiData({ url: pathUrl }));
    }, []);

    const studentsData = useSelector((state) => state?.api?.apiData);

    return (
        <Box sx={{ textAlign: "center" }}>
            <ExmTypography>
                {studentLabel}
            </ExmTypography>

            {
                loading ? <ExmSpinnerCom /> :
                    (
                        studentsData ? (
                            <>
                                <Box className='allstud-data-container' sx={{ display: 'flex', justifyContent: "center" }}>
                                    <ExmTableComponent objectArray={studentsData} />
                                </Box>
                            </>
                        ) : ""
                    )
            }
        </Box>
    )
};
