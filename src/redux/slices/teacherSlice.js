import { createSlice } from "@reduxjs/toolkit";

const teacherSlice = createSlice({
    name: "teacherModule",
    initialState: {
        questions: [],
        allQuestions: {},
        allOptions: {},
        allAnswer: {},
        allErrors: {},
        examData: {},
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
            state.allOptions[optData.qus] = { ...state.allOptions[optData.qus], ...optData.data };
        },
        addToAllAns: (state, action) => {
            state.allAnswer = { ...state.allAnswer, ...action.payload };
        },
        addToAllErr: (state, action) => {
            // console.log("incoming : ", action.payload)
            state.allErrors = { ...state.allErrors, ...action.payload }
        },
    },
});

export const teacherReducer = teacherSlice.reducer;
export const { addQuestions, addToAllQus, addToAllAns, addToAllErr, addToAllOpts } = teacherSlice.actions;