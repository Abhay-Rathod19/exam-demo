import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { ExmTableComponent } from "../shared/ExmTableComp";
import { ExmSpinnerCom } from "../shared/ExmSpinnerCom";
import { ExmTypography } from "../shared/ExmTypography";
import {
  deleteExam,
  viewAllExam,
} from "../helpers/teacherModule/teacherActions";
import { VIEW_EXAM_DETAILS_API } from "../constants/userModule/apiConstants";
import { useNavigate } from "react-router";
import { removeAllErr } from "../redux/slices/teacherSlice";
import { areEqual } from "../utils/javaScript";

export const ViewExam = () => {
  const loading = useSelector((state) => state?.api?.loading);
  const viewExamData = useSelector((state) => state?.teacher?.allExams);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(removeAllErr());
    viewAllExam(navigate);
  }, []);

  const [filterData, setFilterData] = useState([]);

  const removeData = (data, id) => {
    if (window.confirm("Are sure you want to delete this exam ?")) {
      const newData = structuredClone(data);
      const index = newData?.findIndex((ele) => areEqual(ele?._id, id));

      newData?.splice(index, 1);
      setFilterData(newData);
      deleteExam(id, navigate);
    }
  };

  return (
    <Box className="view-exam-details" sx={{ textAlign: "center" }}>
      <ExmTypography sx={{ m: "10px" }}>All Exams</ExmTypography>
      {loading ? (
        <ExmSpinnerCom />
      ) : (
        <ExmTableComponent
          objectArray={filterData?.length > 0 ? filterData : viewExamData}
          showNotes={true}
          btnLabel="Edit Exam"
          deleteBtn={true}
          urlPath={VIEW_EXAM_DETAILS_API}
          removeData={removeData}
        />
      )}
    </Box>
  );
};
