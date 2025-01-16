import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userModule",
  initialState: {
    submitedData: {},
    loggedUser: {},
    formErrors: {},
  },
  reducers: {
    addSubmitedData: (state, action) => {
      state.submitedData = { ...state?.submitedData, ...action.payload };
    },
    addToLogUser: (state, action) => {
      state.loggedUser = { ...action.payload };
    },
  },
});

export const userSliceReducer = userSlice.reducer;
export const { addSubmitedData, addToLogUser } = userSlice.actions;
