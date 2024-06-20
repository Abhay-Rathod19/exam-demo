import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { userSliceReducer } from "../slices/userSlice";
import { apiReducer } from "../slices/apiSlice";
import { teacherReducer } from "../slices/teacherSlice";
import { studentReducer } from "../slices/studentSlice";

const appReducer = combineReducers({
  exm: userSliceReducer,
  api: apiReducer,
  teacher: teacherReducer,
  student: studentReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGGED_OUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

export const exmStore = configureStore({
  reducer: rootReducer,
});
