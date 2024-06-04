export const BASE_URL = "https://examination.onrender.com";

// --------------------------------------------------------Teacher
export const GET_ALL_STD_DATA = "/dashboard/Teachers";
export const GET_VERIFIED_STD_DATA = "/dashboard/Teachers/StudentForExam";
export const VIEW_EXAM_API = "/dashboard/Teachers/viewExam";
export const CREATE_EXAM_API = "/dashboard/Teachers/Exam";
export const DELETE_EXAM_API = "/dashboard/Teachers/deleteExam?id=";
export const EDIT_EXAM_API = "/dashboard/Teachers/editExam?id=";
export const GET_EXAM_DETAILS = "/dashboard/Teachers/examDetail?id=";

// ---------------------------------------------------------Student
export const GET_ALL_EXAMS = "/student/studentExam";
export const GET_STUDENT_PROFILE = "/student/getStudentDetail";
export const SET_EXAM_PAPER_PATH = "/dashboard/student/examPaper?id=";
export const GET_EXAM_PAPER = "/student/examPaper?id=";
export const SUBMIT_EXAM = "/student/giveExam?id=";
export const UPDATE_STD_PROFILE = "/student/studentProfile";

export const API_REQ_SUCCESS_CODE = 200;
export const API_REQ_FAIL_CODE = 500;
export const JWT_FAIL_CODE = 401;

export const GET = "get";
export const POST = "post";
export const DELETE = "delete";
export const PUT = "put";

// ---------------------------------------------------------For routing
export const STUDENT_DETAILS_API = "/dashboard/Teacher/StudentDetails?id=";
export const VIEW_EXAM_DETAILS_API = "/dashboard/Teacher/examDetail?id=";
