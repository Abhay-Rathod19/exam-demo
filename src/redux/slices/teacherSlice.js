import { createSlice } from "@reduxjs/toolkit";

const teacherSlice = createSlice({
  name: "teacherModule",
  initialState: {
    allExams: [],
    allErrors: {},
    viewExamQus: [],
    examNameNotes: {},
    studentData: {},
  },
  reducers: {
    addToAllErr: (state, action) => {
      state.allErrors = { ...state.allErrors, ...action.payload };
    },
    removeAllErr: (state, action) => {
      state.allErrors = {};
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
      const data = action?.payload;
      state.examNameNotes = {
        examName: data?.subjectName,
        notes: data?.notes[0],
      };
    },
    allStdData: (state, action) => {
      state.studentData["allStudent"] = [...action.payload];
    },
    verifiedStdData: (state, action) => {
      state.studentData["verifiedStd"] = [...action.payload];
    },
    setStudDetail: (state, action) => {
      state.studentData["idvStudent"] = [...action.payload];
    },
  },
});

export const teacherReducer = teacherSlice.reducer;
export const {
  addToAllErr,
  removeAllErr,
  addAllExams,
  addToViewExamQus,
  removeAllQues,
  addExmNameData,
  allStdData,
  verifiedStdData,
  setStudDetail,
} = teacherSlice.actions;
