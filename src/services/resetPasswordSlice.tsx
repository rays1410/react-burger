import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  nanoid,
} from "@reduxjs/toolkit";
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

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email: string, thunkAPI) => {
    try {
      console.log(`Письмо отправлено на ${email}`);
      const { data } = await forgotPasswordRequest(email);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(ERR_USER_RESET_PASSWORD);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (
    { newPassword, emailToken }: { newPassword: string; emailToken: string }, // ?
    thunkAPI
  ) => {
    try {
      console.log(`Новый пароль ${newPassword}, токен ${emailToken}`);
      const { data } = await resetPasswordRequest(newPassword, emailToken);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(ERR_USER_RESET_PASSWORD);
    }
  }
);

interface StateType {
  loading: boolean;
  requestSuccess: boolean;
  changeSuccess: boolean;
  userMessage: null | string;
  devError: null | string;
}

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
    [forgotPassword.pending.type]: (state: StateType) => {
      state.loading = true;
    },
    [forgotPassword.fulfilled.type]: (state: StateType) => {
      state.userMessage = SUCC_EMAIL_SENT;
      state.loading = false;
      state.requestSuccess = true;
    },
    [forgotPassword.rejected.type]: (state: StateType, { payload }) => {
      state.devError = payload;
      state.userMessage = ERR_EMAIL_RESET;
      state.loading = false;
      state.requestSuccess = false;
    },

    // Восстановление пароля
    [resetPassword.pending.type]: (state: StateType) => {
      state.loading = true;
    },
    [resetPassword.fulfilled.type]: (state: StateType) => {
      state.userMessage = SUCC_PASSWORD_CHANGE;
      state.loading = true;
      state.changeSuccess = true;
    },
    [resetPassword.rejected.type]: (state: StateType, { payload }) => {
      state.devError = payload;
      state.userMessage = ERR_USER_RESET_PASSWORD;
      state.loading = false;
    },
  },

});

export default resetPasswordSlice.reducer;
