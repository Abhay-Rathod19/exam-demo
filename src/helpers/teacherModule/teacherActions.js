import { exmStore } from "../../redux/store/store";
import { fetchApiData } from "../../redux/slices/apiSlice";
import { API_REQ_SUCCESS_CODE } from "../../constants/userModule/apiConstants";
import { addAllExams, removeAllQues } from "../../redux/slices/teacherSlice";
import { addToViewExamQus } from "../../redux/slices/teacherSlice";
import { VIEW_EXAM_API, CREATE_EXAM_API, DELETE_EXAM_API } from "../../constants/userModule/apiConstants";
import { API_METHOD_GET, API_METHOD_POST, API_METHOD_DELETE } from "../../constants/userModule/apiConstants";

export const viewAllExam = async () => {
    const request = await exmStore.dispatch(fetchApiData({
        url: VIEW_EXAM_API,
        method: API_METHOD_GET,
    }));
    if (request.payload?.statusCode === API_REQ_SUCCESS_CODE) {
        exmStore.dispatch(addAllExams(request?.payload?.data));
    }
};

export const getExamDetails = async (examIdUrl) => {
    const request = await exmStore.dispatch(fetchApiData({
        url: examIdUrl,
        method: API_METHOD_GET,
    }))
    if (request.payload?.statusCode === API_REQ_SUCCESS_CODE) {
        exmStore.dispatch(removeAllQues());
        exmStore.dispatch(addToViewExamQus(request?.payload?.data.questions));
    }
}

export const createExam = async (examData) => {
    const request = await exmStore.dispatch(fetchApiData({
        url: CREATE_EXAM_API,
        method: API_METHOD_POST,
        data: examData
    }));

    console.log("Exam created response : ", request);
};

export const deleteExam = async (examId) => {
    const request = await exmStore.dispatch(fetchApiData({
        url: `${DELETE_EXAM_API}${examId}`,
        method: API_METHOD_DELETE,
    }));

    console.log("Exam deleted response : ", request);
};