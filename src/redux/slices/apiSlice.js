import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userDataApi } from "../../apis/dataFetchApi";
import { setToLocalStorage } from "../../utils/javaScript";
import { areEqual } from "../../utils/javaScript";
import { JWT_FAIL_CODE } from "../../constants/userModule/apiConstants";
import { jwtFailRedirect } from "../../helpers/authentication";

const initialState = {
  loading: false,
  examLoading: false,
  apiData: [],
  apiResponse: {},
  apiError: "",
  apiMessage: null,
  useApiToken: null,
};

export const fetchApiData = createAsyncThunk(
  "apiData/fetchData",
  async ({ url, method, data, navigate }) => {
    const response = await userDataApi({
      url: url,
      method: method,
      data: data,
    });
    if (areEqual(response?.statusCode, JWT_FAIL_CODE)) {
      jwtFailRedirect(navigate);
    }
    return response;
  }
);

export const apiSlice = createSlice({
  name: "apiSlice",
  initialState,
  reducers: {
    reset: () => initialState,
    setApiMsg: (state, action) => {
      state.apiMessage = action?.payload;
    },
    setExamLoading: (state, action) => {
      state.examLoading = true;
    },
    removeApiMsg: (state, action) => {
      state.apiMessage = null;
    },
    removeApiData: (state, action) => {
      state.apiData = [];
      state.loading = false;
      state.apiResponse = {};
    },
    resetLoader: (state, action) => {
      state.loading = false;
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
        state.examLoading = false;
        state.apiResponse = action.payload;
        // state.apiMessage = action.payload.message; //msg set
        state.apiData = action.payload?.data;
        state.useApiToken = action.payload?.data?.token;
        if (action.payload?.data?.token) {
          setToLocalStorage("token", action.payload?.data?.token);
        }
      })
      .addCase(fetchApiData.rejected, (state, action) => {
        state.loading = false;
        state.apiError = action.error?.message;
      });
  },
});

export const apiReducer = apiSlice.reducer;
export const {
  removeApiMsg,
  removeApiData,
  resetLoader,
  reset,
  setApiMsg,
  setExamLoading,
} = apiSlice.actions;
