import { createSlice } from "@reduxjs/toolkit";

const teacherSlice = createSlice({
    name: "teacherModule",
    initialState: {
        questions: [],
        allQuestions: {},
        allAnswer: {},
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
        addToAllAns: (state, action) => {
            state.allAnswer = { ...state.allAnswer, ...action.payload };
        },
    },
});

export const teacherReducer = teacherSlice.reducer;
export const { addQuestions, addToAllQus, addToAllAns } = teacherSlice.actions;