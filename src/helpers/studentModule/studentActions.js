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
  JWT_FAIL_CODE,
} from "../../constants/userModule/apiConstants";
import {
  setExamPaper,
  setAllExams,
  setStdProfile,
  setNoticeMsg
} from "../../redux/slices/studentSlice";
import { rmvNoticeMsg, removeExmPaper } from "../../redux/slices/studentSlice";
import { removeAllQues, addExmNameData } from "../../redux/slices/teacherSlice";
import { jwtFailRedirect } from "../authentication";


export const getStudentProfile = async (navigate) => {
  const request = await exmStore.dispatch(
    fetchApiData({
      url: GET_STUDENT_PROFILE,
      method: GET,
    })
  );
  if (request.payload?.statusCode === API_REQ_SUCCESS_CODE) {
    exmStore.dispatch(setStdProfile(request?.payload?.data));
  } else if (request.payload?.statusCode === JWT_FAIL_CODE) {
    jwtFailRedirect(navigate);
  }
};

export const getAllExams = async (navigate) => {
  const request = await exmStore.dispatch(
    fetchApiData({
      url: GET_ALL_EXAMS,
      method: GET,
    })
  );
  if (request.payload?.statusCode === API_REQ_SUCCESS_CODE) {
    exmStore.dispatch(setAllExams(request?.payload?.data));
  } else if (request.payload?.statusCode === JWT_FAIL_CODE) {
    jwtFailRedirect(navigate);
  }
};

export const getExamPaper = async (exmId, navigate) => {
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
  } else if (request.payload?.statusCode === JWT_FAIL_CODE) {
    jwtFailRedirect(navigate);
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
  } else if (request.payload?.statusCode === JWT_FAIL_CODE) {
    jwtFailRedirect(navigate);
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
  console.log(`watching response : `, request.payload);
  if (request.payload?.statusCode === API_REQ_SUCCESS_CODE) {
    const useData = JSON.parse(getFromLocalStorage("LogInUser"));
    const updUserData = { ...useData, name: formData?.name };
    setToLocalStorage("LogInUser", JSON.stringify(updUserData));
    navigate("/dashboard/student/myProfile");
  } else if (request.payload?.statusCode === JWT_FAIL_CODE) {
    jwtFailRedirect(navigate);
  }
}

export const putExmDetailsRdx = (details, dispatch) => {
  if (details.subjectName && details.notes) {
    dispatch(rmvNoticeMsg());
    dispatch(removeExmPaper());
    dispatch(removeAllQues());
    const exmDetails = { examName: details.subjectName, notes: details.notes[0] };
    setToLocalStorage("ExamDetails", JSON.stringify(exmDetails));
    dispatch(addExmNameData(details));
  }
};