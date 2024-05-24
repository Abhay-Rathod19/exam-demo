import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "userModule",
    initialState: {
        submitedData: {},
        formErrors: {},
    },
    reducers: {
        addSubmitedData: (state, action) => {
            state.submitedData = { ...state?.submitedData, ...action.payload };
        },
    }
});

export const userSliceReducer = userSlice.reducer;
export const { addSubmitedData } = userSlice.actions;