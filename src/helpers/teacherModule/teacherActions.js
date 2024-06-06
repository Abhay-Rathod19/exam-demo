import { exmStore } from "../../redux/store/store";
import { fetchApiData } from "../../redux/slices/apiSlice";
import { addAllExams, verifiedStdData } from "../../redux/slices/teacherSlice";
import { allStdData } from "../../redux/slices/teacherSlice";
import { addToViewExamQus } from "../../redux/slices/teacherSlice";
import { jwtFailRedirect } from "../authentication";
import {
  VIEW_EXAM_API,
  CREATE_EXAM_API,
  DELETE_EXAM_API,
  EDIT_EXAM_API,
  GET,
  POST,
  DELETE,
  PUT,
  JWT_FAIL_CODE,
  API_REQ_SUCCESS_CODE,
  GET_ALL_STD_DATA,
  GET_VERIFIED_STD_DATA,
} from "../../constants/userModule/apiConstants";
import { areEqual } from "../../utils/javaScript";

export const viewAllExam = async (navigate) => {
  const request = await exmStore.dispatch(
    fetchApiData({
      url: VIEW_EXAM_API,
      method: GET,
    })
  );
  if (areEqual(request.payload?.statusCode, API_REQ_SUCCESS_CODE)) {
    exmStore.dispatch(addAllExams(request?.payload?.data));
  } else if (areEqual(request.payload?.statusCode, JWT_FAIL_CODE)) {
    jwtFailRedirect(navigate);
  }
};

export const getAllStdData = async (navigate) => {
  const request = await exmStore.dispatch(
    fetchApiData({ url: GET_ALL_STD_DATA, method: GET })
  );
  if (areEqual(request.payload?.statusCode, API_REQ_SUCCESS_CODE)) {
    exmStore.dispatch(allStdData(request?.payload?.data));
  } else if (areEqual(request.payload?.statusCode, JWT_FAIL_CODE)) {
    jwtFailRedirect(navigate);
  }
};

export const getVerifiedStdData = async (navigate) => {
  const request = await exmStore.dispatch(
    fetchApiData({ url: GET_VERIFIED_STD_DATA, method: GET })
  );
  if (areEqual(request.payload?.statusCode, API_REQ_SUCCESS_CODE)) {
    exmStore.dispatch(verifiedStdData(request?.payload?.data));
  } else if (areEqual(request.payload?.statusCode, JWT_FAIL_CODE)) {
    jwtFailRedirect(navigate);
  }
};

export const getExamDetails = async (examIdUrl, navigate) => {
  const request = await exmStore.dispatch(
    fetchApiData({
      url: examIdUrl,
      method: GET,
    })
  );
  if (areEqual(request.payload?.statusCode, API_REQ_SUCCESS_CODE)) {
    exmStore.dispatch(addToViewExamQus(request?.payload?.data?.questions));
  } else if (areEqual(request.payload?.statusCode, JWT_FAIL_CODE)) {
    jwtFailRedirect(navigate);
  }
};

export const createExam = async (examData, navigate) => {
  const request = await exmStore.dispatch(
    fetchApiData({
      url: CREATE_EXAM_API,
      method: POST,
      data: examData,
    })
  );

  if (areEqual(request?.payload?.statusCode, API_REQ_SUCCESS_CODE)) {
    navigate("/dashboard/Teacher/viewExam");
  } else if (areEqual(request.payload?.statusCode, JWT_FAIL_CODE)) {
    jwtFailRedirect(navigate);
  }
};

export const deleteExam = async (examId, navigate) => {
  // const askToDelete = window.confirm(
  //   "Are you sure you want to delete this exam ?"
  // );
  // if (askToDelete) {
  const request = await exmStore.dispatch(
    fetchApiData({
      url: `${DELETE_EXAM_API}${examId}`,
      method: DELETE,
    })
  );

  if (areEqual(request?.payload?.statusCode, API_REQ_SUCCESS_CODE)) {
    navigate("/dashboard/Teacher/viewExam");
  }
};
// };

export const editPutExam = async (examData, navigate, examId) => {
  const request = await exmStore.dispatch(
    fetchApiData({
      url: `${EDIT_EXAM_API}${examId}`,
      method: PUT,
      data: examData,
    })
  );

  if (areEqual(request?.payload?.statusCode, API_REQ_SUCCESS_CODE)) {
    navigate("/dashboard/Teacher/viewExam");
  } else if (areEqual(request.payload?.statusCode, JWT_FAIL_CODE)) {
    jwtFailRedirect(navigate);
  }
};
