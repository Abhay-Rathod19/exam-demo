import { configureStore } from "@reduxjs/toolkit";
import { userSliceReducer } from "../slices/userSlice";
import { apiReducer } from "../slices/apiSlice";
import { teacherReducer } from "../slices/teacherSlice";
import { studentReducer } from "../slices/studentSlice";

export const exmStore = configureStore({
  reducer: {
    exm: userSliceReducer,
    api: apiReducer,
    teacher: teacherReducer,
    student: studentReducer,
  },
});
