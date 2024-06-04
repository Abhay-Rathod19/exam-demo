import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { ExmTableComponent } from "../shared/ExmTableComp";
import { ExmSpinnerCom } from "../shared/ExmSpinnerCom";
import { ExmTypography } from "../shared/ExmTypography";
import { viewAllExam } from "../helpers/teacherModule/teacherActions";
import { VIEW_EXAM_DETAILS_API } from "../constants/userModule/apiConstants";
import { useNavigate } from "react-router";

export const ViewExam = () => {
    const loading = useSelector((state) => state?.api?.loading);
    const viewExamData = useSelector((state) => state?.teacher?.allExams);
    const navigate = useNavigate();

    useEffect(() => {
        viewAllExam(navigate);
    }, []);

    return (
        <Box className="view-exam-details" sx={{ textAlign: "center" }}>
            <ExmTypography sx={{ m: "10px" }}>All Exams</ExmTypography>
            {loading ? (
                <ExmSpinnerCom />
            ) : (
                <ExmTableComponent
                    objectArray={viewExamData}
                    showNotes={true}
                    btnLabel="Edit Exam"
                    deleteBtn={true}
                    urlPath={VIEW_EXAM_DETAILS_API}
                />
            )}
        </Box>
    );
};
