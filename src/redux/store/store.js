import { configureStore } from "@reduxjs/toolkit";
import { userSliceReducer } from "../slices/userSlice";
import { apiReducer } from "../slices/apiSlice";

export const exmStore = configureStore({
    reducer: { exm: userSliceReducer, api: apiReducer },
})