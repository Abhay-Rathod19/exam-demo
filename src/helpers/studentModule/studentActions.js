import { exmStore } from "../../redux/store/store";
import { fetchApiData } from "../../redux/slices/apiSlice";
import { getFromLocalStorage, setToLocalStorage } from "../../utils/javaScript";
import {
  GET,
  POST,
  PUT,
  SUBMIT_EXAM,
  UPDATE_STD_PROFILE,
  API_REQ_SUCCESS_CODE,
  GET_EXAM_PAPER,
  GET_ALL_EXAMS,
  GET_STUDENT_PROFILE,
  API_REQ_FAIL_CODE,
} from "../../constants/userModule/apiConstants";
import {
  setExamPaper,
  setAllExams,
  setStdProfile,
  setNoticeMsg
} from "../../redux/slices/studentSlice";


export const getStudentProfile = async () => {
  const request = await exmStore.dispatch(
    fetchApiData({
      url: GET_STUDENT_PROFILE,
      method: GET,
    })
  );
  if (request.payload?.statusCode === API_REQ_SUCCESS_CODE) {
    exmStore.dispatch(setStdProfile(request?.payload?.data));
  }
};

export const getAllExams = async () => {
  const request = await exmStore.dispatch(
    fetchApiData({
      url: GET_ALL_EXAMS,
      method: GET,
    })
  );
  if (request.payload?.statusCode === API_REQ_SUCCESS_CODE) {
    exmStore.dispatch(setAllExams(request?.payload?.data));
  }
};

export const getExamPaper = async (exmId) => {
  const request = await exmStore.dispatch(
    fetchApiData({
      url: `${GET_EXAM_PAPER}${exmId}`,
      method: GET,
    })
  );
  if (request.payload?.statusCode === API_REQ_SUCCESS_CODE) {
    exmStore.dispatch(setExamPaper(request?.payload?.data));
  } else if (request?.payload?.statusCode === API_REQ_FAIL_CODE) {
    exmStore.dispatch(setNoticeMsg(request?.payload?.message));
  }
};

export const submitExamPaper = async (exmId, answer, navigate) => {
  const request = await exmStore.dispatch(
    fetchApiData({
      url: `${SUBMIT_EXAM}${exmId}`,
      method: POST,
      data: answer,
    })
  );
  if (request.payload?.statusCode === API_REQ_SUCCESS_CODE) {
    console.log("Exam submited successfully");
    navigate("/dashboard/student/allExam");
  }
};

export const changeStdName = async (formData, navigate,) => {
  const request = await exmStore.dispatch(
    fetchApiData({
      url: UPDATE_STD_PROFILE,
      method: PUT,
      data: { name: formData?.name }
    })
  );
  if (request.payload?.statusCode === API_REQ_SUCCESS_CODE) {
    const useData = JSON.parse(getFromLocalStorage("LogInUser"));
    const updUserData = { ...useData, name: formData?.name };
    setToLocalStorage("LogInUser", JSON.stringify(updUserData));
    navigate("/dashboard/student/myProfile");
  }
}