import { createSlice } from "@reduxjs/toolkit";

const teacherSlice = createSlice({
    name: "teacherModule",
    initialState: {
        allExams: [],
        allErrors: {},
        viewExamQus: [],
        examNameNotes: {},
        studentData: {}
    },
    reducers: {
        addToAllErr: (state, action) => {
            state.allErrors = { ...state.allErrors, ...action.payload };
        },
        addAllExams: (state, action) => {
            state.allExams = [...action.payload];
        },
        addToViewExamQus: (state, action) => {
            state.viewExamQus = [...action.payload];
        },
        removeAllQues: (state, action) => {
            state.viewExamQus = [];
        },
        addExmNameData: (state, action) => {
            console.log("I am running ...")
            const data = action?.payload;
            state.examNameNotes = { examName: data?.subjectName, notes: data?.notes[0] }
        },
        allStdData: (state, action) => {
            state.studentData['allStudent'] = [...action.payload];
        },
        verifiedStdData: (state, action) => {
            state.studentData['verifiedStd'] = [...action.payload];
        },
    },
});

export const teacherReducer = teacherSlice.reducer;
export const {
    addToAllErr,
    addAllExams,
    addToViewExamQus,
    removeAllQues,
    addExmNameData,
    allStdData,
    verifiedStdData,
} = teacherSlice.actions;
