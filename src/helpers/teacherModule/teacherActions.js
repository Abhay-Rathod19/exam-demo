import { exmStore } from "../../redux/store/store";
import { fetchApiData } from "../../redux/slices/apiSlice";
import { API_REQ_SUCCESS_CODE, GET_ALL_STD_DATA } from "../../constants/userModule/apiConstants";
import { addAllExams, removeAllQues } from "../../redux/slices/teacherSlice";
import { allStdData } from "../../redux/slices/teacherSlice";
import { addToViewExamQus } from "../../redux/slices/teacherSlice";
import {
    VIEW_EXAM_API,
    CREATE_EXAM_API,
    DELETE_EXAM_API,
    EDIT_EXAM_API,
} from "../../constants/userModule/apiConstants";
import {
    GET,
    POST,
    DELETE,
    PUT,
} from "../../constants/userModule/apiConstants";

export const viewAllExam = async () => {
    const request = await exmStore.dispatch(
        fetchApiData({
            url: VIEW_EXAM_API,
            method: GET,
        })
    );
    if (request.payload?.statusCode === API_REQ_SUCCESS_CODE) {
        exmStore.dispatch(addAllExams(request?.payload?.data));
    }
};

export const getAllStdData = async () => {
    const request = await exmStore.dispatch(
        fetchApiData({ url: GET_ALL_STD_DATA, method: GET })
    );
    if (request.payload?.statusCode === API_REQ_SUCCESS_CODE) {
        exmStore.dispatch(allStdData(request?.payload?.data));
    }
};


export const getExamDetails = async (examIdUrl) => {
    const request = await exmStore.dispatch(
        fetchApiData({
            url: examIdUrl,
            method: GET,
        })
    );
    if (request.payload?.statusCode === API_REQ_SUCCESS_CODE) {
        // exmStore.dispatch(removeAllQues());
        exmStore.dispatch(addToViewExamQus(request?.payload?.data?.questions));
        return request?.payload?.data?.questions;
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

    if (request?.payload?.statusCode === API_REQ_SUCCESS_CODE) {
        navigate("/dashboard/viewExam");
    }
};

export const deleteExam = async (examId, navigate) => {
    const askToDelete = window.confirm(
        "Are you sure you want to delete this exam ?"
    );
    if (askToDelete) {
        const request = await exmStore.dispatch(
            fetchApiData({
                url: `${DELETE_EXAM_API}${examId}`,
                method: DELETE,
            })
        );

        if (request?.payload?.statusCode === API_REQ_SUCCESS_CODE) {
            navigate("/dashboard/viewExam");
        }
    }
};

export const editPutExam = async (examData, navigate, examId) => {
    const request = await exmStore.dispatch(
        fetchApiData({
            url: `${EDIT_EXAM_API}${examId}`,
            method: PUT,
            data: examData,
        })
    );

    if (request?.payload?.statusCode === API_REQ_SUCCESS_CODE) {
        navigate("/dashboard/viewExam");
    }
};
