import { createSlice } from "@reduxjs/toolkit";

const teacherSlice = createSlice({
    name: "teacherModule",
    initialState: {
        questions: [],
        allExams: [],
        allQuestions: {},
        allOptions: {},
        allAnswer: {},
        allErrors: {},
        examDataQues: [],
        viewExamQus: [],
    },
    reducers: {
        addQuestions: (state, action) => {
            state.questions = [...state.questions, action.payload];
        },
        addExamData: (state, action) => {
            state.questions = { ...state.questions, ...action.payload };
        },
        addToAllQus: (state, action) => {
            state.allQuestions = { ...state.allQuestions, ...action.payload };
        },
        addToAllOpts: (state, action) => {
            const optData = action.payload;
            state.allOptions[optData.qus] = {
                ...state.allOptions[optData.qus],
                ...optData.data,
            };
        },
        addToAllAns: (state, action) => {
            state.allAnswer = { ...state.allAnswer, ...action.payload };
        },
        addToAllErr: (state, action) => {
            state.allErrors = { ...state.allErrors, ...action.payload };
        },
        addAllExams: (state, action) => {
            state.allExams = [...action.payload];
        },
        addToViewExamQus: (state, action) => {
            state.viewExamQus = [...action.payload];
        },
        makeQusData: (state, action) => {
            state.examDataQues = [...state.examDataQues, action.payload];
        },
        removeAllQues: (state, action) => {
            state.viewExamQus = [];
        }
    },
});

export const teacherReducer = teacherSlice.reducer;
export const {
    addQuestions,
    addToAllQus,
    addToAllAns,
    addToAllErr,
    addToAllOpts,
    addAllExams,
    addToViewExamQus,
    makeQusData,
    removeAllQues,
} = teacherSlice.actions;
