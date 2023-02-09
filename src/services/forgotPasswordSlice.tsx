import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/constants";
import { forgotPasswordRequest } from "../utils/utils";

const initialState = {
  requestStatus: "",
};

const forgotPasswordSlice = createSlice({
  name: "forgotPasswordSlice",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(sendForgotPasswordRequest.pending, (state, action) => {
        state.requestStatus = "loading";
      })
      .addCase(sendForgotPasswordRequest.fulfilled, (state, action) => {
        state.requestStatus = "succeeded";
      })
      .addCase(sendForgotPasswordRequest.rejected, (state, action) => {
        state.requestStatus = "failed";
      });
  },
});

export const sendForgotPasswordRequest = createAsyncThunk(
  "forgotPassword/sendForgotPasswordRequest",
  async (email: string) => {
    const response = await forgotPasswordRequest(
      BASE_URL + "/password-reset",
      email
    );
    return response;
  }
);

export default forgotPasswordSlice.reducer;
