import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  ERR_EMAIL_RESET,
  ERR_USER_RESET_PASSWORD,
  SUCC_EMAIL_SENT,
  SUCC_PASSWORD_CHANGE,
} from "../utils/statusConstants";
import {
  forgotPasswordRequest,
  resetPasswordRequest,
} from "../utils/resetPasswordUtils";
import { IResetPassword, IResetPasswordData } from "../utils/interfaces";
import { TRequestAnswer } from "../utils/types";

export const forgotPassword = createAsyncThunk<TRequestAnswer, string>(
  "auth/forgotPassword",
  async (email, thunkAPI) => {
    try {
      const { data } = await forgotPasswordRequest(email);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(ERR_USER_RESET_PASSWORD);
    }
  }
);

export const resetPassword = createAsyncThunk<
  TRequestAnswer,
  IResetPasswordData
>("auth/resetPassword", async ({ newPassword, emailToken }, thunkAPI) => {
  try {
    const { data } = await resetPasswordRequest(newPassword, emailToken);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(ERR_USER_RESET_PASSWORD);
  }
});

const initialState = {
  loading: false,
  requestSuccess: false,
  changeSuccess: false,
  userMessage: null,
  devError: null,
};

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {},
  extraReducers: {
    // Письмо для восстановления пароля
    [forgotPassword.pending.type]: (state: IResetPassword) => {
      state.loading = true;
    },
    [forgotPassword.fulfilled.type]: (state: IResetPassword) => {
      state.userMessage = SUCC_EMAIL_SENT;
      state.loading = false;
      state.requestSuccess = true;
    },
    [forgotPassword.rejected.type]: (state: IResetPassword, { payload }) => {
      state.devError = payload;
      state.userMessage = ERR_EMAIL_RESET;
      state.loading = false;
      state.requestSuccess = false;
    },

    // Восстановление пароля
    [resetPassword.pending.type]: (state: IResetPassword) => {
      state.loading = true;
    },
    [resetPassword.fulfilled.type]: (state: IResetPassword) => {
      state.userMessage = SUCC_PASSWORD_CHANGE;
      state.loading = false;
      state.changeSuccess = true;
    },
    [resetPassword.rejected.type]: (state: IResetPassword, { payload }) => {
      state.devError = payload;
      state.userMessage = ERR_USER_RESET_PASSWORD;
      state.loading = false;
      state.changeSuccess = false;
    },
  },
});

export default resetPasswordSlice.reducer;
