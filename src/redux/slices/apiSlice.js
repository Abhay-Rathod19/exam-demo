import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userDataApi } from "../../apis/userApi";
import { setToLocalStorage } from "../../utils/javaScript";

const initialState = {
    loading: false,
    apiData: [],
    apiResponse: {},
    apiError: "",
    apiMessage: null,
    useApiToken: null,
};

export const fetchApiData = createAsyncThunk(
    "apiData/fetchData",
    async (request) => {
        const response = await userDataApi({
            url: request.url,
            method: request.method,
            data: request.data,
        });
        return response;
    }
);

export const apiSlice = createSlice({
    name: "apiSlice",
    initialState,
    reducers: {
        removeApiMsg: (state, action) => {
            state.apiMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchApiData.pending, (state) => {
                state.loading = true;
                state.apiError = "";
            })
            .addCase(fetchApiData.fulfilled, (state, action) => {
                state.loading = false;
                state.apiResponse = action.payload;
                state.apiMessage = action.payload.message;
                state.apiData = action.payload?.data;
                state.useApiToken = action.payload?.data?.token;
                setToLocalStorage("token", action.payload?.data?.token);
            })
            .addCase(fetchApiData.rejected, (state, action) => {
                state.loading = false;
                state.apiError = action.error?.message;
            });
    },
});

export const apiReducer = apiSlice.reducer;
export const { removeApiMsg } = apiSlice.actions;