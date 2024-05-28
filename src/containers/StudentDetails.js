import { Fragment, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { ternary } from "../utils/javaScript";
import { fetchApiData } from "../redux/slices/apiSlice";
import { removeApiData } from "../redux/slices/apiSlice";
import { ExmTypography } from "../shared/ExmTypography";
import { ExmSpinnerCom } from "../shared/ExmSpinnerCom";
import { ExmTableComponent } from "../shared/ExmTableComp";

export const StudentDetails = () => {
    const dispatch = useDispatch();
    const [idParam] = useSearchParams();
    const stdId = idParam.get("id");
    const loading = useSelector((state) => state?.api?.loading);

    useEffect(() => {
        dispatch(removeApiData());
        dispatch(
            fetchApiData({ url: `/dashboard/Teachers/viewStudentDetail?id=${stdId}` })
        );
    }, []);

    const stdDetails = useSelector((state) => state?.api?.apiData);

    return (
        <Box>
            <ExmTypography>Student Details</ExmTypography>
            {loading ? (
                <ExmSpinnerCom />
            ) : (
                stdDetails?.map((data, index) => {
                    return (
                        <Fragment key={`std-det-${index}`}>
                            <ExmTypography variant="subtitle1" sx={{ display: "flex" }}>
                                Name : {data?.name}
                            </ExmTypography>
                            <ExmTypography variant="subtitle1" sx={{ display: "flex" }}>
                                Email : {data?.email}
                            </ExmTypography>
                            <ExmTypography variant="subtitle1" sx={{ display: "flex" }}>
                                Id : {data?._id}
                            </ExmTypography>
                            {ternary(
                                data?.Result?.length > 0,
                                <ExmTableComponent
                                    objectArray={data?.Result}
                                    key={`data-${index}`}
                                />,
                                ""
                            )}
                        </Fragment>
                    );
                })
            )}
        </Box>
    );
};
