import { configureStore } from "@reduxjs/toolkit";
import { userSliceReducer } from "../slices/userSlice";

export const exmStore = configureStore({
    reducer: { exm: userSliceReducer },
})