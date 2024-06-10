import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
  name: "studentModule",
  initialState: {
    examPaper: [],
    exmAnswer: [],
    allExams: [],
    stdProfile: {},
    stdNoticeMsg: null,
  },
  reducers: {
    setStdProfile: (state, action) => {
      state.stdProfile = { ...action.payload };
    },
    setAllExams: (state, action) => {
      state.allExams = [...action.payload];
    },
    setExamPaper: (state, action) => {
      state.examPaper = [...action.payload];
    },
    removeExmPaper: (state, action) => {
      state.examPaper = [];
    },
    setExmAnswer: (state, action) => {
      const data = action?.payload;
      const index = data?.index;
      const answer = data?.answer;
      state.exmAnswer[index] = answer;
    },
    setNoticeMsg: (state, action) => {
      state.stdNoticeMsg = action.payload;
    },
    rmvNoticeMsg: (state, action) => {
      state.stdNoticeMsg = null;
    },
  },
});

export const studentReducer = studentSlice.reducer;
export const {
  setExamPaper,
  setExmAnswer,
  setAllExams,
  setStdProfile,
  setNoticeMsg,
  removeExmPaper,
  rmvNoticeMsg,
} = studentSlice.actions;
