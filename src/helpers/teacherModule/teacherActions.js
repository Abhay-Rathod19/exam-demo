import { exmStore } from "../../redux/store/store";
import { fetchApiData } from "../../redux/slices/apiSlice";
import { addAllExams, verifiedStdData } from "../../redux/slices/teacherSlice";
import { allStdData } from "../../redux/slices/teacherSlice";
import { addToViewExamQus } from "../../redux/slices/teacherSlice";
import { setStudDetail } from "../../redux/slices/teacherSlice";
import {
  VIEW_EXAM_API,
  CREATE_EXAM_API,
  DELETE_EXAM_API,
  EDIT_EXAM_API,
  GET,
  POST,
  DELETE,
  PUT,
  API_REQ_SUCCESS_CODE,
  GET_ALL_STD_DATA,
  GET_VERIFIED_STD_DATA,
} from "../../constants/userModule/apiConstants";
import { areEqual } from "../../utils/javaScript";
import { setApiMsg } from "../../redux/slices/apiSlice";

export const viewAllExam = async (navigate) => {
  const request = await exmStore.dispatch(
    fetchApiData({
      url: VIEW_EXAM_API,
      method: GET,
      navigate,
    })
  );
  if (areEqual(request.payload?.statusCode, API_REQ_SUCCESS_CODE)) {
    exmStore.dispatch(addAllExams(request?.payload?.data));
  }
};

export const getAllStdData = async (navigate) => {
  const request = await exmStore.dispatch(
    fetchApiData({ url: GET_ALL_STD_DATA, method: GET, navigate })
  );
  if (areEqual(request.payload?.statusCode, API_REQ_SUCCESS_CODE)) {
    exmStore.dispatch(allStdData(request?.payload?.data));
  }
};

export const getVerifiedStdData = async (navigate) => {
  const request = await exmStore.dispatch(
    fetchApiData({ url: GET_VERIFIED_STD_DATA, method: GET, navigate })
  );
  if (areEqual(request.payload?.statusCode, API_REQ_SUCCESS_CODE)) {
    exmStore.dispatch(verifiedStdData(request?.payload?.data));
  }
};

export const getExamDetails = async (examIdUrl, navigate) => {
  const request = await exmStore.dispatch(
    fetchApiData({
      url: examIdUrl,
      method: GET,
      navigate,
    })
  );
  if (areEqual(request.payload?.statusCode, API_REQ_SUCCESS_CODE)) {
    exmStore.dispatch(addToViewExamQus(request?.payload?.data?.questions));
  }
};

export const createExam = async (examData, navigate) => {
  const request = await exmStore.dispatch(
    fetchApiData({
      url: CREATE_EXAM_API,
      method: POST,
      data: examData,
      navigate,
    })
  );

  if (areEqual(request?.payload?.statusCode, API_REQ_SUCCESS_CODE)) {
    exmStore.dispatch(setApiMsg(request.payload?.message));
    navigate("/dashboard/Teacher/viewExam");
  }
};

export const deleteExam = async (examId, navigate) => {
  const request = await exmStore.dispatch(
    fetchApiData({
      url: `${DELETE_EXAM_API}${examId}`,
      method: DELETE,
      navigate,
    })
  );

  if (areEqual(request?.payload?.statusCode, API_REQ_SUCCESS_CODE)) {
    exmStore.dispatch(setApiMsg(request.payload?.message));
  }
};

export const editPutExam = async (examData, navigate, examId) => {
  const request = await exmStore.dispatch(
    fetchApiData({
      url: `${EDIT_EXAM_API}${examId}`,
      method: PUT,
      data: examData,
      navigate,
    })
  );

  if (areEqual(request?.payload?.statusCode, API_REQ_SUCCESS_CODE)) {
    exmStore.dispatch(setApiMsg(request.payload?.message));
    navigate("/dashboard/Teacher/viewExam");
  }
};

export const getStudDetail = async (stdId, navigate) => {
  const request = await exmStore.dispatch(
    fetchApiData({
      url: `/dashboard/Teachers/viewStudentDetail?id=${stdId}`,
      method: GET,
      navigate,
    })
  );
  if (areEqual(request.payload?.statusCode, API_REQ_SUCCESS_CODE)) {
    console.log("i am setting");
    exmStore.dispatch(setStudDetail(request?.payload?.data));
  }
};
